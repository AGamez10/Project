const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

class ApiService {
  constructor() {
    this.baseURL = API_URL;
    this.token = localStorage.getItem('auth_token');
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutos
  }

  // Cache simple para reducir llamadas repetidas
  getCacheKey(endpoint, params = {}) {
    return `${endpoint}_${JSON.stringify(params)}`;
  }

  setCache(key, data) {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  getCache(key) {
    const cached = this.cache.get(key);
    if (cached && (Date.now() - cached.timestamp) < this.cacheTimeout) {
      return cached.data;
    }
    this.cache.delete(key);
    return null;
  }

  clearCache() {
    this.cache.clear();
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem('auth_token', token);
  }

  removeToken() {
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const method = options.method || 'GET';
    
    // Verificar cache para operaciones GET
    if (method === 'GET') {
      const cacheKey = this.getCacheKey(endpoint, options.params);
      const cachedData = this.getCache(cacheKey);
      if (cachedData) {
        return cachedData;
      }
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    if (this.token) {
      config.headers.Authorization = `Bearer ${this.token}`;
    }

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error en la petición');
      }

      // Guardar en cache solo para operaciones GET exitosas
      if (method === 'GET') {
        const cacheKey = this.getCacheKey(endpoint, options.params);
        this.setCache(cacheKey, data);
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Métodos de autenticación
  async login(credentials) {
    const data = await this.request('/login', {
      method: 'POST',
      body: credentials,
    });
    this.setToken(data.token);
    return data;
  }

  async register(userData) {
    const data = await this.request('/register', {
      method: 'POST',
      body: userData,
    });
    this.setToken(data.token);
    return data;
  }

  async logout() {
    await this.request('/logout', { method: 'POST' });
    this.removeToken();
  }

  async getUser() {
    return this.request('/user');
  }

  // Métodos de mascotas
  async getPets(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/pets${queryString ? `?${queryString}` : ''}`);
  }

  async getPet(id) {
    return this.request(`/pets/${id}`);
  }

  async createPet(petData) {
    return this.request('/pets', {
      method: 'POST',
      body: petData,
    });
  }

  async updatePet(id, petData) {
    return this.request(`/pets/${id}`, {
      method: 'PUT',
      body: petData,
    });
  }

  async deletePet(id) {
    return this.request(`/pets/${id}`, {
      method: 'DELETE',
    });
  }

  async getPetsStats() {
    return this.request('/pets-stats');
  }

  // Métodos de adopciones
  async getAdoptions(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/adoptions${queryString ? `?${queryString}` : ''}`);
  }

  async getAdoption(id) {
    return this.request(`/adoptions/${id}`);
  }

  async createAdoption(adoptionData) {
    return this.request('/adoptions', {
      method: 'POST',
      body: adoptionData,
    });
  }

  async updateAdoption(id, adoptionData) {
    return this.request(`/adoptions/${id}`, {
      method: 'PUT',
      body: adoptionData,
    });
  }

  async deleteAdoption(id) {
    return this.request(`/adoptions/${id}`, {
      method: 'DELETE',
    });
  }

  async getAdoptionsStats() {
    return this.request('/adoptions-stats');
  }

  // Métodos de donaciones
  async getDonations(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/donations${queryString ? `?${queryString}` : ''}`);
  }

  async createDonation(donationData) {
    return this.request('/donations', {
      method: 'POST',
      body: donationData,
    });
  }

  async getDonationsStats() {
    return this.request('/donations-stats');
  }
}

export default new ApiService();