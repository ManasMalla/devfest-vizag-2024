<template>
    <NuxtLayout name="default">
      <v-container fluid class="mt-5">
        <p>Let's test how much you know about Diwali</p>
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