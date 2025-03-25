const ChartCard = {
  props: {
    title: String,
    description: String,
    chartRef: Object,
    class: String
  },
  template: `
    <div class="bg-gray-800 rounded-lg shadow-xl p-6 transition-all duration-300 hover:shadow-2xl hover:bg-gray-750">
      <div class="flex flex-col h-full">
        <div class="mb-4">
          <h3 class="text-xl font-bold text-white mb-2">{{ title }}</h3>
          <p class="text-gray-400 text-sm">{{ description }}</p>
        </div>
        <div class="relative flex-grow">
          <canvas :ref="chartRef" class="w-full h-full"></canvas>
          <div class="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-0 hover:bg-opacity-10 transition-all duration-300">
            <div class="opacity-0 hover:opacity-100 transition-opacity duration-300">
              <span class="text-white text-sm">Hover para detalhes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
};

// Torna o componente disponível globalmente
window.ChartCard = ChartCard; 