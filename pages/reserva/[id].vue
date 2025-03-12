<template>
  <div class="max-w-screen-md mx-auto mt-8 mb-8 px-6"> <!-- Container reduzido e centralizado -->
    
    <div class="flex items-center text-gray-600 mb-4">
      <h2 class="text-2xl font-bold mb-4">Finalize sua reserva e se prepare para viajar para {{ excursion.destination }}</h2>
    </div>
    
    <div class="flex flex-row"> 
    <div class="flex items-center text-gray-600 mb-4 mr-4">
      <Icon name="heroicons:building-office-2" class="w-4 h-4 mr-1" />
      <span>{{ excursion.startDate }} até {{ excursion.endDate }}</span>
    </div>
    
    <div class="flex items-center text-gray-600 mb-4">
      <Icon name="heroicons:building-office-2" class="w-4 h-4 mr-1" />
      <span>{{ excursion.companyName }}</span>
    </div>
    </div>
  

    <!-- Serviços incluídos -->
    <div class="flex flex-wrap gap-2 mb-4">
      <span 
        v-for="service in excursion.includedServices" 
        :key="service" 
        class="inline-flex items-center bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs whitespace-nowrap"
      >
        {{ getServiceName(service) }}
      </span>
    </div>

    <!-- Formulário de reserva -->
    <form @submit.prevent="submitReservation" class="space-y-6">
      
      <!-- Número de Participantes -->
      <div class="bg-gray-50 p-4 rounded-lg shadow-md">
        <h2 class="text-xl font-bold mb-4">Número de Participantes</h2>
        
        <div class="flex items-center justify-between mb-4">
          <div>
            <label for="participants" class="form-label">Selecione o número de vagas</label>
            <p class="text-sm text-gray-500">{{ excursion.availableSpots }} vagas disponíveis</p>
          </div>
          <select 
            id="participants" 
            v-model="formData.participants" 
            class="form-input w-24"
            @change="updateParticipants"
          >
            <option v-for="i in Math.min(10, excursion.availableSpots)" :key="i" :value="i">
              {{ i }}
            </option>
          </select>
        </div>
        
        <div class="flex justify-between text-sm text-gray-600">
          <span>Preço por pessoa:</span>
          <span>R$ {{ excursion.price }}</span>
        </div>
        <div class="flex justify-between text-sm text-gray-600">
          <span>Número de pessoas:</span>
          <span>x{{ formData.participants }}</span>
        </div>
        <div class="border-t border-gray-200 mt-2 pt-2 flex justify-between font-bold">
          <span>Total:</span>
          <span>R$ {{ totalPrice }}</span>
        </div>
      </div>

      <!-- Dados dos Participantes -->
      <div class="bg-gray-50 p-4 rounded-lg shadow-md">
        <h2 class="text-xl font-bold mb-4">Dados dos Participantes</h2>
        
        <div v-for="(participant, index) in formData.participantDetails" :key="index" class="mb-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="font-bold">Participante {{ index + 1 }}</h3>
            <div v-if="index === 0" class="text-xs bg-primary-100 text-primary px-2 py-1 rounded-full">
              Responsável
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label :for="`name-${index}`" class="form-label">Nome Completo</label>
              <input 
                :id="`name-${index}`" 
                v-model="participant.name" 
                type="text" 
                class="form-input" 
                placeholder="Nome completo" 
                required
              />
            </div>
            
            <div>
              <label :for="`cpf-${index}`" class="form-label">CPF</label>
              <input 
                :id="`cpf-${index}`" 
                v-model="participant.cpf" 
                type="text" 
                class="form-input" 
                placeholder="000.000.000-00" 
                required
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Local de Embarque -->
      <div class="bg-gray-50 p-4 rounded-lg shadow-md">
        <h2 class="text-xl font-bold mb-4">Local de Embarque</h2>
        
        <div class="space-y-4">
          <div v-for="(location, index) in pickupLocations" :key="index" class="flex items-start">
            <input 
              :id="`location-${index}`" 
              type="radio" 
              v-model="formData.pickupLocation" 
              :value="location.id" 
              class="h-4 w-4 text-primary focus:ring-primary border-gray-300 mt-1"
              required
            />
            <label :for="`location-${index}`" class="ml-2 block">
              <span class="font-medium">{{ location.name }}</span>
              <p class="text-sm text-gray-600">{{ location.address }}</p>
              <p class="text-sm text-gray-600">Horário de saída: {{ location.departureTime }}</p>
            </label>
          </div>
        </div>
      </div>

      <!-- Botão de envio -->
      <div class="border-t border-gray-200 pt-6">
        <button 
          type="submit" 
          class="btn btn-primary w-full"
          :disabled="submitting"
        >
          <span v-if="submitting" class="flex items-center justify-center">
            <span class="animate-spin h-5 w-5 mr-2 border-t-2 border-b-2 border-white rounded-full"></span>
            Processando...
          </span>
          <span v-else>Finalizar Reserva</span>
        </button>
      </div>
    </form>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useExcursionsStore } from '~/stores/excursions';
