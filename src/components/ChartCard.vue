const ChartCard = {
  props: ['title', 'description', 'chartRef', 'cols'],
  template: `
    <div class="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-xl shadow-xl p-8 border border-purple-500/20 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10" :class="cols">
      <h2 class="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
        {{ title }}
      </h2>
      <div class="relative h-64">
        <canvas :ref="chartRef"></canvas>
      </div>
      <div class="mt-4">
        <p class="text-gray-600">{{ description }}</p>
      </div>
    </div>
  `
};
