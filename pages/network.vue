<template>
    <!-- TODO: Display the values here -->
    <p v-for="connection in connections">{{ connection }}</p>
</template>
<script setup>
import { query, where, collection, or } from 'firebase/firestore';

const connections = useState('connections', () => []);
const user = useCurrentUser();
watch(user, async (_) => {
    if (user.value) {
        const q = query(collection(db, 'connections'), or(where('connectA', '==', user.value.uid), where('connectB', '==', user.value.uid)));
        const connectionsSnapshot = await getDocs(q);
        connectionsSnapshot.forEach(async (doc) => {
            const d = await doc.data();
            if (d.connectA === user.value.uid) {
                connections.value.push(d.connectB);
            } else {
                connections.value.push(d.connectA);
            }
        });
    }
});

</script>