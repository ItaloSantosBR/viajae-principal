<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- Hero section -->
    <section class="relative bg-gray-900 text-white">
      <div class="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent z-10"></div>
      <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80');"></div>
      
      <div class="container-custom relative z-20 py-20 md:py-32">
        <div class="max-w-2xl">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">Como Funciona a Viajaê?</h1>
          <p class="text-xl mb-8">Nossa plataforma conecta você às melhores opções de viagens, garantindo experiências incríveis sem complicação.</p>
        </div>
      </div>
    </section>
    
    <!-- Main content -->
    <div class="container-custom py-16">
      <!-- Introduction -->
      <div class="max-w-3xl mx-auto text-center mb-16">
        <h2 class="text-3xl font-bold mb-6">Descubra e reserve viagens de forma simples e segura!</h2>
        <p class="text-lg text-gray-700 mb-8">
        Conectamos agências de viagens e viajantes, tornando mais fácil encontrar, comparar e reservar viagens. Nossa missão é democratizar o turismo, oferecendo uma plataforma intuitiva e acessível para experiências inesquecíveis.
        </p>
      </div>
      
      <!-- For Travelers -->
      <div class="mb-20">
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div class="bg-white rounded-lg shadow-md p-8 text-center">
            <div class="bg-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="heroicons:magnifying-glass" class="w-8 h-8 text-primary" />
            </div>
            <h3 class="text-xl font-bold mb-3">1. Busque</h3>
            <p class="text-gray-700">
              Utilize nossos filtros para encontrar excursões por mês, categoria, destino ou serviços inclusos. Veja todas as informações detalhadas sobre cada pacote.
            </p>
          </div>
          
          <div class="bg-white rounded-lg shadow-md p-8 text-center">
            <div class="bg-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="heroicons:ticket" class="w-8 h-8 text-primary" />
            </div>
            <h3 class="text-xl font-bold mb-3">2. Reserve</h3>
            <p class="text-gray-700">
              Escolha a excursão ideal, selecione o número de participantes e faça sua reserva de forma segura, com diversas opções de pagamento.
            </p>
          </div>
          
          <div class="bg-white rounded-lg shadow-md p-8 text-center">
            <div class="bg-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="heroicons:map" class="w-8 h-8 text-primary" />
            </div>
            <h3 class="text-xl font-bold mb-3">3. Viaje</h3>
            <p class="text-gray-700">
              Receba sua confirmação e todas as informações necessárias. Aproveite sua viagem com hospedagem e serviços inclusos, sem preocupações.
            </p>
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="md:flex">
            <div class="md:w-1/2 p-8">
              <h3 class="text-2xl font-bold mb-4">Porque se cadastrar?</h3>
              <ul class="space-y-4">
                <li class="flex items-start">
                  <Icon name="heroicons:check-circle" class="w-6 h-6 text-primary mr-3 flex-shrink-0" />
                  <div>
                    <h4 class="font-bold">Tudo em um só lugar</h4>
                    <p class="text-gray-700">Transporte, hospedagem e atividades em um único pacote, sem precisar organizar cada detalhe separadamente.</p>
                  </div>
                </li>
                <li class="flex items-start">
                  <Icon name="heroicons:check-circle" class="w-6 h-6 text-primary mr-3 flex-shrink-0" />
                  <div>
                    <h4 class="font-bold">Economia</h4>
                    <p class="text-gray-700">Preços mais acessíveis em comparação com viagens organizadas individualmente, graças às reservas em grupo.</p>
                  </div>
                </li>
                <li class="flex items-start">
                  <Icon name="heroicons:check-circle" class="w-6 h-6 text-primary mr-3 flex-shrink-0" />
                  <div>
                    <h4 class="font-bold">Segurança</h4>
                    <p class="text-gray-700">Empresas verificadas, avaliações de outros viajantes e suporte da Viajae durante todo o processo.</p>
                  </div>
                </li>
                <li class="flex items-start">
                  <Icon name="heroicons:check-circle" class="w-6 h-6 text-primary mr-3 flex-shrink-0" />
                  <div>
                    <h4 class="font-bold">Novas conexões</h4>
                    <p class="text-gray-700">Oportunidade de conhecer novas pessoas e fazer amizades durante a viagem em grupo.</p>
                  </div>
                </li>
              </ul>
              
              <div class="mt-8">
                <NuxtLink to="/excursoes" class="btn btn-primary">
                  Explorar Excursões
                </NuxtLink>
              </div>
            </div>
            
            <div class="md:w-1/2 bg-gray-100">
              <img 
                src="https://images.unsplash.com/photo-1522199710521-72d69614c702?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80" 
                alt="Viajantes felizes" 
                class="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      
      <!-- For Companies -->
      <div>
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold mb-4">Para Empresas de Turismo</h2>
          <p class="text-lg text-gray-700 max-w-3xl mx-auto">
            Cadastre suas excursões, gerencie reservas e amplie seu alcance com nossa plataforma especializada.
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div class="bg-white rounded-lg shadow-md p-6 text-center">
            <div class="bg-primary-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="heroicons:user-plus" class="w-6 h-6 text-primary" />
            </div>
            <h3 class="text-lg font-bold mb-2">1. Cadastre-se</h3>
            <p class="text-gray-700 text-sm">
              Crie sua conta como empresa de turismo e complete seu perfil com todas as informações.
            </p>
          </div>
          
          <div class="bg-white rounded-lg shadow-md p-6 text-center">
            <div class="bg-primary-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="heroicons:plus-circle" class="w-6 h-6 text-primary" />
            </div>
            <h3 class="text-lg font-bold mb-2">2. Adicione Excursões</h3>
            <p class="text-gray-700 text-sm">
              Cadastre suas excursões com todos os detalhes: datas, destino, hospedagem, serviços inclusos e preços.
            </p>
          </div>
          
          <div class="bg-white rounded-lg shadow-md p-6 text-center">
            <div class="bg-primary-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="heroicons:clipboard-document-list" class="w-6 h-6 text-primary" />
            </div>
            <h3 class="text-lg font-bold mb-2">3. Gerencie Reservas</h3>
            <p class="text-gray-700 text-sm">
              Acompanhe reservas, confirme pagamentos e mantenha contato com os clientes através da plataforma.
            </p>
          </div>
          
          <div class="bg-white rounded-lg shadow-md p-6 text-center">
            <div class="bg-primary-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="heroicons:chart-bar" class="w-6 h-6 text-primary" />
            </div>
            <h3 class="text-lg font-bold mb-2">4. Cresça</h3>
            <p class="text-gray-700 text-sm">
              Receba avaliações, construa sua reputação e amplie seu alcance para novos clientes.
            </p>
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="md:flex flex-row-reverse">
            <div class="md:w-1/2 p-8">
              <h3 class="text-2xl font-bold mb-4">Vantagens para Empresas</h3>
              <ul class="space-y-4">
                <li class="flex items-start">
                  <Icon name="heroicons:check-circle" class="w-6 h-6 text-primary mr-3 flex-shrink-0" />
                  <div>
                    <h4 class="font-bold">Maior visibilidade</h4>
                    <p class="text-gray-700">Alcance novos clientes através da nossa plataforma especializada em excursões com hospedagem.</p>
                  </div>
                </li>
                <li class="flex items-start">
                  <Icon name="heroicons:check-circle" class="w-6 h-6 text-primary mr-3 flex-shrink-0" />
                  <div>
                    <h4 class="font-bold">Gestão simplificada</h4>
                    <p class="text-gray-700">Gerencie reservas, pagamentos e comunicação com clientes em um único sistema.</p>
                  </div>
                </li>
                <li class="flex items-start">
                  <Icon name="heroicons:check-circle" class="w-6 h-6 text-primary mr-3 flex-shrink-0" />
                  <div>
                    <h4 class="font-bold">Credibilidade</h4>
                    <p class="text-gray-700">Construa sua reputação através de avaliações verificadas e aumente a confiança dos clientes.</p>
                  </div>
                </li>
                <li class="flex items-start">
                  <Icon name="heroicons:check-circle" class="w-6 h-6 text-primary mr-3 flex-shrink-0" />
                  <div>
                    <h4 class="font-bold">Análise de desempenho</h4>
                    <p class="text-gray-700">Acesse relatórios e estatísticas para otimizar suas ofertas e aumentar suas vendas.</p>
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
      </div>
    </div>
    
    <!-- FAQ Section -->
    <div class="bg-gray-100 py-16">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold mb-4">Perguntas Frequentes</h2>
          <p class="text-lg text-gray-700 max-w-3xl mx-auto">
            Tire suas dúvidas sobre como funciona a Viajae para viajantes e empresas de turismo.
          </p>
        </div>
        
        <div class="max-w-3xl mx-auto">
          <div class="space-y-6">
            <div v-for="(faq, index) in faqs" :key="index" class="bg-white rounded-lg shadow-md overflow-hidden">
              <button 
                @click="toggleFaq(index)" 
                class="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
              >
                <h3 class="text-lg font-bold">{{ faq.question }}</h3>
                <Icon 
                  :name="openFaq === index ? 'heroicons:chevron-up' : 'heroicons:chevron-down'" 
                  class="w-5 h-5 text-gray-500"
                />
              </button>
              
              <div v-if="openFaq === index" class="px-6 pb-4">
                <p class="text-gray-700">{{ faq.answer }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- CTA Section -->
    <div class="bg-primary py-16">
      <div class="container-custom text-center">
        <h2 class="text-3xl font-bold mb-4 text-white">Pronto para começar?</h2>
        <p class="text-white/90 mb-8 max-w-2xl mx-auto">
          Seja você um viajante em busca de novas aventuras ou uma empresa de turismo querendo expandir seus negócios, a Viajae está aqui para ajudar.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink to="/excursoes" class="btn bg-white text-primary hover:bg-gray-100 font-medium px-6 py-3 rounded-lg">
            Explorar Excursões
          </NuxtLink>
          <NuxtLink to="/cadastro" class="btn bg-primary-600 text-white hover:bg-primary-700 font-medium px-6 py-3 rounded-lg border border-white/20">
            Criar Conta
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// FAQ data
const faqs = [
  {
    question: "Como funciona o pagamento das excursões?",
    answer: "Oferecemos diversas formas de pagamento, incluindo cartão de crédito (parcelado em até 12x), boleto bancário, Pix e transferência. Após a confirmação do pagamento, você receberá um e-mail com todos os detalhes da sua reserva."
  },
  {
    question: "É possível cancelar uma reserva?",
    answer: "Sim, é possível cancelar uma reserva, mas as políticas de cancelamento variam de acordo com cada excursão. Em geral, cancelamentos com mais de 30 dias de antecedência têm reembolso de 90%, entre 15 e 30 dias têm reembolso de 50%, e com menos de 15 dias não há reembolso. Verifique as condições específicas na página da excursão."
  },
  {
    question: "Como as empresas recebem o pagamento das reservas?",
    answer: "Os pagamentos são processados pela Viajae e repassados às empresas de turismo após a confirmação da reserva. O repasse é feito em até 7 dias úteis após a confirmação do pagamento pelo cliente, descontada a taxa da plataforma."
  },
  {
    question: "Quais informações são necessárias para cadastrar uma excursão?",
    answer: "Para cadastrar uma excursão, é necessário informar: título, descrição, destino, datas de início e fim, preço por pessoa, número de vagas disponíveis, categoria, serviços inclusos, detalhes da hospedagem, itinerário, política de cancelamento e imagens do destino e hospedagem."
  },
  {
    question: "Como funciona a avaliação das excursões?",
    answer: "Após participar de uma excursão, os viajantes podem avaliar sua experiência com notas de 1 a 5 estrelas e deixar comentários. Essas avaliações são verificadas e publicadas na plataforma para ajudar outros viajantes a escolherem as melhores opções."
  },
  {
    question: "Qual é a taxa cobrada das empresas de turismo?",
    answer: "A Viajae cobra uma taxa de 10% sobre o valor de cada reserva confirmada. Esta taxa inclui o processamento do pagamento, a divulgação na plataforma e todo o suporte técnico necessário."
  }
];

// State for FAQ accordion
const openFaq = ref(null);

// Toggle FAQ accordion
const toggleFaq = (index) => {
  if (openFaq.value === index) {
    openFaq.value = null;
  } else {
    openFaq.value = index;
  }
};
</script>
