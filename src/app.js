// app.js atualizado
const { createApp, ref, onMounted } = Vue;

const app = createApp({
  setup() {
    const loading = ref(true);
    const error = ref('');
    const streamsData = ref([]);
    const quickStats = ref([]);
    const highViewsLowStreamersChart = ref(null);
    const hourlyDistributionChart = ref(null);
    const viewerDispersionChart = ref(null);
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

      // Inicializa gráfico de distribuição por hora
      if (hourlyDistributionChart.value) {
        ChartService.createHourlyDistributionChart(
          hourlyDistributionChart.value.getContext('2d'),
          metrics.value.data.timeMetrics.hourlyDistribution
        );
      }

      // Inicializa gráfico de dispersão de viewers
      if (viewerDispersionChart.value) {
        ChartService.createViewerDispersionChart(
          viewerDispersionChart.value.getContext('2d'),
          metrics.value.data.timeMetrics.viewerDispersion
        );
      }
      
      // Atualiza referência das métricas
      metrics.value = MetricsService.generateReport();
    };
    
    // Inicialização
    onMounted(async () => {
      try {
        streamsData.value = await TwitchAPI.getStreamData();
        processData(streamsData.value);
        loading.value = false;
      } catch (err) {
        error.value = 'Erro ao carregar dados da Twitch.';
        loading.value = false;
        console.error(err);
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
      hourlyDistributionChart,
      viewerDispersionChart,
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
