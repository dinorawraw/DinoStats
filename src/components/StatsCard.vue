const StatsCard = {
  props: ['stats'],
  template: `
    <div class="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-xl shadow-xl p-6 border border-purple-500/20 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10">
      <div v-for="stat in stats" :key="stat.label">
        <h3 class="text-gray-400 text-sm">{{ stat.label }}</h3>
        <p class="text-2xl font-bold text-purple-400">{{ stat.value }}</p>
      </div>
    </div>
  `
};
