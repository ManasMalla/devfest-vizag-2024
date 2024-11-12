<template>
    <v-container fluid>
        <h1>What's in it for me?</h1>
        <p>We have something for everyone this DevFest, whether you are a budding entrepreneur or a passionate
            developer.<br />We got you all cover! Join us for the biggest bash of the year.</p>
        <v-row align="stretch" class="mt-4">

            <v-col v-for="(benefit, index) in mainData.eventInfo.benefits" :key="benefit.title" cols="12" md="6">
                <v-container
                    :style="'height: 100%; padding: 0px; border-radius: 12px; border: 1.5px solid ' + benefit.color + '; background-color: ' + benefit.bgcolor">
                    <div
                        :style="'margin: 12px 0px 0px 0px; width: fit-content; padding: 12px 24px !important; border-radius: 8px; overflow: hidden; color: ' + benefit.color">
                        <h2>{{ benefit.title }}</h2>
                    </div>
                    <ul style="margin-left: 12px; padding: 8px 24px; padding-bottom: 24px;">
                        <li v-for="point in benefit.benefits" style="font-size: 14px;" :key="point">{{ point }}</li>
                    </ul>
                </v-container>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
const { mainData } = useJSONData();
</script>

<style scoped></style>