const MetricsService = {
  // Métricas de dados
  dataMetrics: {
    totalStreams: 0,
    totalViewers: 0,
    averageViewers: 0,
    activeStreams: 0,
    topCategories: [],
    streamerDistribution: {}
  },

  // Inicializa as métricas
  initialize() {
    this.dataMetrics = {
      totalStreams: 0,
      totalViewers: 0,
      averageViewers: 0,
      activeStreams: 0,
      topCategories: [],
      streamerDistribution: {}
    };
  },

  // Atualiza métricas de dados
  updateDataMetrics(streams) {
    // Métricas básicas
    this.dataMetrics.totalStreams = streams.length;
    this.dataMetrics.totalViewers = streams.reduce((acc, stream) => acc + stream.viewer_count, 0);
    this.dataMetrics.averageViewers = this.dataMetrics.totalViewers / this.dataMetrics.totalStreams;
    this.dataMetrics.activeStreams = streams.filter(s => s.is_live).length;

    // Processa categorias
    const categories = {};
    streams.forEach(stream => {
      if (!categories[stream.game_name]) {
        categories[stream.game_name] = {
          name: stream.game_name,
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

  // Gera relatório de métricas
  generateReport() {
    return {
      data: this.dataMetrics,
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
    a.download = `stream-metrics-${new Date().toISOString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }
};

// Torna o serviço disponível globalmente
window.MetricsService = MetricsService; 