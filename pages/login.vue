<template>
    <NuxtLayout name="default">
        <v-container fluid style="width: 100vw; margin: 24px 0px">
            <v-row>
                <v-col cols="12" lg="6">
                    <img src="/img/past-devfest/devfest19.png"
                        style="width: 100%; height: 60vh; border-radius: 24px; object-fit: cover; margin-right: 12px;" />
                </v-col>
                <v-col cols="12" lg="6">
                    <h1>Login</h1>
                    <p class="mb-8">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam rerum optio,
                        laboriosam
                        repellendus accusantium perferendis.</p>
                    <v-text-field v-model="email" label="Email Address"></v-text-field>
                    <v-text-field :type="showPassword ? 'text' : 'password'" v-model="password" label="Password"
                        append-inner-icon="mdi-eye" @click:append-inner="() => {
                            showPassword = !showPassword;
                        }"></v-text-field>
                    <v-btn @click="signInWithEmail" color="#FBC005">Sign In</v-btn>
                </v-col>
            </v-row>
        </v-container>
    </NuxtLayout>
</template>
<script setup>
import { signInWithEmailAndPassword, updatePassword } from 'firebase/auth';
import { useCurrentUser, useFirebaseAuth } from 'vuefire';

const auth = useFirebaseAuth();

async function signInWithEmail() {
    try {
        await signInWithEmailAndPassword(auth, email.value, password.value);
        router.push('/profile');
    } catch (e) {
        console.log(e);
        alert("An error occurred. Please try again later", e);
    }
}

const router = useRouter();
definePageMeta({
    layout: false,
});
let email = useState('email', () => '');
let password = useState('password', () => '');

let showPassword = useState('password', () => false);
</script>
<style scoped></style>