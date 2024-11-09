<template>
    <NuxtLayout name="default">
        <v-container>
            <h1>Call for Speakers</h1>
            <p>Interested in speaking at our next event? Fill out the form below to submit your proposal.</p>
            <v-row class="mt-5" style="width: 100%">
                <v-col v-for="session in sessionsData.filter((e) => e.callForSpeaker)" cols="3">
                    <v-card class="pa-4">
                        <p style="font-weight: 600;">{{ session.title }}</p>
                        <p style="font-size: 14px; margin-bottom: 12px;">{{ session.track }}</p>
                        <v-btn disabled="true" style="padding-left: 28px; padding-right: 28px; border-radius: 28px;">
                        <!-- color="#1A73E8" -->
                        Apply</v-btn>
                    </v-card>
                </v-col>

            </v-row>
        </v-container>
    </NuxtLayout>
</template>
<script setup>

const { mainData, sessionsData } = useJSONData();

definePageMeta({
    layout: false,
});
useSeoMeta({
    contentType: "text/html; charset=utf-8",
    title: "Call for Speakers - " + mainData.eventInfo.name + " | " + mainData.communityName,
    description: mainData.eventInfo.description.short,
    keywords: mainData.seo.keywords,
    ogLocale: 'en_US',
    author: "Manas Malla",
    creator: "Manas Malla",
    viewport: "width=device-width, initial-scale=1.0",
    ogTitle: "Call for Speakers - " + mainData.eventInfo.name + " | " + mainData.communityName,
    ogDescription: mainData.eventInfo.description.short,
    ogImage: `${mainData.seo.hostUrl}/thumbnail.png?auto=format&fit=crop&frame=1&h=512&w=1024`,
    ogUrl: mainData.seo.hostUrl,
    ogType: "website",
    twitterTitle:
        "Call for Speakers - " + mainData.eventInfo.name + " | " + mainData.communityName,
    twitterDescription: mainData.eventInfo.description.short,
    twitterImage: `${mainData.seo.hostUrl}thumbnail.png?auto=format&fit=crop&frame=1&h=512&w=1024`,
    twitterCard: "summary_large_image",
});
</script>

<style scoped></style>