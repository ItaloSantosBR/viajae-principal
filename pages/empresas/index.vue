<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- Hero section -->
    <section class="relative bg-gray-900 text-white">
      <div
        class="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent z-10"
      ></div>
      <div
        class="absolute inset-0 bg-cover bg-center"
        style="
          background-image: url('https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80');
        "
      ></div>

      <div class="container-custom relative z-20 py-20 md:py-32">
        <div class="max-w-2xl">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">
            Mais visibilidade, <br> Mais reservas, <br> <span class="font-extrabold"> Sem complicação! </span>
          </h1>
          <p class="text-2xl mb-8">
          Seja uma empresa parceira
          </p>
        </div>
      </div>
    </section>

    <!-- Main content -->
    <div class="container-custom py-12">
      <!-- For Companies CTA -->
      <div class="bg-white rounded-lg shadow-md overflow-hidden mb-12">
        <div class="md:flex">
          <div class="md:w-2/3 p-8">
            <h2 class="text-3xl font-bold mb-4">
              Quer aumentar a receita da sua agência?
            </h2>
            <p class="text-gray-600 mb-6">
              Cadastre seus pacotes e conecte-se a um público pronto para embarcar nas suas viagens.
            </p>
            <ul class="space-y-3 mb-8">
              <li class="flex items-start">
                <Icon
                  name="heroicons:check-circle"
                  class="w-6 h-6 text-primary mr-2 flex-shrink-0"
                />
                <span>Cadastre suas excursões com todos os detalhes</span>
              </li>
              <li class="flex items-start">
                <Icon
                  name="heroicons:check-circle"
                  class="w-6 h-6 text-primary mr-2 flex-shrink-0"
                />
                <span>Gerencie reservas e pagamentos em um só lugar</span>
              </li>
              <li class="flex items-start">
                <Icon
                  name="heroicons:check-circle"
                  class="w-6 h-6 text-primary mr-2 flex-shrink-0"
                />
                <span>Aumente sua visibilidade e alcance novos clientes</span>
              </li>
              <li class="flex items-start">
                <Icon
                  name="heroicons:check-circle"
                  class="w-6 h-6 text-primary mr-2 flex-shrink-0"
                />
                <span>Receba avaliações e construa sua reputação</span>
              </li>
            </ul>
            <NuxtLink to="/cadastro" class="btn btn-primary">
              Cadastre sua Empresa
            </NuxtLink>
          </div>
          <div
            class="md:w-1/3 bg-primary-50 flex items-center justify-center p-8"
          >
            <img src="/logo.svg" alt="Viajae" class="h-32" />
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div class="bg-white rounded-lg shadow-md p-6 text-center">
          <div
            class="bg-primary-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <Icon name="heroicons:user-plus" class="w-6 h-6 text-primary" />
          </div>
          <h3 class="text-lg font-bold mb-2">1. Cadastre-se</h3>
          <p class="text-gray-700 text-sm">
            Crie sua conta como empresa de turismo e complete seu perfil com
            todas as informações.
          </p>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6 text-center">
          <div
            class="bg-primary-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <Icon name="heroicons:plus-circle" class="w-6 h-6 text-primary" />
          </div>
          <h3 class="text-lg font-bold mb-2">2. Adicione Excursões</h3>
          <p class="text-gray-700 text-sm">
            Cadastre suas excursões com todos os detalhes: datas, destino,
            hospedagem, serviços inclusos e preços.
          </p>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6 text-center">
          <div
            class="bg-primary-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <Icon
              name="heroicons:clipboard-document-list"
              class="w-6 h-6 text-primary"
            />
          </div>
          <h3 class="text-lg font-bold mb-2">3. Gerencie Reservas</h3>
          <p class="text-gray-700 text-sm">
            Acompanhe reservas, confirme pagamentos e mantenha contato com os
            clientes através da plataforma.
          </p>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6 text-center">
          <div
            class="bg-primary-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <Icon name="heroicons:chart-bar" class="w-6 h-6 text-primary" />
          </div>
          <h3 class="text-lg font-bold mb-2">4. Cresça</h3>
          <p class="text-gray-700 text-sm">
            Receba avaliações, construa sua reputação e amplie seu alcance para
            novos clientes.
          </p>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-md overflow-hidden mb-12">
        <div class="md:flex flex-row-reverse">
          <div class="md:w-1/2 p-8">
            <h3 class="text-2xl font-bold mb-4">Porque se cadastrar?</h3>
            <ul class="space-y-4">
              <li class="flex items-start">
                <Icon
                  name="heroicons:check-circle"
                  class="w-6 h-6 text-primary mr-3 flex-shrink-0"
                />
                <div>
                  <h4 class="font-bold">Maior visibilidade</h4>
                  <p class="text-gray-700">
                    Alcance novos clientes através da nossa plataforma
                    especializada em excursões.
                  </p>
                </div>
              </li>
              <li class="flex items-start">
                <Icon
                  name="heroicons:check-circle"
                  class="w-6 h-6 text-primary mr-3 flex-shrink-0"
                />
                <div>
                  <h4 class="font-bold">Gestão simplificada</h4>
                  <p class="text-gray-700">
                    Gerencie reservas, pagamentos e comunicação com clientes em
                    um único sistema.
                  </p>
                </div>
              </li>
              <li class="flex items-start">
                <Icon
                  name="heroicons:check-circle"
                  class="w-6 h-6 text-primary mr-3 flex-shrink-0"
                />
                <div>
                  <h4 class="font-bold">Credibilidade</h4>
                  <p class="text-gray-700">
                    Construa sua reputação através de avaliações verificadas e
                    aumente a confiança dos clientes.
                  </p>
                </div>
              </li>
              <li class="flex items-start">
                <Icon
                  name="heroicons:check-circle"
                  class="w-6 h-6 text-primary mr-3 flex-shrink-0"
                />
                <div>
                  <h4 class="font-bold">Análise de desempenho</h4>
                  <p class="text-gray-700">
                    Acesse relatórios e estatísticas para otimizar suas ofertas
                    e aumentar suas vendas.
                  </p>
                </div>
              </li>
            </ul>

            <div class="mt-8">
              <NuxtLink to="/cadastro" class="btn btn-primary">
                Cadastrar Minha Empresa
              </NuxtLink>
            </div>
          </div>

          <div class="md:w-1/2 bg-gray-100">
            <img
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Empresa de turismo"
              class="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <!-- Companies list -->
      <h2 class="text-3xl font-bold mb-8">Nossas Empresas Parceiras</h2>

      <!-- Loading state -->
      <div v-if="loading" class="flex justify-center py-12">
        <div
          class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"
        ></div>
      </div>

      <!-- Error state -->
      <div v-else-if="error" class="bg-red-50 text-red-600 p-6 rounded-lg">
        <Icon
          name="heroicons:exclamation-circle"
          class="w-12 h-12 mx-auto mb-4"
        />
        <h3 class="text-xl font-bold mb-2 text-center">
          Erro ao carregar empresas
        </h3>
        <p class="text-center">{{ error }}</p>
      </div>

      <!-- Companies grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="company in companies"
          :key="company.id"
          class="bg-white rounded-lg shadow-md overflow-hidden group"
        >
          <div class="h-48 overflow-hidden relative">
            <img
              :src="
                company.coverImage ||
                `https://source.unsplash.com/random/800x600/?travel,company`
              "
              :alt="company.name"
              class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"
            ></div>
            <div class="absolute bottom-0 left-0 right-0 p-4">
              <div class="flex items-center">
                <div class="flex text-primary mr-1">
                  <Icon
                    v-for="i in 5"
                    :key="i"
                    name="heroicons:star"
                    class="w-4 h-4"
                    :class="
                      i <= company.rating ? 'text-primary' : 'text-gray-300'
                    "
                  />
                </div>
                <span class="text-white text-sm"
                  >({{ company.reviewCount }})</span
                >
              </div>
            </div>
          </div>

          <div class="p-6">
            <div class="flex items-center mb-4">
              <div
                class="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center mr-4"
              >
                <Icon
                  name="heroicons:building-office-2"
                  class="w-6 h-6 text-gray-500"
                />
              </div>
              <div>
                <h3 class="text-xl font-bold">{{ company.name }}</h3>
                <p class="text-gray-600">{{ company.location }}</p>
              </div>
            </div>

            <p class="text-gray-700 mb-4 line-clamp-3">
              {{ company.description }}
            </p>

            <div class="flex flex-wrap gap-4 mb-6">
              <div class="flex items-center text-gray-600 text-sm">
                <Icon name="heroicons:calendar" class="w-4 h-4 mr-1" />
                <span>Desde {{ company.foundedYear }}</span>
              </div>
              <div class="flex items-center text-gray-600 text-sm">
                <Icon name="heroicons:map" class="w-4 h-4 mr-1" />
                <span>{{ company.excursionsCount }} excursões</span>
              </div>
            </div>

            <NuxtLink
              :to="`/empresas/${company.id}`"
              class="btn btn-primary w-full text-center"
            >
              Ver Empresa
            </NuxtLink>
          </div>
        </div>
      </div>
      
    </div>

  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useCompaniesStore } from '~/stores/companies';

const companiesStore = useCompaniesStore();

// Computed properties
const loading = computed(() => companiesStore.loading);
const error = computed(() => companiesStore.error);
const companies = computed(() => companiesStore.companies);

// Fetch data
onMounted(async () => {
  await companiesStore.fetchCompanies();
});
</script>
