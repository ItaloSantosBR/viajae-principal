<template>
  <div>
    <NuxtLayout name="dashboard">
      <!-- Page Header -->
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">Cadastrar Nova Excursão</h1>
        <NuxtLink to="/empresa/dashboard/excursoes" class="btn btn-outline flex items-center">
          <Icon name="heroicons:arrow-left" class="w-5 h-5 mr-1" />
          Voltar para Excursões
        </NuxtLink>
      </div>
      
      <!-- Form Steps -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <div class="flex flex-wrap justify-between mb-8">
          <div 
            v-for="(step, index) in steps" 
            :key="index" 
            class="flex flex-col items-center mb-4 sm:mb-0"
            :class="[
              index === currentStep ? 'text-primary' : 
              index < currentStep ? 'text-gray-500' : 'text-gray-300',
              {'sm:flex-1': true}
            ]"
          >
            <div 
              class="w-10 h-10 rounded-full flex items-center justify-center mb-2 border-2"
              :class="[
                index === currentStep ? 'border-primary bg-primary-50 text-primary' : 
                index < currentStep ? 'border-gray-500 bg-gray-100 text-gray-500' : 'border-gray-300 bg-gray-50 text-gray-300'
              ]"
            >
              <span v-if="index < currentStep">
                <Icon name="heroicons:check" class="w-5 h-5" />
              </span>
              <span v-else>{{ index + 1 }}</span>
            </div>
            <span class="text-sm text-center">{{ step.name }}</span>
          </div>
        </div>
        
        <!-- Form Content -->
        <div>
          <!-- Step 1: Informações Gerais -->
          <div v-if="currentStep === 0">
            <h2 class="text-xl font-bold mb-4">Informações Gerais</h2>
            <div class="space-y-4">
              <div>
                <label for="title" class="form-label">Nome da Excursão*</label>
                <input 
                  id="title" 
                  v-model="formData.title" 
                  type="text" 
                  class="form-input" 
                  placeholder="Ex: Fim de Semana em Ilhabela"
                  required
                />
                <p v-if="errors.title" class="text-red-500 text-sm mt-1">{{ errors.title }}</p>
              </div>
              
              <div>
                <label for="description" class="form-label">Descrição Detalhada*</label>
                <textarea 
                  id="description" 
                  v-model="formData.description" 
                  class="form-input" 
                  rows="5" 
                  placeholder="Descreva os detalhes da excursão, atrativos, diferenciais, etc."
                  required
                ></textarea>
                <p v-if="errors.description" class="text-red-500 text-sm mt-1">{{ errors.description }}</p>
              </div>
              
              <div>
                <label for="category" class="form-label">Categoria*</label>
                <select 
                  id="category" 
                  v-model="formData.category" 
                  class="form-input"
                  required
                >
                  <option value="">Selecione uma categoria</option>
                  <option v-for="category in categories" :key="category.id" :value="category.id">
                    {{ category.name }}
                  </option>
                </select>
                <p v-if="errors.category" class="text-red-500 text-sm mt-1">{{ errors.category }}</p>
              </div>
              
              <div>
                <label class="form-label">Imagens Promocionais*</label>
                <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <div v-if="formData.images.length > 0" class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div v-for="(image, index) in formData.images" :key="index" class="relative">
                      <img :src="image" alt="Preview" class="h-32 w-full object-cover rounded-lg" />
                      <button 
                        @click="removeImage(index)" 
                        class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                      >
                        <Icon name="heroicons:x-mark" class="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div class="space-y-2">
                    <Icon name="heroicons:photo" class="w-12 h-12 text-gray-400 mx-auto" />
                    <p class="text-gray-500">Arraste e solte imagens aqui ou clique para selecionar</p>
                    <p class="text-gray-400 text-sm">Recomendado: pelo menos 3 imagens de alta qualidade</p>
                    <button class="btn btn-outline mt-2">Selecionar Imagens</button>
                  </div>
                </div>
                <p v-if="errors.images" class="text-red-500 text-sm mt-1">{{ errors.images }}</p>
              </div>
            </div>
          </div>
          
          <!-- Step 2: Detalhes da Viagem -->
          <div v-if="currentStep === 1">
            <h2 class="text-xl font-bold mb-4">Detalhes da Viagem</h2>
            <div class="space-y-4">
              <div>
                <label for="originCity" class="form-label">Cidade de Origem*</label>
                <input 
                  id="originCity" 
                  v-model="formData.originCity" 
                  type="text" 
                  class="form-input" 
                  placeholder="Ex: São Paulo, SP"
                  required
                />
                <p v-if="errors.originCity" class="text-red-500 text-sm mt-1">{{ errors.originCity }}</p>
              </div>
              
              <div>
                <label for="destination" class="form-label">Destino da Excursão*</label>
                <input 
                  id="destination" 
                  v-model="formData.destination" 
                  type="text" 
                  class="form-input" 
                  placeholder="Ex: Ilhabela, SP"
                  required
                />
                <p v-if="errors.destination" class="text-red-500 text-sm mt-1">{{ errors.destination }}</p>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label for="startDate" class="form-label">Data de Início*</label>
                  <input 
                    id="startDate" 
                    v-model="formData.startDate" 
                    type="date" 
                    class="form-input"
                    required
                  />
                  <p v-if="errors.startDate" class="text-red-500 text-sm mt-1">{{ errors.startDate }}</p>
                </div>
                
                <div>
                  <label for="endDate" class="form-label">Data de Término*</label>
                  <input 
                    id="endDate" 
                    v-model="formData.endDate" 
                    type="date" 
                    class="form-input"
                    required
                  />
                  <p v-if="errors.endDate" class="text-red-500 text-sm mt-1">{{ errors.endDate }}</p>
                </div>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label for="capacity" class="form-label">Capacidade Máxima*</label>
                  <input 
                    id="capacity" 
                    v-model="formData.capacity" 
                    type="number" 
                    min="1" 
                    class="form-input"
                    required
                  />
                  <p v-if="errors.capacity" class="text-red-500 text-sm mt-1">{{ errors.capacity }}</p>
                </div>
                
                <div>
                  <label for="availableSpots" class="form-label">Vagas Disponíveis*</label>
                  <input 
                    id="availableSpots" 
                    v-model="formData.availableSpots" 
                    type="number" 
                    min="1" 
                    :max="formData.capacity" 
                    class="form-input"
                    required
                  />
                  <p v-if="errors.availableSpots" class="text-red-500 text-sm mt-1">{{ errors.availableSpots }}</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Step 3: Hospedagem -->
          <div v-if="currentStep === 2">
            <h2 class="text-xl font-bold mb-4">Hospedagem</h2>
            <div class="space-y-4">
              <div>
                <label for="accommodationName" class="form-label">Nome do Hotel/Pousada*</label>
                <input 
                  id="accommodationName" 
                  v-model="formData.accommodation.name" 
                  type="text" 
                  class="form-input" 
                  placeholder="Ex: Pousada Mar Azul"
                  required
                />
                <p v-if="errors.accommodationName" class="text-red-500 text-sm mt-1">{{ errors.accommodationName }}</p>
              </div>
              
              <div>
                <label for="accommodationType" class="form-label">Tipo de Acomodação*</label>
                <select 
                  id="accommodationType" 
                  v-model="formData.accommodation.type" 
                  class="form-input"
                  required
                >
                  <option value="">Selecione o tipo</option>
                  <option value="Hotel">Hotel</option>
                  <option value="Pousada">Pousada</option>
                  <option value="Resort">Resort</option>
                  <option value="Chalé">Chalé</option>
                  <option value="Hostel">Hostel</option>
                  <option value="Apartamento">Apartamento</option>
                  <option value="Casa">Casa</option>
                </select>
                <p v-if="errors.accommodationType" class="text-red-500 text-sm mt-1">{{ errors.accommodationType }}</p>
              </div>
              
              <div>
                <label class="form-label">Comodidades Incluídas</label>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div v-for="(amenity, index) in amenities" :key="index" class="flex items-center">
                    <input 
                      :id="`amenity-${index}`" 
                      type="checkbox" 
                      v-model="formData.accommodation.amenities" 
                      :value="amenity" 
                      class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <label :for="`amenity-${index}`" class="ml-2 block text-sm text-gray-700">
                      {{ amenity }}
                    </label>
                  </div>
                </div>
              </div>
              
              <div>
                <label class="form-label">Refeições Incluídas</label>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div v-for="(meal, index) in meals" :key="index" class="flex items-center">
                    <input 
                      :id="`meal-${index}`" 
                      type="checkbox" 
                      v-model="formData.accommodation.meals" 
                      :value="meal" 
                      class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <label :for="`meal-${index}`" class="ml-2 block text-sm text-gray-700">
                      {{ meal }}
                    </label>
                  </div>
                </div>
              </div>
              
              <div>
                <label for="accommodationDescription" class="form-label">Descrição da Hospedagem</label>
                <textarea 
                  id="accommodationDescription" 
                  v-model="formData.accommodation.description" 
                  class="form-input" 
                  rows="3" 
                  placeholder="Descreva detalhes adicionais sobre a hospedagem"
                ></textarea>
              </div>
            </div>
          </div>
          
          <!-- Step 4: Serviços Adicionais -->
          <div v-if="currentStep === 3">
            <h2 class="text-xl font-bold mb-4">Serviços Inclusos</h2>
            <div class="space-y-4">
              <div>
                <label class="form-label">Serviços Incluídos na Excursão*</label>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div v-for="service in additionalServices" :key="service.id" class="flex items-center">
                    <input 
                      :id="`service-${service.id}`" 
                      type="checkbox" 
                      v-model="formData.includedServices" 
                      :value="service.id" 
                      class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <label :for="`service-${service.id}`" class="ml-2 block text-sm text-gray-700">
                      {{ service.name }}
                    </label>
                  </div>
                </div>
                <p v-if="errors.includedServices" class="text-red-500 text-sm mt-1">{{ errors.includedServices }}</p>
              </div>
              
              <div>
                <label class="form-label">Adicionar Novo Serviço</label>
                <div class="flex space-x-2">
                  <input 
                    v-model="newService" 
                    type="text" 
                    class="form-input" 
                    placeholder="Nome do novo serviço"
                  />
                  <button 
                    @click="addCustomService" 
                    class="btn btn-primary"
                    :disabled="!newService.trim()"
                  >
                    Adicionar
                  </button>
                </div>
              </div>
              
              <div v-if="formData.customServices.length > 0">
                <label class="form-label">Serviços Personalizados</label>
                <div class="space-y-2">
                  <div 
                    v-for="(service, index) in formData.customServices" 
                    :key="index" 
                    class="flex items-center justify-between bg-gray-50 p-2 rounded-lg"
                  >
                    <span>{{ service }}</span>
                    <button @click="removeCustomService(index)" class="text-red-500">
                      <Icon name="heroicons:trash" class="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
              
              <div>
                <label for="servicesDescription" class="form-label">Detalhes Adicionais sobre os Serviços</label>
                <textarea 
                  id="servicesDescription" 
                  v-model="formData.servicesDescription" 
                  class="form-input" 
                  rows="3" 
                  placeholder="Descreva detalhes adicionais sobre os serviços inclusos"
                ></textarea>
              </div>
            </div>
          </div>
          
          <!-- Step 5: Pontos de Embarque -->
          <div v-if="currentStep === 4">
            <h2 class="text-xl font-bold mb-4">Pontos de Embarque</h2>
            <div class="space-y-4">
              <div>
                <label class="form-label">Selecione os Locais de Embarque*</label>
                <div class="space-y-3">
                  <div 
                    v-for="location in pickupLocations" 
                    :key="location.id" 
                    class="flex items-start"
                  >
                    <input 
                      :id="`location-${location.id}`" 
                      type="checkbox" 
                      v-model="formData.pickupLocations" 
                      :value="location.id" 
                      class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded mt-1"
                    />
                    <label :for="`location-${location.id}`" class="ml-2 block">
                      <span class="font-medium">{{ location.name }}</span>
                      <p class="text-sm text-gray-600">{{ location.address }}</p>
                    </label>
                  </div>
                </div>
                <p v-if="errors.pickupLocations" class="text-red-500 text-sm mt-1">{{ errors.pickupLocations }}</p>
              </div>
              
              <div>
                <label class="form-label">Adicionar Novo Local de Embarque</label>
                <div class="bg-gray-50 p-4 rounded-lg">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label for="newLocationName" class="form-label">Nome do Local</label>
                      <input 
                        id="newLocationName" 
                        v-model="newLocation.name" 
                        type="text" 
                        class="form-input" 
                        placeholder="Ex: Terminal Rodoviário Tietê"
                      />
                    </div>
                    
                    <div>
                      <label for="newLocationTime" class="form-label">Horário de Saída</label>
                      <input 
                        id="newLocationTime" 
                        v-model="newLocation.departureTime" 
                        type="time" 
                        class="form-input"
                      />
                    </div>
                  </div>
                  
                  <div class="mb-4">
                    <label for="newLocationAddress" class="form-label">Endereço Completo</label>
                    <input 
                      id="newLocationAddress" 
                      v-model="newLocation.address" 
                      type="text" 
                      class="form-input" 
                      placeholder="Ex: Av. Cruzeiro do Sul, 1800 - Santana, São Paulo - SP"
                    />
                  </div>
                  
                  <button 
                    @click="addNewLocation" 
                    class="btn btn-primary"
                    :disabled="!newLocation.name || !newLocation.address || !newLocation.departureTime"
                  >
                    Adicionar Local
                  </button>
                </div>
              </div>
              
              <div v-if="formData.customPickupLocations.length > 0">
                <label class="form-label">Novos Locais de Embarque</label>
                <div class="space-y-3">
                  <div 
                    v-for="(location, index) in formData.customPickupLocations" 
                    :key="index" 
                    class="flex justify-between items-start bg-gray-50 p-3 rounded-lg"
                  >
                    <div>
                      <div class="font-medium">{{ location.name }}</div>
                      <div class="text-sm text-gray-600">{{ location.address }}</div>
                      <div class="text-sm text-gray-600">Horário: {{ location.departureTime }}</div>
                    </div>
                    <button @click="removeCustomLocation(index)" class="text-red-500">
                      <Icon name="heroicons:trash" class="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Step 6: Valores e Pagamento -->
          <div v-if="currentStep === 5">
            <h2 class="text-xl font-bold mb-4">Valores e Pagamento</h2>
            <div class="space-y-4">
              <div>
                <label for="price" class="form-label">Preço por Pessoa (R$)*</label>
                <input 
                  id="price" 
                  v-model="formData.price" 
                  type="number" 
                  min="0" 
                  step="0.01" 
                  class="form-input"
                  required
                />
                <p v-if="errors.price" class="text-red-500 text-sm mt-1">{{ errors.price }}</p>
              </div>
              
              <div>
                <label class="form-label">Opções de Parcelamento</label>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <div v-for="installment in installmentOptions" :key="installment" class="flex items-center">
                    <input 
                      :id="`installment-${installment}`" 
                      type="checkbox" 
                      v-model="formData.installmentOptions" 
                      :value="installment" 
                      class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <label :for="`installment-${installment}`" class="ml-2 block text-sm text-gray-700">
                      {{ installment }}x
                    </label>
                  </div>
                </div>
              </div>
              
              <div>
                <label class="form-label">Métodos de Pagamento Aceitos</label>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <div v-for="method in paymentMethods" :key="method.id" class="flex items-center">
                    <input 
                      :id="`payment-${method.id}`" 
                      type="checkbox" 
                      v-model="formData.paymentMethods" 
                      :value="method.id" 
                      class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <label :for="`payment-${method.id}`" class="ml-2 block text-sm text-gray-700">
                      {{ method.name }}
                    </label>
                  </div>
                </div>
              </div>
              
              <div>
                <label for="cancellationPolicy" class="form-label">Política de Cancelamento*</label>
                <textarea 
                  id="cancellationPolicy" 
                  v-model="formData.cancellationPolicy" 
                  class="form-input" 
                  rows="4" 
                  placeholder="Descreva a política de cancelamento e reembolso"
                  required
                ></textarea>
                <p v-if="errors.cancellationPolicy" class="text-red-500 text-sm mt-1">{{ errors.cancellationPolicy }}</p>
              </div>
            </div>
          </div>
          
          <!-- Step 7: Itinerário -->
          <div v-if="currentStep === 6">
            <h2 class="text-xl font-bold mb-4">Itinerário</h2>
            <div class="space-y-4">
              <div v-for="(day, index) in formData.itinerary" :key="index" class="bg-gray-50 p-4 rounded-lg">
                <div class="flex justify-between items-center mb-2">
                  <h3 class="font-bold">Dia {{ index + 1 }}</h3>
                  <button 
                    v-if="formData.itinerary.length > 1" 
                    @click="removeItineraryDay(index)" 
                    class="text-red-500"
                  >
                    <Icon name="heroicons:trash" class="w-5 h-5" />
                  </button>
                </div>
                
                <div class="space-y-3">
                  <div>
                    <label :for="`day-title-${index}`" class="form-label">Título do Dia</label>
                    <input 
                      :id="`day-title-${index}`" 
                      v-model="day.title" 
                      type="text" 
                      class="form-input" 
                      placeholder="Ex: Chegada e Check-in"
                    />
                  </div>
                  
                  <div>
                    <label :for="`day-description-${index}`" class="form-label">Descrição das Atividades</label>
                    <textarea 
                      :id="`day-description-${index}`" 
                      v-model="day.description" 
                      class="form-input" 
                      rows="3" 
                      placeholder="Descreva as atividades planejadas para este dia"
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <button @click="addItineraryDay" class="btn btn-outline w-full">
                <Icon name="heroicons:plus" class="w-5 h-5 mr-1" />
                Adicionar Dia
              </button>
            </div>
          </div>
          
          <!-- Step 8: Revisão e Publicação -->
          <div v-if="currentStep === 7">
            <h2 class="text-xl font-bold mb-4">Revisão e Publicação</h2>
            <div class="space-y-6">
              <div class="bg-gray-50 p-4 rounded-lg">
                <h3 class="font-bold mb-2">Informações Gerais</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p class="text-sm text-gray-500">Nome da Excursão</p>
                    <p>{{ formData.title || 'Não informado' }}</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500">Categoria</p>
                    <p>{{ getCategoryName(formData.category) || 'Não informado' }}</p>
                  </div>
                  <div class="md:col-span-2">
                    <p class="text-sm text-gray-500">Descrição</p>
                    <p class="line-clamp-2">{{ formData.description || 'Não informado' }}</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-gray-50 p-4 rounded-lg">
                <h3 class="font-bold mb-2">Detalhes da Viagem</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p class="text-sm text-gray-500">Origem</p>
                    <p>{{ formData.originCity || 'Não informado' }}</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500">Destino</p>
                    <p>{{ formData.destination || 'Não informado' }}</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500">Data de Início</p>
                    <p>{{ formatDate(formData.startDate) || 'Não informado' }}</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500">Data de Término</p>
                    <p>{{ formatDate(formData.endDate) || 'Não informado' }}</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500">Capacidade</p>
                    <p>{{ formData.capacity || 'Não informado' }}</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500">Vagas Disponíveis</p>
                    <p>{{ formData.availableSpots || 'Não informado' }}</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-gray-50 p-4 rounded-lg">
                <h3 class="font-bold mb-2">Hospedagem</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p class="text-sm text-gray-500">Nome</p>
                    <p>{{ formData.accommodation.name || 'Não informado' }}</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500">Tipo</p>
                    <p>{{ formData.accommodation.type || 'Não informado' }}</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-gray-50 p-4 rounded-lg">
                <h3 class="font-bold mb-2">Preço e Pagamento</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p class="text-sm text-gray-500">Preço por Pessoa</p>
                    <p>R$ {{ formData.price || '0.00' }}</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <div class="flex items-start">
                  <Icon name="heroicons:exclamation-triangle" class="w-6 h-6 text-yellow-500 mr-2 flex-shrink-0" />
                  <div>
                    <h3 class="font-bold text-yellow-700">Importante</h3>
                    <p class="text-yellow-600">
                      Verifique todas as informações antes de publicar. Após a publicação, algumas informações não poderão ser alteradas caso já existam reservas.
                    </p>
                  </div>
                </div>
              </div>
              
              <div class="flex items-center">
                <input 
                  id="terms" 
                  type="checkbox" 
                  v-model="formData.termsAccepted" 
                  class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  required
                />
                <label for="terms" class="ml-2 block text-sm text-gray-700">
                  Confirmo que todas as informações fornecidas são verdadeiras e estou ciente das políticas da plataforma.
                </label>
              </div>
              <p v-if="errors.termsAccepted" class="text-red-500 text-sm">{{ errors.termsAccepted }}</p>
            </div>
          </div>
        </div>
        
        <!-- Navigation Buttons -->
        <div class="flex justify-between mt-8 pt-6 border-t border-gray-200">
          <button 
            v-if="currentStep > 0" 
            @click="prevStep" 
            class="btn btn-outline"
          >
            <Icon name="heroicons:arrow-left" class="w-5 h-5 mr-1" />
            Anterior
          </button>
          <div v-else></div>
          
          <div class="flex space-x-3">
            <button 
              v-if="currentStep < steps.length - 1" 
              @click="saveAsDraft" 
              class="btn btn-outline"
            >
              Salvar Rascunho
            </button>
            
            <button 
              v-if="currentStep < steps.length - 1" 
              @click="nextStep" 
              class="btn btn-primary"
            >
              Próximo
              <Icon name="heroicons:arrow-right" class="w-5 h-5 ml-1" />
            </button>
            
            <button 
              v-else 
              @click="publishExcursion" 
              class="btn btn-primary"
              :disabled="!formData.termsAccepted"
            >
              Publicar Excursão
            </button>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useExcursionsStore } from '~/stores/excursions';