import { useReservationsStore } from '~/stores/reservations';
import { useAuthStore } from '~/stores/auth';

const route = useRoute();
const router = useRouter();
const excursionId = route.params.id;
const excursionsStore = useExcursionsStore();
const reservationsStore = useReservationsStore();
const authStore = useAuthStore();

// State
const loading = ref(true);
const error = ref(null);
const submitting = ref(false);
const formError = ref(null);

// Form data
const formData = ref({
  participants: 1,
  participantDetails: [
    {
      name: '',
      cpf: '',
      birthdate: '',
      phone: '',
      email: '',
      specialNeeds: ''
    }
  ],
  pickupLocation: '',
  paymentMethod: '',
  cardDetails: {
    number: '',
    name: '',
    expiry: '',
    cvv: '',
    installments: '1'
  },
  termsAccepted: false
});

// Computed properties
const excursion = computed(() => excursionsStore.getExcursionById(excursionId));

const totalPrice = computed(() => {
  if (!excursion.value) return 0;
  return excursion.value.price * formData.value.participants;
});

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

// Methods
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

const getDurationDays = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays + 1; // Including the start day
};

const getServiceName = (serviceId) => {
  const service = excursionsStore.additionalServices.find(s => s.id === serviceId);
  return service ? service.name : '';
};

const getExcursionImage = (excursion) => {
  if (!excursion || !excursion.images || excursion.images.length === 0) {
    return `https://source.unsplash.com/random/800x600/?travel`;
  }
  
  const imagePath = excursion.images[0];
  if (imagePath.startsWith('/images/')) {
    return `https://source.unsplash.com/random/800x600/?travel,${excursion.category}`;
  }
  
  return imagePath;
};

const updateParticipants = () => {
  const count = formData.value.participants;
  const currentDetails = [...formData.value.participantDetails];
  
  // If we need more participant forms
  if (count > currentDetails.length) {
    for (let i = currentDetails.length; i < count; i++) {
      currentDetails.push({
        name: '',
        cpf: '',
        birthdate: '',
        phone: '',
        email: '',
        specialNeeds: ''
      });
    }
  } 
  // If we need fewer participant forms
  else if (count < currentDetails.length) {
    currentDetails.splice(count);
  }
  
  formData.value.participantDetails = currentDetails;
};

const submitReservation = async () => {
  if (!authStore.isLoggedIn) {
    router.push('/login');
    return;
  }
  
  submitting.value = true;
  formError.value = null;
  
  try {
    if (!excursion.value) {
      throw new Error('Excursão não encontrada');
    }
    
    // Prepare reservation data
    const reservationData = {
      excursionId: excursion.value.id,
      excursionTitle: excursion.value.title,
      userId: authStore.user.id,
      companyId: excursion.value.companyId,
      companyName: excursion.value.companyName,
      startDate: excursion.value.startDate,
      endDate: excursion.value.endDate,
      price: excursion.value.price,
      participants: formData.value.participants,
      totalPrice: totalPrice.value,
      participantDetails: formData.value.participantDetails,
      pickupLocation: formData.value.pickupLocation,
      paymentMethod: formData.value.paymentMethod
    };
    
    // If credit card payment, add card details (in a real app, this would be handled securely)
    if (formData.value.paymentMethod === 'credit_card') {
      reservationData.cardDetails = {
        // In a real app, you would NOT store full card details like this
        // This is just for demonstration
        lastFourDigits: formData.value.cardDetails.number.slice(-4),
        installments: formData.value.cardDetails.installments
      };
    }
    
    // Create reservation
    const result = await reservationsStore.createReservation(reservationData);
    
    if (result.success) {
      // Redirect to confirmation page
      router.push(`/reserva-confirmada/${result.reservationId}`);
    } else {
      formError.value = result.error || 'Ocorreu um erro ao processar sua reserva. Por favor, tente novamente.';
    }
  } catch (err) {
    formError.value = err.message || 'Ocorreu um erro ao processar sua reserva. Por favor, tente novamente.';
  } finally {
    submitting.value = false;
  }
};

// Fetch data
onMounted(async () => {
  loading.value = true;
  error.value = null;
  
  try {
    if (!authStore.isLoggedIn) {
      // Redirect to login if not logged in
      router.push('/login');
      return;
    }
    
    await excursionsStore.fetchExcursions();
    
    if (!excursion.value) {
      error.value = 'Excursão não encontrada ou não está mais disponível.';
    } else {
      // Pre-fill first participant with user data if available
      if (authStore.user) {
        formData.value.participantDetails[0].name = authStore.user.name || '';
        formData.value.participantDetails[0].email = authStore.user.email || '';
        formData.value.participantDetails[0].phone = authStore.user.phone || '';
      }
    }
  } catch (err) {
    error.value = err.message || 'Ocorreu um erro ao carregar os detalhes da excursão.';
  } finally {
    loading.value = false;
  }
});
</script>
