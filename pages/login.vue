<template>
    <NuxtLayout name="default">
        <v-container fluid style="width: 100vw; margin: 0px 0px 24px 0px">
            <div class="mainCard" style="display: flex; ">
                <v-col>
                    <img src="/img/past-devfest/devfest19.png"
                        style="width: 100%; max-height: 60vh; border-radius: 24px; object-fit: cover; margin-right: 12px;" />
                </v-col>
                <v-col>
                    <h1>Login</h1>
                    <p>{{ userC?.displayName }}</p>
                    <p class="mb-8">Sign in to join the fun of DevFest 2024: Filled with loads of fun, challenging
                        arcade, multi-day tickets, packed workshops,
                        and many more</p>
                    <v-text-field v-model="email" label="Email Address"></v-text-field>
                    <v-text-field :type="showPassword ? 'text' : 'password'" v-model="password" label="Password"
                        append-inner-icon="mdi-eye" @click:append-inner="() => {
                            showPassword = !showPassword;
                        }"></v-text-field>
                    <v-btn @click="signInWithEmail" color="#FBC005">Sign In</v-btn>
                    <div style="display: flex; align-items: center;">
                        <v-divider class="my-6"></v-divider>
                        <p style="margin: 0px 12px;">or,</p>
                        <v-divider class="my-6"></v-divider>
                    </div>
                    <div style="width: 100%; display: flex; justify-content: center;">
                        <v-btn
                            style="margin-left: auto; font-weight: 600; height: 56px; width: 100%; border-radius: 12px;"
                            @click="signinWithFirebase" class="ma-4"><img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/2048px-Google_%22G%22_logo.svg.png"
                                style="height: 16px; width: 16px; margin-right: 12px;" /> Sign In With Google</v-btn>

                    </div>
                </v-col>
            </div>
        </v-container>
    </NuxtLayout>
</template>

<script>
import { GoogleAuthProvider } from 'firebase/auth'
export const googleAuthProvider = new GoogleAuthProvider()
definePageMeta({
    layout: false,
});
</script>

<script setup>
import { signInWithEmailAndPassword, updatePassword, browserLocalPersistence, setPersistence, signInWithPopup } from 'firebase/auth';
import { useCurrentUser, useFirebaseAuth } from 'vuefire';


const auth = useFirebaseAuth();
const userC = useCurrentUser();

async function signinWithFirebase() {
    console.log('signing in')
    await signInWithPopup(auth, googleAuthProvider).catch((reason) => {
        console.error('Failed sign', reason)
    })
    navigateTo('/', { replace: true });
}

async function signInWithEmail() {
    try {
        // await setPersistence(auth, browserLocalPersistence);
        await signInWithEmailAndPassword(auth, email.value, password.value);
        navigateTo('/', { replace: true });
    } catch (e) {
        console.log(e);
        alert("An error occurred. Please try again later", e);
    }
}

let email = useState('email', () => '');
let password = useState('password', () => '');

let showPassword = useState('password', () => false);
</script>
<style scoped>
    @media screen and (max-width: 968px){
        .mainCard{
            flex-direction: column;
        }
            
        .mainCard img {
            height: 15vh;
        }
    }
</style>