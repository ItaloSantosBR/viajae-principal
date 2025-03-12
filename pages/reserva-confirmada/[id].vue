<template>
  <div class="bg-gray-50 min-h-screen py-12">
    <div class="container-custom">
      <!-- Loading state -->
      <div v-if="loading" class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
      
      <!-- Error state -->
      <div v-else-if="error" class="bg-red-50 text-red-600 p-6 rounded-lg max-w-2xl mx-auto">
        <Icon name="heroicons:exclamation-circle" class="w-12 h-12 mx-auto mb-4" />
        <h2 class="text-xl font-bold mb-2 text-center">Erro ao carregar reserva</h2>
        <p class="text-center">{{ error }}</p>
        <div class="flex justify-center mt-6">
          <NuxtLink to="/excursoes" class="btn btn-primary">
            Ver Todas as Excursões
          </NuxtLink>
        </div>
      </div>
      
      <!-- Confirmation page -->
      <div v-else class="max-w-3xl mx-auto">
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <!-- Success header -->
          <div class="bg-primary p-6 text-white text-center">
            <div class="flex justify-center mb-4">
              <div class="bg-white rounded-full p-3">
                <Icon name="heroicons:check" class="w-12 h-12 text-primary" />
              </div>
            </div>
            <h1 class="text-2xl font-bold mb-2">Reserva Realizada com Sucesso!</h1>
            <p>Sua reserva está aguardando confirmação da agência.</p>
          </div>
          
          <!-- Reservation details -->
          <div class="p-6">
            <div class="mb-6">
              <div class="flex justify-between items-center mb-4">
                <h2 class="text-xl font-bold">Detalhes da Reserva</h2>
                <span class="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                  Aguardando Confirmação
                </span>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p class="text-sm text-gray-500">Número da Reserva</p>
                  <p class="font-medium">{{ reservation.id }}</p>
                </div>
                <div>
                  <p class="text-sm text-gray-500">Data da Reserva</p>
                  <p class="font-medium">{{ formatDate(reservation.createdAt) }}</p>
                </div>
                <div>
                  <p class="text-sm text-gray-500">Forma de Pagamento</p>
                  <p class="font-medium">{{ getPaymentMethodName(reservation.paymentMethod) }}</p>
                </div>
                <div>
                  <p class="text-sm text-gray-500">Status</p>
                  <p class="font-medium">Aguardando Confirmação da Agência</p>
                </div>
              </div>
            </div>
            
            <div class="border-t border-gray-200 pt-6 mb-6">
              <h2 class="text-xl font-bold mb-4">Excursão</h2>
              
              <div class="flex flex-col md:flex-row">
                <div class="md:w-1/4 mb-4 md:mb-0">
                  <img 
                    :src="getExcursionImage()" 
                    :alt="reservation.excursionTitle" 
                    class="w-full h-32 object-cover rounded-lg" 
                  />
                </div>
                <div class="md:w-3/4 md:pl-6">
                  <h3 class="text-lg font-bold mb-2">{{ reservation.excursionTitle }}</h3>
                  
                  <div class="flex items-center text-gray-600 mb-2">
                    <Icon name="heroicons:calendar" class="w-4 h-4 mr-1" />
                    <span>{{ formatDateRange(reservation.startDate, reservation.endDate) }}</span>
                  </div>
                  
                  <div class="flex items-center text-gray-600 mb-2">
                    <Icon name="heroicons:building-office-2" class="w-4 h-4 mr-1" />
                    <span>{{ reservation.companyName }}</span>
                  </div>
                  
                  <div class="flex items-center text-gray-600">
                    <Icon name="heroicons:user-group" class="w-4 h-4 mr-1" />
                    <span>{{ reservation.participants }} {{ reservation.participants > 1 ? 'participantes' : 'participante' }}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="border-t border-gray-200 pt-6 mb-6">
              <h2 class="text-xl font-bold mb-4">Resumo do Pagamento</h2>
              
              <div class="bg-gray-50 p-4 rounded-lg">
                <div class="flex justify-between mb-2">
                  <span>Preço por pessoa</span>
                  <span>R$ {{ reservation.price }}</span>
                </div>
                <div class="flex justify-between mb-2">
                  <span>Participantes</span>
                  <span>x {{ reservation.participants }}</span>
                </div>
                <div class="border-t border-gray-200 my-2 pt-2 flex justify-between font-bold">
                  <span>Total</span>
                  <span>R$ {{ reservation.totalPrice }}</span>
                </div>
              </div>
            </div>
            
            <!-- Payment instructions based on payment method -->
            <div v-if="reservation.paymentMethod === 'pix'" class="border-t border-gray-200 pt-6 mb-6">
              <h2 class="text-xl font-bold mb-4">Instruções de Pagamento</h2>
              
              <div class="bg-gray-50 p-4 rounded-lg text-center">
                <Icon name="heroicons:qr-code" class="w-32 h-32 mx-auto mb-4 text-gray-400" />
                <p class="text-gray-600 mb-2">
                  Escaneie o QR Code acima com o aplicativo do seu banco para realizar o pagamento via PIX.
                </p>
                <p class="text-gray-600 mb-4">
                  O pagamento deve ser realizado em até 30 minutos para garantir sua reserva.
                </p>
                <div class="bg-white p-3 rounded-md inline-block">
                  <p class="font-mono text-sm">chave-pix-exemplo@viajae.com.br</p>
                </div>
              </div>
            </div>
            
            <div v-if="reservation.paymentMethod === 'boleto'" class="border-t border-gray-200 pt-6 mb-6">
              <h2 class="text-xl font-bold mb-4">Instruções de Pagamento</h2>
              
              <div class="bg-gray-50 p-4 rounded-lg">
                <p class="text-gray-600 mb-4">
                  O boleto bancário foi enviado para o seu e-mail. Você também pode acessá-lo clicando no botão abaixo.
                </p>
                <div class="flex justify-center">
                  <button class="btn btn-primary">
                    <Icon name="heroicons:document-text" class="w-5 h-5 mr-2" />
                    Visualizar Boleto
                  </button>
                </div>
              </div>
            </div>
            
            <div class="border-t border-gray-200 pt-6 mb-6">
              <h2 class="text-xl font-bold mb-4">Próximos Passos</h2>
              
              <div class="space-y-4">
                <div class="flex items-start">
                  <div class="flex-shrink-0 bg-primary-50 rounded-full p-2 mr-3">
                    <Icon name="heroicons:clock" class="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 class="font-bold">Aguarde a Confirmação</h3>
                    <p class="text-gray-600">
                      A agência de turismo irá analisar sua reserva e confirmá-la em até 24 horas. Você receberá uma notificação por e-mail.
                    </p>
                  </div>
                </div>
                
                <div class="flex items-start">
                  <div class="flex-shrink-0 bg-primary-50 rounded-full p-2 mr-3">
                    <Icon name="heroicons:envelope" class="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 class="font-bold">Receba seu Voucher</h3>
                    <p class="text-gray-600">
                      Após a confirmação, você receberá o voucher da excursão por e-mail. Ele deverá ser apresentado no embarque.
                    </p>
                  </div>
                </div>
                
                <div class="flex items-start">
                  <div class="flex-shrink-0 bg-primary-50 rounded-full p-2 mr-3">
                    <Icon name="heroicons:suitcase" class="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 class="font-bold">Prepare-se para a Viagem</h3>
                    <p class="text-gray-600">
                      Verifique as informações sobre o que levar e chegue ao local de embarque com pelo menos 30 minutos de antecedência.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <NuxtLink to="/minhas-reservas" class="btn btn-primary">
                Ver Minhas Reservas
              </NuxtLink>
              <NuxtLink to="/excursoes" class="btn btn-outline">
                Explorar Mais Excursões
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useReservationsStore } from '~/stores/reservations';

