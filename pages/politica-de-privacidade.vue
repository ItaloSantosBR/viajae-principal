<template>
  <div class="container-custom py-12 min-h-screen">
    <article class="prose max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold mb-8">Política de Privacidade</h1>
      
      <Section title="1. Introdução">
        <p>Na Viajae, valorizamos sua privacidade e nos comprometemos com a proteção dos dados de usuários e parceiros.</p>
      </Section>

      <Section title="2. Coleta de Dados">
        <ul>
          <li>Dados cadastrais durante o registro</li>
          <li>Informações de pagamento criptografadas</li>
          <li>Cookies para melhorar a experiência</li>
        </ul>
      </Section>

      <Section title="3. Uso dos Dados">
        <p>Seus dados são usados para:</p>
        <ul>
          <li>Processar reservas</li>
          <li>Comunicação transacional</li>
          <li>Melhorias na plataforma</li>
        </ul>
      </Section>

      <Section title="4. Armazenamento e Proteção">
        <p>Utilizamos:</p>
        <ul>
          <li>Criptografia SSL/TLS</li>
          <li>Armazenamento em servidores seguros</li>
          <li>Retenção por até 5 anos</li>
        </ul>
      </Section>

      <Section title="5. Direitos do Usuário">
        <p>Você pode:</p>
        <ul>
          <li>Acessar/editar dados no perfil</li>
          <li>Solicitar exclusão via suporte</li>
        </ul>
      </Section>

      <Section title="6. Contato e Atualizações">
        <p>Dúvidas? contato@viajae.com.br</p>
        <p>Atualizações serão comunicadas por email.</p>
      </Section>
    </article>
  </div>
</template>

<script setup>
const Section = ({ title }) => <>
  <h2 class="text-2xl font-semibold mt-8 mb-4">{title}</h2>
  <slot />
</>
</script>
