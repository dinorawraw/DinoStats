const Helpers = {
  // Formata números grandes (1.000 → 1K, 1.000.000 → 1M)
  formatNumber: (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  },

  // Gera horas do dia (0-23) formatadas
  generateHourLabels: () => {
    return Array.from({ length: 24 }, (_, i) => `${i}h`);
  },

  // Calcula estatísticas rápidas a partir dos dados de stream
  calculateQuickStats: (streams) => {
    const totalStreamers = streams.length;
    const totalViewers = streams.reduce((sum, stream) => sum + stream.viewer_count, 0);
    
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

    return [
      { label: 'Streamers Ativos', value: Helpers.formatNumber(totalStreamers) },
      { label: 'Audiência Total', value: Helpers.formatNumber(totalViewers) },
      { label: 'Jogos Populares', value: Object.keys(categories).length }
    ];
  },

  // Processa dados para o gráfico de categorias com mais views e menos streamers
  processHighViewsLowStreamers: (categories, limit = 10) => {
    const sorted = [...Object.values(categories)]
      .sort((a, b) => (b.viewers / b.streamers) - (a.viewers / a.streamers))
      .slice(0, limit);

    return {
      labels: sorted.map(cat => cat.name),
      datasets: [
        {
          label: 'Views por Streamer',
          data: sorted.map(cat => Math.round(cat.viewers / cat.streamers)),
          backgroundColor: '#7C3AED'
        },
        {
          label: 'Streamers',
          data: sorted.map(cat => cat.streamers),
          backgroundColor: '#60A5FA'
        }
      ]
    };
  },

  // Processa dados de distribuição por horário
  processScheduleData: (streams) => {
    const hourlyDistribution = new Array(24).fill(0);
    streams.forEach(stream => {
      const hour = new Date(stream.started_at).getHours();
      hourlyDistribution[hour]++;
    });

    return {
      labels: Helpers.generateHourLabels(),
      datasets: [{
        label: 'Streams por Horário',
        data: hourlyDistribution,
        borderColor: '#34D399',
        fill: false,
        tension: 0.1
      }]
    };
  },

  // Processa dados para jogos em alta
  processTopGames: (categories, limit = 5) => {
    const sorted = [...Object.values(categories)]
      .sort((a, b) => b.viewers - a.viewers)
      .slice(0, limit);

    return {
      labels: sorted.map(game => game.name),
      data: sorted.map(game => game.viewers)
    };
  },

  // Processa dados para novos jogos com crescimento
  processNewGames: (categories, minStreamers = 3, limit = 5) => {
    const filtered = [...Object.values(categories)]
      .filter(cat => cat.streamers >= minStreamers)
      .sort((a, b) => (b.viewers / b.streamers) - (a.viewers / a.streamers))
      .slice(0, limit);

    return filtered.map(game => ({
      name: game.name,
      avgViewers: Math.round(game.viewers / game.streamers)
    }));
  },

  // Função para debounce (útil para eventos de resize)
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
};
