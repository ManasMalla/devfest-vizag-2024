<template>
    <NuxtLayout name="default">
        <v-container fluid class="mt-5">
            <v-row>
                <v-col md="12">
                    <h1>Admin</h1>
                    <p>
                        Sort out the Request efforlessly.
                    </p>
                </v-col>
            </v-row>

            <div
                style="width: 95%; border: 0px solid black; height: 400px; overflow-y: scroll; display: flex; gap: 4px">
                <!-- Speakers Card -->
                <div style="width: 30% ; display: flex; flex-direction: column; justify-content: start; gap: 6px;">
                    <div v-for="(item, index) in speakersData" :key="index">
                        <v-card @click="handleSpeakerClick(item.name)" id="SpeakerCard" :style="{
                            backgroundColor: choosenSpeaker === item.name ? '#c3ecf6' : '',
                            display: 'flex',
                            justifyContent: 'start',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '20px',
                            cursor: 'pointer',
                            border: '0.5px solid #c0c1c4'
                        }">
                            <div
                                style="border-radius: 100% ; width: 80px; height: 80px; display: flex; justify-content: center; align-items: center">
                                <v-img cover class="avatar" :alt="item.name" :src="item.image.length
                                    ? '/img/speakers/' + item.image
                                    : '/img/common/avatar.png'
                                    "
                                    style="border-radius: 100% ; width: 80px; height: 80px; object-fit: cover; overflow: hidden;">
                                </v-img>
                            </div>
                            <div style="display: flex; flex-direction: column; gap: 4px; justify-content: start;">
                                <p style="font-weight: 600; font-size: medium;">
                                    {{ item.name }}
                                </p>
                                <p>
                                    {{ item.company.name + ", " + item.company.designation }}
                                </p>
                            </div>

                        </v-card>
                    </div>
                </div>

                <!-- Graph -->
                <div
                    style="border: 2px dashed #8d8e91; width: 30%; display: flex; justify-content: center; align-items: center;">
                    <p style="color: #b4b5b8">A alloted time graph will be displayed...⌚</p>
                </div>

                <!-- Request Questions list -->
                <div :style="{
                    width: '40%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: requestedQuestionsData.length === 0 || choosenSpeaker === '' ? 'center' : 'start',
                    alignItems: requestedQuestionsData.length === 0 || choosenSpeaker === '' ? 'center' : 'start',
                    gap: '6px',

                }">
                    <p v-if="requestedQuestionsData.length === 0" style="color: #b4b5b8">Please Select a Speaker to
                        Display the list!</p>
                    <p v-if="requestedQuestionsData.length === 0 && choosenSpeaker === ''" style="color: #b4b5b8">No
                        Requests received ✌️</p>

                    <v-card v-if="requestedQuestionsData.length !== 0"
                        v-for="(question, index) in requestedQuestionsData" :key="index"
                        style="padding: 6px; display: flex; justify-content: space-between; border: 0.5px solid #c0c1c4">
                        <!-- Details -->
                        <div
                            style="width: 85% ;display: flex; flex-direction: column; justify-content: start; gap: 5px;">
                            <p style="font-weight: 600; font-size: medium">
                                {{ question.name }}
                            </p>
                            <p style="font-weight: 400; font-size: small">
                                {{ question.subtitle }}
                            </p>
                            <p style="">
                                {{ question.questions }}
                            </p>
                        </div>

                        <!-- Actions -->
                        <div style="display: flex;flex-direction: column; justify-content: space-between;">
                            <!-- Buttons -->
                            <div style="display: flex; justify-content: center;">
                                <v-icon @click="updateRequestStatus(question, 'rejected', false)" class="action-btn"
                                    :color="'#ea4335'" style="cursor: pointer; " size="30">
                                    mdi-alpha-x-box-outline
                                </v-icon>
                                <v-icon @click="updateRequestStatus(question, 'approved', true)" class="action-btn"
                                    :color="'#34a853'" style="cursor: pointer; " size="30">
                                    mdi-check-circle
                                </v-icon>
                            </div>

                            <!-- Status -->
                            <p :style="question.status === 'approved' ? 'color: #34a853' : question.status === 'pending' ? 'color: #fbbc04' : 'color: #ea4335'">{{ question.status.charAt(0).toUpperCase() + question.status.slice(1) }}</p>
                        </div>
                    </v-card>
                </div>

            </div>

        </v-container>
    </NuxtLayout>
</template>

<script setup>
import { collection, getDocs, updateDoc, doc, query, where } from 'firebase/firestore';
const { mainData, speakersData } = useJSONData();

