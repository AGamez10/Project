<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PetController;
use App\Http\Controllers\AdoptionController;
use App\Http\Controllers\DonationController;
use App\Http\Controllers\GoogleAuthController;
use App\Http\Controllers\DeepSeekController;

// Rutas públicas
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Rutas de autenticación con Google
Route::get('/auth/google', [GoogleAuthController::class, 'redirectToGoogle']);
Route::get('/auth/google/callback', [GoogleAuthController::class, 'handleGoogleCallback']);
Route::post('/auth/google/token', [GoogleAuthController::class, 'authenticateWithGoogle']);

// Rutas de mascotas (públicas para ver, protegidas para modificar)
Route::get('/pets', [PetController::class, 'index']);
Route::get('/pets/{pet}', [PetController::class, 'show']);
Route::get('/pets-stats', [PetController::class, 'getStats']);

// Rutas de donaciones (públicas para crear)
Route::post('/donations', [DonationController::class, 'store']);
Route::get('/donations-stats', [DonationController::class, 'getStats']);

// Rutas protegidas
Route::middleware('auth:sanctum')->group(function () {
    // Autenticación
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    
    // Mascotas (admin)
    Route::post('/pets', [PetController::class, 'store']);
    Route::put('/pets/{pet}', [PetController::class, 'update']);
    Route::delete('/pets/{pet}', [PetController::class, 'destroy']);
    
    // Adopciones
    Route::get('/adoptions', [AdoptionController::class, 'index']);
    Route::get('/adoptions/{adoption}', [AdoptionController::class, 'show']);
    Route::post('/adoptions', [AdoptionController::class, 'store']);
    Route::put('/adoptions/{adoption}', [AdoptionController::class, 'update']);
    Route::delete('/adoptions/{adoption}', [AdoptionController::class, 'destroy']);
    Route::get('/adoptions-stats', [AdoptionController::class, 'getStats']);
    
    // Donaciones
    Route::get('/donations', [DonationController::class, 'index']);
    Route::get('/donations/{donation}', [DonationController::class, 'show']);
    Route::put('/donations/{donation}', [DonationController::class, 'update']);
    Route::delete('/donations/{donation}', [DonationController::class, 'destroy']);
    
    // Rutas del agente inteligente DeepSeek
    Route::prefix('ai-agent')->group(function () {
        Route::get('/system-health', [DeepSeekController::class, 'analyzeSystemHealth']);
        Route::get('/adoption-recommendations', [DeepSeekController::class, 'getAdoptionRecommendations']);
        Route::get('/detect-anomalies', [DeepSeekController::class, 'detectAnomalies']);
        Route::post('/chat', [DeepSeekController::class, 'chat']);
    });
});