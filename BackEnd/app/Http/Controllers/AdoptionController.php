<?php

namespace App\Http\Controllers;

use App\Models\Adoption;
use App\Models\Pet;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class AdoptionController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Adoption::with(['user', 'pet']);

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        if ($request->has('user_id')) {
            $query->where('user_id', $request->user_id);
        }

        $adoptions = $query->orderBy('created_at', 'desc')->paginate(10);

        return response()->json($adoptions);
    }

    public function show(Adoption $adoption): JsonResponse
    {
        return response()->json($adoption->load(['user', 'pet']));
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'pet_id' => 'required|exists:pets,id',
            'message' => 'nullable|string|max:1000',
        ]);

        // Verificar que la mascota esté disponible
        $pet = Pet::findOrFail($validated['pet_id']);
        if ($pet->status !== 'disponible') {
            return response()->json(['error' => 'Esta mascota ya no está disponible para adopción'], 400);
        }

        $validated['user_id'] = auth()->id();

        $adoption = Adoption::create($validated);

        // Cambiar el estado de la mascota a "en proceso"
        $pet->update(['status' => 'en_proceso']);

        return response()->json($adoption->load(['user', 'pet']), 201);
    }

    public function update(Request $request, Adoption $adoption): JsonResponse
    {
        $validated = $request->validate([
            'status' => 'required|in:pendiente,aprobada,rechazada,completada',
            'admin_notes' => 'nullable|string|max:1000',
        ]);

        if ($validated['status'] === 'aprobada') {
            $validated['approved_at'] = now();
            // Marcar la mascota como adoptada
            $adoption->pet->update(['status' => 'adoptado']);
        } elseif ($validated['status'] === 'rechazada') {
            // Devolver la mascota a disponible
            $adoption->pet->update(['status' => 'disponible']);
        } elseif ($validated['status'] === 'completada') {
            $validated['completed_at'] = now();
        }

        $adoption->update($validated);

        return response()->json($adoption->load(['user', 'pet']));
    }

    public function destroy(Adoption $adoption): JsonResponse
    {
        // Si se cancela la adopción, devolver la mascota a disponible
        if ($adoption->status === 'pendiente' || $adoption->status === 'aprobada') {
            $adoption->pet->update(['status' => 'disponible']);
        }

        $adoption->delete();

        return response()->json(['message' => 'Solicitud de adopción cancelada']);
    }

    public function getStats(): JsonResponse
    {
        $stats = [
            'total_adoptions' => Adoption::count(),
            'pending_adoptions' => Adoption::pending()->count(),
            'approved_adoptions' => Adoption::approved()->count(),
            'completed_adoptions' => Adoption::where('status', 'completada')->count(),
            'recent_adoptions' => Adoption::with(['user', 'pet'])
                ->orderBy('created_at', 'desc')
                ->limit(5)
                ->get(),
        ];

        return response()->json($stats);
    }
}