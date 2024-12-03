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
                    <v-btn :loading="isLoading" @click="updateUserPassword" color="#FBC005">Confirm</v-btn>
                </v-col>
            </v-row>
        </v-container>
        <v-bottom-sheet v-model="sheet" persistent>
            <v-card class="text-center pa-8" title="Let us know more about you?"
                subtitle="Onboarding you on quick to experience the best seamless event.">
                <v-text-field v-model="github" label="GitHub"></v-text-field>
                <v-text-field v-model="linkedin" label="LinkedIn"></v-text-field>
                <v-autocomplete v-model="domainsInterested" chips label="Interested Domains" :items="['Web', 'Mobile', 'Cloud', 'AI', 'Career'
                    , 'Entrepreneurship']" multiple></v-autocomplete>
                <v-btn :loading="isLoading" @click="updateDetailsForFirebase()" rounded style="width: fit-content; font-weight: 600;"
                    color="#4285F4">Submit</v-btn>
            </v-card>
        </v-bottom-sheet>
    </NuxtLayout>
</template>
<script setup>
import { signInWithEmailAndPassword, updatePassword } from 'firebase/auth';
import { query, collection, limit, where, getDocs, doc, updateDoc } from 'firebase/firestore';

const auth = useFirebaseAuth();
const db = useFirestore();
const sheet = useState('sheet', () => false);
let linkedin = useState('linkedinHandle', ()=>'');
let github = useState('githubHandle', ()=>'');
let isLoading = useState('isLoading', ()=>false);
let domainsInterested = useState('domainsInterested', ()=>[]);
let uid;

const route = useRoute();

async function updateDetailsForFirebase() {
    isLoading.value = true;
    const fireDoc = doc(collection(db, 'users'), uid);

    await updateDoc(fireDoc, {
        socials: [
            {
                provider: 'linkedin',
                name: linkedin.value,
                icon: 'mdi-linkedin'
            },
            {
                provider: 'github',
                name: github.value,
                icon: 'mdi-github'
            }
        ],
        domainsInterested: domainsInterested.value
    });
    sheet.value = false;

    auth.signOut();
    console.log("Password updated successfully");
    navigateTo('/login', { replace: true });

}

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
    isLoading.value = true;
    const q = query(collection(db, 'users'), where('email', '==', route.params.email), limit(1));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (fireDoc) => {
        try {
            await signInWithEmailAndPassword(auth, route.params.email, fireDoc.data()["phoneNumber"]);
            await updatePassword(auth.currentUser, password.value);
            const uD = fireDoc.data();
            console.log('ud data: ', uD);
            if (uD["socials"].filter((e) => e.provider === 'linkedin').name === undefined || uD['domainsInterested'] === undefined) {
                linkedin.value = uD["socials"].find((e) => e.provider === 'linkedin')?.name || '';
                github.value = uD["socials"].find((e) => e.provider === 'github')?.name || '';
                console.log('linked in value = ', linkedin.value, " github value : ", github.value );
                domainsInterested.value = uD["domainsInterested"];
                isLoading.value = false;
                sheet.value = true;
                uid = auth.currentUser.uid;
            } else {
                uid = auth.currentUser.uid;
                auth.signOut();
                console.log("Password updated successfully");
                navigateTo('/login', { replace: true });

            }
            // uid = auth.currentUser.uid;
            // auth.signOut();
            // console.log("Password updated successfully");
            // navigateTo('/login', { replace: true });
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