<template>
    <v-bottom-sheet>
        <template v-slot:activator="{ props }">
            <div v-bind="props" :key="idx"
                :class="['event__YGTKe', ['eventRed__2g88B', 'eventBlue__3pTyG', 'eventYellow__1FduS', 'eventGreen__2A2MQ'][idx % 4]]"
                :style="'cursor: pointer; grid-column: ' +
                    (calculateTimeline(parseTime(event.time)))
                    ">
                <div class="eventIcon__3jIwU">
                    <svg><!-- Icon Here --></svg>
                </div>
                <div class="eventLabel__1xNJF">
                    <span class="eventTitle__2IhWF">{{ event.title }}</span>
                    <span class="formattedEventTime__1x2iy">{{ new Date(event.start_at).toLocaleString("default",
                        {
                            year: "numeric"
                        }) }}</span>
                </div>
            </div>
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
    }
})

const user = useCurrentUser();
const db = useFirestore();

async function addToUserSchedule() {
    console.log(props.isSessionInSchedule);
    if (user.value) {
        await updateDoc(doc(db, "users", user.value.uid), {
            schedule: props.isSessionInSchedule ? arrayRemove(props.event.id) : arrayUnion(props.event.id)
        });
        alert(props.isSessionInSchedule ? "Removed from schedule" : "Added to schedule");
    }
}

function calculateTimeline([s, e]) {
    const offset = (s - new Date(s.getFullYear(), s.getMonth(), s.getDate(), 8, 0, 0)) / 60000;
    const duration = (e - s) / 60000;
    console.log(offset, duration, props.event.title);
    return `${((offset * 22) / 60) + 1} / span ${duration * 22 / 60}`;
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