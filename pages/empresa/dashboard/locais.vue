<template>
  <div>
    <NuxtLayout name="dashboard">
      <!-- Page Header -->
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">Locais de Embarque</h1>
        <button class="btn btn-primary flex items-center" @click="showAddLocationModal = true">
          <Icon name="heroicons:plus" class="w-5 h-5 mr-1" />
          Novo Local
        </button>
      </div>
      
      <!-- Map View -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="font-bold">Mapa de Locais</h3>
          <div class="flex space-x-2">
            <button class="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md flex items-center">
              <Icon name="heroicons:map" class="w-4 h-4 mr-1" />
              Visualizar Mapa
            </button>
          </div>
        </div>
        
        <!-- Map Placeholder -->
        <div class="h-80 bg-gray-100 rounded-lg flex items-center justify-center">
          <div class="text-center">
            <Icon name="heroicons:map" class="w-12 h-12 text-gray-300 mx-auto mb-2" />
            <p class="text-gray-500">Mapa de Locais de Embarque</p>
          </div>
        </div>
      </div>
      
      <!-- Locations List -->
      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 class="font-bold">Locais Cadastrados</h3>
          <div class="relative">
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="Buscar locais..." 
              class="form-input pl-10 pr-4 py-2 w-full md:w-64"
            />
            <Icon 
              name="heroicons:magnifying-glass" 
              class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" 
            />
          </div>
        </div>
        
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nome
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Endereço
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cidade
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Horário Padrão
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Excursões
                </th>
                <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="location in filteredLocations" :key="location.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="bg-primary-50 p-2 rounded-full mr-3">
                      <Icon name="heroicons:map-pin" class="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div class="text-sm font-medium text-gray-900">{{ location.name }}</div>
                      <div class="text-xs text-gray-500">ID: {{ location.id }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ location.address }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ location.city }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ location.defaultTime }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary-100 text-primary-800">
                    {{ location.excursionsCount }} excursões
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div class="flex justify-end space-x-2">
                    <button class="text-primary hover:text-primary-600" @click="editLocation(location)">
                      <Icon name="heroicons:pencil-square" class="w-5 h-5" />
                    </button>
                    <button class="text-gray-500 hover:text-gray-700">
                      <Icon name="heroicons:map" class="w-5 h-5" />
                    </button>
                    <button class="text-red-500 hover:text-red-700" @click="confirmDeleteLocation(location)">
                      <Icon name="heroicons:trash" class="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- Empty State -->
        <div v-if="filteredLocations.length === 0" class="py-12 text-center">
          <Icon name="heroicons:map-pin" class="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 class="text-lg font-medium text-gray-900 mb-2">Nenhum local encontrado</h3>
          <p class="text-gray-500 mb-4">Não há locais de embarque cadastrados ou que correspondam à sua busca.</p>
          <button class="btn btn-primary" @click="showAddLocationModal = true">
            Adicionar Novo Local
          </button>
        </div>
      </div>
      
      <!-- Add/Edit Location Modal -->
      <div v-if="showAddLocationModal || showEditLocationModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="font-bold text-lg">{{ showEditLocationModal ? 'Editar Local' : 'Adicionar Novo Local' }}</h3>
          </div>
          
          <div class="p-6">
            <form @submit.prevent="saveLocation">
              <div class="space-y-4">
                <div>
                  <label for="name" class="form-label">Nome do Local</label>
                  <input 
                    id="name" 
                    v-model="locationForm.name" 
                    type="text" 
                    class="form-input" 
                    placeholder="Ex: Terminal Rodoviário Tietê" 
                    required
                  />
                </div>
                
                <div>
                  <label for="address" class="form-label">Endereço</label>
                  <input 
                    id="address" 
                    v-model="locationForm.address" 
                    type="text" 
                    class="form-input" 
                    placeholder="Ex: Av. Cruzeiro do Sul, 1800" 
                    required
                  />
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label for="city" class="form-label">Cidade</label>
                    <input 
                      id="city" 
                      v-model="locationForm.city" 
                      type="text" 
                      class="form-input" 
                      placeholder="Ex: São Paulo" 
                      required
                    />
                  </div>
                  
                  <div>
                    <label for="state" class="form-label">Estado</label>
                    <input 
                      id="state" 
                      v-model="locationForm.state" 
                      type="text" 
                      class="form-input" 
                      placeholder="Ex: SP" 
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label for="defaultTime" class="form-label">Horário Padrão de Embarque</label>
                  <input 
                    id="defaultTime" 
                    v-model="locationForm.defaultTime" 
                    type="time" 
                    class="form-input" 
                    required
                  />
                </div>
                
                <div>
                  <label for="description" class="form-label">Descrição (opcional)</label>
                  <textarea 
                    id="description" 
                    v-model="locationForm.description" 
                    class="form-input" 
                    rows="3" 
                    placeholder="Informações adicionais sobre o local de embarque"
                  ></textarea>
                </div>
              </div>
              
              <div class="mt-6 flex justify-end space-x-3">
                <button 
                  type="button" 
                  class="btn btn-outline" 
                  @click="closeLocationModal"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  class="btn btn-primary"
                >
                  {{ showEditLocationModal ? 'Salvar Alterações' : 'Adicionar Local' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <!-- Delete Confirmation Modal -->
      <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="font-bold text-lg">Confirmar Exclusão</h3>
          </div>
          
          <div class="p-6">
            <p class="mb-4">Tem certeza que deseja excluir o local <span class="font-bold">{{ locationToDelete?.name }}</span>?</p>
            <p class="text-red-600 mb-6">Esta ação não pode ser desfeita.</p>
            
            <div class="flex justify-end space-x-3">
              <button 
                type="button" 
                class="btn btn-outline" 
                @click="showDeleteModal = false"
              >
                Cancelar
              </button>
              <button 
                type="button" 
                class="btn bg-red-600 hover:bg-red-700 text-white"
                @click="deleteLocation"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// State
const searchQuery = ref('');
const showAddLocationModal = ref(false);
const showEditLocationModal = ref(false);
const showDeleteModal = ref(false);
const locationToDelete = ref(null);
const locationForm = ref({
  name: '',
  address: '',
  city: '',
  state: '',
  defaultTime: '06:00',
  description: ''
});
const editingLocationId = ref(null);

// Mock locations data
const locations = ref([
  {
    id: 'location1',
    name: 'Terminal Rodoviário Tietê',
    address: 'Av. Cruzeiro do Sul, 1800 - Santana',
    city: 'São Paulo',
    state: 'SP',
    defaultTime: '06:00',
    description: 'Ponto principal de embarque, localizado próximo à estação de metrô.',
    excursionsCount: 12
  },
  {
    id: 'location2',
    name: 'Metrô Barra Funda',
    address: 'Av. Mário de Andrade, 664 - Barra Funda',
    city: 'São Paulo',
    state: 'SP',
    defaultTime: '06:30',
    description: 'Ponto de embarque alternativo na zona oeste.',
    excursionsCount: 8
  },
  {
    id: 'location3',
    name: 'Shopping Ibirapuera',
    address: 'Av. Ibirapuera, 3103 - Indianópolis',
    city: 'São Paulo',
    state: 'SP',
    defaultTime: '07:00',
    description: 'Ponto de embarque na zona sul, próximo ao Parque Ibirapuera.',
    excursionsCount: 5
  },
  {
    id: 'location4',
    name: 'Shopping Center Norte',
    address: 'Travessa Casalbuono, 120 - Vila Guilherme',
    city: 'São Paulo',
    state: 'SP',
    defaultTime: '06:15',
    description: 'Ponto de embarque na zona norte, com amplo estacionamento.',
    excursionsCount: 7
  }
]);

// Computed
const filteredLocations = computed(() => {
  if (!searchQuery.value) return locations.value;
  
  const query = searchQuery.value.toLowerCase();
  return locations.value.filter(location => 
    location.name.toLowerCase().includes(query) ||
    location.address.toLowerCase().includes(query) ||
    location.city.toLowerCase().includes(query)
  );
});

// Methods
const editLocation = (location) => {
  locationForm.value = { ...location };
  editingLocationId.value = location.id;
  showEditLocationModal.value = true;
};

const confirmDeleteLocation = (location) => {
  locationToDelete.value = location;
  showDeleteModal.value = true;
};

const deleteLocation = () => {
  // In a real app, this would call an API
  const index = locations.value.findIndex(loc => loc.id === locationToDelete.value.id);
  if (index !== -1) {
    locations.value.splice(index, 1);
  }
  
  showDeleteModal.value = false;
  locationToDelete.value = null;
};

const closeLocationModal = () => {
  showAddLocationModal.value = false;
  showEditLocationModal.value = false;
  locationForm.value = {
    name: '',
    address: '',
    city: '',
    state: '',
    defaultTime: '06:00',
    description: ''
  };
  editingLocationId.value = null;
};

const saveLocation = () => {
  if (showEditLocationModal.value) {
    // Update existing location
    const index = locations.value.findIndex(loc => loc.id === editingLocationId.value);
    if (index !== -1) {
      locations.value[index] = {
        ...locations.value[index],
        ...locationForm.value
      };
    }
  } else {
    // Add new location
    const newLocation = {
      id: `location${locations.value.length + 1}`,
      ...locationForm.value,
      excursionsCount: 0
    };
    
    locations.value.push(newLocation);
  }
  
  closeLocationModal();
};
</script>
