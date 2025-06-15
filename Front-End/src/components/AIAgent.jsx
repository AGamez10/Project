import { useState, useEffect, useCallback, useMemo } from 'react';
import deepseekService from '../services/deepseekService';

const AIAgent = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [analysisData, setAnalysisData] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  // Cargar análisis inicial
  useEffect(() => {
    loadCompleteAnalysis();
  }, []);

  const loadCompleteAnalysis = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const analysis = await deepseekService.getCompleteAnalysis();
      setAnalysisData(analysis);
    } catch (err) {
      setError('Error al cargar el análisis del sistema');
      console.error('Error loading analysis:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleChatSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!chatInput.trim() || chatLoading) return;

    const userMessage = chatInput.trim();
    setChatInput('');
    setChatLoading(true);

    // Agregar mensaje del usuario
    setChatMessages(prev => [...prev, {
      type: 'user',
      content: userMessage,
      timestamp: new Date()
    }]);

    try {
      const response = await deepseekService.chat(userMessage, 'dashboard_context');
      const agentResponse = deepseekService.formatAgentResponse(response);

      // Agregar respuesta del agente
      setChatMessages(prev => [...prev, {
        type: 'agent',
        content: agentResponse,
        timestamp: new Date()
      }]);
    } catch (err) {
      setChatMessages(prev => [...prev, {
        type: 'error',
        content: 'Error al comunicarse con el agente. Intenta de nuevo.',
        timestamp: new Date()
      }]);
    } finally {
      setChatLoading(false);
    }
  }, [chatInput, chatLoading]);

  const executiveSummary = useMemo(() => {
    if (!analysisData) return null;
    return deepseekService.generateExecutiveSummary(analysisData);
  }, [analysisData]);

  const refreshAnalysis = useCallback(async (type) => {
    try {
      setLoading(true);
      let newData;

      switch (type) {
        case 'health':
          newData = await deepseekService.analyzeSystemHealth();
          setAnalysisData(prev => ({ ...prev, health: newData }));
          break;
        case 'recommendations':
          newData = await deepseekService.getAdoptionRecommendations();
          setAnalysisData(prev => ({ ...prev, recommendations: newData }));
          break;
        case 'anomalies':
          newData = await deepseekService.detectAnomalies();
          setAnalysisData(prev => ({ ...prev, anomalies: newData }));
          break;
        default:
          await loadCompleteAnalysis();
      }
    } catch (err) {
      setError(`Error al actualizar ${type}`);
    } finally {
      setLoading(false);
    }
  }, [loadCompleteAnalysis]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3">
              🤖
            </div>
            <div>
              <h2 className="text-xl font-bold">Agente Inteligente DeepSeek</h2>
              <p className="text-purple-100">Monitor y optimizador del sistema</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${
              loading ? 'bg-yellow-400 animate-pulse' : 'bg-green-400'
            }`}></div>
            <span className="text-sm">
              {loading ? 'Analizando...' : 'En línea'}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8 px-6">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: '📊' },
            { id: 'health', label: 'Salud del Sistema', icon: '🏥' },
            { id: 'recommendations', label: 'Recomendaciones', icon: '💡' },
            { id: 'anomalies', label: 'Anomalías', icon: '⚠️' },
            { id: 'chat', label: 'Chat IA', icon: '💬' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="p-6">
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
            <button 
              onClick={() => loadCompleteAnalysis()}
              className="ml-4 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Reintentar
            </button>
          </div>
        )}

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Resumen Ejecutivo
              </h3>
              <button
                onClick={() => refreshAnalysis('all')}
                disabled={loading}
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
              >
                {loading ? 'Actualizando...' : 'Actualizar'}
              </button>
            </div>

            {executiveSummary && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200">Mascotas Totales</h4>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-300">
                    {executiveSummary.metrics.totalPets}
                  </p>
                </div>
                <div className="bg-green-50 dark:bg-green-900 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 dark:text-green-200">Disponibles</h4>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-300">
                    {executiveSummary.metrics.availablePets}
                  </p>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-900 p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 dark:text-yellow-200">Adopciones</h4>
                  <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-300">
                    {executiveSummary.metrics.totalAdoptions}
                  </p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-800 dark:text-purple-200">Usuarios</h4>
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-300">
                    {executiveSummary.metrics.totalUsers}
                  </p>
                </div>
              </div>
            )}

            {executiveSummary?.criticalIssues.length > 0 && (
              <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">
                  ⚠️ Problemas Críticos Detectados
                </h4>
                <ul className="list-disc list-inside text-red-700 dark:text-red-300">
                  {executiveSummary.criticalIssues.map((issue, index) => (
                    <li key={index}>{issue}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Health Tab */}
        {activeTab === 'health' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Análisis de Salud del Sistema
              </h3>
              <button
                onClick={() => refreshAnalysis('health')}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              >
                Actualizar
              </button>
            </div>

            {analysisData?.health && (
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  <div className="whitespace-pre-wrap text-sm text-gray-800 dark:text-gray-200 leading-relaxed">
                    {deepseekService.formatAgentResponse(analysisData.health)}
                  </div>
                </div>
                {analysisData.health.source && (
                  <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                    Fuente: {analysisData.health.source === 'simulated' ? 'Análisis Simulado' : 'DeepSeek AI'}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Recommendations Tab */}
        {activeTab === 'recommendations' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Recomendaciones de Optimización
              </h3>
              <button
                onClick={() => refreshAnalysis('recommendations')}
                disabled={loading}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
              >
                Actualizar
              </button>
            </div>

            {analysisData?.recommendations && (
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  <div className="whitespace-pre-wrap text-sm text-gray-800 dark:text-gray-200 leading-relaxed">
                    {deepseekService.formatAgentResponse(analysisData.recommendations)}
                  </div>
                </div>
                {analysisData.recommendations.source && (
                  <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                    Fuente: {analysisData.recommendations.source === 'simulated' ? 'Análisis Simulado' : 'DeepSeek AI'}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Anomalies Tab */}
        {activeTab === 'anomalies' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Detección de Anomalías
              </h3>
              <button
                onClick={() => refreshAnalysis('anomalies')}
                disabled={loading}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
              >
                Actualizar
              </button>
            </div>

            {analysisData?.anomalies && (
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  <div className="whitespace-pre-wrap text-sm text-gray-800 dark:text-gray-200 leading-relaxed">
                    {deepseekService.formatAgentResponse(analysisData.anomalies)}
                  </div>
                </div>
                {analysisData.anomalies.source && (
                  <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                    Fuente: {analysisData.anomalies.source === 'simulated' ? 'Análisis Simulado' : 'DeepSeek AI'}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Chat Tab */}
        {activeTab === 'chat' && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">
              Chat con Agente Inteligente
            </h3>

            {/* Chat Messages */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 h-96 overflow-y-auto mb-4">
              {chatMessages.length === 0 ? (
                <div className="text-center text-gray-500 dark:text-gray-400 mt-20">
                  <div className="text-4xl mb-4">🤖</div>
                  <p>¡Hola! Soy tu agente inteligente.</p>
                  <p>Pregúntame sobre el estado del sistema, adopciones, o cualquier cosa relacionada con AdoptaFácil.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {chatMessages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.type === 'user'
                            ? 'bg-purple-600 text-white'
                            : message.type === 'error'
                            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                            : 'bg-white dark:bg-gray-600 text-gray-800 dark:text-gray-200'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                  {chatLoading && (
                    <div className="flex justify-start">
                      <div className="bg-white dark:bg-gray-600 px-4 py-2 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <div className="animate-bounce w-2 h-2 bg-gray-400 rounded-full"></div>
                          <div className="animate-bounce w-2 h-2 bg-gray-400 rounded-full" style={{animationDelay: '0.1s'}}></div>
                          <div className="animate-bounce w-2 h-2 bg-gray-400 rounded-full" style={{animationDelay: '0.2s'}}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleChatSubmit} className="flex space-x-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Escribe tu pregunta aquí..."
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                disabled={chatLoading}
              />
              <button
                type="submit"
                disabled={chatLoading || !chatInput.trim()}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {chatLoading ? '...' : 'Enviar'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIAgent;