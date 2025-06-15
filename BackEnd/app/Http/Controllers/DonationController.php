<?php

namespace App\Http\Controllers;

use App\Models\Donation;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class DonationController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Donation::with('user');

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        if ($request->has('user_id')) {
            $query->where('user_id', $request->user_id);
        }

        $donations = $query->orderBy('created_at', 'desc')->paginate(10);

        return response()->json($donations);
    }

    public function show(Donation $donation): JsonResponse
    {
        return response()->json($donation->load('user'));
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'amount' => 'required|numeric|min:1',
            'donor_name' => 'nullable|string|max:255',
            'donor_email' => 'nullable|email|max:255',
            'message' => 'nullable|string|max:1000',
            'payment_method' => 'nullable|string|max:255',
        ]);

        if (auth()->check()) {
            $validated['user_id'] = auth()->id();
        }

        // Simular procesamiento de pago
        $validated['transaction_id'] = 'TXN_' . uniqid();
        $validated['status'] = 'completada'; // En un caso real, sería 'pendiente' hasta confirmar el pago

        $donation = Donation::create($validated);

        return response()->json($donation->load('user'), 201);
    }

    public function update(Request $request, Donation $donation): JsonResponse
    {
        $validated = $request->validate([
            'status' => 'required|in:pendiente,completada,fallida',
            'transaction_id' => 'nullable|string|max:255',
        ]);

        $donation->update($validated);

        return response()->json($donation->load('user'));
    }

    public function destroy(Donation $donation): JsonResponse
    {
        $donation->delete();

        return response()->json(['message' => 'Donación eliminada correctamente']);
    }

    public function getStats(): JsonResponse
    {
        $stats = [
            'total_donations' => Donation::completed()->count(),
            'total_amount' => Donation::completed()->sum('amount'),
            'pending_donations' => Donation::pending()->count(),
            'recent_donations' => Donation::with('user')
                ->completed()
                ->orderBy('created_at', 'desc')
                ->limit(5)
                ->get(),
            'monthly_donations' => Donation::completed()
                ->selectRaw('MONTH(created_at) as month, SUM(amount) as total')
                ->whereYear('created_at', date('Y'))
                ->groupBy('month')
                ->get(),
        ];

        return response()->json($stats);
    }
}