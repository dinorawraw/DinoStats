const MetricsService = {
  // Métricas de performance
  performanceMetrics: {
    loadTime: 0,
    apiResponseTime: 0,
    renderTime: 0,
    memoryUsage: 0,
    frameRate: 0
  },

  // Métricas de dados
  dataMetrics: {
    totalStreams: 0,
    totalViewers: 0,
    averageViewers: 0,
    topCategories: [],
    streamerDistribution: {}
  },

  // Métricas de qualidade
  qualityMetrics: {
    errorRate: 0,
    successRate: 0,
    retryCount: 0
  },

  // Inicializa as métricas
  initialize() {
    this.startTime = performance.now();
    this.performanceMetrics = {
      loadTime: 0,
      apiResponseTime: 0,
      renderTime: 0,
      memoryUsage: 0,
      frameRate: 0
    };
    this.dataMetrics = {
      totalStreams: 0,
      totalViewers: 0,
      averageViewers: 0,
      topCategories: [],
      streamerDistribution: {}
    };
    this.qualityMetrics = {
      errorRate: 0,
      successRate: 0,
      retryCount: 0
    };
  },

  // Atualiza métricas de performance
  updatePerformanceMetrics() {
    const endTime = performance.now();
    this.performanceMetrics.loadTime = endTime - this.startTime;
    
    // Monitora uso de memória
    if (performance.memory) {
      this.performanceMetrics.memoryUsage = performance.memory.usedJSHeapSize / 1024 / 1024; // MB
    }

    // Monitora FPS
    this.performanceMetrics.frameRate = this.calculateFrameRate();
  },

  // Calcula FPS
  calculateFrameRate() {
    let lastTime = performance.now();
    let frames = 0;
    let fps = 0;

    const measureFPS = () => {
      frames++;
      const currentTime = performance.now();
      if (currentTime - lastTime >= 1000) {
        fps = Math.round((frames * 1000) / (currentTime - lastTime));
        frames = 0;
        lastTime = currentTime;
      }
      requestAnimationFrame(measureFPS);
    };

    requestAnimationFrame(measureFPS);
    return fps;
  },

  // Atualiza métricas de dados
  updateDataMetrics(streams) {
    this.dataMetrics.totalStreams = streams.length;
    this.dataMetrics.totalViewers = streams.reduce((acc, stream) => acc + stream.viewer_count, 0);
    this.dataMetrics.averageViewers = this.dataMetrics.totalViewers / this.dataMetrics.totalStreams;

    // Processa categorias
    const categories = {};
    streams.forEach(stream => {
      if (!categories[stream.game_name]) {
        categories[stream.game_name] = {
          viewers: 0,
          streamers: 0
        };
      }
      categories[stream.game_name].viewers += stream.viewer_count;
      categories[stream.game_name].streamers += 1;
    });

    // Ordena categorias por viewers
    this.dataMetrics.topCategories = Object.entries(categories)
      .map(([name, data]) => ({
        name,
        ...data
      }))
      .sort((a, b) => b.viewers - a.viewers)
      .slice(0, 10);

    // Distribuição de streamers
    this.dataMetrics.streamerDistribution = categories;
  },

  // Atualiza métricas de qualidade
  updateQualityMetrics(success, error) {
    if (success) {
      this.qualityMetrics.successRate++;
    }
    if (error) {
      this.qualityMetrics.errorRate++;
      this.qualityMetrics.retryCount++;
    }
  },

  // Gera relatório de métricas
  generateReport() {
    return {
      performance: this.performanceMetrics,
      data: this.dataMetrics,
      quality: this.qualityMetrics,
      timestamp: new Date().toISOString()
    };
  },

  // Exporta métricas para análise
  exportMetrics() {
    const report = this.generateReport();
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `metrics-report-${new Date().toISOString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }
};

// Torna o serviço disponível globalmente
window.MetricsService = MetricsService; 