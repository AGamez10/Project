import apiService from './api';

/**
 * Servicio para interactuar con el agente inteligente DeepSeek
 */
class DeepSeekService {
  constructor() {
    this.baseEndpoint = '/ai-agent';
  }

  /**
   * Analizar la salud del sistema
   */
  async analyzeSystemHealth() {
    try {
      const response = await apiService.request(`${this.baseEndpoint}/system-health`);
      return response;
    } catch (error) {
      console.error('Error analyzing system health:', error);
      throw error;
    }
  }

  /**
   * Obtener recomendaciones para adopciones
   */
  async getAdoptionRecommendations() {
    try {
      const response = await apiService.request(`${this.baseEndpoint}/adoption-recommendations`);
      return response;
    } catch (error) {
      console.error('Error getting adoption recommendations:', error);
      throw error;
    }
  }

  /**
   * Detectar anomalías en el sistema
   */
  async detectAnomalies() {
    try {
      const response = await apiService.request(`${this.baseEndpoint}/detect-anomalies`);
      return response;
    } catch (error) {
      console.error('Error detecting anomalies:', error);
      throw error;
    }
  }

  /**
   * Chat con el agente inteligente
   */
  async chat(message, context = null) {
    try {
      const response = await apiService.request(`${this.baseEndpoint}/chat`, {
        method: 'POST',
        body: {
          message,
          context
        }
      });
      return response;
    } catch (error) {
      console.error('Error in AI chat:', error);
      throw error;
    }
  }

  /**
   * Obtener análisis completo del sistema
   */
  async getCompleteAnalysis() {
    try {
      const [healthAnalysis, recommendations, anomalies] = await Promise.allSettled([
        this.analyzeSystemHealth(),
        this.getAdoptionRecommendations(),
        this.detectAnomalies()
      ]);

      return {
        health: healthAnalysis.status === 'fulfilled' ? healthAnalysis.value : null,
        recommendations: recommendations.status === 'fulfilled' ? recommendations.value : null,
        anomalies: anomalies.status === 'fulfilled' ? anomalies.value : null,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error getting complete analysis:', error);
      throw error;
    }
  }

  /**
   * Formatear respuesta del agente para mostrar en UI
   */
  formatAgentResponse(response) {
    if (typeof response === 'string') {
      return response;
    }

    if (response.analysis) {
      return response.analysis;
    }

    if (response.response) {
      return response.response;
    }

    if (response.recommendations) {
      return response.recommendations;
    }

    return JSON.stringify(response, null, 2);
  }

  /**
   * Generar resumen ejecutivo
   */
  generateExecutiveSummary(analysisData) {
    const summary = {
      status: 'healthy',
      criticalIssues: [],
      recommendations: [],
      metrics: {}
    };

    // Analizar datos de salud del sistema
    if (analysisData.health?.system_data) {
      const systemData = analysisData.health.system_data;
      
      summary.metrics = {
        totalPets: systemData.pets?.total || 0,
        availablePets: systemData.pets?.available || 0,
        totalAdoptions: systemData.adoptions?.total || 0,
        pendingAdoptions: systemData.adoptions?.pending || 0,
        totalDonations: systemData.donations?.total || 0,
        totalUsers: systemData.users?.total || 0
      };

      // Detectar problemas críticos
      if (systemData.pets?.available === 0) {
        summary.criticalIssues.push('No hay mascotas disponibles para adopción');
        summary.status = 'warning';
      }

      if (systemData.adoptions?.pending > systemData.adoptions?.approved) {
        summary.criticalIssues.push('Hay más adopciones pendientes que aprobadas');
        summary.status = 'warning';
      }
    }

    // Analizar anomalías
    if (analysisData.anomalies?.anomalies) {
      const anomalies = analysisData.anomalies.anomalies;
      if (typeof anomalies === 'string' && anomalies.includes('anomalía')) {
        summary.criticalIssues.push('Se detectaron anomalías en el sistema');
        summary.status = 'critical';
      }
    }

    return summary;
  }
}

export default new DeepSeekService();