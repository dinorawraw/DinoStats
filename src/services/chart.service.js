const ChartService = {
  // Configurações padrão para os gráficos
  defaultOptions: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#E5E7EB',
          font: {
            family: 'Inter'
          }
        }
      }
    },
    scales: {
      x: {
        ticks: { color: '#9CA3AF' },
        grid: { color: '#374151' }
      },
      y: {
        ticks: { color: '#9CA3AF' },
        grid: { color: '#374151' }
      }
    }
  },

  // Cores padrão para os gráficos
  chartColors: [
    '#7C3AED', // Roxo
    '#60A5FA', // Azul
    '#34D399', // Verde
    '#FBBF24', // Amarelo
    '#F87171', // Vermelho
    '#A78BFA', // Roxo claro
    '#818CF8', // Azul claro
    '#10B981', // Verde escuro
    '#F59E0B', // Laranja
    '#EF4444'  // Vermelho escuro
  ],

  // Cria um gráfico de barras
  createBarChart(ctx, labels, datasets, customOptions = {}) {
    const options = { ...this.defaultOptions, ...customOptions };
    return new Chart(ctx, {
      type: 'bar',
      data: { labels, datasets },
      options
    });
  },

  // Cria um gráfico de linha
  createLineChart(ctx, labels, datasets, customOptions = {}) {
    const options = { ...this.defaultOptions, ...customOptions };
    return new Chart(ctx, {
      type: 'line',
      data: { labels, datasets },
      options
    });
  },

  // Cria um gráfico de pizza
  createPieChart(ctx, labels, data, customOptions = {}) {
    const options = { ...this.defaultOptions, ...customOptions };
    return new Chart(ctx, {
      type: 'pie',
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: this.chartColors.slice(0, data.length)
        }]
      },
      options
    });
  },

  // Cria um gráfico de rosca
  createDoughnutChart(ctx, labels, data, customOptions = {}) {
    const options = { ...this.defaultOptions, ...customOptions };
    return new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: this.chartColors.slice(0, data.length)
        }]
      },
      options
    });
  },

  // Atualiza um gráfico existente
  updateChart(chart, newData) {
    if (chart) {
      chart.data = newData;
      chart.update();
    }
  },

  // Destrói um gráfico
  destroyChart(chart) {
    if (chart) {
      chart.destroy();
    }
  }
};
