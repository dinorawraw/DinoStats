const TwitchAPI = {
  clientId: 'ujqugm0jg9rfesg80w0g617zit55lr',
  clientSecret: 'tuoyv6mbk7fijc5q4maerbkerexdaf',
  authToken: null,

  async authenticate() {
    try {
      const response = await fetch('https://id.twitch.tv/oauth2/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          client_id: this.clientId,
          client_secret: this.clientSecret,
          grant_type: 'client_credentials'
        })
      });
      const data = await response.json();
      if (data?.access_token) {
        this.authToken = data.access_token;
        return true;
      }
      throw new Error('Falha ao obter token.');
    } catch (err) {
      console.error('Erro na autenticação:', err);
      throw err;
    }
  },

  async fetchStreams() {
    if (!this.authToken) {
      throw new Error('Token de autenticação indisponível.');
    }
    
    try {
      const headers = {
        'Client-ID': this.clientId,
        'Authorization': `Bearer ${this.authToken}`
      };
      const response = await fetch('https://api.twitch.tv/helix/streams?language=pt&first=100', { headers });
      if (!response.ok) throw new Error(`Erro: ${response.statusText}`);
      const data = await response.json();
      if (!data?.data) throw new Error('Resposta da API inválida.');
      return data.data;
    } catch (err) {
      console.error('Erro ao buscar streams:', err);
      throw err;
    }
  },

  async getStreamData() {
    try {
      await this.authenticate();
      return await this.fetchStreams();
    } catch (error) {
      throw error;
    }
  }
};
