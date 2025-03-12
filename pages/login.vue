<template>
  <div class="py-16 bg-gray-50 min-h-screen">
    <div class="container-custom">
      <div class="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div class="p-8">
          <div class="text-center mb-8">
            <h1 class="text-2xl font-bold text-gray-800">Entrar na sua conta</h1>
            <p class="text-gray-600 mt-2">Acesse para gerenciar suas reservas e excursões</p>
          </div>
          
          <!-- Account type selection -->
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
          
          <form @submit.prevent="handleLogin" class="space-y-6">
            <div>
              <label for="email" class="form-label">Email</label>
              <input 
                id="email" 
                v-model="email" 
                type="email" 
                class="form-input" 
                placeholder="seu@email.com" 
                required
              />
            </div>
            
            <div>
              <label for="password" class="form-label">Senha</label>
              <input 
                id="password" 
                v-model="password" 
                type="password" 
                class="form-input" 
                placeholder="••••••••" 
                required
              />
            </div>
            
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <input 
                  id="remember-me" 
                  type="checkbox" 
                  v-model="rememberMe" 
                  class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label for="remember-me" class="ml-2 block text-sm text-gray-700">
                  Lembrar de mim
                </label>
              </div>
              
              <div class="text-sm">
                <NuxtLink to="/recuperar-senha" class="text-primary hover:text-primary-600">
                  Esqueceu sua senha?
                </NuxtLink>
              </div>
            </div>
            
            <div>
              <button 
                type="submit" 
                class="btn btn-primary w-full"
                :disabled="loading"
              >
                <span v-if="loading" class="flex items-center justify-center">
                  <span class="animate-spin h-5 w-5 mr-2 border-t-2 border-b-2 border-white rounded-full"></span>
                  Entrando...
                </span>
                <span v-else>Entrar</span>
              </button>
            </div>
            
            <div v-if="error" class="bg-red-50 text-red-600 p-3 rounded-md text-sm">
              {{ error }}
            </div>
          </form>
          
          <div class="mt-8 text-center">
            <p class="text-gray-600">
              Não tem uma conta? 
              <NuxtLink to="/cadastro" class="text-primary hover:text-primary-600 font-medium">
                Cadastre-se
              </NuxtLink>
            </p>
          </div>
          
          <div class="mt-8 pt-6 border-t border-gray-200">
            <p class="text-center text-sm text-gray-600 mb-4">
              Ou continue com
            </p>
            
            <div class="flex space-x-4 justify-center">
              <button class="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 w-full">
                <Icon name="mdi:google" class="w-5 h-5 mr-2" />
                Google
              </button>
              <button class="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 w-full">
                <Icon name="mdi:facebook" class="w-5 h-5 mr-2" />
                Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore();
const router = useRouter();

// Form data
const email = ref('');
const password = ref('');
const rememberMe = ref(false);
const loading = ref(false);
const error = ref('');
const accountType = ref('customer'); // Default to customer login

// Handle login
const handleLogin = async () => {
  loading.value = true;
  error.value = '';
  
  try {
    // Pass the account type to the login method
    const success = await authStore.login(email.value, password.value, accountType.value);
    
    if (success) {
      // Redirect based on user role
      if (authStore.isAdmin) {
        router.push('/admin/dashboard');
      } else if (authStore.isCompany) {
        router.push('/empresa/dashboard');
      } else {
        router.push('/perfil');
      }
    } else {
      error.value = 'Credenciais inválidas. Por favor, tente novamente.';
    }
  } catch (err) {
    error.value = err.message || 'Ocorreu um erro ao fazer login. Por favor, tente novamente.';
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
