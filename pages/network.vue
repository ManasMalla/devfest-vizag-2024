<template>
    <!-- TODO: Display the values here -->
    <h1 class="mt-5">Network</h1>
    <v-row class="my-4" style="width: 100vw; max-width: 1200px;">
        <v-col v-for="connection in connections.filter((e) => e?.displayName != undefined)" cols="12" lg="3">
            <NetworkConnectionCard :connection="connection" />
        </v-col>
    </v-row>
</template>

<script setup>
import { query, where, collection, or, getFirestore, getDocs, getDoc, doc } from 'firebase/firestore';
const db = getFirestore();
const connections = useState('connections', () => []);
const user = useCurrentUser();
watch(user, async (_) => {
    if (user.value) {
        const q = query(collection(db, 'connections'), or(where('connectA', '==', user.value.uid), where('connectB', '==', user.value.uid)));
        const connectionsSnapshot = await getDocs(q);
        connectionsSnapshot.forEach(async (doc2) => {
            const d = doc2.data();
            console.log(d);
            const cId = d.connectA === user.value.uid ? d.connectB : d.connectA;
            const c = await getDoc(doc(db, 'users', cId));
            connections.value.push(c.data());
        });
    }
});

</script>