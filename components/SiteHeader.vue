<template>
  <header class="bg-white shadow-sm">
    <div class="container-custom py-4">
      <div class="flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center space-x-2">
          <img src="/logo.svg" alt="Viajae" class="h-10" />
        </NuxtLink>
        
        <nav class="hidden md:flex items-center space-x-8">
          <NuxtLink to="/" class="text-gray-700 hover:text-primary">Início</NuxtLink>
          <NuxtLink to="/excursoes" class="text-gray-700 hover:text-primary">Excursões</NuxtLink>
          <NuxtLink to="/destinos" class="text-gray-700 hover:text-primary">Destinos</NuxtLink>
          <NuxtLink to="/como-funciona" class="text-gray-700 hover:text-primary">Como Funciona</NuxtLink>
          <NuxtLink to="/empresas" class="text-gray-700 hover:text-primary">Para Empresas</NuxtLink>
        </nav>
        
        <div class="flex items-center space-x-4">
          <template v-if="!isLoggedIn">
            <NuxtLink to="/login" class="btn btn-outline">Entrar</NuxtLink>
            <NuxtLink to="/cadastro" class="btn btn-primary">Cadastrar</NuxtLink>
          </template>
          <template v-else>
            <div class="relative" @click="toggleUserMenu" ref="userMenuContainer">
              <button class="flex items-center space-x-2">
                <span class="text-sm font-medium">{{ user?.name || 'Usuário' }}</span>
                <Icon name="heroicons:chevron-down" class="w-4 h-4" />
              </button>
              
              <div v-if="isUserMenuOpen" class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                <NuxtLink to="/perfil" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Minha Conta</NuxtLink>
                <NuxtLink to="/minhas-reservas" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Minhas Reservas</NuxtLink>
                <template v-if="isCompany">
                  <NuxtLink to="/empresa/dashboard" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Dashboard da Empresa</NuxtLink>
                </template>
                <template v-if="isAdmin">
                  <NuxtLink to="/admin/dashboard" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Painel Admin</NuxtLink>
                </template>
                <button @click="logout" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sair</button>
              </div>
            </div>
          </template>
        </div>
        
        <button class="md:hidden" @click="toggleMobileMenu">
          <Icon name="heroicons:bars-3" class="w-6 h-6" />
        </button>
      </div>
      
      <!-- Mobile menu -->
      <div v-if="isMobileMenuOpen" class="md:hidden mt-4 pb-4">
        <nav class="flex flex-col space-y-4">
          <NuxtLink to="/" class="text-gray-700 hover:text-primary">Início</NuxtLink>
          <NuxtLink to="/excursoes" class="text-gray-700 hover:text-primary">Excursões</NuxtLink>
          <NuxtLink to="/destinos" class="text-gray-700 hover:text-primary">Destinos</NuxtLink>
          <NuxtLink to="/como-funciona" class="text-gray-700 hover:text-primary">Como Funciona</NuxtLink>
          <NuxtLink to="/empresas" class="text-gray-700 hover:text-primary">Para Empresas</NuxtLink>
          
          <template v-if="!isLoggedIn">
            <div class="flex space-x-4 pt-2">
              <NuxtLink to="/login" class="btn btn-outline">Entrar</NuxtLink>
              <NuxtLink to="/cadastro" class="btn btn-primary">Cadastrar</NuxtLink>
            </div>
          </template>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore();
const isLoggedIn = computed(() => authStore.isLoggedIn);
const user = computed(() => authStore.user);
const isCompany = computed(() => authStore.user?.role === 'company');
const isAdmin = computed(() => authStore.user?.role === 'admin');

const isMobileMenuOpen = ref(false);
const isUserMenuOpen = ref(false);
const userMenuContainer = ref(null);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const toggleUserMenu = () => {
  isUserMenuOpen.value = !isUserMenuOpen.value;
};

const logout = () => {
  authStore.logout();
  navigateTo('/');
};

// Close user menu when clicking outside
const handleClickOutside = (event) => {
  if (userMenuContainer.value && !userMenuContainer.value.contains(event.target)) {
    isUserMenuOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>
