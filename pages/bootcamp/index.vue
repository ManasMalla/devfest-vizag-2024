<template>
    <NuxtLayout name="default">
        <v-container fluid class="mt-5">
            <v-row>
                <v-col md="8">
                    <h1>Bootcamp</h1>
                    <p>The gateway to enter in another realm. Find it below!</p>

                    <v-expansion-panels class="mb-6 mt-10" rounded="12" bg-color="white" flat style="
                border-radius: 20px !important;
                /* border-bottom: 1px solid black; */
                overflow: hidden;
              " variant="accordion">
                        <!-- :style="{ borderBottom: i<3?'1px solid black':'', borderTop: i!=0?'1px solid black':'' }" -->
                        <v-expansion-panel v-for="(item, index) in bootcampData" :key="index" :style="{
                            borderBottom:
                                index + 1 < bootcampData.length ? '1px solid black' : '',
                        }">
                            <v-expansion-panel-title expand-icon="mdi-menu-down" style="background-color: #eeeeee">
                                {{ item.title }}
                            </v-expansion-panel-title>
                            <v-expansion-panel-text class="pa-3">
                                <div v-html="item.description"></div>

                                <v-chip
                                    :color="CategoryColourCodes[item.category]"
                                    variant="outlined" class="mt-2">{{
                                        item.category
                                    }}</v-chip>
                            </v-expansion-panel-text>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-col>
                <!-- <div style="height: 100%;">
                    <v-img alt="frame" class="frame" src="/img/bootcamp/bulb.png" style="height: 200px;"></v-img>
                </div> -->
            </v-row>

        </v-container>
    </NuxtLayout>
</template>

<script setup>
const { mainData, bootcampData } = useJSONData();

definePageMeta({
    layout: false,
});

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

useSeoMeta({
    contentType: "text/html; charset=utf-8",
    title: "Bootcamp - " + mainData.eventInfo.name + " | " + mainData.communityName,
    description: mainData.eventInfo.description.short,
    keywords: mainData.seo.keywords,
    ogLocale: 'en_US',
    author: "OSS Labs",
    creator: "OSS Labs",
    viewport: "width=device-width, initial-scale=1.0",
    ogTitle: "Bootcamp - " + mainData.eventInfo.name + " | " + mainData.communityName,
    ogDescription: mainData.eventInfo.description.short,
    ogImage: `${mainData.seo.hostUrl}/thumbnail.png?auto=format&fit=crop&frame=1&h=512&w=1024`,
    ogUrl: mainData.seo.hostUrl,
    ogType: "website",
    twitterTitle:
        "Bootcamp - " + mainData.eventInfo.name + " | " + mainData.communityName,
    twitterDescription: mainData.eventInfo.description.short,
    twitterImage: `${mainData.seo.hostUrl}thumbnail.png?auto=format&fit=crop&frame=1&h=512&w=1024`,
    twitterCard: "summary_large_image",
});
</script>

<style scoped></style>