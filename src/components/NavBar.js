const NavBar = {
  template: `
    <nav class="bg-gray-800 shadow-lg">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <span class="text-xl font-bold text-white">StreamerStats Brasil</span>
          </div>
          <div class="flex items-center space-x-4">
            <a href="#" class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Início</a>
            <a href="#" class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Estatísticas</a>
            <a href="#" class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Sobre</a>
          </div>
        </div>
      </div>
    </nav>
  `
};

// Torna o componente disponível globalmente
window.NavBar = NavBar; 