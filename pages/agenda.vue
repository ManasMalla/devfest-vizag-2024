<template>
  <NuxtLayout name="default">
    <v-container fluid class="mt-5">
      <v-row>
        <v-col md="12">
          <h1>Agenda</h1>
          <p>
            Follow code demonstrations by our expert speakers on different
            tracks. Check out the schedule below and don't forget to mark your
            calendar so that you don't miss out on any sessions.
          </p>
        </v-col>
      </v-row>
      <ClientOnly>
        <div style="width: '100%'; display: flex; justify-content: center;">
          <iframe
            id="agendaIframe"
            frameborder="0" 
            style="width: 100%; max-width: 800px; height: 1500px;"
            src="https://agorify.com/embed/a/ijzcByGxciQXOKbViZLh"
          ></iframe>
        </div>
      </ClientOnly>
    </v-container>
  </NuxtLayout>
</template>

<script setup>
const model = ref("");
const { mainData, scheduleData } = useJSONData();
definePageMeta({
  layout: false,
});

useSeoMeta({
  contentType: "text/html; charset=utf-8",
  title: "Agenda - " + mainData.eventInfo.name + " | " + mainData.communityName,
  description: mainData.eventInfo.description.short,
  keywords: mainData.seo.keywords,
  ogLocale:'en_US',
  author: "OSS Labs",
  creator: "OSS Labs",
  viewport: "width=device-width, initial-scale=1.0",
  ogTitle:
    "Agenda - " + mainData.eventInfo.name + " | " + mainData.communityName,
  ogDescription: mainData.eventInfo.description.short,
  ogImage: `${mainData.seo.hostUrl}/thumbnail.png?auto=format&fit=crop&frame=1&h=512&w=1024`,
  ogUrl: mainData.seo.hostUrl,
  ogType: "website",
  twitterTitle:
    "Agenda - " + mainData.eventInfo.name + " | " + mainData.communityName,
  twitterDescription: mainData.eventInfo.description.short,
  twitterImage: `${mainData.seo.hostUrl}thumbnail.png?auto=format&fit=crop&frame=1&h=512&w=1024`,
  twitterCard: "summary_large_image",
});
</script>
<style scoped>
</style>
