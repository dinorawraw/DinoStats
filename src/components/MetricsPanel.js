const MetricsPanel = {
  template: `
    <div class="bg-gray-800 rounded-lg p-4 shadow-lg">
      <h3 class="text-xl font-bold mb-4">Métricas de Desempenho</h3>
      
      <!-- Performance -->
      <div class="mb-6">
        <h4 class="text-lg font-semibold mb-2">Performance</h4>
        <div class="grid grid-cols-2 gap-4">
          <div class="bg-gray-700 p-3 rounded">
            <p class="text-sm text-gray-400">Tempo de Carregamento</p>
            <p class="text-lg">{{ formatTime(metrics?.performance?.loadTime) }}</p>
          </div>
          <div class="bg-gray-700 p-3 rounded">
            <p class="text-sm text-gray-400">Tempo de Resposta API</p>
            <p class="text-lg">{{ formatTime(metrics?.performance?.apiResponseTime) }}</p>
          </div>
          <div class="bg-gray-700 p-3 rounded">
            <p class="text-sm text-gray-400">Uso de Memória</p>
            <p class="text-lg">{{ formatMemory(metrics?.performance?.memoryUsage) }}</p>
          </div>
          <div class="bg-gray-700 p-3 rounded">
            <p class="text-sm text-gray-400">FPS</p>
            <p class="text-lg">{{ metrics?.performance?.frameRate }}</p>
          </div>
        </div>
      </div>

      <!-- Dados -->
      <div class="mb-6">
        <h4 class="text-lg font-semibold mb-2">Dados</h4>
        <div class="grid grid-cols-2 gap-4">
          <div class="bg-gray-700 p-3 rounded">
            <p class="text-sm text-gray-400">Total de Streams</p>
            <p class="text-lg">{{ metrics?.data?.totalStreams }}</p>
          </div>
          <div class="bg-gray-700 p-3 rounded">
            <p class="text-sm text-gray-400">Total de Viewers</p>
            <p class="text-lg">{{ formatNumber(metrics?.data?.totalViewers) }}</p>
          </div>
          <div class="bg-gray-700 p-3 rounded">
            <p class="text-sm text-gray-400">Média de Viewers</p>
            <p class="text-lg">{{ formatNumber(metrics?.data?.averageViewers) }}</p>
          </div>
        </div>
      </div>

      <!-- Qualidade -->
      <div class="mb-6">
        <h4 class="text-lg font-semibold mb-2">Qualidade</h4>
        <div class="grid grid-cols-2 gap-4">
          <div class="bg-gray-700 p-3 rounded">
            <p class="text-sm text-gray-400">Taxa de Sucesso</p>
            <p class="text-lg">{{ metrics?.quality?.successRate }}</p>
          </div>
          <div class="bg-gray-700 p-3 rounded">
            <p class="text-sm text-gray-400">Taxa de Erro</p>
            <p class="text-lg">{{ metrics?.quality?.errorRate }}</p>
          </div>
          <div class="bg-gray-700 p-3 rounded">
            <p class="text-sm text-gray-400">Tentativas de Retry</p>
            <p class="text-lg">{{ metrics?.quality?.retryCount }}</p>
          </div>
        </div>
      </div>

      <!-- Botão de Exportação -->
      <button 
        @click="exportMetrics" 
        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Exportar Métricas
      </button>
    </div>
  `,

  props: {
    metrics: {
      type: Object,
      required: true
    }
  },

  methods: {
    formatTime(ms) {
      if (!ms) return '0ms';
      return `${Math.round(ms)}ms`;
    },

    formatMemory(mb) {
      if (!mb) return '0MB';
      return `${Math.round(mb)}MB`;
    },

    formatNumber(num) {
      if (!num) return '0';
      return new Intl.NumberFormat('pt-BR').format(Math.round(num));
    },

    exportMetrics() {
      this.$emit('export-metrics');
    }
  }
};

// Torna o componente disponível globalmente
window.MetricsPanel = MetricsPanel; 