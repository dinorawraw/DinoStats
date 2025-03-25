const ChartCard = {
  template: `
    <div :class="['bg-gray-800 rounded-lg p-4 shadow-lg', cols]">
      <h3 class="text-xl font-bold mb-2">{{ title }}</h3>
      <p class="text-gray-400 mb-4">{{ description }}</p>
      <canvas :ref="chartRef"></canvas>
    </div>
  `,

  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    chartRef: {
      type: String,
      required: true
    },
    cols: {
      type: String,
      default: ''
    }
  }
};

// Torna o componente disponível globalmente
window.ChartCard = ChartCard; 