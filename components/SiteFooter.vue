<template>
  <footer class="bg-[#005655] text-white pt-12 pb-8">
    <div class="container-custom">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div class="flex items-center space-x-2 mb-4">
            <img src="/logo-white.svg" alt="Viajae" class="h-8" />
          </div>
          <p class="text-gray-300 mb-4">
            Marketplace de excursões com hospedagem, conectando empresas de turismo e viajantes.
          </p>
          <div class="flex space-x-4">
            <a href="#" class="text-gray-300 hover:text-primary">
              <Icon name="mdi:facebook" class="w-6 h-6" />
            </a>
            <a href="#" class="text-gray-300 hover:text-primary">
              <Icon name="mdi:instagram" class="w-6 h-6" />
            </a>
            <a href="#" class="text-gray-300 hover:text-primary">
              <Icon name="mdi:twitter" class="w-6 h-6" />
            </a>
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-bold mb-4">Navegação</h3>
          <ul class="space-y-2">
            <li><NuxtLink to="/" class="text-gray-300 hover:text-primary">Início</NuxtLink></li>
            <li><NuxtLink to="/excursoes" class="text-gray-300 hover:text-primary">Excursões</NuxtLink></li>
            <li><NuxtLink to="/destinos" class="text-gray-300 hover:text-primary">Destinos</NuxtLink></li>
            <li><NuxtLink to="/como-funciona" class="text-gray-300 hover:text-primary">Como Funciona</NuxtLink></li>
            <li><NuxtLink to="/empresas" class="text-gray-300 hover:text-primary">Para Empresas</NuxtLink></li>
						<li><NuxtLink to="/politica-de-privacidade" class="text-gray-300 hover:text-primary">Política de Privacidade</NuxtLink></li>
          </ul>
        </div>
        
        <div>
          <h3 class="text-lg font-bold mb-4">Categorias</h3>
          <ul class="space-y-2">
            <li><NuxtLink to="/excursoes?categoria=praia" class="text-gray-300 hover:text-primary">Praia</NuxtLink></li>
            <li><NuxtLink to="/excursoes?categoria=parque-aquatico" class="text-gray-300 hover:text-primary">Parque Aquático</NuxtLink></li>
            <li><NuxtLink to="/excursoes?categoria=serra" class="text-gray-300 hover:text-primary">Serra</NuxtLink></li>
            <li><NuxtLink to="/excursoes?categoria=cultural" class="text-gray-300 hover:text-primary">Cultural</NuxtLink></li>
            <li><NuxtLink to="/excursoes?categoria=aventura" class="text-gray-300 hover:text-primary">Aventura</NuxtLink></li>
          </ul>
        </div>
        
        <div>
          <h3 class="text-lg font-bold mb-4">Contato</h3>
          <ul class="space-y-2">
            <li class="flex items-start space-x-2">
              <Icon name="heroicons:envelope" class="w-5 h-5 mt-0.5 text-primary" />
              <span class="text-gray-300">contato@viajae.com.br</span>
            </li>
            <li class="flex items-start space-x-2">
              <Icon name="heroicons:phone" class="w-5 h-5 mt-0.5 text-primary" />
              <span class="text-gray-300">(11) 99999-9999</span>
            </li>
            <li class="flex items-start space-x-2">
              <Icon name="heroicons:map-pin" class="w-5 h-5 mt-0.5 text-primary" />
              <span class="text-gray-300">São Paulo, SP</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
        <p>&copy; {{ new Date().getFullYear() }} Viajae. Todos os direitos reservados.</p>
      </div>
    </div>
  </footer>
</template>
