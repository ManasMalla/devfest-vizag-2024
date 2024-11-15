<template>
    <NuxtLayout name="default">
        <v-container>
            <h1>Call for Speakers</h1>
            <p>Interested in speaking at our next event? We are looking for speakers who are willing to share their
                knowledge and expertise around the below topics.<br />Fill out the form below to submit your
                proposal.</p>
            <p
                style="padding: 12px; background-color: #f7f7f7; border: 2px solid #202023;margin: 16px 4px; border-radius: 12px;">
                <b>Just a friendly note 😁</b><br />The topics listed on this page are intended as a guideline for the
                types of talks and workshops that could be beneficial to our local community. However, we welcome and
                encourage you to submit your own ideas if you have a topic that you feel would resonate with our
                audience.
            </p>
            <v-container>
                <v-row>
                    <v-chip @click="addOrRemoveTrackChip(track.name)" v-for="track in tracks" class="mr-2 px-5"
                        :variant="selectedTracks.includes(track.name) ? 'flat' : 'outlined'"
                        :color="selectedTracks.includes(track.name) ? '#ccf6c5' : ''"
                        :append-icon="selectedTracks.includes(track.name) ? 'mdi-check' : ''"
                        :prepend-icon="track.icon">{{ track.name }}</v-chip>
                    <v-btn color="#0D652D" style="margin-left: auto;" :to="{
                        path: 'call-for-speakers/form', query: {
                            selectedSessions: selectedSessions.map((e) => e.id)
                        }
                    }">Apply Now</v-btn>
                    <v-btn :to="{ path: '/call-for-speakers/form' }" class="ml-2" color="#CEEAD6" variant="flat">Apply
                        with Own Session</v-btn>
                </v-row>
            </v-container>
            <v-row class="mt-5" style="width: 100%">
                <v-col
                    v-for="session in sessionsData.filter((e) => e.callForSpeaker && (selectedTracks.includes(e.track) || (selectedTracks.includes('Others') ? (e.track != 'Mobile' && e.track != 'Machine Learning/AI' && e.track != 'Web' && e.track != 'Cloud') : false)))"
                    sm="12" md="6" lg="3" :key="session.id">
                    <call-for-speakers-topic-card :session="session" :is-selected="selectedSessions.includes(session)"
                        :select-session="() => selectOrUnselectSession(session)" />
                </v-col>
            </v-row>
        </v-container>
    </NuxtLayout>
</template>
<script setup>

const { mainData, sessionsData } = useJSONData();
const tracks = [{
    name: "Mobile",
    color: "#1A73E8",
    icon: "mdi-android",
}, {
    name: "Web",
    color: "#1A73E8",
    icon: "mdi-web",
}, {
    name: "Machine Learning/AI",
    color: "#1A73E8",
    icon: "mdi-robot-outline",
}, {
    name: "Cloud",
    color: "#1A73E8",
    icon: "mdi-cloud-outline",
}, {
    name: "Others",
    color: "#1A73E8",
    icon: "mdi-shape-outline",
}];
const selectedTracks = useState('filteredTracks', () => ["Mobile", "Web", "Machine Learning/AI", "Cloud", "Others"]);
const selectedSessions = useState('selectedSessions', () => []);
function selectOrUnselectSession(session) {
    console.log(session);
    if (selectedSessions.value.includes(session)) {
        selectedSessions.value.splice(selectedSessions.value.indexOf(session), 1)
    } else {
        selectedSessions.value.push(session);
    }
    // console.log(selectedSessions);
}
function addOrRemoveTrackChip(track) {
    if (selectedTracks.value.includes(track)) {
        selectedTracks.value.splice(selectedTracks.value.indexOf(track), 1);
    } else {
        selectedTracks.value.push(track);
    }
}
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
