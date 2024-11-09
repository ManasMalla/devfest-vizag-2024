<template>
  <v-app style="background-color: #FFFFFF" class="google-font">
    <CoreAppToolbar />
    <ClientOnly>
      <CoreAppDrawer />
  </ClientOnly>
    <v-main
      class="mt-3"
      style="max-width: 1200px; margin-left: auto; margin-right: auto"
    >
      <slot></slot>
    </v-main>
    <CoreAppFooter />
  </v-app>
</template>

<script setup>
useScript({
  src: "https://www.instagram.com/embed.js",
  async: true
})
</script>
