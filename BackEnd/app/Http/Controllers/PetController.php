<?php

namespace App\Http\Controllers;

use App\Models\Pet;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class PetController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Pet::query();

        // Filtros
        if ($request->has('species')) {
            $query->bySpecies($request->species);
        }

        if ($request->has('status')) {
            $query->where('status', $request->status);
        } else {
            $query->available();
        }

        if ($request->has('size')) {
            $query->where('size', $request->size);
        }

        $pets = $query->paginate(12);

        return response()->json($pets);
    }

    public function show(Pet $pet): JsonResponse
    {
        return response()->json($pet->load('adoptions'));
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'species' => 'required|string|max:255',
            'breed' => 'nullable|string|max:255',
            'age' => 'required|integer|min:0',
            'gender' => 'required|in:macho,hembra',
            'description' => 'required|string',
            'image_url' => 'nullable|url',
            'size' => 'required|in:pequeño,mediano,grande',
            'location' => 'required|string|max:255',
            'vaccinated' => 'boolean',
            'sterilized' => 'boolean',
            'characteristics' => 'nullable|array'
        ]);

        $pet = Pet::create($validated);

        return response()->json($pet, 201);
    }

    public function update(Request $request, Pet $pet): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'string|max:255',
            'species' => 'string|max:255',
            'breed' => 'nullable|string|max:255',
            'age' => 'integer|min:0',
            'gender' => 'in:macho,hembra',
            'description' => 'string',
            'image_url' => 'nullable|url',
            'size' => 'in:pequeño,mediano,grande',
            'status' => 'in:disponible,adoptado,en_proceso',
            'location' => 'string|max:255',
            'vaccinated' => 'boolean',
            'sterilized' => 'boolean',
            'characteristics' => 'nullable|array'
        ]);

        $pet->update($validated);

        return response()->json($pet);
    }

    public function destroy(Pet $pet): JsonResponse
    {
        $pet->delete();

        return response()->json(['message' => 'Mascota eliminada correctamente']);
    }

    public function getStats(): JsonResponse
    {
        $stats = [
            'total_pets' => Pet::count(),
            'available_pets' => Pet::available()->count(),
            'adopted_pets' => Pet::where('status', 'adoptado')->count(),
            'pets_by_species' => Pet::selectRaw('species, COUNT(*) as count')
                ->groupBy('species')
                ->get(),
        ];

        return response()->json($stats);
    }
}