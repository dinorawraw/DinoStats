const MetricsPanel = {
  template: `
    <div class="bg-gray-800 rounded-lg p-4 shadow-lg">
      <h3 class="text-xl font-bold mb-4">Métricas de Streams</h3>
      
      <!-- Métricas de Streams -->
      <div class="mb-6">
        <h4 class="text-lg font-semibold mb-2">Estatísticas Gerais</h4>
        <div class="grid grid-cols-2 gap-4">
          <div class="bg-gray-700 p-3 rounded">
            <p class="text-sm text-gray-400">Total de Streams</p>
            <p class="text-lg">{{ formatNumber(metrics?.data?.totalStreams) }}</p>
          </div>
          <div class="bg-gray-700 p-3 rounded">
            <p class="text-sm text-gray-400">Total de Viewers</p>
            <p class="text-lg">{{ formatNumber(metrics?.data?.totalViewers) }}</p>
          </div>
          <div class="bg-gray-700 p-3 rounded">
            <p class="text-sm text-gray-400">Média de Viewers</p>
            <p class="text-lg">{{ formatNumber(metrics?.data?.averageViewers) }}</p>
          </div>
          <div class="bg-gray-700 p-3 rounded">
            <p class="text-sm text-gray-400">Streams Ativas</p>
            <p class="text-lg">{{ formatNumber(metrics?.data?.activeStreams) }}</p>
          </div>
        </div>
      </div>

      <!-- Top Categorias -->
      <div class="mb-6">
        <h4 class="text-lg font-semibold mb-2">Top Categorias</h4>
        <div class="space-y-2">
          <div v-for="(category, index) in metrics?.data?.topCategories.slice(0, 5)" 
               :key="index" 
               class="bg-gray-700 p-3 rounded">
            <div class="flex justify-between items-center">
              <span class="font-medium">{{ category.name }}</span>
              <span class="text-sm text-gray-400">{{ formatNumber(category.viewers) }} viewers</span>
            </div>
            <div class="mt-1 text-sm text-gray-400">
              {{ formatNumber(category.streamers) }} streamers ativos
            </div>
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