const user = useCurrentUser();
const db = useFirestore();
const choosenSpeaker = useState('choosenSpeaker', () => '');
const route = useRoute();
const requestedQuestionsData = useState('requestedQuestionsData', () => [
    // {
    //     'mentor': 'Chandan Khamitkar',
    //     'questions': 'Hello there i want to know about the carrer path, that has to be followed?',
    //     'uid': 'adsjfadsfasdlfdsfs92138',
    //     'isApproved': false,
    //     'status': 'pending',
    //     'name': 'Alex jordan',
    //     'subtitle': 'CIO, The Ananta Studio',
    // },
    // {
    //     'mentor': 'Chandan Khamitkar',
    //     'questions': 'Hello there i want to know about the carrer path, that has to be followed?',
    //     'uid': 'adsjfadsfasdlfdsfs92138',
    //     'isApproved': false,
    //     'status': 'pending',
    //     'name': 'Thredway',
    //     'subtitle': 'CIO, The Ananta Studio',
    // },
    // {
    //     'mentor': 'Chandan Khamitkar',
    //     'questions': 'Hello there i want to know about the carrer path, that has to be followed?',
    //     'uid': 'adsjfadsfasdlfdsfs92138',
    //     'isApproved': false,
    //     'status': 'pending',
    //     'name': 'Infinity',
    //     'subtitle': 'CIO, The Ananta Studio',
    // },
]);
const authorizedUIDs = ['ooL4cJkNolQvxDgmEFsrAveKjFl2', 'oBYmZwFXDeS0O2uDryFuhw5ujd33', 'Ivz487Na8OWaLzoLNfnQHE1WI8o1'];

definePageMeta({
    layout: false,
});


watch(user, (_) => {
    if (user.value && (!authorizedUIDs.includes(user.value.uid))) {
        navigateTo("/?refresh=true");
    }
});

onMounted(async() => {
    await nextTick();
    console.log('Admin page mounted = ', user.value);
    if(user.value){
        if(!authorizedUIDs.includes(user.value.uid)){
            navigateTo("/?refresh=true");
        }
    }
});

const handleSpeakerClick = async (name) => {
    if (user.value && (!authorizedUIDs.includes(user.value.uid))) {
        navigateTo("/?refresh=true");
        return;
    }
    requestedQuestionsData.value = [];
    choosenSpeaker.value = name;
    console.log('Clicked speaker = ', name);

    const q = query(collection(db, 'mentor-request'), where("mentor", "==", name));
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
        const ADoc = {
            "id": doc.id,
            ...doc.data()
        };
        requestedQuestionsData.value.push(ADoc);
    });

};

const updateRequestStatus = async (item, status, isApprovedStatus) => {
    try {
        if (item.status === status) return;

        await updateDoc(doc(db, "mentor-request", item.id), {
            isApproved: isApprovedStatus,
            status: status
        });
        const index = requestedQuestionsData.value.findIndex((obj) => obj.id === item.id);
        requestedQuestionsData.value[index] = {
            ...requestedQuestionsData.value[index],
            status,
            isApproved: isApprovedStatus
        };
        console.log('Local data = ', requestedQuestionsData.value[index]);
    } catch (error) {
        console.error("Error in Updating Request Status. : ", error);
    }
}

useSeoMeta({
    contentType: "text/html; charset=utf-8",
    title:
        "Admin - " + mainData.eventInfo.name + " | " + mainData.communityName,
    description: mainData.eventInfo.description.short,
    keywords: mainData.seo.keywords,
    ogLocale: 'en_US',
    author: "The Ananta Studio",
    creator: "The Ananta Studio",
    viewport: "width=device-width, initial-scale=1.0",
    ogTitle:
        "Admin - " + mainData.eventInfo.name + " | " + mainData.communityName,
    ogDescription: mainData.eventInfo.description.short,
    ogImage: `${mainData.seo.hostUrl}/thumbnail.png?auto=format&fit=crop&frame=1&h=512&w=1024`,
    ogUrl: mainData.seo.hostUrl,
    ogType: "website",
    twitterTitle:
        "Admin - " + mainData.eventInfo.name + " | " + mainData.communityName,
    twitterDescription: mainData.eventInfo.description.short,
    twitterImage: `${mainData.seo.hostUrl}thumbnail.png?auto=format&fit=crop&frame=1&h=512&w=1024`,
    twitterCard: "summary_large_image",
});
</script>

<style scoped>
.action-btn:hover {
    transition: all;
    transform: scale(1.25);
    transition-duration: 250ms;
    filter: drop-shadow(0 0.2rem 0.25rem rgba(68, 68, 68, 0.2));
}

#SpeakerCard:hover {
    transition: all;
    transform: scale(1.05);
    transition-duration: 250ms;
}
</style>