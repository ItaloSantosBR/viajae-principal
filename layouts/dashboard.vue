<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- Dashboard Layout -->
    <div class="flex flex-col md:flex-row">
      <!-- Sidebar Navigation -->
      <div class="bg-white shadow-md md:w-64 md:fixed md:h-screen z-10">
        <div class="p-4 border-b">
          <div class="flex items-center space-x-3">
            <span class="font-bold text-lg">Dashboard</span>
          </div>
        </div>
        
        <div class="p-4 border-b">
          <div class="flex items-center space-x-3">
            <div class="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center">
              <Icon name="heroicons:building-office-2" class="w-6 h-6 text-gray-500" />
            </div>
            <div>
              <div class="font-medium">{{ companyName }}</div>
              <div class="text-xs text-gray-500">Empresa de Turismo</div>
            </div>
          </div>
        </div>
        
        <nav class="p-2">
          <ul class="space-y-1">
            <li v-for="item in navItems" :key="item.name">
              <NuxtLink 
                :to="item.to" 
                class="flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors"
                :class="$route.path === item.to ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'"
              >
                <Icon :name="item.icon" class="w-5 h-5" />
                <span>{{ item.label }}</span>
              </NuxtLink>
            </li>
          </ul>
        </nav>
        
        <div class="p-4 mt-auto border-t absolute bottom-0 w-full">
          <button @click="logout" class="flex items-center space-x-3 text-gray-700 hover:text-red-600 w-full">
            <Icon name="heroicons:arrow-right-on-rectangle" class="w-5 h-5" />
            <span>Sair</span>
          </button>
        </div>
      </div>
      
      <!-- Main Content -->
      <div class="md:ml-64 flex-grow p-6">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore();
const router = useRouter();

// Company Info
const companyName = ref('Aventuras Marítimas');

// Navigation
const navItems = [
  { name: 'overview', label: 'Visão Geral', to: '/empresa/dashboard', icon: 'heroicons:home' },
  { name: 'excursions', label: 'Excursões', to: '/empresa/dashboard/gerenciar-excursoes', icon: 'heroicons:map' },
  { name: 'reservations', label: 'Reservas', to: '/empresa/dashboard/reservas', icon: 'heroicons:ticket' },
  { name: 'financial', label: 'Financeiro', to: '/empresa/dashboard/financeiro', icon: 'heroicons:banknotes' },
  { name: 'locations', label: 'Locais de Embarque', to: '/empresa/dashboard/locais', icon: 'heroicons:map-pin' },
  { name: 'reviews', label: 'Avaliações', to: '/empresa/dashboard/avaliacoes', icon: 'heroicons:star' },
  { name: 'support', label: 'Suporte', to: '/empresa/dashboard/suporte', icon: 'heroicons:chat-bubble-left-right' }
];

// Logout
const logout = () => {
   authStore.logout();
  router.push('/login');
};
</script>
