<template>
    <NuxtLayout name="default">
        <h1 class="mt-8">Call for Papers</h1>
        <v-container fluid>
            <v-row>
                <v-col cols="12"><iframe style="width: 80vw; height: 80vh;"
                        :src="'https://docs.google.com/forms/d/e/1FAIpQLSefN7KY3ALlWDFKjR3tIsvnD_lGR1nvlUoUVO0Rzl3uQU525Q/viewform' + (selectedSessions.length >= 1 ? '?usp=pp_url&entry.1005218827=' + selectedSessions[0].title + '&entry.156650706=' + selectedSessions[0].description + '&entry.486086907=' + (getTrack(selectedSessions[0].track)) + '&entry.1527510087=' + (selectedSessions.length > 1 ? 'Yes' : 'No') + (selectedSessions.length > 1 ? '&entry.1884318979=' + selectedSessions[1].title + '&entry.48789671=' + selectedSessions[1].description + '&entry.753857806=' + (getTrack(selectedSessions[1].track)) + '&entry.1536503999=' + (selectedSessions.length > 2 ? 'Yes' : 'No') + (selectedSessions.length > 2 ? '&entry.143336768=' + selectedSessions[2].title + '&entry.2005141422=' + selectedSessions[2].description + '&entry.1954660644=' + (getTrack(selectedSessions[2].track)) + '&entry.212019900=No' : '') : '') : '')"></iframe>
                </v-col>
            </v-row>
        </v-container>
    </NuxtLayout>
</template>

<script setup>
const router = useRoute();
const selectedSessionsParams = router.query.selectedSessions;
const { sessionsData } = useJSONData();
function getTrack(track) {
    switch (track) {
        case 'Mobile':
            return 'Mobile';
        case 'Web':
            return 'Web';
        case 'Machine Learning/AI':
            return 'Machine Learning/AI';
        case 'Cloud':
            return 'Cloud';
        default:
            return 'Others';
    }
}
const selectedSessions = sessionsData.length > 0 ? sessionsData.filter((e) => selectedSessionsParams?.includes(e.id)) : [];
definePageMeta({
    layout: false,
});
</script>

<style scoped></style>