const router = useRouter();
const excursionsStore = useExcursionsStore();

// Form steps
const steps = [
  { name: 'Informações Gerais' },
  { name: 'Detalhes da Viagem' },
  { name: 'Hospedagem' },
  { name: 'Serviços Inclusos' },
  { name: 'Pontos de Embarque' },
  { name: 'Valores e Pagamento' },
  { name: 'Itinerário' },
  { name: 'Revisão e Publicação' }
];

const currentStep = ref(0);

// Form data
const formData = reactive({
  title: '',
  description: '',
  category: '',
  images: [],
  originCity: '',
  destination: '',
  startDate: '',
  endDate: '',
  capacity: 20,
  availableSpots: 20,
  accommodation: {
    name: '',
    type: '',
    amenities: [],
    meals: [],
    description: ''
  },
  includedServices: [],
  customServices: [],
  servicesDescription: '',
  pickupLocations: [],
  customPickupLocations: [],
  price: '',
  installmentOptions: [1, 2, 3],
  paymentMethods: ['credit_card', 'pix', 'boleto'],
  cancellationPolicy: 'Cancelamento até 30 dias antes: reembolso de 90%\nCancelamento até 15 dias antes: reembolso de 50%\nCancelamento com menos de 15 dias: sem reembolso',
  itinerary: [
    { title: 'Dia 1 - Saída', description: 'Saída do ponto de encontro e viagem até o destino. Check-in na hospedagem e tempo livre.' },
    { title: 'Dia 2 - Atividades', description: 'Café da manhã e dia de atividades conforme programação da excursão.' },
    { title: 'Último Dia - Retorno', description: 'Café da manhã, check-out e retorno ao ponto de partida.' }
  ],
  termsAccepted: false
});

