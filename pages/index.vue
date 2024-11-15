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

const tracks = ["Web", "Mobile", "Cloud", "AI", "Career", "Startups"];

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

<style scoped>
.upcoming-events .row {
    margin-left: 0;
    margin-right: 0
}

.upcoming-events h2 {
    margin-bottom: 0
}

.upcoming-events .event-card {
    background: url('/assets/img/curve-bg.svg') no-repeat;
    position: relative;
    padding: 16px 20px 25px 20px;
    width: calc(33.3333333333% - 16px);
    background-size: contain;
    margin: 0 16px 0 0;
    display: inline-block;
    float: left;
    height: 262px
}

@media (max-width: 1050px) {
    .upcoming-events .event-card {
        width:calc(50% - 16px);
        height: 349px;
        margin-bottom: 20px
    }
}

@media (max-width: 900px) {
    .upcoming-events .event-card {
        height:287px
    }
}

@media (max-width: 767px) {
    .upcoming-events .event-card {
        width:57%;
        height: 257px;
        float: none;
        margin: 0 auto 30px auto;
        display: block;
        background-size: 99%
    }
}

@media (max-width: 690px) {
    .upcoming-events .event-card {
        height:264px
    }
}

@media (max-width: 620px) {
    .upcoming-events .event-card {
        background-size:100%;
        width: 65%;
        height: 259px
    }
}

@media (max-width: 570px) {
    .upcoming-events .event-card {
        background-size:100%;
        width: 74%
    }
}

@media (max-width: 500px) {
    .upcoming-events .event-card {
        background-size:100%;
        width: 82%
    }
}

@media (max-width: 450px) {
    .upcoming-events .event-card {
        background-size:100%;
        width: 97%;
        height: 278px
    }
}

@media (max-width: 400px) {
    .upcoming-events .event-card {
        background-size:100%;
        width: 100%
    }
}

.upcoming-events .event-card .date-box {
    position: absolute;
    top: 7px;
    left: 0;
    padding: 10px 15px
}

.upcoming-events .event-card .date-box .date {
    font-size: 16px;
    font-weight: 700;
    margin: 0;
    color: #004740
}

.upcoming-events .event-card .organizer {
    font-size: 14px;
    margin-top: 0;
    margin-bottom: 28px;
    text-align: right;
    color: #004740;
    display: flex;
    align-items: center;
    align-content: center;
    flex-direction: row;
    justify-content: flex-end
}

.upcoming-events .event-card .organizer span {
    margin-right: 6px
}

@media (max-width: 1050px) {
    .upcoming-events .event-card .organizer {
        margin-bottom:65px
    }
}

@media (max-width: 900px) {
    .upcoming-events .event-card .organizer {
        margin-bottom:34px
    }
}

@media (max-width: 767px) {
    .upcoming-events .event-card .organizer {
        margin-bottom:26px
    }
}

.upcoming-events .event-card .description {
    margin-top: 10px;
    color: #004740;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    text-overflow: ellipsis
}

.upcoming-events .event-card h3 {
    font-size: 21px;
    color: #004740;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden
}

.upcoming-events .event-card .p {
    font-size: 1em;
    color: #004740;
    margin-bottom: 27px
}

.upcoming-events .event-card .location {
    font-size: 1em;
    color: #004740;
    display: flex;
    margin-top: 26px
}

.upcoming-events .event-card .location span {
    margin-right: 6px
}

.upcoming-events .event-card .register-link {
    text-decoration: none;
    padding: 10px 10px;
    border-radius: 25px;
    position: absolute;
    bottom: 22px;
    right: -2px;
    font-weight: 500
}

@media (max-width: 1377px) {
    .upcoming-events .event-card .register-link {
        bottom:34px
    }
}

@media (max-width: 1050px) {
    .upcoming-events .event-card .register-link {
        font-size:16px;
        bottom: 50px;
        right: 18px
    }
}

@media (max-width: 900px) {
    .upcoming-events .event-card .register-link {
        bottom:74px;
        right: 8px
    }
}

@media (max-width: 850px) {
    .upcoming-events .event-card .register-link {
        bottom:50px;
        right: 0
    }
}

@media (max-width: 767px) {
    .upcoming-events .event-card .register-link {
        font-size:15px;
        bottom: 9px;
        right: -3px
    }
}

@media (max-width: 450px) {
    .upcoming-events .event-card .register-link {
        font-size:13px;
        bottom: 22px;
        right: -4px;
        bottom: 7px
    }
}

.upcoming-events .event-card .viewdetails {
    margin-top: 17px
}

.upcoming-events .viewmore-section {
    width: 100%;
    display: inline-block
}

.upcoming-events .view-more {
    font-size: 1em;
    color: #004740;
    text-decoration: none;
    padding: 10px 0;
    border-radius: 5px;
    transition: background-color .2s,color .2s
}

.upcoming-events .tilebox-section {
    width: 100%;
    display: inline-block;
    margin-top: 40px
}

.upcoming-events .js-form-item {
    margin-bottom: 0
}

.upcoming-events.tabcommon ul {
    padding-bottom: 0
}

@media (max-width: 1367px) {
    .upcoming-events .event-card .organizer {
        margin-bottom:35px
    }

    .mrt25 {
        margin-top: 25px
    }

    .upcoming-events .event-card .register-link {
        bottom: 17px;
        right: 0
    }
}

@media (max-width: 768px) {
    .upcoming-events .events-container {
        flex-direction:column
    }

    .upcoming-events .events-container .event-card {
        flex: 1 1 100%
    }

    .upcoming-events .event-card .description {
        margin-bottom: 19px
    }

    .upcoming-events .event-card .register-link {
        right: -11px
    }
}

@media (max-width: 1200px) {
    .upcoming-events .event-card .description {
        font-size:14px
    }

    .upcoming-events .event-card .organizer {
        font-size: 12px;
        margin-bottom: 66px
    }

    .upcoming-events .event-card .location {
        font-size: 12px
    }

    .upcoming-events .event-card .register-link {
        right: 19px;
        bottom: 9%
    }
}

@media (max-width: 900px) {
    .upcoming-events .event-card .organizer {
        margin-bottom:48px
    }

    .upcoming-events .event-card .register-link {
        right: -3px;
        bottom: 12%
    }
}

@media (max-width: 768px) {
    .upcoming-events .event-card .register-link {
        right:-6px;
        bottom: 16%;
        font-size: 15px
    }
}

@media (max-width: 767px) {
    .upcoming-events .event-card .organizer {
        margin-bottom:38px
    }
}

@media (max-width: 450px) {
    .upcoming-events .event-card .organizer {
        margin-bottom:38px
    }

    .upcoming-events .event-card .register-link {
        right: 0;
        bottom: 23px
    }

    .mrt25 {
        margin-top: 0
    }
}

@media (max-width: 375px) {
    .upcoming-events .event-card .register-link {
        right:-4px;
        bottom: 44px
    }
}

.allevents .tilebox-section1 {
    width: 100%;
    display: inline-block
}

.allevents .tilebox-section1 .event-card {
    margin: 0 16px 40px 0
}

.allevents .form-type-select select {
    width: 22%;
    color: #303630;
    border-bottom: solid 1px #004740
}

@media (max-width: 375px) {
    .allevents .form-type-select select {
        width:100%!important
    }
}

.allevents .form-submit {
    background: #a58255;
    border: 0;
    outline: 0;
    color: #fff;
    padding: 11px 23px;
    cursor: pointer;
    font-weight: 500;
    line-height: 1.2;
    border: solid 1px #a58255;
    margin-top: 20px
}
</style>
