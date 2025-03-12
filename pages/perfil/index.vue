<template>
  <div class="bg-gray-50 min-h-screen py-12">
    <div class="container-custom">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Sidebar Navigation -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow-md overflow-hidden sticky top-4">
            <div class="p-6 bg-primary text-white">
              <div class="flex flex-col items-center">
                <div class="relative mb-4 group">
                  <div class="w-24 h-24 rounded-full overflow-hidden border-4 border-white">
                    <img 
                      :src="user.profileImage || 'https://randomuser.me/api/portraits/men/32.jpg'" 
                      alt="Foto de perfil" 
                      class="w-full h-full object-cover"
                    />
                  </div>
                  <div class="absolute inset-0 bg-black/30 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                    <Icon name="heroicons:camera" class="w-8 h-8 text-white" />
                  </div>
                </div>
                <h2 class="text-xl font-bold">{{ user.name }}</h2>
                <p class="text-white/80 text-sm">{{ userLevelText }}</p>
              </div>
            </div>
            
            <nav class="p-2">
              <button 
                v-for="tab in tabs" 
                :key="tab.id"
                @click="activeTab = tab.id"
                class="w-full text-left px-4 py-3 rounded-lg mb-1 flex items-center transition-colors"
                :class="activeTab === tab.id ? 'bg-primary-50 text-primary font-medium' : 'hover:bg-gray-100 text-gray-700'"
              >
                <Icon :name="tab.icon" class="w-5 h-5 mr-3" />
                {{ tab.name }}
              </button>
            </nav>
            
            <div class="p-4 border-t border-gray-200">
              <button 
                @click="logout" 
                class="w-full text-left px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 flex items-center transition-colors"
              >
                <Icon name="heroicons:arrow-right-on-rectangle" class="w-5 h-5 mr-3" />
                Sair
              </button>
            </div>
          </div>
        </div>
        
        <!-- Main Content -->
        <div class="lg:col-span-3">
          <!-- User Information -->
          <div v-if="activeTab === 'profile'" class="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div class="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 class="text-2xl font-bold">Informações Pessoais</h2>
              <button 
                @click="isEditingProfile = !isEditingProfile" 
                class="btn btn-outline flex items-center"
              >
                <Icon :name="isEditingProfile ? 'heroicons:x-mark' : 'heroicons:pencil'" class="w-5 h-5 mr-2" />
                {{ isEditingProfile ? 'Cancelar' : 'Editar Perfil' }}
              </button>
            </div>
            
            <div class="p-6">
              <form v-if="isEditingProfile" @submit.prevent="saveProfile" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label for="name" class="form-label">Nome Completo</label>
                    <input 
                      id="name" 
                      v-model="editedUser.name" 
                      type="text" 
                      class="form-input" 
                      required
                    />
                  </div>
                  
                  <div>
                    <label for="email" class="form-label">Email</label>
                    <input 
                      id="email" 
                      v-model="editedUser.email" 
                      type="email" 
                      class="form-input" 
                      required
                    />
                  </div>
                  
                  <div>
                    <label for="phone" class="form-label">Telefone</label>
                    <input 
                      id="phone" 
                      v-model="editedUser.phone" 
                      type="tel" 
                      class="form-input" 
                      required
                    />
                  </div>
                  
                  <div>
                    <label for="birthdate" class="form-label">Data de Nascimento</label>
                    <input 
                      id="birthdate" 
                      v-model="editedUser.birthdate" 
                      type="date" 
                      class="form-input" 
                    />
                  </div>
                  
                  <div class="md:col-span-2">
                    <label for="address" class="form-label">Endereço</label>
                    <input 
                      id="address" 
                      v-model="editedUser.address" 
                      type="text" 
                      class="form-input" 
                    />
                  </div>
                  
                  <div>
                    <label for="city" class="form-label">Cidade</label>
                    <input 
                      id="city" 
                      v-model="editedUser.city" 
                      type="text" 
                      class="form-input" 
                    />
                  </div>
                  
                  <div>
                    <label for="state" class="form-label">Estado</label>
                    <input 
                      id="state" 
                      v-model="editedUser.state" 
                      type="text" 
                      class="form-input" 
                    />
                  </div>
                </div>
                
                <div class="flex justify-end space-x-4">
                  <button 
                    type="button" 
                    @click="isEditingProfile = false" 
                    class="btn btn-outline"
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit" 
                    class="btn btn-primary"
                  >
                    Salvar Alterações
                  </button>
                </div>
              </form>
              
              <div v-else class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 class="text-sm font-medium text-gray-500">Nome Completo</h3>
                    <p class="mt-1 text-lg">{{ user.name }}</p>
                  </div>
                  
                  <div>
                    <h3 class="text-sm font-medium text-gray-500">Email</h3>
                    <p class="mt-1 text-lg">{{ user.email }}</p>
                  </div>
                  
                  <div>
                    <h3 class="text-sm font-medium text-gray-500">Telefone</h3>
                    <p class="mt-1 text-lg">{{ user.phone || 'Não informado' }}</p>
                  </div>
                  
                  <div>
                    <h3 class="text-sm font-medium text-gray-500">Data de Nascimento</h3>
                    <p class="mt-1 text-lg">{{ formatDate(user.birthdate) || 'Não informada' }}</p>
                  </div>
                  
                  <div class="md:col-span-2">
                    <h3 class="text-sm font-medium text-gray-500">Endereço</h3>
                    <p class="mt-1 text-lg">{{ user.address || 'Não informado' }}</p>
                  </div>
                  
                  <div>
                    <h3 class="text-sm font-medium text-gray-500">Cidade</h3>
                    <p class="mt-1 text-lg">{{ user.city || 'Não informada' }}</p>
                  </div>
                  
                  <div>
                    <h3 class="text-sm font-medium text-gray-500">Estado</h3>
                    <p class="mt-1 text-lg">{{ user.state || 'Não informado' }}</p>
                  </div>
                </div>
                
                <div class="border-t border-gray-200 pt-6">
                  <h3 class="text-lg font-bold mb-3">Estatísticas</h3>
                  <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div class="bg-gray-50 p-4 rounded-lg text-center">
                      <div class="text-3xl font-bold text-primary">{{ user.stats.tripsCount }}</div>
                      <div class="text-gray-600">Viagens</div>
                    </div>
                    <div class="bg-gray-50 p-4 rounded-lg text-center">
                      <div class="text-3xl font-bold text-primary">{{ user.stats.reviewsCount }}</div>
                      <div class="text-gray-600">Avaliações</div>
                    </div>
                    <div class="bg-gray-50 p-4 rounded-lg text-center">
                      <div class="text-3xl font-bold text-primary">{{ user.stats.favoritesCount }}</div>
                      <div class="text-gray-600">Favoritos</div>
                    </div>
                    <div class="bg-gray-50 p-4 rounded-lg text-center">
                      <div class="text-3xl font-bold text-primary">{{ user.stats.points }}</div>
                      <div class="text-gray-600">Pontos</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Reservations -->
          <div v-if="activeTab === 'reservations'" class="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div class="p-6 border-b border-gray-200">
              <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h2 class="text-2xl font-bold">Minhas Reservas</h2>
                
                <div class="flex items-center space-x-4">
                  <div>
                    <select 
                      v-model="reservationFilter" 
                      class="form-input py-2"
                    >
                      <option value="all">Todas as reservas</option>
                      <option value="upcoming">Próximas viagens</option>
                      <option value="past">Viagens passadas</option>
                      <option value="pending">Aguardando confirmação</option>
                      <option value="confirmed">Confirmadas</option>
                      <option value="cancelled">Canceladas</option>
                    </select>
                  </div>
                  
                  <div class="relative">
                    <input 
                      type="text" 
                      v-model="reservationSearch" 
                      placeholder="Buscar reservas..." 
                      class="form-input pl-10 pr-4 py-2"
                    />
                    <Icon 
                      name="heroicons:magnifying-glass" 
                      class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" 
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div v-if="filteredReservations.length === 0" class="p-12 text-center">
              <Icon name="heroicons:ticket" class="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 class="text-xl font-bold mb-2">Nenhuma reserva encontrada</h3>
              <p class="text-gray-600 mb-6">
                Você ainda não fez nenhuma reserva de excursão ou não há reservas que correspondam aos filtros selecionados.
              </p>
              <NuxtLink to="/excursoes" class="btn btn-primary">
                Explorar Excursões
              </NuxtLink>
            </div>
            
            <div v-else class="divide-y divide-gray-200">
              <div 
                v-for="reservation in filteredReservations" 
                :key="reservation.id" 
                class="p-6 hover:bg-gray-50 transition-colors"
              >
                <div class="md:flex">
                  <div class="md:w-1/4 mb-4 md:mb-0">
                    <img 
                      :src="reservation.image" 
                      :alt="reservation.excursionTitle" 
                      class="w-full h-32 object-cover rounded-lg" 
                    />
                  </div>
                  
                  <div class="md:w-3/4 md:pl-6 flex flex-col">
                    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                      <h3 class="text-xl font-bold">{{ reservation.excursionTitle }}</h3>
                      <span 
                        class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mt-2 md:mt-0"
                        :class="getStatusClass(reservation.status)"
                      >
                        {{ getStatusText(reservation.status) }}
                      </span>
                    </div>
                    
                    <div class="flex items-center text-gray-600 mb-2">
                      <Icon name="heroicons:calendar" class="w-4 h-4 mr-1" />
                      <span>{{ formatDateRange(reservation.startDate, reservation.endDate) }}</span>
                    </div>
                    
                    <div class="flex items-center text-gray-600 mb-2">
                      <Icon name="heroicons:user-group" class="w-4 h-4 mr-1" />
                      <span>{{ reservation.participants }} {{ reservation.participants > 1 ? 'participantes' : 'participante' }}</span>
                    </div>
                    
                    <div class="flex items-center text-gray-600 mb-4">
                      <Icon name="heroicons:banknotes" class="w-4 h-4 mr-1" />
                      <span>Total: R$ {{ reservation.totalPrice }}</span>
                    </div>
                    
                    <div class="flex flex-col sm:flex-row gap-3 mt-auto">
                      <NuxtLink :to="`/reserva-detalhes/${reservation.id}`" class="btn btn-primary text-center">
                        Ver Detalhes
                      </NuxtLink>
                      
                      <button 
                        v-if="reservation.status === 'pending'" 
                        @click="cancelReservation(reservation.id)" 
                        class="btn btn-outline text-red-600 border-red-600 hover:bg-red-50"
                      >
                        Cancelar Reserva
                      </button>
                      
                      <button 
                        v-if="reservation.status === 'confirmed' && isUpcoming(reservation.startDate)" 
                        @click="showVoucher(reservation.id)" 
                        class="btn btn-outline"
                      >
                        Ver Voucher
                      </button>
                      
                      <button 
                        v-if="reservation.status === 'completed' && !reservation.reviewed" 
                        @click="openReviewModal(reservation)" 
                        class="btn btn-outline"
                      >
                        Avaliar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Favorites -->
          <div v-if="activeTab === 'favorites'" class="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div class="p-6 border-b border-gray-200">
              <h2 class="text-2xl font-bold">Meus Favoritos</h2>
            </div>
            
            <div v-if="favorites.length === 0" class="p-12 text-center">
              <Icon name="heroicons:heart" class="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 class="text-xl font-bold mb-2">Nenhum favorito encontrado</h3>
              <p class="text-gray-600 mb-6">
                Você ainda não adicionou nenhuma excursão aos seus favoritos.
              </p>
              <NuxtLink to="/excursoes" class="btn btn-primary">
                Explorar Excursões
              </NuxtLink>
            </div>
            
            <div v-else class="p-6">
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div 
                  v-for="favorite in favorites" 
                  :key="favorite.id" 
                  class="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
                >
                  <div class="relative h-40 overflow-hidden">
                    <img 
                      :src="favorite.image" 
                      :alt="favorite.title" 
                      class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                    />
                    <button 
                      @click.prevent="removeFavorite(favorite.id)" 
                      class="absolute top-2 right-2 bg-white/80 hover:bg-white p-2 rounded-full text-red-500 hover:text-red-600 transition-colors"
                    >
                      <Icon name="heroicons:heart" class="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div class="p-4">
                    <h3 class="font-bold mb-2 line-clamp-1">{{ favorite.title }}</h3>
                    
                    <div class="flex items-center text-gray-600 mb-2 text-sm">
                      <Icon name="heroicons:map-pin" class="w-4 h-4 mr-1" />
                      <span class="line-clamp-1">{{ favorite.destination }}</span>
                    </div>
                    
                    <div class="flex items-center text-gray-600 mb-3 text-sm">
                      <Icon name="heroicons:calendar" class="w-4 h-4 mr-1" />
                      <span>{{ formatDateRange(favorite.startDate, favorite.endDate) }}</span>
                    </div>
                    
                    <div class="flex justify-between items-center">
                      <span class="text-primary font-bold">R$ {{ favorite.price }}</span>
                      <NuxtLink :to="`/excursoes/${favorite.id}`" class="text-primary hover:text-primary-600 text-sm font-medium">
                        Ver Detalhes
                      </NuxtLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Payments -->
          <div v-if="activeTab === 'payments'" class="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div class="p-6 border-b border-gray-200">
              <h2 class="text-2xl font-bold">Pagamentos e Carteira</h2>
            </div>
            
            <div class="p-6">
              <div class="mb-8">
                <h3 class="text-xl font-bold mb-4">Cartões Salvos</h3>
                
                <div v-if="paymentMethods.length === 0" class="bg-gray-50 p-6 rounded-lg text-center">
                  <p class="text-gray-600 mb-4">Você ainda não possui cartões salvos.</p>
                  <button @click="showAddCardModal = true" class="btn btn-primary">
                    Adicionar Cartão
                  </button>
                </div>
                
                <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div 
                    v-for="card in paymentMethods" 
                    :key="card.id" 
                    class="bg-gray-50 p-4 rounded-lg border border-gray-200"
                  >
                    <div class="flex justify-between items-start">
                      <div>
                        <div class="flex items-center mb-2">
                          <Icon 
                            :name="getCardIcon(card.brand)" 
                            class="w-8 h-8 mr-2" 
                          />
                          <span class="font-bold">{{ card.brand }}</span>
                          <span v-if="card.isDefault" class="ml-2 bg-primary-50 text-primary text-xs px-2 py-0.5 rounded-full">
                            Padrão
                          </span>
                        </div>
                        <p class="text-gray-600">•••• •••• •••• {{ card.lastFour }}</p>
                        <p class="text-gray-600 text-sm">Expira em {{ card.expMonth }}/{{ card.expYear }}</p>
                      </div>
                      <div class="flex">
                        <button 
                          v-if="!card.isDefault" 
                          @click="setDefaultCard(card.id)" 
                          class="text-primary hover:text-primary-600 p-1"
                          title="Definir como padrão"
                        >
                          <Icon name="heroicons:star" class="w-5 h-5" />
                        </button>
                        <button 
                          @click="removeCard(card.id)" 
                          class="text-red-500 hover:text-red-600 p-1"
                          title="Remover cartão"
                        >
                          <Icon name="heroicons:trash" class="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <button 
                  v-if="paymentMethods.length > 0" 
                  @click="showAddCardModal = true" 
                  class="btn btn-outline"
                >
                  <Icon name="heroicons:plus" class="w-5 h-5 mr-2" />
                  Adicionar Novo Cartão
                </button>
              </div>
              
              <div>
                <h3 class="text-xl font-bold mb-4">Histórico de Pagamentos</h3>
                
                <div v-if="paymentHistory.length === 0" class="bg-gray-50 p-6 rounded-lg text-center">
                  <p class="text-gray-600">Você ainda não possui histórico de pagamentos.</p>
                </div>
                
                <div v-else class="overflow-x-auto">
                  <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                      <tr>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Data
                        </th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Descrição
                        </th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Valor
                        </th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Método
                        </th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                      <tr v-for="payment in paymentHistory" :key="payment.id">
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {{ formatDate(payment.date) }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {{ payment.description }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          R$ {{ payment.amount }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm">
                          <span 
                            class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                            :class="getPaymentStatusClass(payment.status)"
                          >
                            {{ getPaymentStatusText(payment.status) }}
                          </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {{ payment.method }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Reviews -->
          <div v-if="activeTab === 'reviews'" class="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div class="p-6 border-b border-gray-200">
              <h2 class="text-2xl font-bold">Minhas Avaliações</h2>
            </div>
            
            <div v-if="reviews.length === 0" class="p-12 text-center">
              <Icon name="heroicons:chat-bubble-left-right" class="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 class="text-xl font-bold mb-2">Nenhuma avaliação encontrada</h3>
              <p class="text-gray-600 mb-6">
                Você ainda não avaliou nenhuma excursão.
              </p>
            </div>
            
            <div v-else class="divide-y divide-gray-200">
              <div 
                v-for="review in reviews" 
                :key="review.id" 
                class="p-6"
              >
                <div class="flex justify-between items-start mb-4">
                  <div>
                    <h3 class="font-bold text-lg">{{ review.excursionTitle }}</h3>
                    <p class="text-gray-600 text-sm">Avaliado em {{ formatDate(review.date) }}</p>
                  </div>
                  <div class="flex space-x-2">
                    <button 
                      @click="editReview(review)" 
                      class="text-primary hover:text-primary-600 p-1"
                    >
                      <Icon name="heroicons:pencil" class="w-5 h-5" />
                    </button>
                    <button 
                      @click="deleteReview(review.id)" 
                      class="text-red-500 hover:text-red-600 p-1"
                    >
                      <Icon name="heroicons:trash" class="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                <div class="flex text-primary mb-3">
                  <Icon 
                    v-for="i in 5" 
                    :key="i" 
                    name="heroicons:star" 
                    class="w-5 h-5" 
                    :class="i <= review.rating ? 'text-primary' : 'text-gray-300'" 
                  />
                </div>
                
                <p class="text-gray-700">{{ review.comment }}</p>
                
                <div v-if="review.response" class="mt-4 bg-gray-50 p-4 rounded-lg">
                  <p class="font-bold text-sm mb-1">Resposta da empresa:</p>
                  <p class="text-gray-700">{{ review.response }}</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Security -->
          <div v-if="activeTab === 'security'" class="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div class="p-6 border-b border-gray-200">
              <h2 class="text-2xl font-bold">Segurança e Privacidade</h2>
            </div>
            
            <div class="p-6">
              <div class="mb-8">
                <h3 class="text-xl font-bold mb-4">Alterar Senha</h3>
                
                <form @submit.prevent="changePassword" class="space-y-4 max-w-md">
                  <div>
                    <label for="currentPassword" class="form-label">Senha Atual</label>
                    <input 
                      id="currentPassword" 
                      v-model="passwordForm.currentPassword" 
                      type="password" 
                      class="form-input" 
                      required
                    />
                  </div>
                  
                  <div>
                    <label for="newPassword" class="form-label">Nova Senha</label>
                    <input 
                      id="newPassword" 
                      v-model="passwordForm.newPassword" 
                      type="password" 
                      class="form-input" 
                      required
                    />
                  </div>
                  
                  <div>
                    <label for="confirmPassword" class="form-label">Confirmar Nova Senha</label>
                    <input 
                      id="confirmPassword" 
                      v-model="passwordForm.confirmPassword" 
                      type="password" 
                      class="form-input" 
                      required
                    />
                  </div>
                  
                  <div v-if="passwordError" class="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                    {{ passwordError }}
                  </div>
                  
                  <div v-if="passwordSuccess" class="bg-green-50 text-green-600 p-3 rounded-md text-sm">
                    {{ passwordSuccess }}
                  </div>
                  
                  <div>
                    <button type="submit" class="btn btn-primary">
                      Alterar Senha
                    </button>
                  </div>
                </form>
              </div>
              
              <div class="mb-8">
                <h3 class="text-xl font-bold mb-4">Notificações</h3>
                
                <div class="space-y-4 max-w-md">
                  <div class="flex items-center justify-between">
                    <div>
                      <h4 class="font-medium">Notificações por Email</h4>
                      <p class="text-gray-600 text-sm">Receba atualizações sobre suas reservas</p>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" v-model="notifications.email" class="sr-only peer">
                      <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                  
                  <div class="flex items-center justify-between">
                    <div>
                      <h4 class="font-medium">Notificações por SMS</h4>
                      <p class="text-gray-600 text-sm">Receba lembretes sobre suas próximas viagens</p>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" v-model="notifications.sms" class="sr-only peer">
                      <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                  
                  <div class="flex items-center justify-between">
                    <div>
                      <h4 class="font-medium">Notificações de Promoções</h4>
                      <p class="text-gray-600 text-sm">Receba ofertas e promoções exclusivas</p>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" v-model="notifications.promotions" class="sr-only peer">
                      <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                  
                  <div>
                    <button @click="saveNotificationSettings" class="btn btn-primary">
                      Salvar Preferências
                    </button>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 class="text-xl font-bold mb-4 text-red-600">Excluir Conta</h3>
                
                <p class="text-gray-700 mb-4 max-w-md">
                  Ao excluir sua conta, todos os seus dados pessoais, reservas e avaliações serão permanentemente removidos. Esta ação não pode ser desfeita.
                </p>
                
                <button @click="showDeleteAccountModal = true" class="btn btn-outline text-red-600 border-red-600 hover:bg-red-50">
                  Excluir Minha Conta
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Add Card Modal -->
    <div v-if="showAddCardModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div class="p-6 border-b border-gray-200 flex justify-between items-center">
          <h3 class="text-xl font-bold">Adicionar Novo Cartão</h3>
          <button @click="showAddCardModal = false" class="text-gray-500 hover:text-gray-700">
            <Icon name="heroicons:x-mark" class="w-6 h-6" />
          </button>
        </div>
        
        <form @submit.prevent="addCard" class="p-6 space-y-4">
          <div>
            <label for="cardNumber" class="form-label">Número do Cartão</label>
            <input 
              id="cardNumber" 
              v-model="newCard.number" 
              type="text" 
              class="form-input" 
              placeholder="0000 0000 0000 0000" 
              required
            />
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label for="cardName" class="form-label">Nome no Cartão</label>
              <input 
                id="cardName" 
                v-model="newCard.name" 
                type="text" 
                class="form-input" 
                placeholder="NOME COMO NO CARTÃO" 
                required
              />
            </div>
            
            <div>
              <label for="cardExpiry" class="form-label">Validade (MM/AA)</label>
              <input 
                id="cardExpiry" 
                v-model="newCard.expiry" 
                type="text" 
                class="form-input" 
                placeholder="MM/AA" 
                required
              />
            </div>
          </div>
          
          <div>
            <label for="cardCvv" class="form-label">Código de Segurança (CVV)</label>
            <input 
              id="cardCvv" 
              v-model="newCard.cvv" 
              type="text" 
              class="form-input" 
              placeholder="123" 
              required
            />
          </div>
          
          <div class="flex items-center">
            <input 
              id="defaultCard" 
              type="checkbox" 
              v-model="newCard.isDefault" 
              class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label for="defaultCard" class="ml-2 block text-sm text-gray-700">
              Definir como cartão padrão
            </label>
          </div>
          
          <div class="flex justify-end space-x-4 pt-4">
            <button 
              type="button" 
              @click="showAddCardModal = false" 
              class="btn btn-outline"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              class="btn btn-primary"
            >
              Adicionar Cartão
            </button>
          </div>
        </form>
      </div>
    </div>
    
    <!-- Review Modal -->
    <div v-if="showReviewModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div class="p-6 border-b border-gray-200 flex justify-between items-center">
          <h3 class="text-xl font-bold">{{ reviewToEdit ? 'Editar Avaliação' : 'Avaliar Excursão' }}</h3>
          <button @click="showReviewModal = false" class="text-gray-500 hover:text-gray-700">
            <Icon name="heroicons:x-mark" class="w-6 h-6" />
          </button>
        </div>
        
        <form @submit.prevent="submitReview" class="p-6 space-y-4">
          <div>
            <h4 class="font-bold mb-2">{{ currentReview.excursionTitle }}</h4>
            <div class="flex space-x-1 mb-4">
              <button 
                v-for="i in 5" 
                :key="i" 
                type="button"
                @click="currentReview.rating = i" 
                class="focus:outline-none"
              >
                <Icon 
                  name="heroicons:star" 
                  class="w-8 h-8" 
                  :class="i <= currentReview.rating ? 'text-primary' : 'text-gray-300'" 
                />
              </button>
            </div>
          </div>
          
          <div>
            <label for="reviewComment" class="form-label">Seu Comentário</label>
            <textarea 
              id="reviewComment" 
              v-model="currentReview.comment" 
              class="form-input" 
              rows="4" 
              placeholder="Conte como foi sua experiência..." 
              required
            ></textarea>
          </div>
          
          <div class="flex justify-end space-x-4 pt-4">
            <button 
              type="button" 
              @click="showReviewModal = false" 
              class="btn btn-outline"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              class="btn btn-primary"
            >
              {{ reviewToEdit ? 'Atualizar' : 'Enviar' }} Avaliação
            </button>
          </div>
        </form>
      </div>
    </div>
    
    <!-- Delete Account Modal -->
    <div v-if="showDeleteAccountModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div class="p-6 border-b border-gray-200 flex justify-between items-center">
          <h3 class="text-xl font-bold text-red-600">Excluir Conta</h3>
          <button @click="showDeleteAccountModal = false" class="text-gray-500 hover:text-gray-700">
            <Icon name="heroicons:x-mark" class="w-6 h-6" />
          </button>
        </div>
        
        <div class="p-6">
          <p class="text-gray-700 mb-6">
            Tem certeza que deseja excluir sua conta? Esta ação é irreversível e todos os seus dados serão permanentemente removidos.
          </p>
          
          <div>
            <label for="deleteConfirmation" class="form-label">Digite "EXCLUIR" para confirmar</label>
            <input 
              id="deleteConfirmation" 
              v-model="deleteConfirmation" 
              type="text" 
              class="form-input" 
              placeholder="EXCLUIR" 
            />
          </div>
          
          <div class="flex justify-end space-x-4 mt-6">
            <button 
              type="button" 
              @click="showDeleteAccountModal = false" 
              class="btn btn-outline"
            >
              Cancelar
            </button>
            <button 
              @click="deleteAccount" 
              class="btn btn-outline text-red-600 border-red-600 hover:bg-red-50"
              :disabled="deleteConfirmation !== 'EXCLUIR'"
            >
              Excluir Permanentemente
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { useReservationsStore } from '~/stores/reservations';

const authStore = useAuthStore();
const reservationsStore = useReservationsStore();
const router = useRouter();

// Tabs
const tabs = [
  { id: 'profile', name: 'Meu Perfil', icon: 'heroicons:user' },
  { id: 'reservations', name: 'Minhas Reservas', icon: 'heroicons:ticket' },
  { id: 'favorites', name: 'Favoritos', icon: 'heroicons:heart' },
  { id: 'payments', name: 'Pagamentos', icon: 'heroicons:credit-card' },
  { id: 'reviews', name: 'Avaliações', icon: 'heroicons:chat-bubble-left-right' },
  { id: 'security', name: 'Segurança', icon: 'heroicons:lock-closed' }
];

const activeTab = ref('profile');

// User data
const user = ref({
  id: '1',
  name: 'João Silva',
  email: 'joao@example.com',
  phone: '(11) 98765-4321',
  profileImage: 'https://randomuser.me/api/portraits/men/32.jpg',
  birthdate: '1985-05-10',
  address: 'Rua das Flores, 123',
  city: 'São Paulo',
  state: 'SP',
  level: 'explorer', // novice, explorer, expert, master
  stats: {
    tripsCount: 8,
    reviewsCount: 5,
    favoritesCount: 12,
    points: 1250
  }
});

const userLevelText = computed(() => {
  const levels = {
    novice: 'Viajante Novato',
    explorer: 'Explorador Experiente',
    expert: 'Viajante Expert',
    master: 'Mestre Viajante'
  };
  
  return levels[user.value.level] || 'Viajante';
});

// Profile editing
const isEditingProfile = ref(false);
const editedUser = ref({});

// Reservations
const reservations = ref([
  {
    id: '1',
    excursionId: '1',
    excursionTitle: 'Fim de Semana em Ilhabela',
    image: 'https://images.unsplash.com/photo-1589449941811-aa0c96f2e4a 1', // This is continuing the image URL from where it was cut off
    startDate: '2025-05-15',
    endDate: '2025-05-18',
    participants: 2,
    totalPrice: 2400,
    status: 'confirmed',
    reviewed: false,
    createdAt: '2025-04-10T14:30:00Z'
  },
  {
    id: '2',
    excursionId: '3',
    excursionTitle: 'Thermas dos Laranjais',
    image: 'https://images.unsplash.com/photo-1582553081653-f515f2a9f2ee',
    startDate: '2025-07-20',
    endDate: '2025-07-23',
    participants: 4,
    totalPrice: 7200,
    status: 'pending',
    reviewed: false,
    createdAt: '2025-04-12T10:15:00Z'
  },
  {
    id: '3',
    excursionId: '2',
    excursionTitle: 'Expedição Serra da Mantiqueira',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b',
    startDate: '2024-12-10',
    endDate: '2024-12-13',
    participants: 1,
    totalPrice: 1500,
    status: 'completed',
    reviewed: true,
    createdAt: '2024-11-05T09:20:00Z'
  }
]);

const reservationFilter = ref('all');
const reservationSearch = ref('');

const filteredReservations = computed(() => {
  let result = [...reservations.value];
  
  // Apply status filter
  if (reservationFilter.value === 'upcoming') {
    result = result.filter(r => isUpcoming(r.startDate));
  } else if (reservationFilter.value === 'past') {
    result = result.filter(r => !isUpcoming(r.startDate));
  } else if (reservationFilter.value !== 'all') {
    result = result.filter(r => r.status === reservationFilter.value);
  }
  
  // Apply search
  if (reservationSearch.value.trim()) {
    const search = reservationSearch.value.toLowerCase();
    result = result.filter(r => 
      r.excursionTitle.toLowerCase().includes(search) ||
      r.id.toLowerCase().includes(search)
    );
  }
  
  return result;
});

// Favorites
const favorites = ref([
  {
    id: '1',
    title: 'Fim de Semana em Ilhabela',
    destination: 'Ilhabela, SP',
    image: 'https://images.unsplash.com/photo-1589449941811-aa0c96f2e4a1',
    startDate: '2025-05-15',
    endDate: '2025-05-18',
    price: 1200
  },
  {
    id: '2',
    title: 'Expedição Serra da Mantiqueira',
    destination: 'Serra da Mantiqueira, MG',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b',
    startDate: '2025-06-10',
    endDate: '2025-06-13',
    price: 1500
  },
  {
    id: '3',
    title: 'Thermas dos Laranjais',
    destination: 'Olímpia, SP',
    image: 'https://images.unsplash.com/photo-1582553081653-f515f2a9f2ee',
    startDate: '2025-07-20',
    endDate: '2025-07-23',
    price: 1800
  }
]);

// Payment methods
const paymentMethods = ref([
  {
    id: '1',
    brand: 'Visa',
    lastFour: '4242',
    expMonth: '12',
    expYear: '2026',
    isDefault: true
  },
  {
    id: '2',
    brand: 'Mastercard',
    lastFour: '5555',
    expMonth: '08',
    expYear: '2025',
    isDefault: false
  }
]);

const showAddCardModal = ref(false);
const newCard = ref({
  number: '',
  name: '',
  expiry: '',
  cvv: '',
  isDefault: false
});

// Payment history
const paymentHistory = ref([
  {
    id: '1',
    date: '2025-04-10T14:30:00Z',
    description: 'Reserva #1 - Fim de Semana em Ilhabela',
    amount: 2400,
    status: 'completed',
    method: 'Cartão de Crédito (Visa ****4242)'
  },
  {
    id: '2',
    date: '2025-04-12T10:15:00Z',
    description: 'Reserva #2 - Thermas dos Laranjais',
    amount: 7200,
    status: 'pending',
    method: 'PIX'
  },
  {
    id: '3',
    date: '2024-11-05T09:20:00Z',
    description: 'Reserva #3 - Expedição Serra da Mantiqueira',
    amount: 1500,
    status: 'completed',
    method: 'Cartão de Crédito (Mastercard ****5555)'
  }
]);

// Reviews
const reviews = ref([
  {
    id: '1',
    excursionId: '2',
    excursionTitle: 'Expedição Serra da Mantiqueira',
    rating: 4,
    comment: 'Experiência incrível! As trilhas eram desafiadoras, mas valeu muito a pena pelas vistas deslumbrantes. O guia era muito conhecedor e a hospedagem era confortável. Recomendo para quem gosta de aventura.',
    date: '2024-12-15T10:30:00Z',
    response: 'Obrigado pela sua avaliação, João! Ficamos felizes que tenha gostado da experiência. Esperamos vê-lo em nossas próximas aventuras!'
  }
]);

const showReviewModal = ref(false);
const reviewToEdit = ref(null);
const currentReview = ref({
  excursionId: '',
  excursionTitle: '',
  rating: 5,
  comment: ''
});

// Security
const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
});

const passwordError = ref('');
const passwordSuccess = ref('');

const notifications = ref({
  email: true,
  sms: false,
  promotions: true
});

const showDeleteAccountModal = ref(false);
const deleteConfirmation = ref('');

// Methods
const formatDate = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

const formatDateRange = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  
  const startDay = start.getDate();
  const endDay = end.getDate();
  const month = months[start.getMonth()];
  const year = start.getFullYear();
  
  return `${startDay} a ${endDay} de ${month}, ${year}`;
};

const getStatusText = (status) => {
  const statusMap = {
    'pending': 'Aguardando confirmação',
    'confirmed': 'Confirmada',
    'completed': 'Concluída',
    'cancelled': 'Cancelada'
  };
  
  return statusMap[status] || status;
};

const getStatusClass = (status) => {
  const statusClasses = {
    'pending': 'bg-yellow-100 text-yellow-800',
    'confirmed': 'bg-green-100 text-green-800',
    'completed': 'bg-blue-100 text-blue-800',
    'cancelled': 'bg-red-100 text-red-800'
  };
  
  return statusClasses[status] || 'bg-gray-100 text-gray-800';
};

const getPaymentStatusText = (status) => {
  const statusMap = {
    'completed': 'Pago',
    'pending': 'Pendente',
    'cancelled': 'Cancelado',
    'refunded': 'Reembolsado'
  };
  
  return statusMap[status] || status;
};

const getPaymentStatusClass = (status) => {
  const statusClasses = {
    'completed': 'bg-green-100 text-green-800',
    'pending': 'bg-yellow-100 text-yellow-800',
    'cancelled': 'bg-red-100 text-red-800',
    'refunded': 'bg-blue-100 text-blue-800'
  };
  
  return statusClasses[status] || 'bg-gray-100 text-gray-800';
};

const getCardIcon = (brand) => {
  const brandIcons = {
    'Visa': 'mdi:visa',
    'Mastercard': 'mdi:mastercard',
    'American Express': 'mdi:american-express',
    'Elo': 'mdi:credit-card'
  };
  
  return brandIcons[brand] || 'mdi:credit-card';
};

const isUpcoming = (dateString) => {
  const today = new Date();
  const date = new Date(dateString);
  return date >= today;
};

// Profile actions
const saveProfile = () => {
  user.value = { ...user.value, ...editedUser.value };
  isEditingProfile.value = false;
  // In a real app, you would send this data to the server
};

// Reservation actions
const cancelReservation = (id) => {
  if (confirm('Tem certeza que deseja cancelar esta reserva?')) {
    const index = reservations.value.findIndex(r => r.id === id);
    if (index !== -1) {
      reservations.value[index].status = 'cancelled';
    }
    // In a real app, you would send this to the server
  }
};

const showVoucher = (id) => {
  // In a real app, this would open a modal or navigate to a voucher page
  alert(`Exibindo voucher para a reserva ${id}`);
};

// Favorites actions
const removeFavorite = (id) => {
  if (confirm('Remover este item dos favoritos?')) {
    favorites.value = favorites.value.filter(f => f.id !== id);
    // In a real app, you would send this to the server
  }
};

// Payment actions
const addCard = () => {
  // In a real app, you would send this to the server and handle tokenization securely
  const card = {
    id: Date.now().toString(),
    brand: 'Visa', // This would be determined by the card number in a real app
    lastFour: newCard.value.number.slice(-4),
    expMonth: newCard.value.expiry.split('/')[0],
    expYear: '20' + newCard.value.expiry.split('/')[1],
    isDefault: newCard.value.isDefault
  };
  
  if (card.isDefault) {
    // Set all other cards to non-default
    paymentMethods.value.forEach(c => c.isDefault = false);
  }
  
  paymentMethods.value.push(card);
  showAddCardModal.value = false;
  newCard.value = {
    number: '',
    name: '',
    expiry: '',
    cvv: '',
    isDefault: false
  };
};

const removeCard = (id) => {
  if (confirm('Remover este cartão?')) {
    const card = paymentMethods.value.find(c => c.id === id);
    
    // Don't allow removing the default card
    if (card && card.isDefault) {
      alert('Não é possível remover o cartão padrão. Defina outro cartão como padrão primeiro.');
      return;
    }
    
    paymentMethods.value = paymentMethods.value.filter(c => c.id !== id);
    // In a real app, you would send this to the server
  }
};

const setDefaultCard = (id) => {
  paymentMethods.value.forEach(card => {
    card.isDefault = card.id === id;
  });
  // In a real app, you would send this to the server
};

// Review actions
const openReviewModal = (reservation) => {
  reviewToEdit.value = null;
  currentReview.value = {
    excursionId: reservation.excursionId,
    excursionTitle: reservation.excursionTitle,
    rating: 5,
    comment: ''
  };
  showReviewModal.value = true;
};

const editReview = (review) => {
  reviewToEdit.value = review;
  currentReview.value = {
    id: review.id,
    excursionId: review.excursionId,
    excursionTitle: review.excursionTitle,
    rating: review.rating,
    comment: review.comment
  };
  showReviewModal.value = true;
};

const submitReview = () => {
  if (reviewToEdit.value) {
    // Update existing review
    const index = reviews.value.findIndex(r => r.id === reviewToEdit.value.id);
    if (index !== -1) {
      reviews.value[index] = {
        ...reviews.value[index],
        rating: currentReview.value.rating,
        comment: currentReview.value.comment,
        date: new Date().toISOString()
      };
    }
  } else {
    // Create new review
    const newReview = {
      id: Date.now().toString(),
      excursionId: currentReview.value.excursionId,
      excursionTitle: currentReview.value.excursionTitle,
      rating: currentReview.value.rating,
      comment: currentReview.value.comment,
      date: new Date().toISOString()
    };
    
    reviews.value.push(newReview);
    
    // Mark the reservation as reviewed
    const reservation = reservations.value.find(r => r.excursionId === currentReview.value.excursionId);
    if (reservation) {
      reservation.reviewed = true;
    }
  }
  
  showReviewModal.value = false;
  // In a real app, you would send this to the server
};

const deleteReview = (id) => {
  if (confirm('Tem certeza que deseja excluir esta avaliação?')) {
    const review = reviews.value.find(r => r.id === id);
    
    if (review) {
      // Find the corresponding reservation and mark it as not reviewed
      const reservation = reservations.value.find(r => r.excursionId === review.excursionId);
      if (reservation) {
        reservation.reviewed = false;
      }
      
      reviews.value = reviews.value.filter(r => r.id !== id);
    }
    // In a real app, you would send this to the server
  }
};

// Security actions
const changePassword = () => {
  passwordError.value = '';
  passwordSuccess.value = '';
  
  // Validate passwords
  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    passwordError.value = 'As senhas não coincidem.';
    return;
  }
  
  // In a real app, you would send this to the server
  // For now, just simulate success
  passwordSuccess.value = 'Senha alterada com sucesso!';
  
  // Reset form
  passwordForm.value = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };
};

const saveNotificationSettings = () => {
  // In a real app, you would send this to the server
  alert('Preferências de notificação salvas com sucesso!');
};

const deleteAccount = () => {
  if (deleteConfirmation.value === 'EXCLUIR') {
    // In a real app, you would send this to the server
    alert('Conta excluída com sucesso!');
    logout();
  }
};

const logout = () => {
  authStore.logout();
  router.push('/');
};

// Initialize
onMounted(() => {
  if (!authStore.isLoggedIn) {
    router.push('/login');
    return;
  }
  
  // In a real app, you would fetch user data from the server
  editedUser.value = { ...user.value };
});
</script>
