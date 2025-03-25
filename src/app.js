// app.js atualizado
const { createApp, ref, onMounted } = Vue;

const app = createApp({
  setup() {
    const loading = ref(true);
    const error = ref('');
    const streamsData = ref([]);
    const quickStats = ref([]);
    const highViewsLowStreamersChart = ref(null);
    const metrics = ref(null);
    
    // Processa os dados da API
    const processData = (streams) => {
      // Inicializa métricas
      MetricsService.initialize();
      
      // Atualiza métricas de dados
      MetricsService.updateDataMetrics(streams);
      
      // Calcula estatísticas rápidas
      quickStats.value = Helpers.calculateQuickStats(streams);
      
      // Processa categorias
      const categories = {};
      streams.forEach(stream => {
        const gameId = stream.game_id;
        if (!categories[gameId]) {
          categories[gameId] = {
            name: stream.game_name,
            viewers: 0,
            streamers: 0
          };
        }
        categories[gameId].viewers += stream.viewer_count;
        categories[gameId].streamers += 1;
      });
      
      // Inicializa gráficos
      if (highViewsLowStreamersChart.value) {
        const chartData = Helpers.processHighViewsLowStreamers(categories);
        ChartService.createBarChart(
          highViewsLowStreamersChart.value.getContext('2d'),
          chartData.labels,
          chartData.datasets
        );
      }
      
      // Atualiza métricas de performance após renderização
      MetricsService.updatePerformanceMetrics();
      
      // Atualiza métricas de qualidade
      MetricsService.updateQualityMetrics(true, false);
      
      // Atualiza referência das métricas
      metrics.value = MetricsService.generateReport();
    };
    
    // Inicialização
    onMounted(async () => {
      try {
        const startTime = performance.now();
        streamsData.value = await TwitchAPI.getStreamData();
        
        // Registra tempo de resposta da API
        MetricsService.performanceMetrics.apiResponseTime = performance.now() - startTime;
        
        processData(streamsData.value);
        loading.value = false;
      } catch (err) {
        error.value = 'Erro ao carregar dados da Twitch.';
        loading.value = false;
        console.error(err);
        MetricsService.updateQualityMetrics(false, true);
      }
    });
    
    // Função para exportar métricas
    const exportMetrics = () => {
      MetricsService.exportMetrics();
    };
    
    return {
      loading,
      error,
      quickStats,
      highViewsLowStreamersChart,
      metrics,
      exportMetrics
    };
  }
});

// Registra componentes
app.component('nav-bar', NavBar);
app.component('stats-card', StatsCard);
app.component('chart-card', ChartCard);
app.component('metrics-panel', MetricsPanel);

// Monta a aplicação
app.mount('#app');
