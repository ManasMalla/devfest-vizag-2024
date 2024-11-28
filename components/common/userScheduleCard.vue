<template>
    <h2>Your Schedule</h2>
    <ul>
        <li v-for="e in userSchedule" :key="e.id">{{ e.title }}</li>
    </ul>
</template>

<script setup>
import { getDoc } from 'firebase/firestore';
const { ushaAgenda } = useJSONData();

const user = useCurrentUser();
const userSchedule = useState('userScheduleCard', () => []);
onMounted(async () => {
    if (user.value) {
        await getDoc(doc(db, 'users', user.value.uid)).then(async (doc) => {
            const x = (await doc.data()).schedule;
            userSchedule.value = x.map((e) => {
                return ushaAgenda.find((a) => a.id === e);
            });
        });
    }
});
</script>