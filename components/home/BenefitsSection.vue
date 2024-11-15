<template>
    <v-container fluid>
        <h1>What's in it for me?</h1>
        <p>We have something for everyone this DevFest, whether you are a budding entrepreneur or a passionate
            developer.<br />We got you all cover! Join us for the biggest bash of the year.</p>
        <h2 class="mt-4 mb-1">I want to </h2>
        <v-row align="stretch">

            <v-col v-for="(benefit, index) in mainData.eventInfo.benefits" :key="benefit.title" cols="12" md="6">
                <v-container :style="'height: 100%; padding: 0px; border-radius: 12px;'">
                    <v-row align="strech">
                        <v-col cols="6" style="position: relative;" class="radiustopright">
                            <img :src="benefit.image"
                                style="width: 100%; height: 100%; object-fit: cover; border-radius: 12px;" />
                            <div class="radiusbanner__content"
                                style="padding: 0 0 15px 15px; background-color: white; position: absolute; top:0; right:0; ">
                                <div
                                    :style="'font-size: 12px; width: 140px; text-align: center; padding: 12px 24px !important; border-radius: 8px; overflow: hidden; background-color: ' + benefit.color + '; color: white'">
                                    <p style="font-weight: 500;">{{ benefit.title }}</p>
                                </div>
                            </div>
                        </v-col>
                        <v-col cols="6">

                            <ul style="margin-left: 12px; padding: 8px 24px; padding-bottom: 24px;">
                                <li v-for="point in benefit.benefits" style="font-size: 14px;" :key="point">{{ point }}
                                </li>
                            </ul>
                        </v-col>
                    </v-row>
                </v-container>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
const { mainData } = useJSONData();
</script>

<style scoped>
.radiusbanner__content {
    border-radius: 0 0 0 15px;
    top: 0;
    right: 0;
    padding: 0 0 15px 15px
}

.radiusbanner__content::before {
    left: -40px;
    top: 0;
    box-shadow: 16px -16px #fff
}

.radiusbanner__content::after {
    right: 0;
    bottom: -40px;
    box-shadow: 16px -16px #fff
}
</style>