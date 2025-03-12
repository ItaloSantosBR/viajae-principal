<template>
  <div class="py-16 bg-gray-50 min-h-screen">
    <div class="container-custom">
      <div class="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div class="p-8">
          <div class="text-center mb-8">
            <h1 class="text-2xl font-bold text-gray-800">Crie sua conta</h1>
            <p class="text-gray-600 mt-2">Junte-se à Viajae para descobrir excursões incríveis</p>
          </div>
          
          <div class="mb-8">
            <div class="flex border-b border-gray-200">
              <button 
                @click="accountType = 'customer'" 
                class="flex-1 py-3 text-center font-medium"
                :class="accountType === 'customer' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'"
              >
                Sou Cliente
              </button>
              <button 
                @click="accountType = 'company'" 
                class="flex-1 py-3 text-center font-medium"
                :class="accountType === 'company' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'"
              >
                Sou Empresa de Turismo
              </button>
            </div>
          </div>
          
          <form @submit.prevent="handleRegister" class="space-y-6">
            <!-- Common fields for both account types -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label for="name" class="form-label">Nome Completo</label>
                <input 
                  id="name" 
                  v-model="formData.name" 
                  type="text" 
                  class="form-input" 
                  placeholder="Seu nome completo" 
                  required
                />
              </div>
              
              <div>
                <label for="email" class="form-label">Email</label>
                <input 
                  id="email" 
                  v-model="formData.email" 
                  type="email" 
                  class="form-input" 
                  placeholder="seu@email.com" 
                  required
                />
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label for="password" class="form-label">Senha</label>
                <input 
                  id="password" 
                  v-model="formData.password" 
                  type="password" 
                  class="form-input" 
                  placeholder="••••••••" 
                  required
                />
              </div>
              
              <div>
                <label for="confirmPassword" class="form-label">Confirmar Senha</label>
                <input 
                  id="confirmPassword" 
                  v-model="formData.confirmPassword" 
                  type="password" 
                  class="form-input" 
                  placeholder="••••••••" 
                  required
                />
              </div>
            </div>
            
            <div>
              <label for="phone" class="form-label">Telefone</label>
              <input 
                id="phone" 
                v-model="formData.phone" 
                type="tel" 
                class="form-input" 
                placeholder="(00) 00000-0000" 
                required
              />
            </div>
            
            <!-- Company specific fields -->
            <template v-if="accountType === 'company'">
              <div>
                <label for="companyName" class="form-label">Nome da Empresa</label>
                <input 
                  id="companyName" 
                  v-model="formData.companyName" 
                  type="text" 
                  class="form-input" 
                  placeholder="Nome da sua empresa de turismo" 
                  required
                />
              </div>
              
              <div>
                <label for="cnpj" class="form-label">CNPJ</label>
                <input 
                  id="cnpj" 
                  v-model="formData.cnpj" 
                  type="text" 
                  class="form-input" 
                  placeholder="00.000.000/0000-00" 
                  required
                />
              </div>
              
              <div>
                <label for="description" class="form-label">Descrição da Empresa</label>
                <textarea 
                  id="description" 
                  v-model="formData.description" 
                  class="form-input" 
                  rows="3" 
                  placeholder="Conte um pouco sobre sua empresa e os serviços oferecidos"
                ></textarea>
              </div>
            </template>
            
            <div class="flex items-center">
              <input 
                id="terms" 
                type="checkbox" 
                v-model="formData.termsAccepted" 
                class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                required
              />
              <label for="terms" class="ml-2 block text-sm text-gray-700">
                Eu concordo com os 
                <NuxtLink to="/termos" class="text-primary hover:text-primary-600">
                  Termos de Serviço
                </NuxtLink> 
                e 
                <NuxtLink to="/privacidade" class="text-primary hover:text-primary-600">
                  Política de Privacidade
                </NuxtLink>
              </label>
            </div>
            
            <div>
              <button 
                type="submit" 
                class="btn btn-primary w-full"
                :disabled="loading"
              >
                <span v-if="loading" class="flex items-center justify-center">
                  <span class="animate-spin h-5 w-5 mr-2 border-t-2 border-b-2 border-white rounded-full"></span>
                  Processando...
                </span>
                <span v-else>Criar Conta</span>
              </button>
            </div>
            
            <div v-if="error" class="bg-red-50 text-red-600 p-3 rounded-md text-sm">
              {{ error }}
            </div>
          </form>
          
          <div class="mt-8 text-center">
            <p class="text-gray-600">
              Já tem uma conta? 
              <NuxtLink to="/login" class="text-primary hover:text-primary-600 font-medium">
                Faça login
              </NuxtLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore();
const router = useRouter();

// Account type selection
const accountType = ref('customer');

// Form data
const formData = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  phone: '',
  companyName: '',
  cnpj: '',
  description: '',
  termsAccepted: false
});

const loading = ref(false);
const error = ref('');

// Handle registration
const handleRegister = async () => {
  loading.value = true;
  error.value = '';
  
  // Validate passwords match
  if (formData.password !== formData.confirmPassword) {
    error.value = 'As senhas não coincidem.';
    loading.value = false;
    return;
  }
  
  try {
    // Prepare user data
    const userData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      isCompany: accountType.value === 'company'
    };
    
    // Add company specific data if applicable
    if (accountType.value === 'company') {
      userData.companyName = formData.companyName;
      userData.cnpj = formData.cnpj;
      userData.description = formData.description;
    }
    
    const success = await authStore.register(userData);
    
    if (success) {
      // Redirect based on user role
      if (accountType.value === 'company') {
        router.push('/empresa/dashboard');
      } else {
        router.push('/perfil');
      }
    } else {
      error.value = 'Ocorreu um erro ao criar sua conta. Por favor, tente novamente.';
    }
  } catch (err) {
    error.value = err.message || 'Ocorreu um erro ao criar sua conta. Por favor, tente novamente.';
  } finally {
    loading.value = false;
  }
};

// If user is already logged in, redirect
onMounted(() => {
  if (authStore.isLoggedIn) {
    if (authStore.isAdmin) {
      router.push('/admin/dashboard');
    } else if (authStore.isCompany) {
      router.push('/empresa/dashboard');
    } else {
      router.push('/perfil');
    }
  }
});
</script>
