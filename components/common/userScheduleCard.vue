<template>
    <v-col>
        <h2 class="mb-4">Your Schedule</h2>
        <ul style="list-style: none; display: flex; column-gap: 12px; overflow: scroll; padding: 1rem 0;">
            <li v-for="e in userSchedule" :key="e.id" style="flex-shrink: 0;">
                <v-card style="padding: 0.6rem; width: fit-content; flex-shrink: 0;">
                    <!-- <v-row align="center"> -->
                    <v-col>
                        <h1>{{ e.time.split(" to ")[0] }}</h1>
                        <h4>
                            {{ e.title }}
                        </h4>
                        <p style="opacity: 60%;">{{ e.description }}</p>
                    </v-col>
                    <!-- </v-row> -->
                </v-card>
            </li>
            <li style="flex-shrink: 0;">
                <v-card color="#4285F4" style="padding: 0.6rem; width: fit-content;">
                    <!-- <v-row align="center"> -->
                    <v-col>
                        <h1>Missing something?</h1>
                        <h4>
                            Add sessions to your schedule
                        </h4>
                        <p style="opacity: 60%;">Reserve a seat for youself to learn from exciing speakers</p>
                    </v-col>
                    <!-- </v-row> -->
                </v-card>
            </li>
        </ul>

    </v-col>
</template>

<script setup>
import { getDoc, doc } from 'firebase/firestore';
const { sessionsData, scheduleData } = useJSONData();
const db = useFirestore();

const user = useCurrentUser();
const userSchedule = useState('userScheduleCard', () => []);
watch(user, async (_) => {
    if (user.value) {
        await getDoc(doc(db, 'users', user.value.uid)).then(async (doc) => {
            const x = (await doc.data()).schedule;
            console.log(x);
            userSchedule.value = x.map((e) => {
                return sessionsData.find((a) => a.id === e);
            });
        });
    }
});
</script>