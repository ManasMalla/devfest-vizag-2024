<template>
    <NuxtLoadingIndicator :color="'#4285f4'"/>
    <h1 class="mt-5">Learn. Connect. Grow.</h1>
    <div style="width: 90vw; max-width: 1200px;">
        <v-row>
            <v-col cols="12" lg="4">
                <v-card class="badge-card"
                    style="padding: 12px; border-radius: 24px; margin: 12px; max-height: 500px; margin-left: auto; margin-right: auto; position: relative; display: flex; flex-direction: column;"
                    elevation="0" :color="userDomain == 'Mobile' ? '#CEE6C1' : '#c3ecf6'">
                    <img src="/img/attendee/mobile.png" height="120px" style="position: absolute;" />
                    <!-- Headshot -->
                    <img :src="peerDetails?.photoURL"
                        style="height: 240px; width: 100%; object-fit: cover; border-radius: 14px; object-position: top;" />
                    <div class="card-inner-div" style="width: 100%; margin-top: 12px; display: flex; ">
                        <div style="width: 100%; flex-grow: 1;">
                            <!-- Display Name -->
                            <div style="display: flex; justify-content: start; align-items: center; gap: 8px;">
                                <h2 style="line-height: 100%; margin-top: 12px;">{{ peerDetails?.displayName }}</h2>
                                <v-icon class="mt-3" v-if="isAlreadyNetworked" :color="'#34a853'">mdi-check-decagram</v-icon>
                            </div>
                            <p style="opacity: 50%; font-weight: 600; margin-bottom: 6px;">@{{ $route.params.username }}
                            </p>
                            <p style="font-size: 14px;">{{ peerDetails?.company?.designation }} , {{
                                peerDetails?.company?.name }}</p>
                            <v-row class="my-2 pl-3" style="column-gap: 12px; flex-grow: 0;">
                                <div v-for="social in peerDetails?.socials" :key="social.name">
                                    <a :href="social.provider === 'instagram' ? `https://www.instagram.com/${social.name}`
                                        : social.provider === 'github' ? `https://github.com/${social.name}`
                                            : social.provider === 'linkedin' ? `https://www.linkedin.com/in/${social.name}`
                                                : ''" target="_blank" style="color: black;">
                                        <v-icon>{{ social.icon }}</v-icon>
                                    </a>
                                </div>
                            </v-row>
                        </div>
                        <div class="my-2" style="flex-grow: 1;">
                            <v-chip v-for="domain in peerDetails?.domainsInterested"
                                style="width: fit-content; font-size: 12px; display: inline-flex; margin-right: 4px; margin-top: 8px;">#{{ domain }}</v-chip>
                        </div>
                        <p style="position: absolute; right: 16px; bottom: 12px; opacity: 0.4; font-weight: 600">
                            #{{ peerDetails?.domainsInterested[0] }}</p>
                    </div>
                </v-card>
            </v-col>
            <v-col v-if="!isAlreadyNetworked" cols="12" lg="8">
                <h3>What was the convo about?</h3>
                <div class="convo-stack" style="column-gap: 12px; row-gap: 12px; margin-top: 24px;">
                    <div class="tech-stack" v-for="techStack in tracks"
                        style="display: inline-flex; width: fit-content; align-items: center; column-gap: 12px;"
                        :key="techStack.title">
                        <!-- <input type="checkbox">
                        <p style="display: inline-flex; width: fit-content;">{{ techStack.title }}</p> -->
                        <v-checkbox :label="techStack.title" color="primary" v-model="choosenTechStacks"
                            :value="techStack.title" /> <!-- <div class="mobile-img"></div>
                        <h3 class="mt-2">{{ techStack.title }}</h3>
                        <p>{{ techStack.desc }}</p> -->
                    </div>
                </div>
                <v-btn @click="createConnection" :loading="isSumbitLoading" v-if="choosenTechStacks.length !== 0"
                    variant="tonal" style="float: right">Submit</v-btn>
            </v-col>
        </v-row>
    </div>

</template>
<script setup>
import { collection, addDoc, query, getDocs, where, and, or, getCountFromServer } from 'firebase/firestore';


const user = useCurrentUser();
const db = useFirestore();
const route = useRoute();

const isPageLoading = ref(false);
const isSumbitLoading = ref(false);
const peerDetails = useState('peerDetails', () => { });
const choosenTechStacks = ref([]);
const isAlreadyNetworked = ref(false);

const peerId = ref('');
const targetId = ref('');

watch(user, (_) => {
    isPageLoading.value = true;
    if (user.value) {
        fetchPeersData();
    }
});
// FETCH Peer's data
async function fetchPeersData() {
    try {
        console.log('Function called');
        const peerUserName = route.params.username;
        const q = query(collection(db, "users"), where("username", "==", peerUserName));
        const snapshot = await getDocs(q);
        snapshot.forEach((doc) => {
            peerDetails.value = doc.data();
            peerId.value = doc.id;
            console.log('uid = ', doc.id);
        });
        checkNetworked();
    } catch (error) {
        console.error('Error in fetching Peer. :', error);
        alert('Error in fetching Peer, Please try again!!');
    }
}

// check if already Networked 
async function checkNetworked() {
    try {
        targetId.value = user?.value.uid;
        console.log('Peer id = ', peerId.value, " target id = ", targetId.value);
        const q = query(
            collection(db, "connections"),
            or(
                and(
                    where("connectA", "==", peerId.value),
                    where("connectB", "==", targetId.value)
                ),
                and(
                    where("connectA", "==", targetId.value),
                    where("connectB", "==", peerId.value)
                )
            )
        );
        const snapshot = await getCountFromServer(q);
        const count = snapshot.data().count;
        isAlreadyNetworked.value = count !== 0 ? true : false; 
    } catch (error) {
        console.error("Error in Checking Already Networked or not! = ", error);
    }
}

// AddDoc to Connections
async function createConnection() {
    isSumbitLoading.value = true;
    try {
        await addDoc(collection(db, "connections"), {
            connectA: user.value.uid,
            connectB: peerId.value,
            domains : choosenTechStacks.value
        });

        alert('Updated Successfully ✅');
    } catch (error) {
        console.error("Error in Creating doc in connection collection : ->", error);
        alert("Error in UPDATING network.")
        isSumbitLoading.value = false;
    }
}


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

/* .tech-stack:hover {
    border: 1.5px solid #202023;
    width: fit-content;
    border-radius: 20px;
} */

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