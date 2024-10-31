<template>
    <NuxtLayout name="default">
      <v-container fluid class="mt-5">
        <v-row>
          <v-col>
            <h1>Arcade</h1>
            <p>Felt something missing? Well, you are at the right spot. Grab your thinking hats and put
          them on as we're going to play and compete to learn and earn, all while having fun.</p>
        </v-col>
      </v-row>
      </v-container>
    </NuxtLayout>
  </template>
  
  
  <script setup>
  const { arcadeData, mainData } = useJSONData();
  
  definePageMeta({
    layout: false,
  });
  
  useSeoMeta({
    contentType: "text/html; charset=utf-8",
    title: "Diwali Quiz - " + mainData.eventInfo.name + " | " + mainData.communityName,
    description: mainData.eventInfo.description.short,
    keywords: mainData.seo.keywords,
    ogLocale: 'en_US',
    author: "Manas Malla",
    creator: "Manas Malla",
    viewport: "width=device-width, initial-scale=1.0",
    ogTitle: "Diwali Quiz - " + mainData.eventInfo.name + " | " + mainData.communityName,
    ogDescription: mainData.eventInfo.description.short,
    ogImage: `${mainData.seo.hostUrl}/thumbnail.png?auto=format&fit=crop&frame=1&h=512&w=1024`,
    ogUrl: mainData.seo.hostUrl,
    ogType: "website",
    twitterTitle:
      "Diwali Quiz - " + mainData.eventInfo.name + " | " + mainData.communityName,
    twitterDescription: mainData.eventInfo.description.short,
    twitterImage: `${mainData.seo.hostUrl}thumbnail.png?auto=format&fit=crop&frame=1&h=512&w=1024`,
    twitterCard: "summary_large_image",
  });
  </script>
  
  <style scoped></style>