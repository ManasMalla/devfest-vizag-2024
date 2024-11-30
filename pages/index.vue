<template>
    <NuxtLayout name="default">
        <v-container fluid>
            <v-row>
                <CommonUserScheduleCard class="my-0 mt-md-5" />
                <!-- Hero -->
                <HomeHeroSection class="my-0 mt-md-5 mb-md-10" />
                <!-- Hero -->

                <!-- Countdown -->
                <HomeCountdown />
                <!-- Countdown -->

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
                                    style="aspect-ratio: 3; background-color: #fbc004; font-weight: 600; display: flex; align-items: center; border: 1.5px solid #202023; justify-content: center; border-radius: 12px; max-height: 52px; line-clamp: 1;text-overflow: ellipsis;">{{
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
                <div style="width: 100%; margin-bottom: 12px;">
                    <h2 style="width: 100%; text-align: center;">Testimonals</h2>
                    <p style="width: 100%; text-align: center; margin-bottom: 24px;">Hear what people say about our
                        events
                    </p>
                    <div style="position: relative; height: 280px; display: flex;">
                        <!-- <v-icon
                            style="z-index: 100;position: absolute; background-color: white; left:8px; top:0; bottom:0; margin-top: auto; margin-right: 12px; margin-bottom: auto; border: 1.5px solid black; padding: 24px; border-radius: 48px;">mdi-arrow-left</v-icon> -->

                        <NuxtMarquee speed="25"
                            style="position: absolute; left: 50%; transform: translateX(-50%); display: flex; column-gap: 12px;">
                            <CommonTestimonialCard v-for="testimonial in testimonials" :testimonial="testimonial" />
                        </NuxtMarquee>
                        <!-- <v-icon
                            style="position: absolute; top:0; bottom:0; right:8px; background-color: white; margin-top: auto; margin-bottom: auto; border: 1.5px solid black; padding: 24px; border-radius: 48px;">mdi-arrow-right</v-icon> -->

                    </div>
                </div>

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
const { mainData, testimonials } = useJSONData();
definePageMeta({
    layout: false,
});

const tracks = ["Web", "Mobile", "Cloud", "AI", "Career", "Entrepreneurship"];

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
