<template>
  <div>
    <NuxtLayout name="dashboard">
      <!-- Page Header -->
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">Financeiro</h1>
        <div class="flex space-x-2">
          <button class="btn btn-outline flex items-center">
            <Icon name="heroicons:arrow-down-tray" class="w-5 h-5 mr-1" />
            Exportar Relatório
          </button>
        </div>
      </div>

      <!-- Financial Summary Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-gray-500 text-sm">Faturamento Total</p>
              <h3 class="text-2xl font-bold mt-1">R$ 124.500</h3>
            </div>
            <div class="bg-green-50 p-3 rounded-full">
              <Icon name="heroicons:banknotes" class="w-6 h-6 text-green-500" />
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
              <p class="text-gray-500 text-sm">Faturamento Mensal</p>
              <h3 class="text-2xl font-bold mt-1">R$ 24.500</h3>
            </div>
            <div class="bg-primary-50 p-3 rounded-full">
              <Icon
                name="heroicons:currency-dollar"
                class="w-6 h-6 text-primary"
              />
            </div>
          </div>
          <div class="mt-4 text-sm">
            <span class="text-green-500 font-medium">+8%</span>
            <span class="text-gray-500 ml-1">desde o mês passado</span>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-gray-500 text-sm">Reservas Confirmadas</p>
              <h3 class="text-2xl font-bold mt-1">86</h3>
            </div>
            <div class="bg-blue-50 p-3 rounded-full">
              <Icon name="heroicons:ticket" class="w-6 h-6 text-blue-500" />
            </div>
          </div>
          <div class="mt-4 text-sm">
            <span class="text-green-500 font-medium">+12</span>
            <span class="text-gray-500 ml-1">desde o mês passado</span>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-gray-500 text-sm">Ticket Médio</p>
              <h3 class="text-2xl font-bold mt-1">R$ 1.450</h3>
            </div>
            <div class="bg-purple-50 p-3 rounded-full">
              <Icon
                name="heroicons:calculator"
                class="w-6 h-6 text-purple-500"
              />
            </div>
          </div>
          <div class="mt-4 text-sm">
            <span class="text-green-500 font-medium">+5%</span>
            <span class="text-gray-500 ml-1">desde o mês passado</span>
          </div>
        </div>
      </div>

      <!-- Revenue Chart -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <div class="flex justify-between items-center mb-6">
          <h3 class="font-bold">Faturamento por Mês</h3>
          <div class="flex space-x-2">
            <button class="px-3 py-1 text-sm bg-primary text-white rounded-md">
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
          class="h-80 bg-gray-50 rounded-lg flex items-center justify-center"
        >
          <div class="text-center">
            <Icon
              name="heroicons:chart-bar"
              class="w-12 h-12 text-gray-300 mx-auto mb-2"
            />
            <p class="text-gray-500">Gráfico de Faturamento Mensal</p>
          </div>
        </div>
      </div>

      <!-- Revenue by Excursion and Payment Methods -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <!-- Revenue by Excursion -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="font-bold mb-6">Faturamento por Excursão</h3>

          <div class="space-y-4">
            <div v-for="(excursion, index) in revenueByExcursion" :key="index">
              <div class="flex justify-between items-center mb-1">
                <span class="font-medium">{{ excursion.title }}</span>
                <span class="font-bold">R$ {{ excursion.revenue }}</span>
              </div>
              <div class="h-2 bg-gray-200 rounded-full">
                <div
                  class="h-2 bg-primary rounded-full"
                  :style="`width: ${excursion.percentage}%`"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Payment Methods -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="font-bold mb-6">Métodos de Pagamento</h3>

          <!-- Donut Chart Placeholder -->
          <div class="flex items-center justify-center mb-6">
            <div
              class="w-40 h-40 rounded-full border-8 border-primary relative"
            >
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="text-center">
                  <div class="text-2xl font-bold">65%</div>
                  <div class="text-xs text-gray-500">Cartão de Crédito</div>
                </div>
              </div>
            </div>
          </div>

          <div class="space-y-3">
            <div class="flex justify-between items-center">
              <div class="flex items-center">
                <div class="w-3 h-3 bg-primary rounded-full mr-2"></div>
                <span>Cartão de Crédito</span>
              </div>
              <span>65%</span>
            </div>
            <div class="flex justify-between items-center">
              <div class="flex items-center">
                <div class="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span>PIX</span>
              </div>
              <span>25%</span>
            </div>
            <div class="flex justify-between items-center">
              <div class="flex items-center">
                <div class="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                <span>Boleto</span>
              </div>
              <span>10%</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Transactions -->
      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="font-bold">Transações Recentes</h3>
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  ID
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Data
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Cliente
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Excursão
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Método
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Valor
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="transaction in recentTransactions"
                :key="transaction.id"
                class="hover:bg-gray-50"
              >
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                >
                  #{{ transaction.id }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ transaction.date }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">
                    {{ transaction.customer }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ transaction.excursion }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <Icon
                      :name="getPaymentIcon(transaction.method)"
                      class="w-4 h-4 mr-1 text-gray-500"
                    />
                    <span class="text-sm text-gray-900">{{
                      getPaymentMethod(transaction.method)
                    }}</span>
                  </div>
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                >
                  R$ {{ transaction.amount }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                    :class="getTransactionStatusClass(transaction.status)"
                  >
                    {{ transaction.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-700">
                Mostrando <span class="font-medium">1</span> a
                <span class="font-medium">10</span> de
                <span class="font-medium">{{ recentTransactions.length }}</span>
                resultados
              </p>
            </div>
            <div>
              <button class="text-primary text-sm hover:underline">
                Ver todas as transações
              </button>
            </div>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Revenue by Excursion
const revenueByExcursion = [
  { title: 'Fim de Semana em Ilhabela', revenue: '38,400', percentage: 80 },
  { title: 'Thermas dos Laranjais', revenue: '32,400', percentage: 65 },
  { title: 'Feriado em Paraty', revenue: '24,300', percentage: 50 },
  { title: 'Campos do Jordão', revenue: '18,400', percentage: 40 },
  {
    title: 'Expedição Serra da Mantiqueira',
    revenue: '12,000',
    percentage: 25,
  },
];

// Recent Transactions
const recentTransactions = [
  {
    id: '1234',
    date: '15/04/2025',
    customer: 'João Silva',
    excursion: 'Fim de Semana em Ilhabela',
    method: 'credit_card',
    amount: '2,400',
    status: 'Pago',
  },
  {
    id: '1235',
    date: '14/04/2025',
    customer: 'Maria Oliveira',
    excursion: 'Thermas dos Laranjais',
    method: 'pix',
    amount: '7,200',
    status: 'Pago',
  },
  {
    id: '1236',
    date: '12/04/2025',
    customer: 'Pedro Santos',
    excursion: 'Campos do Jordão',
    method: 'credit_card',
    amount: '2,800',
    status: 'Pago',
  },
  {
    id: '1237',
    date: '10/04/2025',
    customer: 'Ana Costa',
    excursion: 'Feriado em Paraty',
    method: 'boleto',
    amount: '1,350',
    status: 'Pendente',
  },
  {
    id: '1238',
    date: '08/04/2025',
    customer: 'Carlos Mendes',
    excursion: 'Expedição Serra da Mantiqueira',
    method: 'credit_card',
    amount: '3,000',
    status: 'Pago',
  },
];

// Helper methods
const getPaymentMethod = (method) => {
  const methods = {
    credit_card: 'Cartão de Crédito',
    pix: 'PIX',
    boleto: 'Boleto',
  };

  return methods[method] || method;
};

const getPaymentIcon = (method) => {
  const icons = {
    credit_card: 'heroicons:credit-card',
    pix: 'heroicons:qr-code',
    boleto: 'heroicons:document-text',
  };

  return icons[method] || 'heroicons:banknotes';
};

const getTransactionStatusClass = (status) => {
  if (status === 'Pago') {
    return 'bg-green-100 text-green-800';
  } else if (status === 'Pendente') {
    return 'bg-yellow-100 text-yellow-800';
  } else if (status === 'Cancelado') {
    return 'bg-red-100 text-red-800';
  } else {
    return 'bg-gray-100 text-gray-800';
  }
};
</script>
