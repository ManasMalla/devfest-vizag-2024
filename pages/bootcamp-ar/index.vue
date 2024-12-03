<template>
  <NuxtLayout name="default">
    <v-container fluid class="mt-5">
      <v-row>
        <v-col md="12">
          <h1>Bootcamp</h1>
          <p>
            The gateway to enter in another realm.
          </p>
        </v-col>
      </v-row>

      <v-row>
        <v-col id="PSCard" md="6" cols="12" sm="6" lg="6" v-for="(item, index) in bootcampData" :key="index"
          style="border-radius: 24px; gap: 20px; cursor: pointer;">
          <!-- PS card -->
          <v-card class="ma-2" style="border-radius: 16px;">
            <v-card-title class="primary white--text"
              style="background: #417ce0; color: white; text-align: center; padding: 50px; font-size: large; font-weight: 600;">
              {{ item.title }}
            </v-card-title>
            <v-card-text style="padding: 0;">
              <p class="mt-5" style="font-size: small; text-align: center; padding: 0 1rem;">{{ item.description }}</p>
              <br>
              <div style="width: 30%; height: 2px; border-radius: 10px; background-color: #417ce0; margin: 0 auto;">
              </div>
              <br>
              <p
                :style="{ width: 'fit-content', fontSize: 'smaller', fontWeight: 'bold', borderRadius: '32px', border: '1px solid', borderColor: CategoryColourCodes[item.category] || '#417ce0', padding: '10px 20px', color: CategoryColourCodes[item.category], textAlign: 'center', margin: '0 auto' }">
                {{ item.category }}
              </p>
              <!-- <p>Price: ${{ item.price }}</p> -->
              <div class="mt-5" style="background-color: #e7ac12; display: flex; justify-content: center; align-items: center; flex-direction: column; padding: 30px 0;">
                <p style="text-align: center; font-size: smaller;">Powered by</p>
                <p class=""
                  style="text-align: center; color: white; font-weight: 600; width: 100%; font-size: medium; display: flex; justify-content: center; align-items: center;">
                  <img :src="'/img/sponsors/msi.png'" alt="google logo" style="width: 80px;">
                  {{ item.provider }}
                </p>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </NuxtLayout>
</template>

<script setup>
const { mainData, bootcampData } = useJSONData();

const CategoryColourCodes = {
  "Machine Learning": "#4285F4",
  "Natural Language Processing": "#EA4335",
  "Computer Vision": "#FBBC05",
  "Recommender Systems": "#34A853",
  "Predictive Analytics": "#00897B",
  "Data Analysis": "#673AB7",
  "Deep Learning": "#0F9D58",
  "Cloud Computing": "#42A5F5",
  "Data Mining": "#F48FB1",
  "Big Data": "#9CCC65"
};

definePageMeta({
  layout: false,
});

useSeoMeta({
  contentType: "text/html; charset=utf-8",
  title:
    "Speakers - " + mainData.eventInfo.name + " | " + mainData.communityName,
  description: mainData.eventInfo.description.short,
  keywords: mainData.seo.keywords,
  ogLocale: 'en_US',
  author: "OSS Labs",
  creator: "OSS Labs",
  viewport: "width=device-width, initial-scale=1.0",
  ogTitle:
    "Speakers - " + mainData.eventInfo.name + " | " + mainData.communityName,
  ogDescription: mainData.eventInfo.description.short,
  ogImage: `${mainData.seo.hostUrl}/thumbnail.png?auto=format&fit=crop&frame=1&h=512&w=1024`,
  ogUrl: mainData.seo.hostUrl,
  ogType: "website",
  twitterTitle:
    "Speakers - " + mainData.eventInfo.name + " | " + mainData.communityName,
  twitterDescription: mainData.eventInfo.description.short,
  twitterImage: `${mainData.seo.hostUrl}thumbnail.png?auto=format&fit=crop&frame=1&h=512&w=1024`,
  twitterCard: "summary_large_image",
});
</script>

<style scoped>
#PSCard:hover {
  transition: all;
  transform: scale(1.05);
  transition-duration: 250ms;
  z-index: 10;
}
</style>