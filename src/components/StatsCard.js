const StatsCard = {
  template: `
    <div class="bg-gray-800 rounded-lg p-4 shadow-lg">
      <h3 class="text-xl font-bold mb-4">Estatísticas Rápidas</h3>
      <div class="grid grid-cols-2 gap-4">
        <div v-for="(stat, index) in stats" :key="index" class="bg-gray-700 p-3 rounded">
          <p class="text-sm text-gray-400">{{ stat.label }}</p>
          <p class="text-lg">{{ formatValue(stat.value) }}</p>
        </div>
      </div>
    </div>
  `,

  props: {
    stats: {
      type: Array,
      required: true
    }
  },

  methods: {
    formatValue(value) {
      if (typeof value === 'number') {
        return new Intl.NumberFormat('pt-BR').format(value);
      }
      return value;
    }
  }
};

// Torna o componente disponível globalmente
window.StatsCard = StatsCard; 