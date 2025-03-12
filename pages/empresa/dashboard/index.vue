<template>
  <div>
    <NuxtLayout name="dashboard">
      <!-- Dashboard Overview -->
      <div class="space-y-6">
        <!-- Page Title -->
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-bold">Visão Geral</h1>
          <div>
            <span class="text-gray-500">{{
              new Date().toLocaleDateString('pt-BR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })
            }}</span>
          </div>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="flex justify-between items-start">
              <div>
                <p class="text-gray-500 text-sm">Excursões Ativas</p>
                <h3 class="text-2xl font-bold mt-1">5</h3>
              </div>
              <div class="bg-primary-50 p-3 rounded-full">
                <Icon name="heroicons:map" class="w-6 h-6 text-primary" />
              </div>
            </div>
            <div class="mt-4 text-sm">
              <span class="text-green-500 font-medium">+2</span>
              <span class="text-gray-500 ml-1">desde o mês passado</span>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="flex justify-between items-start">
              <div>
                <p class="text-gray-500 text-sm">Reservas Pendentes</p>
                <h3 class="text-2xl font-bold mt-1">12</h3>
              </div>
              <div class="bg-yellow-50 p-3 rounded-full">
                <Icon name="heroicons:clock" class="w-6 h-6 text-yellow-500" />
              </div>
            </div>
            <div class="mt-4 text-sm">
              <span class="text-green-500 font-medium">+5</span>
              <span class="text-gray-500 ml-1">desde ontem</span>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="flex justify-between items-start">
              <div>
                <p class="text-gray-500 text-sm">Faturamento Mensal</p>
                <h3 class="text-2xl font-bold mt-1">R$ 24.500</h3>
              </div>
              <div class="bg-green-50 p-3 rounded-full">
                <Icon
                  name="heroicons:banknotes"
                  class="w-6 h-6 text-green-500"
                />
              </div>
            </div>
            <div class="mt-4 text-sm">
              <span class="text-green-500 font-medium">+15%</span>
              <span class="text-gray-500 ml-1">desde o mês passado</span>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="flex justify-between items-start">
              <div>
                <p class="text-gray-500 text-sm">Avaliação Média</p>
                <h3 class="text-2xl font-bold mt-1">4.8</h3>
              </div>
              <div class="bg-blue-50 p-3 rounded-full">
                <Icon name="heroicons:star" class="w-6 h-6 text-blue-500" />
              </div>
            </div>
            <div class="mt-4 text-sm flex items-center">
              <div class="flex text-yellow-400">
                <Icon
                  v-for="i in 5"
                  :key="i"
                  name="heroicons:star"
                  class="w-4 h-4"
                />
              </div>
              <span class="text-gray-500 ml-1">(156 avaliações)</span>
            </div>
          </div>
        </div>

        <!-- Charts Row -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Sales Chart -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="flex justify-between items-center mb-6">
              <h3 class="font-bold">Vendas Mensais</h3>
              <div class="flex space-x-2">
                <button
                  class="px-3 py-1 text-sm bg-primary text-white rounded-md"
                >
                  2025
                </button>
                <button
                  class="px-3 py-1 text-sm text-gray-500 hover:bg-gray-100 rounded-md"
                >
                  2024
                </button>
              </div>
            </div>

            <!-- Chart Placeholder -->
            <div
              class="h-64 bg-gray-50 rounded-lg flex items-center justify-center"
            >
              <div class="text-center">
                <Icon
                  name="heroicons:chart-bar"
                  class="w-12 h-12 text-gray-300 mx-auto mb-2"
                />
                <p class="text-gray-500">Gráfico de Vendas Mensais</p>
              </div>
            </div>
          </div>

          <!-- Reservations by Excursion -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="flex justify-between items-center mb-6">
              <h3 class="font-bold">Reservas por Excursão</h3>
              <button class="text-primary text-sm hover:underline">
                Ver todas
              </button>
            </div>

            <div class="space-y-4">
              <div class="flex items-center">
                <div class="w-1/2">
                  <p class="font-medium">Fim de Semana em Ilhabela</p>
                </div>
                <div class="w-1/3 px-2">
                  <div class="h-2 bg-gray-200 rounded-full">
                    <div
                      class="h-2 bg-primary rounded-full"
                      style="width: 80%"
                    ></div>
                  </div>
                </div>
                <div class="w-1/6 text-right">
                  <p class="font-medium">16/20</p>
                </div>
              </div>

              <div class="flex items-center">
                <div class="w-1/2">
                  <p class="font-medium">Thermas dos Laranjais</p>
                </div>
                <div class="w-1/3 px-2">
                  <div class="h-2 bg-gray-200 rounded-full">
                    <div
                      class="h-2 bg-primary rounded-full"
                      style="width: 60%"
                    ></div>
                  </div>
                </div>
                <div class="w-1/6 text-right">
                  <p class="font-medium">18/30</p>
                </div>
              </div>

              <div class="flex items-center">
                <div class="w-1/2">
                  <p class="font-medium">Feriado em Paraty</p>
                </div>
                <div class="w-1/3 px-2">
                  <div class="h-2 bg-gray-200 rounded-full">
                    <div
                      class="h-2 bg-primary rounded-full"
                      style="width: 40%"
                    ></div>
                  </div>
                </div>
                <div class="w-1/6 text-right">
                  <p class="font-medium">8/18</p>
                </div>
              </div>

              <div class="flex items-center">
                <div class="w-1/2">
                  <p class="font-medium">Campos do Jordão</p>
                </div>
                <div class="w-1/3 px-2">
                  <div class="h-2 bg-gray-200 rounded-full">
                    <div
                      class="h-2 bg-primary rounded-full"
                      style="width: 90%"
                    ></div>
                  </div>
                </div>
                <div class="w-1/6 text-right">
                  <p class="font-medium">23/25</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Activity and Upcoming Excursions -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Recent Activity -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="flex justify-between items-center mb-6">
              <h3 class="font-bold">Atividades Recentes</h3>
              <button class="text-primary text-sm hover:underline">
                Ver todas
              </button>
            </div>

            <div class="space-y-6">
              <div
                v-for="(activity, index) in recentActivities"
                :key="index"
                class="flex"
              >
                <div class="flex flex-col items-center mr-4">
                  <div
                    class="rounded-full h-8 w-8 flex items-center justify-center"
                    :class="getActivityClass(activity.type)"
                  >
                    <Icon
                      :name="getActivityIcon(activity.type)"
                      class="w-4 h-4 text-white"
                    />
                  </div>
                  <div
                    class="h-full w-0.5 bg-gray-200 mt-2"
                    v-if="index < recentActivities.length - 1"
                  ></div>
                </div>
                <div>
                  <p class="font-medium">{{ activity.title }}</p>
                  <p class="text-sm text-gray-500">
                    {{ activity.description }}
                  </p>
                  <p class="text-xs text-gray-400 mt-1">{{ activity.time }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Upcoming Excursions -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="flex justify-between items-center mb-6">
              <h3 class="font-bold">Próximas Excursões</h3>
              <button class="text-primary text-sm hover:underline">
                Ver todas
              </button>
            </div>

            <div class="space-y-4">
              <div
                v-for="(excursion, index) in upcomingExcursions"
                :key="index"
                class="flex items-center p-3 rounded-lg hover:bg-gray-50"
              >
                <div
                  class="bg-gray-100 rounded-lg h-12 w-12 flex items-center justify-center mr-4"
                >
                  <span class="font-bold text-gray-700">{{
                    excursion.date
                  }}</span>
                </div>
                <div class="flex-grow">
                  <p class="font-medium">{{ excursion.title }}</p>
                  <p class="text-sm text-gray-500">
                    {{ excursion.destination }}
                  </p>
                </div>
                <div class="text-right">
                  <p class="font-medium">
                    {{ excursion.reservations }}/{{ excursion.capacity }}
                  </p>
                  <p class="text-xs text-gray-500">reservas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Recent Activities
const recentActivities = [
  {
    type: 'reservation',
    title: 'Nova Reserva',
    description: 'João Silva reservou 2 vagas para Fim de Semana em Ilhabela',
    time: 'Há 2 horas',
  },
  {
    type: 'payment',
    title: 'Pagamento Recebido',
    description: 'R$ 3.600,00 - Thermas dos Laranjais (4 pessoas)',
    time: 'Há 5 horas',
  },
  {
    type: 'review',
    title: 'Nova Avaliação',
    description:
      'Maria Oliveira avaliou Expedição Serra da Mantiqueira com 5 estrelas',
    time: 'Há 1 dia',
  },
  {
    type: 'excursion',
    title: 'Excursão Finalizada',
    description: 'Expedição Serra da Mantiqueira foi concluída com sucesso',
    time: 'Há 2 dias',
  },
];

// Upcoming Excursions
const upcomingExcursions = [
  {
    date: '15/05',
    title: 'Fim de Semana em Ilhabela',
    destination: 'Ilhabela, SP',
    reservations: 16,
    capacity: 20,
  },
  {
    date: '20/07',
    title: 'Thermas dos Laranjais',
    destination: 'Olímpia, SP',
    reservations: 18,
    capacity: 30,
  },
  {
    date: '05/09',
    title: 'Feriado em Paraty',
    destination: 'Paraty, RJ',
    reservations: 8,
    capacity: 18,
  },
  {
    date: '15/08',
    title: 'Campos do Jordão',
    destination: 'Campos do Jordão, SP',
    reservations: 23,
    capacity: 25,
  },
];

// Function to get activity icon
const getActivityIcon = (type) => {
  switch (type) {
    case 'reservation':
      return 'heroicons:ticket';
    case 'payment':
      return 'heroicons:banknotes';
    case 'review':
      return 'heroicons:star';
    case 'excursion':
      return 'heroicons:flag';
    default:
      return 'heroicons:bell';
  }
};

// Function to get activity class
const getActivityClass = (type) => {
  switch (type) {
    case 'reservation':
      return 'bg-blue-500';
    case 'payment':
      return 'bg-green-500';
    case 'review':
      return 'bg-yellow-500';
    case 'excursion':
      return 'bg-purple-500';
    default:
      return 'bg-gray-500';
  }
};
</script>
