<template>
    <NuxtLayout name="default">
        <v-container fluid style="width: 100vw; margin: 24px 0px">
            <v-row>
                <v-col cols="12" lg="6">
                    <img src="/img/past-devfest/devfest19.png"
                        style="width: 100%; height: 60vh; border-radius: 24px; object-fit: cover; margin-right: 12px;" />
                </v-col>
                <v-col cols="12" lg="6">
                    <h1>Set Password</h1>
                    <p class="mb-8 mt-4">
                        Please set a password for your account.<br />This password will be used to login to your
                        account.
                    </p>
                    <v-text-field v-model="$route.params.email" readonly label="Email Address"></v-text-field>
                    <v-text-field :type="showPassword ? 'text' : 'password'" v-model="password" label="Password"
                        append-inner-icon="mdi-eye" @click:append-inner="() => {
                            showPassword = !showPassword;
                        }"></v-text-field>
                    <v-text-field type="password" v-model="confirmPassword" label="Confirm Password"></v-text-field>
                    <v-btn @click="updateUserPassword" color="#FBC005">Confirm</v-btn>
                </v-col>
            </v-row>
        </v-container>
    </NuxtLayout>
</template>
<script setup>
import { signInWithEmailAndPassword, updatePassword } from 'firebase/auth';
import { query, collection, limit, where, getDocs } from 'firebase/firestore';

const auth = useFirebaseAuth();
const db = useFirestore();

const route = useRoute();
const router = useRouter();
async function updateUserPassword() {
    if (password.value !== confirmPassword.value) {
        return alert("Password and Confirm Password does not match");
    }
    if (password.value.length < 6) {
        return alert("Password must be at least 6 characters long");
    }
    if (password.value == '') {
        return alert("Password cannot be empty");
    }
    const q = query(collection(db, 'users'), where('email', '==', route.params.email), limit(1));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
        console.log(doc.id, " => ", doc.data()["phoneNumber"]);
        try {
            await signInWithEmailAndPassword(auth, route.params.email, doc.data()["phoneNumber"]);
            console.log(auth.currentUser);
            await updatePassword(auth.currentUser, password.value);
            auth.signOut();
            console.log("Password updated successfully");
            router.push('/login');
        } catch (e) {
            console.log(e);
            alert("An error occurred. Please try again later", e);
        }
    });
}
definePageMeta({
    layout: false,
})
let password = useState('password', () => '');
let confirmPassword = useState('confirmPassword', () => '');
const showPassword = useState('showPassword', () => false);
</script>
<style scoped></style>