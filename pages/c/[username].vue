<template>
    <h1 class="mt-5">Learn. Connect. Grow.</h1>
    <div style="width: 90vw; max-width: 1200px;">
        <v-row>
            <v-col cols="12" lg="4">
                <v-card class="badge-card"
                    style="padding: 12px; border-radius: 24px; margin: 12px; max-height: 500px; margin-left: auto; margin-right: auto; position: relative; display: flex; flex-direction: column;"
                    elevation="0" :color="userDomain == 'Mobile' ? '#CEE6C1' : '#c3ecf6'">
                    <img src="/img/attendee/mobile.png" height="120px" style="position: absolute;" />
                    <img src="https://github.com/ManasMalla.png"
                        style="height: 240px; width: 100%; object-fit: cover; border-radius: 14px; object-position: top;" />
                    <div class="card-inner-div" style="width: 100%; margin-top: 12px; display: flex; ">
                        <div style="width: 100%; flex-grow: 1;">
                            <h2 style="line-height: 100%; margin-top: 12px;">Manas Malla</h2>
                            <p style="opacity: 50%; font-weight: 600; margin-bottom: 6px;">@{{ $route.params.username }}
                            </p>
                            <p style="font-size: 14px;">Founder, The Ananta Studio</p>
                            <v-row class="my-2 pl-3" style="column-gap: 12px; flex-grow: 0;">
                                <v-icon>mdi-linkedin</v-icon>
                                <v-icon>mdi-github</v-icon>
                                <v-icon>mdi-web</v-icon>
                            </v-row>
                        </div>
                        <div class="my-2" style="flex-grow: 1;">
                            <v-chip
                                style="width: fit-content; font-size: 12px; display: inline-flex; margin-right: 4px; margin-top: 8px;">#WebAssembly</v-chip>
                            <v-chip
                                style="width: fit-content; font-size: 12px; display: inline-flex; margin-right: 4px; margin-top: 8px;">#Android</v-chip>
                            <v-chip
                                style="width: fit-content; font-size: 12px; display: inline-flex; margin-right: 4px; margin-top: 8px;">#Kotlin</v-chip>
                        </div>
                        <p style="position: absolute; right: 16px; bottom: 12px; opacity: 0.4; font-weight: 600">
                            #Web</p>
                    </div>
                </v-card>
            </v-col>
            <v-col cols="12" lg="8">
                <h3>What was the convo about?</h3>
                <div class="convo-stack" style="column-gap: 12px; row-gap: 12px; margin-top: 24px;">
                    <div class="tech-stack" v-for="techStack in tracks"
                        style="display: inline-flex; width: fit-content; align-items: center; column-gap: 12px;">
                        <input type="checkbox">
                        <p style="display: inline-flex; width: fit-content;">{{ techStack.title }}</p>
                        <!-- <div class="mobile-img"></div>
                        <h3 class="mt-2">{{ techStack.title }}</h3>
                        <p>{{ techStack.desc }}</p> -->
                    </div>
                </div>
            </v-col>
        </v-row>
    </div>

</template>
<script setup>
const tracks = [{
    title: 'Mobile',
    img: 'https://io.google/2024/app/images/io24-stacks-m.webp',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
}, {
    title: 'Web',
    img: 'https://io.google/2024/app/images/io24-stacks-w.webp',
    desc: 'Create fast, secure sites and apps for the open web.'
}, {
    title: 'Machine Learning',
    img: 'https://io.google/2024/app/images/io24-stacks-ml.webp',
    desc: 'Access cutting-edge AI models and open source tools for machine learning.'
}, {
    title: 'Cloud',
    img: 'https://io.google/2024/app/images/io24-stacks-c.webp',
    desc: 'Simplify and scale end-to-end development.'
}, {
    title: 'Startups',
    img: 'https://io.google/2024/app/images/io24-stacks-iot.webp',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
}, {
    title: 'Community',
    img: 'https://io.google/2024/app/images/io24-stacks-iot.webp',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
}];
const userDomain = 'Mobile';
</script>
<style scoped>
.tech-stack .mobile-img {
    background-image: url('https://io.google/2024/app/images/io24-stacks-m.webp');
    aspect-ratio: calc(632/340);
    width: 100%;
    background-size: cover;
}

.tech-stack:hover .mobile-img {
    background-image: url('https://io.google/2024/app/images/io24-stacks-m-dark.webp');
}

.tech-stack {
    padding: 12px;
}

.tech-stack:hover {
    border: 1.5px solid #202023;
    width: fit-content;
    border-radius: 20px;
}

.badge-card .card-inner-div {
    flex-direction: row;
    flex-grow: 1;
}

/* .convo-stack {
    grid-template-columns: repeat(3, minmax(0, 1fr));
} */

@media screen and (min-width: 840px) {
    .badge-card {
        aspect-ratio: 0.7;
    }

    .badge-card .card-inner-div {
        display: flex;
        flex-direction: column;
        flex-grow: unset;
    }

    /* .convo-stack {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    } */
}
</style>