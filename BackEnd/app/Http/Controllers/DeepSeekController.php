<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use App\Models\Pet;
use App\Models\Adoption;
use App\Models\Donation;
use App\Models\User;

class DeepSeekController extends Controller
{
    private $apiKey;
    private $apiUrl;

    public function __construct()
    {
        $this->apiKey = config('services.deepseek.api_key');
        $this->apiUrl = config('services.deepseek.api_url');
    }

    /**
     * Analizar el estado general del sistema
     */
    public function analyzeSystemHealth(): JsonResponse
    {
        try {
            $systemData = $this->collectSystemData();
            $analysis = $this->requestDeepSeekAnalysis($systemData, 'system_health');

            return response()->json([
                'status' => 'success',
                'analysis' => $analysis,
                'system_data' => $systemData,
                'timestamp' => now()
            ]);

        } catch (\Exception $e) {
            Log::error('DeepSeek Analysis Error: ' . $e->getMessage());
            
            return response()->json([
                'status' => 'error',
                'message' => 'Error al analizar el sistema',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Obtener recomendaciones para mejorar adopciones
     */
    public function getAdoptionRecommendations(): JsonResponse
    {
        try {
            $adoptionData = $this->collectAdoptionData();
            $recommendations = $this->requestDeepSeekAnalysis($adoptionData, 'adoption_optimization');

            return response()->json([
                'status' => 'success',
                'recommendations' => $recommendations,
                'data_analyzed' => $adoptionData,
                'timestamp' => now()
            ]);

        } catch (\Exception $e) {
            Log::error('DeepSeek Recommendations Error: ' . $e->getMessage());
            
            return response()->json([
                'status' => 'error',
                'message' => 'Error al generar recomendaciones',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Detectar anomalías en el sistema
     */
    public function detectAnomalies(): JsonResponse
    {
        try {
            $anomalyData = $this->collectAnomalyData();
            $anomalies = $this->requestDeepSeekAnalysis($anomalyData, 'anomaly_detection');

            return response()->json([
                'status' => 'success',
                'anomalies' => $anomalies,
                'data_checked' => $anomalyData,
                'timestamp' => now()
            ]);

        } catch (\Exception $e) {
            Log::error('DeepSeek Anomaly Detection Error: ' . $e->getMessage());
            
            return response()->json([
                'status' => 'error',
                'message' => 'Error al detectar anomalías',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Chat interactivo con el agente
     */
    public function chat(Request $request): JsonResponse
    {
        $request->validate([
            'message' => 'required|string|max:1000',
            'context' => 'nullable|string'
        ]);

        try {
            $systemContext = $this->collectSystemData();
            $chatResponse = $this->requestDeepSeekChat(
                $request->message, 
                $systemContext, 
                $request->context
            );

            return response()->json([
                'status' => 'success',
                'response' => $chatResponse,
                'timestamp' => now()
            ]);

        } catch (\Exception $e) {
            Log::error('DeepSeek Chat Error: ' . $e->getMessage());
            
            return response()->json([
                'status' => 'error',
                'message' => 'Error en el chat con el agente',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Recopilar datos del sistema
     */
    private function collectSystemData(): array
    {
        return [
            'pets' => [
                'total' => Pet::count(),
                'available' => Pet::where('status', 'disponible')->count(),
                'adopted' => Pet::where('status', 'adoptado')->count(),
                'in_process' => Pet::where('status', 'en_proceso')->count(),
                'by_species' => Pet::selectRaw('species, COUNT(*) as count')
                    ->groupBy('species')
                    ->get()
                    ->pluck('count', 'species')
                    ->toArray()
            ],
            'adoptions' => [
                'total' => Adoption::count(),
                'pending' => Adoption::where('status', 'pendiente')->count(),
                'approved' => Adoption::where('status', 'aprobada')->count(),
                'completed' => Adoption::where('status', 'completada')->count(),
                'rejected' => Adoption::where('status', 'rechazada')->count(),
                'recent_trend' => Adoption::where('created_at', '>=', now()->subDays(7))->count()
            ],
            'donations' => [
                'total' => Donation::count(),
                'total_amount' => Donation::where('status', 'completada')->sum('amount'),
                'recent_donations' => Donation::where('created_at', '>=', now()->subDays(7))->count(),
                'average_donation' => Donation::where('status', 'completada')->avg('amount')
            ],
            'users' => [
                'total' => User::count(),
                'recent_registrations' => User::where('created_at', '>=', now()->subDays(7))->count(),
                'google_users' => User::whereNotNull('google_id')->count()
            ],
            'system_metrics' => [
                'database_size' => $this->getDatabaseSize(),
                'last_activity' => $this->getLastActivity(),
                'error_rate' => $this->getErrorRate()
            ]
        ];
    }

    /**
     * Recopilar datos específicos de adopciones
     */
    private function collectAdoptionData(): array
    {
        return [
            'adoption_success_rate' => $this->calculateAdoptionSuccessRate(),
            'average_adoption_time' => $this->calculateAverageAdoptionTime(),
            'popular_pet_characteristics' => $this->getPopularPetCharacteristics(),
            'user_adoption_patterns' => $this->getUserAdoptionPatterns(),
            'seasonal_trends' => $this->getSeasonalTrends()
        ];
    }

    /**
     * Recopilar datos para detección de anomalías
     */
    private function collectAnomalyData(): array
    {
        return [
            'unusual_adoption_patterns' => $this->detectUnusualAdoptionPatterns(),
            'donation_anomalies' => $this->detectDonationAnomalies(),
            'user_behavior_anomalies' => $this->detectUserBehaviorAnomalies(),
            'system_performance_issues' => $this->detectPerformanceIssues()
        ];
    }

    /**
     * Realizar análisis inteligente (simulado por ahora)
     */
    private function requestDeepSeekAnalysis(array $data, string $analysisType): array
    {
        // Si hay API key configurada, intentar usar DeepSeek real
        if ($this->apiKey && $this->apiKey !== 'your_deepseek_api_key') {
            try {
                return $this->callRealDeepSeekAPI($data, $analysisType);
            } catch (\Exception $e) {
                Log::warning('DeepSeek API failed, using simulated analysis: ' . $e->getMessage());
            }
        }

        // Análisis simulado inteligente
        return $this->generateSimulatedAnalysis($data, $analysisType);
    }

    /**
     * Llamada real a DeepSeek API
     */
    private function callRealDeepSeekAPI(array $data, string $analysisType): array
    {
        $prompt = $this->buildPrompt($data, $analysisType);

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $this->apiKey,
            'Content-Type' => 'application/json'
        ])->timeout(30)->post($this->apiUrl . '/chat/completions', [
            'model' => 'deepseek-chat',
            'messages' => [
                [
                    'role' => 'system',
                    'content' => 'Eres un agente inteligente especializado en análisis de sistemas de adopción de mascotas. Proporciona análisis detallados, recomendaciones prácticas y detecta problemas potenciales.'
                ],
                [
                    'role' => 'user',
                    'content' => $prompt
                ]
            ],
            'temperature' => 0.7,
            'max_tokens' => 1500
        ]);

        if ($response->failed()) {
            throw new \Exception('Error en la API de DeepSeek: ' . $response->body());
        }

        $result = $response->json();
        return [
            'analysis' => $result['choices'][0]['message']['content'] ?? 'No se pudo generar análisis',
            'usage' => $result['usage'] ?? null,
            'source' => 'deepseek_api'
        ];
    }

    /**
     * Generar análisis simulado inteligente
     */
    private function generateSimulatedAnalysis(array $data, string $analysisType): array
    {
        switch ($analysisType) {
            case 'system_health':
                return $this->generateHealthAnalysis($data);
            case 'adoption_optimization':
                return $this->generateAdoptionRecommendations($data);
            case 'anomaly_detection':
                return $this->generateAnomalyDetection($data);
            default:
                return [
                    'analysis' => 'Análisis general del sistema completado.',
                    'source' => 'simulated'
                ];
        }
    }

    /**
     * Generar análisis de salud del sistema
     */
    private function generateHealthAnalysis(array $data): array
    {
        $pets = $data['pets'] ?? [];
        $adoptions = $data['adoptions'] ?? [];
        $donations = $data['donations'] ?? [];
        $users = $data['users'] ?? [];

        $analysis = "🏥 **ANÁLISIS DE SALUD DEL SISTEMA ADOPTAFÁCIL**\n\n";
        
        // Estado general
        $totalPets = $pets['total'] ?? 0;
        $availablePets = $pets['available'] ?? 0;
        $adoptedPets = $pets['adopted'] ?? 0;
        
        if ($totalPets > 0) {
            $adoptionRate = round(($adoptedPets / $totalPets) * 100, 1);
            $availabilityRate = round(($availablePets / $totalPets) * 100, 1);
            
            $analysis .= "📊 **MÉTRICAS PRINCIPALES:**\n";
            $analysis .= "• Total de mascotas: {$totalPets}\n";
            $analysis .= "• Mascotas disponibles: {$availablePets} ({$availabilityRate}%)\n";
            $analysis .= "• Mascotas adoptadas: {$adoptedPets} ({$adoptionRate}%)\n";
            $analysis .= "• Tasa de adopción: {$adoptionRate}%\n\n";
            
            // Evaluación del estado
            if ($adoptionRate > 70) {
                $analysis .= "✅ **ESTADO: EXCELENTE**\n";
                $analysis .= "El sistema muestra una tasa de adopción muy alta. ¡Felicitaciones!\n\n";
            } elseif ($adoptionRate > 50) {
                $analysis .= "🟡 **ESTADO: BUENO**\n";
                $analysis .= "El sistema funciona bien, pero hay oportunidades de mejora.\n\n";
            } else {
                $analysis .= "🔴 **ESTADO: NECESITA ATENCIÓN**\n";
                $analysis .= "La tasa de adopción es baja. Se requieren acciones inmediatas.\n\n";
            }
        }

        // Análisis de adopciones
        $totalAdoptions = $adoptions['total'] ?? 0;
        $pendingAdoptions = $adoptions['pending'] ?? 0;
        
        $analysis .= "🐾 **ANÁLISIS DE ADOPCIONES:**\n";
        $analysis .= "• Total de solicitudes: {$totalAdoptions}\n";
        $analysis .= "• Solicitudes pendientes: {$pendingAdoptions}\n";
        
        if ($pendingAdoptions > 10) {
            $analysis .= "⚠️ ALERTA: Hay muchas solicitudes pendientes. Revisar proceso de aprobación.\n";
        }
        $analysis .= "\n";

        // Análisis de donaciones
        $totalDonations = $donations['total'] ?? 0;
        $totalAmount = $donations['total_amount'] ?? 0;
        
        $analysis .= "💰 **ANÁLISIS DE DONACIONES:**\n";
        $analysis .= "• Total de donaciones: {$totalDonations}\n";
        $analysis .= "• Monto total recaudado: $" . number_format($totalAmount, 2) . "\n";
        
        if ($totalAmount > 1000) {
            $analysis .= "✅ Excelente nivel de donaciones recibidas.\n";
        } else {
            $analysis .= "📈 Oportunidad de mejorar las campañas de donación.\n";
        }
        $analysis .= "\n";

        // Recomendaciones
        $analysis .= "💡 **RECOMENDACIONES:**\n";
        if ($availabilityRate < 30) {
            $analysis .= "• Agregar más mascotas al sistema\n";
        }
        if ($pendingAdoptions > 5) {
            $analysis .= "• Acelerar el proceso de revisión de adopciones\n";
        }
        if ($totalAmount < 500) {
            $analysis .= "• Implementar campañas de donación más efectivas\n";
        }
        $analysis .= "• Mantener actualizada la información de las mascotas\n";
        $analysis .= "• Promover el sistema en redes sociales\n";

        return [
            'analysis' => $analysis,
            'source' => 'simulated',
            'timestamp' => now()->toISOString()
        ];
    }

    /**
     * Generar recomendaciones de adopción
     */
    private function generateAdoptionRecommendations(array $data): array
    {
        $analysis = "💡 **RECOMENDACIONES PARA OPTIMIZAR ADOPCIONES**\n\n";
        
        $analysis .= "🎯 **ESTRATEGIAS DE MARKETING:**\n";
        $analysis .= "• Crear perfiles detallados de mascotas con fotos de alta calidad\n";
        $analysis .= "• Implementar historias emotivas de cada mascota\n";
        $analysis .= "• Usar redes sociales para promocionar adopciones\n";
        $analysis .= "• Organizar eventos de adopción los fines de semana\n\n";
        
        $analysis .= "🔧 **MEJORAS DEL PROCESO:**\n";
        $analysis .= "• Simplificar el formulario de adopción\n";
        $analysis .= "• Implementar un sistema de seguimiento post-adopción\n";
        $analysis .= "• Crear un programa de voluntarios\n";
        $analysis .= "• Ofrecer servicios de entrenamiento básico\n\n";
        
        $analysis .= "📱 **OPTIMIZACIONES TÉCNICAS:**\n";
        $analysis .= "• Mejorar la búsqueda y filtros de mascotas\n";
        $analysis .= "• Implementar notificaciones push\n";
        $analysis .= "• Crear una app móvil\n";
        $analysis .= "• Integrar chat en tiempo real\n\n";
        
        $analysis .= "🤝 **ALIANZAS ESTRATÉGICAS:**\n";
        $analysis .= "• Colaborar con veterinarias locales\n";
        $analysis .= "• Asociarse con tiendas de mascotas\n";
        $analysis .= "• Trabajar con influencers de mascotas\n";
        $analysis .= "• Crear programas corporativos de adopción\n";

        return [
            'analysis' => $analysis,
            'source' => 'simulated',
            'timestamp' => now()->toISOString()
        ];
    }

    /**
     * Generar detección de anomalías
     */
    private function generateAnomalyDetection(array $data): array
    {
        $analysis = "🔍 **DETECCIÓN DE ANOMALÍAS EN EL SISTEMA**\n\n";
        
        $anomaliesFound = false;
        
        // Verificar anomalías en adopciones
        $adoptions = $data['adoptions'] ?? [];
        $pending = $adoptions['pending'] ?? 0;
        $total = $adoptions['total'] ?? 0;
        
        if ($pending > ($total * 0.5) && $total > 0) {
            $analysis .= "⚠️ **ANOMALÍA DETECTADA - ADOPCIONES:**\n";
            $analysis .= "• Porcentaje inusualmente alto de adopciones pendientes\n";
            $analysis .= "• Posible cuello de botella en el proceso de aprobación\n\n";
            $anomaliesFound = true;
        }
        
        // Verificar anomalías en donaciones
        $donations = $data['donations'] ?? [];
        $recentDonations = $donations['recent_donations'] ?? 0;
        
        if ($recentDonations > 20) {
            $analysis .= "📈 **PATRÓN INUSUAL - DONACIONES:**\n";
            $analysis .= "• Pico inusual en donaciones recientes\n";
            $analysis .= "• Posible campaña viral o evento especial\n\n";
            $anomaliesFound = true;
        }
        
        // Verificar anomalías en usuarios
        $users = $data['users'] ?? [];
        $recentUsers = $users['recent_registrations'] ?? 0;
        
        if ($recentUsers > 50) {
            $analysis .= "👥 **PATRÓN INUSUAL - USUARIOS:**\n";
            $analysis .= "• Incremento significativo en registros recientes\n";
            $analysis .= "• Posible efecto de marketing o viralización\n\n";
            $anomaliesFound = true;
        }
        
        if (!$anomaliesFound) {
            $analysis .= "✅ **SISTEMA ESTABLE:**\n";
            $analysis .= "• No se detectaron anomalías significativas\n";
            $analysis .= "• Todos los patrones están dentro de rangos normales\n";
            $analysis .= "• El sistema opera de manera consistente\n\n";
        }
        
        $analysis .= "🔧 **RECOMENDACIONES DE MONITOREO:**\n";
        $analysis .= "• Configurar alertas automáticas para cambios bruscos\n";
        $analysis .= "• Implementar dashboard de métricas en tiempo real\n";
        $analysis .= "• Revisar logs del sistema regularmente\n";
        $analysis .= "• Establecer umbrales de alerta personalizados\n";

        return [
            'analysis' => $analysis,
            'source' => 'simulated',
            'timestamp' => now()->toISOString()
        ];
    }

    /**
     * Chat interactivo con DeepSeek
     */
    private function requestDeepSeekChat(string $message, array $systemContext, ?string $context = null): array
    {
        // Si hay API key configurada, intentar usar DeepSeek real
        if ($this->apiKey && $this->apiKey !== 'your_deepseek_api_key') {
            try {
                return $this->callRealDeepSeekChat($message, $systemContext, $context);
            } catch (\Exception $e) {
                Log::warning('DeepSeek Chat API failed, using simulated response: ' . $e->getMessage());
            }
        }

        // Chat simulado inteligente
        return $this->generateSimulatedChatResponse($message, $systemContext);
    }

    /**
     * Chat real con DeepSeek API
     */
    private function callRealDeepSeekChat(string $message, array $systemContext, ?string $context = null): array
    {
        $systemPrompt = "Eres un asistente inteligente para el sistema AdoptaFácil. Tienes acceso a los siguientes datos del sistema: " . json_encode($systemContext, JSON_PRETTY_PRINT);
        
        if ($context) {
            $systemPrompt .= "\n\nContexto adicional: " . $context;
        }

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $this->apiKey,
            'Content-Type' => 'application/json'
        ])->timeout(30)->post($this->apiUrl . '/chat/completions', [
            'model' => 'deepseek-chat',
            'messages' => [
                [
                    'role' => 'system',
                    'content' => $systemPrompt
                ],
                [
                    'role' => 'user',
                    'content' => $message
                ]
            ],
            'temperature' => 0.8,
            'max_tokens' => 1000
        ]);

        if ($response->failed()) {
            throw new \Exception('Error en la API de DeepSeek: ' . $response->body());
        }

        $result = $response->json();
        return [
            'response' => $result['choices'][0]['message']['content'] ?? 'No se pudo generar respuesta',
            'usage' => $result['usage'] ?? null,
            'source' => 'deepseek_api'
        ];
    }

    /**
     * Generar respuesta de chat simulada
     */
    private function generateSimulatedChatResponse(string $message, array $systemContext): array
    {
        $message = strtolower($message);
        $pets = $systemContext['pets'] ?? [];
        $adoptions = $systemContext['adoptions'] ?? [];
        $donations = $systemContext['donations'] ?? [];
        $users = $systemContext['users'] ?? [];

        // Respuestas basadas en palabras clave
        if (strpos($message, 'hola') !== false || strpos($message, 'hi') !== false) {
            $response = "¡Hola! Soy tu agente inteligente de AdoptaFácil. Puedo ayudarte con:\n\n" .
                       "• Análisis del estado del sistema\n" .
                       "• Estadísticas de adopciones y donaciones\n" .
                       "• Recomendaciones para mejorar el sistema\n" .
                       "• Detección de problemas o anomalías\n\n" .
                       "¿En qué puedo ayudarte hoy?";
        }
        elseif (strpos($message, 'mascota') !== false || strpos($message, 'pet') !== false) {
            $total = $pets['total'] ?? 0;
            $available = $pets['available'] ?? 0;
            $adopted = $pets['adopted'] ?? 0;
            
            $response = "📊 **Estado actual de mascotas:**\n\n" .
                       "• Total de mascotas: {$total}\n" .
                       "• Disponibles para adopción: {$available}\n" .
                       "• Ya adoptadas: {$adopted}\n\n";
            
            if ($available > 0) {
                $response .= "¡Tenemos {$available} mascotas esperando un hogar! 🐾";
            } else {
                $response .= "⚠️ No hay mascotas disponibles actualmente. Considera agregar más al sistema.";
            }
        }
        elseif (strpos($message, 'adopcion') !== false || strpos($message, 'adoption') !== false) {
            $total = $adoptions['total'] ?? 0;
            $pending = $adoptions['pending'] ?? 0;
            $approved = $adoptions['approved'] ?? 0;
            
            $response = "🏠 **Estado de adopciones:**\n\n" .
                       "• Total de solicitudes: {$total}\n" .
                       "• Pendientes de revisión: {$pending}\n" .
                       "• Aprobadas: {$approved}\n\n";
            
            if ($pending > 5) {
                $response .= "⚠️ Hay {$pending} solicitudes pendientes. Te recomiendo revisarlas pronto.";
            } else {
                $response .= "✅ El proceso de adopciones está funcionando bien.";
            }
        }
        elseif (strpos($message, 'donacion') !== false || strpos($message, 'donation') !== false) {
            $total = $donations['total'] ?? 0;
            $amount = $donations['total_amount'] ?? 0;
            
            $response = "💰 **Estado de donaciones:**\n\n" .
                       "• Total de donaciones: {$total}\n" .
                       "• Monto recaudado: $" . number_format($amount, 2) . "\n\n";
            
            if ($amount > 1000) {
                $response .= "🎉 ¡Excelente! Las donaciones están yendo muy bien.";
            } else {
                $response .= "📈 Considera implementar campañas para aumentar las donaciones.";
            }
        }
        elseif (strpos($message, 'usuario') !== false || strpos($message, 'user') !== false) {
            $total = $users['total'] ?? 0;
            $recent = $users['recent_registrations'] ?? 0;
            
            $response = "👥 **Estado de usuarios:**\n\n" .
                       "• Total de usuarios: {$total}\n" .
                       "• Registros recientes: {$recent}\n\n";
            
            if ($recent > 10) {
                $response .= "📈 ¡Genial! Hay mucha actividad de nuevos usuarios.";
            } else {
                $response .= "💡 Considera estrategias de marketing para atraer más usuarios.";
            }
        }
        elseif (strpos($message, 'problema') !== false || strpos($message, 'error') !== false) {
            $response = "🔍 **Análisis de problemas potenciales:**\n\n";
            
            $issues = [];
            if (($pets['available'] ?? 0) == 0) {
                $issues[] = "• No hay mascotas disponibles";
            }
            if (($adoptions['pending'] ?? 0) > 10) {
                $issues[] = "• Muchas adopciones pendientes";
            }
            if (($donations['total_amount'] ?? 0) < 100) {
                $issues[] = "• Pocas donaciones recibidas";
            }
            
            if (empty($issues)) {
                $response .= "✅ No se detectaron problemas críticos en el sistema.";
            } else {
                $response .= "⚠️ Problemas detectados:\n" . implode("\n", $issues);
            }
        }
        elseif (strpos($message, 'recomendacion') !== false || strpos($message, 'consejo') !== false) {
            $response = "💡 **Recomendaciones principales:**\n\n" .
                       "• Mantén actualizada la información de las mascotas\n" .
                       "• Responde rápidamente a las solicitudes de adopción\n" .
                       "• Promociona el sistema en redes sociales\n" .
                       "• Organiza eventos de adopción regularmente\n" .
                       "• Implementa campañas de donación creativas\n\n" .
                       "¿Te gustaría que profundice en alguna de estas áreas?";
        }
        else {
            $response = "Entiendo tu consulta sobre: \"{$message}\"\n\n" .
                       "Como agente inteligente de AdoptaFácil, puedo ayudarte con:\n\n" .
                       "• Estadísticas del sistema (mascotas, adopciones, donaciones)\n" .
                       "• Análisis de rendimiento\n" .
                       "• Detección de problemas\n" .
                       "• Recomendaciones de mejora\n\n" .
                       "¿Podrías ser más específico sobre qué información necesitas?";
        }

        return [
            'response' => $response,
            'source' => 'simulated',
            'timestamp' => now()->toISOString()
        ];
    }

    /**
     * Construir prompt específico según el tipo de análisis
     */
    private function buildPrompt(array $data, string $analysisType): string
    {
        $baseData = "Datos del sistema AdoptaFácil:\n" . json_encode($data, JSON_PRETTY_PRINT) . "\n\n";

        switch ($analysisType) {
            case 'system_health':
                return $baseData . "Analiza la salud general del sistema. Identifica métricas clave, posibles problemas y recomendaciones para mejorar el rendimiento y la experiencia del usuario.";
                
            case 'adoption_optimization':
                return $baseData . "Analiza los datos de adopción y proporciona recomendaciones específicas para aumentar la tasa de adopción exitosa. Incluye estrategias de marketing, mejoras en el proceso y optimizaciones de la plataforma.";
                
            case 'anomaly_detection':
                return $baseData . "Detecta patrones anómalos o irregularidades en los datos que podrían indicar problemas, fraude o oportunidades de mejora. Proporciona alertas y recomendaciones de acción.";
                
            default:
                return $baseData . "Proporciona un análisis general de los datos del sistema.";
        }
    }

    // Métodos auxiliares para cálculos específicos
    private function calculateAdoptionSuccessRate(): float
    {
        $total = Adoption::count();
        $successful = Adoption::where('status', 'completada')->count();
        return $total > 0 ? ($successful / $total) * 100 : 0;
    }

    private function calculateAverageAdoptionTime(): float
    {
        return Adoption::whereNotNull('completed_at')
            ->selectRaw('AVG(DATEDIFF(completed_at, created_at)) as avg_days')
            ->value('avg_days') ?? 0;
    }

    private function getPopularPetCharacteristics(): array
    {
        return Pet::where('status', 'adoptado')
            ->selectRaw('species, breed, size, COUNT(*) as adopted_count')
            ->groupBy('species', 'breed', 'size')
            ->orderBy('adopted_count', 'desc')
            ->limit(10)
            ->get()
            ->toArray();
    }

    private function getUserAdoptionPatterns(): array
    {
        return User::withCount('adoptions')
            ->having('adoptions_count', '>', 0)
            ->orderBy('adoptions_count', 'desc')
            ->limit(10)
            ->get(['id', 'name', 'created_at'])
            ->toArray();
    }

    private function getSeasonalTrends(): array
    {
        return Adoption::selectRaw('MONTH(created_at) as month, COUNT(*) as count')
            ->whereYear('created_at', date('Y'))
            ->groupBy('month')
            ->orderBy('month')
            ->get()
            ->pluck('count', 'month')
            ->toArray();
    }

    private function detectUnusualAdoptionPatterns(): array
    {
        // Detectar picos inusuales en adopciones
        $dailyAdoptions = Adoption::selectRaw('DATE(created_at) as date, COUNT(*) as count')
            ->where('created_at', '>=', now()->subDays(30))
            ->groupBy('date')
            ->get();

        $average = $dailyAdoptions->avg('count');
        $threshold = $average * 2; // 200% del promedio

        return $dailyAdoptions->where('count', '>', $threshold)->toArray();
    }

    private function detectDonationAnomalies(): array
    {
        // Detectar donaciones inusualmente grandes
        $averageDonation = Donation::avg('amount');
        $threshold = $averageDonation * 5; // 500% del promedio

        return Donation::where('amount', '>', $threshold)
            ->where('created_at', '>=', now()->subDays(30))
            ->get(['id', 'amount', 'created_at'])
            ->toArray();
    }

    private function detectUserBehaviorAnomalies(): array
    {
        // Detectar usuarios con comportamiento inusual
        return User::withCount(['adoptions', 'donations'])
            ->having('adoptions_count', '>', 5)
            ->orHaving('donations_count', '>', 10)
            ->get(['id', 'name', 'created_at'])
            ->toArray();
    }

    private function detectPerformanceIssues(): array
    {
        // Simular detección de problemas de rendimiento
        return [
            'slow_queries' => rand(0, 5),
            'high_memory_usage' => rand(60, 90),
            'response_time_ms' => rand(200, 1000)
        ];
    }

    private function getDatabaseSize(): string
    {
        // Simular tamaño de base de datos
        return number_format(rand(10, 100), 2) . ' MB';
    }

    private function getLastActivity(): string
    {
        $lastUser = User::latest('created_at')->first();
        return $lastUser ? $lastUser->created_at->diffForHumans() : 'No hay actividad reciente';
    }

    private function getErrorRate(): float
    {
        // Simular tasa de error
        return rand(0, 5) / 100;
    }
}