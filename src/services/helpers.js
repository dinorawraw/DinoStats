const Helpers = {
  // Calcula estatísticas rápidas
  calculateQuickStats(streams) {
    const totalViewers = streams.reduce((acc, stream) => acc + stream.viewer_count, 0);
    const totalStreams = streams.length;
    const averageViewers = totalViewers / totalStreams;
    
    return [
      {
        label: 'Total de Streams',
        value: totalStreams
      },
      {
        label: 'Total de Viewers',
        value: totalViewers
      },
      {
        label: 'Média de Viewers',
        value: Math.round(averageViewers)
      },
      {
        label: 'Streams Ativas',
        value: streams.filter(s => s.is_live).length
      }
    ];
  },

  // Processa dados para o gráfico de categorias
  processHighViewsLowStreamers(categories) {
    const sortedCategories = Object.entries(categories)
      .map(([name, data]) => ({
        name,
        ...data
      }))
      .sort((a, b) => b.viewers - a.viewers)
      .slice(0, 10);

    return {
      labels: sortedCategories.map(cat => cat.name),
      datasets: [
        {
          label: 'Viewers',
          data: sortedCategories.map(cat => cat.viewers),
          backgroundColor: 'rgba(59, 130, 246, 0.5)',
          borderColor: 'rgb(59, 130, 246)',
          borderWidth: 1
        },
        {
          label: 'Streamers',
          data: sortedCategories.map(cat => cat.streamers),
          backgroundColor: 'rgba(16, 185, 129, 0.5)',
          borderColor: 'rgb(16, 185, 129)',
          borderWidth: 1
        }
      ]
    };
  }
};

// Torna o serviço disponível globalmente
window.Helpers = Helpers; 