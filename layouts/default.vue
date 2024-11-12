<template>
  <v-app style="background-color: #FFFFFF" class="google-font">
    <CoreAppToolbar />
    <ClientOnly>
      <CoreAppDrawer />
  </ClientOnly>
    <v-main
      class="mt-16"
      style="max-width: 1200px; margin-left: auto; margin-right: auto"
    >
      <slot></slot>
    </v-main>
    <CoreAppFooter />
  </v-app>
</template>

<script setup>
import { useWindowFocus } from '~/composables/states';

useScript({
  src: "https://www.instagram.com/embed.js",
  async: true
})

const windowFocus = useWindowFocus();
function checkWindowFocusMode () {
  const focusState = document.hasFocus();
  windowFocus.value = focusState;
}

onMounted(() => {
  checkWindowFocusMode();
  window.addEventListener('focus', checkWindowFocusMode);
  window.addEventListener('blur', checkWindowFocusMode);
});


onUnmounted(() => {
  checkWindowFocusMode();
  window.removeEventListener('focus', checkWindowFocusMode);
  window.removeEventListener('blur', checkWindowFocusMode);
});


</script>
