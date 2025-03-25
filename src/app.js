// Importa os componentes (no navegador, isso seria feito via script tags)
const { createApp, ref, onMounted } = Vue;

// Cria a aplicação Vue
const app = createApp({
  setup() {
    const loading = ref(true);
    const error = ref('');
    const streamsData = ref([]);
    const quickStats = ref([]);
    
    // Refs para os gráficos
    const highViewsLowStreamersChart = ref(null);
    
    // Funções para processar dados
    const computeAggregates = () => {
      // Implementação similar à original
    };
    
    // Inicialização
    onMounted(async () => {
      try {
        streamsData.value = await TwitchAPI.getStreamData();
        computeAggregates();
        loading.value = false;
      } catch (err) {
        error.value = 'Erro ao carregar dados da Twitch.';
        loading.value = false;
      }
    });
    
    return {
      loading,
      error,
      quickStats,
      highViewsLowStreamersChart
    };
  }
});

// Registra os componentes
app.component('nav-bar', NavBar);
app.component('stats-card', StatsCard);
app.component('chart-card', ChartCard);

// Monta a aplicação
app.mount('#app');
