<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Str;

class GoogleAuthController extends Controller
{
    /**
     * Redirigir al usuario a Google para autenticación
     */
    public function redirectToGoogle(): JsonResponse
    {
        $url = Socialite::driver('google')
            ->stateless()
            ->redirect()
            ->getTargetUrl();

        return response()->json([
            'url' => $url
        ]);
    }

    /**
     * Manejar el callback de Google
     */
    public function handleGoogleCallback(Request $request): JsonResponse
    {
        try {
            $googleUser = Socialite::driver('google')
                ->stateless()
                ->user();

            // Buscar usuario existente por email
            $user = User::where('email', $googleUser->getEmail())->first();

            if ($user) {
                // Usuario existente - actualizar información de Google
                $user->update([
                    'google_id' => $googleUser->getId(),
                    'avatar' => $googleUser->getAvatar(),
                ]);
            } else {
                // Crear nuevo usuario
                $user = User::create([
                    'name' => $googleUser->getName(),
                    'email' => $googleUser->getEmail(),
                    'google_id' => $googleUser->getId(),
                    'avatar' => $googleUser->getAvatar(),
                    'email_verified_at' => now(),
                    'password' => bcrypt(Str::random(24)), // Password aleatorio
                ]);
            }

            // Crear token de acceso
            $token = $user->createToken('google_auth_token')->plainTextToken;

            return response()->json([
                'user' => $user,
                'token' => $token,
                'token_type' => 'Bearer',
                'message' => 'Autenticación con Google exitosa'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error en la autenticación con Google',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Autenticación con Google desde el frontend (usando JWT credential)
     */
    public function authenticateWithGoogle(Request $request): JsonResponse
    {
        $request->validate([
            'credential' => 'required|string',
            'user_info' => 'required|array',
        ]);

        try {
            // Por ahora, usar la información del usuario decodificada en el frontend
            // En producción, se debería verificar el JWT con Google
            $payload = $request->user_info;

            if (!$payload || !isset($payload['email'])) {
                return response()->json([
                    'error' => 'Información de usuario inválida'
                ], 401);
            }

            // Log para debugging
            \Log::info('Google Auth Payload: ', $payload);

            // Buscar o crear usuario
            $user = User::where('email', $payload['email'])->first();

            if ($user) {
                // Usuario existente - actualizar información
                $user->update([
                    'google_id' => $payload['sub'] ?? $payload['user_id'] ?? null,
                    'avatar' => $payload['picture'] ?? null,
                    'provider' => 'google',
                ]);
            } else {
                // Crear nuevo usuario
                $user = User::create([
                    'name' => $payload['name'] ?? $payload['given_name'] ?? 'Usuario Google',
                    'email' => $payload['email'],
                    'google_id' => $payload['sub'] ?? $payload['user_id'] ?? null,
                    'avatar' => $payload['picture'] ?? null,
                    'provider' => 'google',
                    'email_verified_at' => now(),
                    'password' => bcrypt(Str::random(24)),
                ]);
            }

            // Crear token de acceso
            $token = $user->createToken('google_auth_token')->plainTextToken;

            return response()->json([
                'user' => $user,
                'token' => $token,
                'token_type' => 'Bearer',
                'message' => 'Autenticación con Google exitosa'
            ]);

        } catch (\Exception $e) {
            \Log::error('Google Auth Error: ' . $e->getMessage());
            
            return response()->json([
                'error' => 'Error en la autenticación con Google',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}