<template>
    <v-bottom-sheet persistent v-model="isBottomSheetOpen">
        <template v-slot:activator="{ props }">
            <div v-bind="props" :key="idx">
                <div class="eventIcon__3jIwU">
                    <svg><!-- Icon Here --></svg>
                </div>
            </div>
        </template>
        <v-card>
            <v-container class="mx-3 my-0">
                <h2>{{ professional.name }}</h2>
                <p>{{ professional.company.designation }}</p>
                <v-col class="mt-4">
                    <v-textarea v-model="userMessage" label="What would you ask if you had five minutes with them?"
                        prepend-icon="mdi-message-question" variant="outlined"
                        @change="handleTextAreaInput"></v-textarea>
                </v-col>
                <v-row class="my-4">
                    <v-btn :loading="isLoading" @click="askPundit" rounded color="#4285f4" class="">Have a
                        Question?</v-btn>
                    <v-btn text class="ml-4" variant="plain" @click="closeBottomSheet">
                        Close
                    </v-btn>
                </v-row>
            </v-container>
        </v-card>
    </v-bottom-sheet>
</template>
<script setup>
import { arrayRemove, arrayUnion, doc, getDoc, addDoc, collection } from 'firebase/firestore';
const isBottomSheetOpen = ref(true);
const userMessage = ref('');
const isLoading = ref(false);

const emit = defineEmits(['close']);
const props = defineProps({
    professional: {
        type: Object,
        default: {},
    },
    idx: {
        type: Number,
        default: -1
    },
    addMentorRequest: {
        type: Function,
        default: () => { },
    },
});

const handleTextAreaInput = () => {
};

const user = useCurrentUser();
const db = useFirestore();

async function askPundit() {
    if (user.value) {
        isLoading.value = true;
        await addDoc(collection(db, "mentor-request"), {
            mentor: props.professional.name,
            questions: userMessage.value,
            uid: user.value.uid,
            isApproved: false,
            status: 'pending',
            name: user.value.displayName,
            subtitle : `${user.value?.company?.name}, ${user.value?.company?.designation}`
        });
        props.addMentorRequest();
        isBottomSheetOpen.value = false;
        alert("Request for a session is received ✅");
        isLoading.value = false;
    }
}

function closeBottomSheet() {
    isBottomSheetOpen.value = false;
    emit("close");
}
</script>

<style scoped>
.eventIcon__3jIwU {
    padding-right: 20px;
}

@media screen and (min-width: 1024px) {
    .eventIcon__3jIwU {
        padding-right: 8px;
    }
}

.eventIcon__3jIwU svg {
    max-height: 18px;
    width: 18px;
}

.eventLabel__1xNJF {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
}

.eventTitle__2IhWF {
    font-size: 12px;
    line-height: 14px;
    font-weight: 500;
    font-family: "Roboto", arial, sans-serif;
    margin-bottom: 2px;

}

@media screen and (min-width: 1024px) {
    .eventTitle__2IhWF {
        font-size: 14px;
        line-height: 18px;
        font-weight: 400;
        font-family: "Google Sans", arial, sans-serif;
        margin-bottom: 0;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        line-clamp: 1;
        text-overflow: ellipsis;
    }
}

.formattedEventTime__1x2iy {
    font-size: 12px;
    line-height: 14px;
    font-weight: 400;
    font-family: "Roboto", arial, sans-serif;
}

@media screen and (min-width: 1024px) {
    .formattedEventTime__1x2iy {
        display: none;
    }

}

.event__YGTKe {
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    height: 48px;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    margin: 8px 0;
    padding: 16px;
}

@media screen and (min-width: 1024px) {
    .event__YGTKe {
        font-size: 14px;
        line-height: 18px;
        font-weight: 400;
        border-bottom: 1px solid #FFFFFF;
        height: 50px;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        letter-spacing: 0.2px;
        margin: 0;
        padding: 0;
    }
}

.eventGrey__JYwoo {
    background-color: #F1F3F4;
}

.eventRed__2g88B {
    background-color: #FAD2CF;
}

.eventBlue__3pTyG {
    background-color: #4285F4;
    color: #FFFFFF;
}

.eventYellow__1FduS {
    background-color: #FBBC04;
}

.eventGreen__2A2MQ {
    background-color: #5BB974;
    color: #FFFFFF;
}

.eventRedBorder__237a4 {
    border: 2px solid #D93025;
    background-color: #FFFFFF;
}

.eventDarkBlue__3iEqq {
    background-color: #174EA6;
    color: #FFFFFF;
}
</style>