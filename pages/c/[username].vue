<template>
    <h1 class="mt-5">Learn. Connect. Grow.</h1>
    <div style="width: 100vw; max-width: 1200px;">
        <v-row>
            <v-col cols="12" lg="4">
                <v-card
                    style="padding: 12px; border-radius: 12px; margin: 12px; aspect-ratio: 0.7; max-height: 500px; margin-left: auto; margin-right: auto;"
                    elevation="3">
                    <p>{{ $route.params.username }}</p>
                </v-card>
            </v-col>
            <v-col cols="12" lg="8">
                <h3>What was the convo about?</h3>
                <div
                    style="display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); column-gap: 12px; row-gap: 24px; margin-top: 24px;">
                    <div class="tech-stack" v-for="techStack in [{
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
                        title: 'Community',
                        img: 'https://io.google/2024/app/images/io24-stacks-iot.webp',
                        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
                    }, {
                        title: 'Startups',
                        img: 'https://io.google/2024/app/images/io24-stacks-iot.webp',
                        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
                    }]">
                        <div class="mobile-img"></div>
                        <h3 class="mt-2">{{ techStack.title }}</h3>
                        <p>{{ techStack.desc }}</p>
                    </div>
                </div>
            </v-col>
        </v-row>
    </div>

</template>
<script setup>
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
</style>