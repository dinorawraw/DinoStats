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
  createBarChart(canvas, labels, datasets) {
    return new Chart(canvas, {
      type: 'bar',
      data: { labels, datasets },
      options: {
        ...this.defaultOptions,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return new Intl.NumberFormat('pt-BR').format(value);
              }
            }
          }
        }
      }
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

  // Cria um gráfico de linha para distribuição por hora
  createHourlyDistributionChart(canvas, hourlyData) {
    const labels = hourlyData.map(data => `${data.hour}:00`);
    
    return new Chart(canvas, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Streamers Ativos',
            data: hourlyData.map(data => data.activeStreamers),
            borderColor: '#7C3AED',
            backgroundColor: 'rgba(124, 58, 237, 0.1)',
            fill: true,
            tension: 0.4
          },
          {
            label: 'Média de Viewers',
            data: hourlyData.map(data => data.averageViewers),
            borderColor: '#60A5FA',
            backgroundColor: 'rgba(96, 165, 250, 0.1)',
            fill: true,
            tension: 0.4
          }
        ]
      },
      options: {
        ...this.defaultOptions,
        plugins: {
          ...this.defaultOptions.plugins,
          title: {
            display: true,
            text: 'Distribuição de Streamers e Viewers por Hora'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return new Intl.NumberFormat('pt-BR').format(value);
              }
            }
          }
        }
      }
    });
  },

  // Cria um gráfico de dispersão de viewers
  createViewerDispersionChart(canvas, dispersionData) {
    const labels = dispersionData.map(data => `${data.hour}:00`);
    
    return new Chart(canvas, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Dispersão de Viewers',
            data: dispersionData.map(data => data.dispersion),
            borderColor: '#F87171',
            backgroundColor: 'rgba(248, 113, 113, 0.1)',
            fill: true,
            tension: 0.4
          }
        ]
      },
      options: {
        ...this.defaultOptions,
        plugins: {
          ...this.defaultOptions.plugins,
          title: {
            display: true,
            text: 'Dispersão de Viewers por Hora'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return new Intl.NumberFormat('pt-BR').format(value);
              }
            }
          }
        }
      }
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

// Torna o serviço disponível globalmente
window.ChartService = ChartService;