// Validation errors
const errors = reactive({});

// Options for form selects
const categories = excursionsStore.categories;
const additionalServices = excursionsStore.additionalServices;

const amenities = [
  'Café da manhã',
  'Wi-Fi',
  'Ar condicionado',
  'TV',
  'Frigobar',
  'Piscina',
  'Academia',
  'Estacionamento',
  'Restaurante',
  'Bar',
  'Área de lazer'
];

const meals = [
  'Café da manhã',
  'Almoço',
  'Jantar',
  'Coffee break',
  'Bebidas não alcoólicas'
];

const installmentOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const paymentMethods = [
  { id: 'credit_card', name: 'Cartão de Crédito' },
  { id: 'pix', name: 'PIX' },
  { id: 'boleto', name: 'Boleto Bancário' }
];

// Mock pickup locations
const pickupLocations = [
  {
    id: 'location1',
    name: 'Terminal Rodoviário Tietê',
    address: 'Av. Cruzeiro do Sul, 1800 - Santana, São Paulo - SP',
    departureTime: '06:00'
  },
  {
    id: 'location2',
    name: 'Metrô Barra Funda',
    address: 'Av. Mário de Andrade, 664 - Barra Funda, São Paulo - SP',
    departureTime: '06:30'
  },
  {
    id: 'location3',
    name: 'Shopping Ibirapuera',
    address: 'Av. Ibirapuera, 3103 - Indianópolis, São Paulo - SP',
    departureTime: '07:00'
  }
];

