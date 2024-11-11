<template>
  <NuxtLayout name="default">
    <v-container fluid>
      <v-row>
        <!-- Hero -->
        <HomeHeroSection class="my-0 my-md-10" />
        <!-- Hero -->

        <!-- Stats -->
        <HomeStats />
        <!-- Stats -->

        <v-container fluid>
          <v-col>
            <div style="width: 100%; display: flex; flex-direction: column; align-items: center;">
              <h1>Tracks</h1>
              <p class="mb-4">We have a wide range of technologies and tracks you can choose from.</p>
            </div>
            <v-row>
              <v-col v-for="track in tracks">
                <v-col
                  style="aspect-ratio: 3; background-color: #fbc004; font-weight: 600; display: flex; align-items: center; border: 1.5px solid #202023; justify-content: center; border-radius: 12px;">{{
                  track }}</v-col>
              </v-col>
            </v-row>
          </v-col>
        </v-container>

        <!-- What's in it for me -->
        <HomeBenefitsSection class="mt-md-5" />
        <!-- Whats in it for me -->

        <!-- Whats New -->
        <HomeExpectionSection class="mt-md-10" />
        <!-- Whats New -->

        <!-- Technologies -->
        <HomeTechSection class="mb-md-10" />
        <!-- Technologies -->

        <!-- Past DevFest -->
        <HomePastDevFest class="mb-md-10" />
        <!-- Past DevFest -->


        <!-- Sponsors -->
        <HomeSponsorsSection />
        <!-- Sponsors -->

        <!-- Keep in Touch -->
        <HomeCommunityContact />
        <!-- Keep in Touch -->
      </v-row>
    </v-container>
  </NuxtLayout>
</template>

<script setup>
const { mainData } = useJSONData();
definePageMeta({
  layout: false,
});

const tracks = ["Web", "Mobile", "Cloud", "Machine Learning", "Career", "Entrepreneurship"];

useSeoMeta({
  contentType: "text/html; charset=utf-8",
  title: mainData.eventInfo.name + " | " + mainData.communityName,
  description: mainData.eventInfo.description.short,
  ogLocale: 'en_US',
  keywords: mainData.seo.keywords,
  author: "OSS Labs",
  creator: "OSS Labs",
  viewport: "width=device-width, initial-scale=1.0",
  ogTitle: mainData.eventInfo.name + " | " + mainData.communityName,
  ogDescription: mainData.eventInfo.description.short,
  ogImage: `${mainData.seo.hostUrl}/thumbnail.png?auto=format&fit=crop&frame=1&h=512&w=1024`,
  ogUrl: mainData.seo.hostUrl,
  ogType: "website",
  twitterTitle: mainData.eventInfo.name + " | " + mainData.communityName,
  twitterDescription: mainData.eventInfo.description.short,
  twitterImage: `${mainData.seo.hostUrl}thumbnail.png?auto=format&fit=crop&frame=1&h=512&w=1024`,
  twitterCard: "summary_large_image",
});
</script>

<style scoped></style>
