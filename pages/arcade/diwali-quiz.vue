<template>
  <NuxtLayout name="default">
    <v-container fluid class="mt-5">
      <p>Let's test how much you know about Diwali</p>
      
      <form action=""
        style="margin: 24px auto; display: flex; justify-content: start; align-items: start; flex-direction: column;"
      >
        <div v-for="(item, index) in diwaliQuizData" :key="index"
          style="display: flex; flex-direction: column; justify-content: start; align-items: start;"
        >
          <div
            style="margin-bottom: 20px;"
          >
            <p 
              style="font-size: large; font-weight: bold;"
            >
              {{ item.question }}
            </p>
            <div v-for="(option, index) in item.options" :key="index"
              style="display: flex; justify-content: start; align-items: start; gap: 4px"
            >
              <div
                style="display: flex; justify-content: center; align-items: center; gap: 10px;"
              >
                <input type="radio" id={option} value={option}>
                <label for={option} style="">{{ option }}</label>
              </div>
            </div>
          </div>
        </div>
        <button 
          style="padding: 12px 24px; background-color: cyan; color: black; margin-top: 16px; border-radius: 8px;"
        >
          Submit
        </button>
      </form>
    </v-container>
  </NuxtLayout>
</template>


<script setup>
const { arcadeData, mainData, diwaliQuizData } = useJSONData();

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