const route = useRoute();
const reservationId = route.params.id;
const reservationsStore = useReservationsStore();

// State
const loading = ref(true);
const error = ref(null);
const reservation = ref(null);

// Methods
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
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

const getPaymentMethodName = (methodId) => {
  const methods = {
    'credit_card': 'Cartão de Crédito',
    'pix': 'PIX',
    'boleto': 'Boleto Bancário'
  };
  
  return methods[methodId] || methodId;
};

const getExcursionImage = () => {
  // In a real app, this would come from the excursion data
  return `https://source.unsplash.com/random/800x600/?travel`;
};

// Fetch data
onMounted(async () => {
  loading.value = true;
  error.value = null;
  
  try {
    // In a real app, you would fetch the specific reservation
    // For now, we'll simulate it
    
    // Wait for a moment to simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    reservation.value = {
      id: reservationId,
      excursionId: '1',
      excursionTitle: 'Fim de Semana em Ilhabela',
      userId: '3',
      companyId: '1',
      companyName: 'Aventuras Marítimas',
      startDate: '2025-05-15',
      endDate: '2025-05-18',
      price: 1200,
      participants: 2,
      totalPrice: 2400,
      status: 'pending',
      paymentMethod: 'credit_card',
      createdAt: new Date().toISOString()
    };
    
    if (!reservation.value) {
      error.value = 'Reserva não encontrada ou não está mais disponível.';
    }
  } catch (err) {
    error.value = err.message || 'Ocorreu um erro ao carregar os detalhes da reserva.';
  } finally {
    loading.value = false;
  }
});
</script>