// New service and location
const newService = ref('');
const newLocation = reactive({
  name: '',
  address: '',
  departureTime: ''
});

// Methods
const nextStep = () => {
  if (validateCurrentStep()) {
    if (currentStep.value < steps.length - 1) {
      currentStep.value++;
      window.scrollTo(0, 0);
    }
  }
};

const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--;
    window.scrollTo(0, 0);
  }
};

const validateCurrentStep = () => {
  errors.value = {};
  
  switch (currentStep.value) {
    case 0: // Informações Gerais
      if (!formData.title.trim()) {
        errors.title = 'O nome da excursão é obrigatório';
      }
      if (!formData.description.trim()) {
        errors.description = 'A descrição é obrigatória';
      }
      if (!formData.category) {
        errors.category = 'Selecione uma categoria';
      }
      if (formData.images.length === 0) {
        errors.images = 'Adicione pelo menos uma imagem';
      }
      break;
      
    case 1: // Detalhes da Viagem
      if (!formData.originCity.trim()) {
        errors.originCity = 'A cidade de origem é obrigatória';
      }
      if (!formData.destination.trim()) {
        errors.destination = 'O destino é obrigatório';
      }
      if (!formData.startDate) {
        errors.startDate = 'A data de início é obrigatória';
      }
      if (!formData.endDate) {
        errors.endDate = 'A data de término é obrigatória';
      }
      if (formData.startDate && formData.endDate && new Date(formData.startDate) > new Date(formData.endDate)) {
        errors.endDate = 'A data de término deve ser posterior à data de início';
      }
      if (!formData.capacity || formData.capacity < 1) {
        errors.capacity = 'A capacidade deve ser maior que zero';
      }
      if (!formData.availableSpots || formData.availableSpots < 1) {
        errors.availableSpots = 'As vagas disponíveis devem ser maior que zero';
      }
      if (formData.availableSpots > formData.capacity) {
        errors.availableSpots = 'As vagas disponíveis não podem ser maiores que a capacidade';
      }
      break;
      
    case 2: // Hospedagem
      if (!formData.accommodation.name.trim()) {
        errors.accommodationName = 'O nome da hospedagem é obrigatório';
      }
      if (!formData.accommodation.type) {
        errors.accommodationType = 'O tipo de acomodação é obrigatório';
      }
      break;
      
    case 3: // Serviços Inclusos
      if (formData.includedServices.length === 0 && formData.customServices.length === 0) {
        errors.includedServices = 'Selecione pelo menos um serviço incluso';
      }
      break;
      
    case 4: // Pontos de Embarque
      if (formData.pickupLocations.length === 0 && formData.customPickupLocations.length === 0) {
        errors.pickupLocations = 'Selecione pelo menos um local de embarque';
      }
      break;
      
    case 5: // Valores e Pagamento
      if (!formData.price || formData.price <= 0) {
        errors.price = 'O preço deve ser maior que zero';
      }
      if (!formData.cancellationPolicy.trim()) {
        errors.cancellationPolicy = 'A política de cancelamento é obrigatória';
      }
      break;
      
    case 7: // Revisão e Publicação
      if (!formData.termsAccepted) {
        errors.termsAccepted = 'Você precisa aceitar os termos para publicar a excursão';
      }
      break;
  }
  
  return Object.keys(errors).length === 0;
};

