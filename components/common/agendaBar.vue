<template>
    <v-bottom-sheet v-model="sheet">
        <template v-slot:activator="{ props }">
            <v-card v-bind="props"
                style="margin: 12px 8px; width: 280px; padding: 1rem; height: 160px; flex-shrink: 0; "
                :style="event.track == 'Mobile' ? 'background-color: rgba(204, 246, 197, 0.3);' : event.track == 'Cloud' ? 'background-color: rgba(255, 231, 165, 0.3);' : event.track == 'Web' ? 'background-color: rgba(195, 236, 246, 0.3)' : event.track === 'AI/ML' ? 'background-color: rgba(248, 216, 216, 0.3)' : 'background-color: rgba(32, 32, 35, 0.08)'">
                <div style="padding-right: 80px; display: flex; flex-direction: column; height: 100%;">
                    <p style="position: absolute; right: 16px; text-align: end;"><b>{{ event.time.split(" to ")[0]
                            }}</b><br />
                        <span style="font-size: 14px;">{{ event.time.split(" to ")[1] }}</span>
                    </p>
                    <h3 style="max-width: 220px;">{{ event.title }}</h3>

                    <div style="margin-top: auto; height: fit-content;">
                        <v-container v-for="speaker in speakersData.filter((e) => event.speakers.includes(e.id))"
                            style="padding: 4px 6px; border-radius: 80px; display: flex; column-gap: 12px; align-items:center; width: fit-content; margin:0">
                            <img :src="'../img/speakers/' + speaker.image"
                                style="width: 24px; height: 24px; object-fit:cover; border-radius: 20px;" />
                            <p class="mr-2" style="font-size: 14px; font-weight: 600;">{{ speaker.name }}</p>
                        </v-container>

                        <v-chip
                            :color="event.track == 'Mobile' ? '#ccf6c5' : event.track == 'Cloud' ? '#ffe7a5' : event.track == 'Web' ? '#c3ecf6' : event.track === 'AI/ML' ? '#f8d8d8' : '#bababa'"
                            variant="flat" class="mt-2">{{
                                event.track
                            }}</v-chip>
                    </div>
                </div>
            </v-card>
        </template>
        <v-card>
            <v-container class="mx-3 my-0">
                <h2>{{ event.title }}</h2>
                <h4 style="opacity: 50%;">{{ (parseTime(event.time)[0]).toLocaleString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "numeric",
                }) }}</h4>
                <p>{{ event.description }}</p>
                <v-btn @click="addToUserSchedule" variant="tonal" rounded color="#4285f4" class="mt-4"
                    v-if="!isSessionInSchedule">Add
                    to
                    schedule</v-btn>
                <v-btn @click="addToUserSchedule" rounded variant="tonal" color="#ea4335" class="mt-4"
                    v-if="isSessionInSchedule">Remove
                    from
                    schedule</v-btn>
            </v-container>
        </v-card>
    </v-bottom-sheet>
</template>
<script setup>
import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';

const { scheduleData, sessionsData, speakersData } = useJSONData();

const parseTime = (time) => {

    const times = time.split(" to ");
    const startTime = times[0];
    const endTime = times[1];
    const [timePart, modifier] = startTime.split(' ');
    let [hours, minutes] = timePart.split(':').map(Number);

    if (modifier === 'PM' && hours !== 12) {
        hours += 12;
    } else if (modifier === 'AM' && hours === 12) {
        hours = 0;
    }

    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    const [timePart2, modifier2] = endTime.split(' ');
    let [hours2, minutes2] = timePart2.split(':').map(Number);

    if (modifier2 === 'PM' && hours2 !== 12) {
        hours2 += 12;
    } else if (modifier2 === 'AM' && hours2 === 12) {
        hours2 = 0;
    }

    const date2 = new Date();
    date2.setHours(hours2, minutes2, 0, 0);
    return [date, date2];
};

const props = defineProps({
    event: {
        type: Object,
        default: {},
    },
    idx: {
        type: Number,
        default: -1
    },
    isSessionInSchedule: {
        type: Boolean,
        default: false
    },
    onAddToSchedule: {
        type: Function,
        default: () => { }
    }
})


const sheet = useState('sheetValue' + props.event.title, () => false);

const user = useCurrentUser();
const db = useFirestore();

async function addToUserSchedule() {
    console.log(props.isSessionInSchedule);
    if (user.value) {
        await updateDoc(doc(db, "users", user.value.uid), {
            schedule: props.isSessionInSchedule ? arrayRemove(props.event.id) : arrayUnion(props.event.id)
        });
        props.onAddToSchedule();
        alert(props.isSessionInSchedule ? "Removed from schedule" : "Added to schedule");
        sheet.value = false;
    }
}

function calculateTimeline([s, e]) {
    const offset = (s - new Date(s.getFullYear(), s.getMonth(), s.getDate(), 8, 0, 0)) / 60000;
    const duration = (e - s) / 60000;
    console.log(offset, duration, props.event.title);
    return `${((offset * 132) / 60) + 1} / span ${duration * 132 / 60}`;
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
    overflow: hidden;
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