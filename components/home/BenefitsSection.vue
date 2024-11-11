<template>
    <v-container fluid>
        <h1>What's in it for me?</h1>
        <p>We have something for everyone this DevFest, whether you are a budding entrepreneur or a passionate
            developer.<br />We got you all cover! Join us for the biggest bash of the year.</p>
        <v-row class="mt-4">
            <v-expansion-panels variant="accordion">
                <v-expansion-panel :style="index == 0 ? 'border-radius: 16px 16px 0px 0px;' : index == mainData.eventInfo.benefits.length - 1 ? 'border-radius: 0px 0px 16px 16px ;' : ''" v-for="(benefit, index) in mainData.eventInfo.benefits" :key="benefit.id">
                    <v-expansion-panel-title v-slot="{ expanded }">
                        <p v-if="!expanded">{{ benefit.title }}</p>
                        <h3 v-if="expanded">{{ benefit.title }}</h3>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text>
                        <ul style="margin-left: 20px;">
                            <li style="font-size: 14px;" v-for="point in benefit.benefits" :key="point">{{ point }}</li>
                        </ul>
                    </v-expansion-panel-text>

                    </v-expansion-panel>
            </v-expansion-panels>
        </v-row>
    </v-container>
</template>

<script setup>
const { mainData } = useJSONData();
</script>

<style scoped></style>