const ChartService = {
  // Configurações padrão para os gráficos
  defaultOptions: {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#E5E7EB',
          font: {
            family: 'Inter'
          },
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.8)',
        titleColor: '#E5E7EB',
        bodyColor: '#E5E7EB',
        borderColor: '#374151',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        boxPadding: 6,
        usePointStyle: true,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('pt-BR').format(context.parsed.y);
            }
            return label;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(75, 85, 99, 0.1)',
          drawBorder: false
        },
        ticks: {
          color: '#9CA3AF',
          font: {
            family: 'Inter'
          },
          padding: 10
        }
      },
      y: {
        grid: {
          color: 'rgba(75, 85, 99, 0.1)',
          drawBorder: false
        },
        ticks: {
          color: '#9CA3AF',
          font: {
            family: 'Inter'
          },
          padding: 10,
          callback: function(value) {
            return new Intl.NumberFormat('pt-BR').format(value);
          }
        }
      }
    }
  },

  // Cores modernas para os gráficos
  chartColors: [
    {
      border: '#7C3AED',
      background: 'rgba(124, 58, 237, 0.1)'
    },
    {
      border: '#60A5FA',
      background: 'rgba(96, 165, 250, 0.1)'
    },
    {
      border: '#34D399',
      background: 'rgba(52, 211, 153, 0.1)'
    },
    {
      border: '#FBBF24',
      background: 'rgba(251, 191, 36, 0.1)'
    },
    {
      border: '#F87171',
      background: 'rgba(248, 113, 113, 0.1)'
    }
  ],

  // Cria um gráfico de barras
  createBarChart(canvas, labels, datasets) {
    return new Chart(canvas, {
      type: 'bar',
      data: {
        labels,
        datasets: datasets.map((dataset, index) => ({
          ...dataset,
          backgroundColor: this.chartColors[index % this.chartColors.length].background,
          borderColor: this.chartColors[index % this.chartColors.length].border,
          borderWidth: 1,
          borderRadius: 6,
          barThickness: 40
        }))
      },
      options: {
        ...this.defaultOptions,
        plugins: {
          ...this.defaultOptions.plugins,
          title: {
            display: true,
            text: 'Categorias com Mais Views e Menos Streamers',
            color: '#E5E7EB',
            font: {
              size: 16,
              family: 'Inter'
            },
            padding: {
              bottom: 20
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
          backgroundColor: this.chartColors.slice(0, data.length).map(color => color.background)
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
          backgroundColor: this.chartColors.slice(0, data.length).map(color => color.background)
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
            borderColor: this.chartColors[0].border,
            backgroundColor: this.chartColors[0].background,
            fill: true,
            tension: 0.4,
            pointRadius: 4,
            pointHoverRadius: 6,
            pointBackgroundColor: this.chartColors[0].border,
            pointBorderColor: '#fff',
            pointBorderWidth: 2
          },
          {
            label: 'Média de Viewers',
            data: hourlyData.map(data => data.averageViewers),
            borderColor: this.chartColors[1].border,
            backgroundColor: this.chartColors[1].background,
            fill: true,
            tension: 0.4,
            pointRadius: 4,
            pointHoverRadius: 6,
            pointBackgroundColor: this.chartColors[1].border,
            pointBorderColor: '#fff',
            pointBorderWidth: 2
          }
        ]
      },
      options: {
        ...this.defaultOptions,
        plugins: {
          ...this.defaultOptions.plugins,
          title: {
            display: true,
            text: 'Distribuição de Streamers e Viewers por Hora',
            color: '#E5E7EB',
            font: {
              size: 16,
              family: 'Inter'
            },
            padding: {
              bottom: 20
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
            borderColor: this.chartColors[2].border,
            backgroundColor: this.chartColors[2].background,
            fill: true,
            tension: 0.4,
            pointRadius: 4,
            pointHoverRadius: 6,
            pointBackgroundColor: this.chartColors[2].border,
            pointBorderColor: '#fff',
            pointBorderWidth: 2
          }
        ]
      },
      options: {
        ...this.defaultOptions,
        plugins: {
          ...this.defaultOptions.plugins,
          title: {
            display: true,
            text: 'Dispersão de Viewers por Hora',
            color: '#E5E7EB',
            font: {
              size: 16,
              family: 'Inter'
            },
            padding: {
              bottom: 20
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