const removeImage = (index) => {
  formData.images.splice(index, 1);
};

const addCustomService = () => {
  if (newService.value.trim()) {
    formData.customServices.push(newService.value.trim());
    newService.value = '';
  }
};

const removeCustomService = (index) => {
  formData.customServices.splice(index, 1);
};

const addNewLocation = () => {
  if (newLocation.name && newLocation.address && newLocation.departureTime) {
    formData.customPickupLocations.push({...newLocation});
    newLocation.name = '';
    newLocation.address = '';
    newLocation.departureTime = '';
  }
};

const removeCustomLocation = (index) => {
  formData.customPickupLocations.splice(index, 1);
};

const addItineraryDay = () => {
  formData.itinerary.push({
    title: `Dia ${formData.itinerary.length + 1}`,
    description: ''
  });
};

const removeItineraryDay = (index) => {
  formData.itinerary.splice(index, 1);
};

const saveAsDraft = async () => {
  try {
    // In a real app, this would save to the database
    alert('Excursão salva como rascunho com sucesso!');
  } catch (error) {
    console.error('Error saving draft:', error);
    alert('Erro ao salvar rascunho. Por favor, tente novamente.');
  }
};

const publishExcursion = async () => {
  if (!validateCurrentStep()) {
    return;
  }
  
  try {
    // In a real app, this would save to the database
    const success = await excursionsStore.addExcursion({
      title: formData.title,
      description: formData.description,
      destination: formData.destination,
      originCity: formData.originCity,
      startDate: formData.startDate,
      endDate: formData.endDate,
      price: parseFloat(formData.price),
      availableSpots: parseInt(formData.availableSpots),
      category: formData.category,
      images: formData.images,
      includedServices: [...formData.includedServices, ...formData.customServices],
      accommodation: formData.accommodation
    });
    
    if (success) {
      alert('Excursão publicada com sucesso!');
      router.push('/empresa/dashboard/excursoes');
    } else {
      alert('Erro ao publicar excursão. Por favor, tente novamente.');
    }
  } catch (error) {
    console.error('Error publishing excursion:', error);
    alert('Erro ao publicar excursão. Por favor, tente novamente.');
  }
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR');
};

const getCategoryName = (categoryId) => {
  const category = categories.find(c => c.id === categoryId);
  return category ? category.name : '';
};

// For demo purposes, add some mock images
formData.images = [
  'https://images.unsplash.com/photo-1589449941811-aa0c96f2e4a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  'https://images.unsplash.com/photo-1660244044448-755de1a29e0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80'
];
</script>
