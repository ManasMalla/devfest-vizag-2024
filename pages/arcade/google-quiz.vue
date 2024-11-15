<template>
  <NuxtLayout name="default">
    <v-container fluid class="mt-5 w-100">
      <v-row>
        <v-col cols="12" style="width: 100%;">
          <img :src="'../../img/arcade/google-guru.png'"
            style="height: 280px; border-radius:24px;object-fit: cover; width:100%; object-position: left" />
        </v-col>
        <v-col>
          <h2>Google Guru Quiz: Prove Your Google Prowess! 🧙‍♂️</h2>
          <p style="max-width: 86ch">Think you know Google inside and out 🤔?<br />Put your knowledge to the test with
            this fun quiz! 🎮 Climb the leaderboard and show off your tech mastery.</p>
        </v-col>
        <v-col md="3" sm="8" class="ml-4"
          style="border: 2px #202023 solid; padding: 16px; margin-bottom: 12px; border-radius: 24px; width: fit-content; display: flex; justify-content: center; align-items: center;">
          <p style="font-size: 4rem;">{{ Math.floor(countdown / 60) }}:{{ countdown % 60 < 10 ? '0' : '' }}{{ countdown
              % 60 }}</p>
        </v-col>
      </v-row>

      <v-container>
        <v-row justify="start" style="column-gap: 8px;">

          <v-container
            style="padding: 4px 6px; border: 1px #202023 solid; border-radius: 80px; display: flex; column-gap: 12px; align-items:center; width: fit-content; margin:0">
            <img :src="'../img/team/jayadhar.jpg'"
              style="width: 28px; height: 28px; object-fit:cover; border-radius: 20px;" />
            <p class="mr-2" style="font-size: 14px; font-weight: 600;">Jayadhar Ummadisingu</p>
          </v-container>
          <v-container
            style="padding: 4px 6px; border: 1px #202023 solid; border-radius: 80px; display: flex; column-gap: 12px; align-items:center; width: fit-content; margin:0">
            <img :src="'../img/team/varshita.jpeg'"
              style="width: 28px; height: 28px; object-fit:cover; border-radius: 20px;" />
            <p class="mr-2" style="font-size: 14px; font-weight: 600;">Varshita Palleti</p>
          </v-container>
        </v-row>
      </v-container>
      <v-container v-if="userScoreGoogle >= 0"
        style="margin-top: 24px; width: fit-content; border: 2px #202023 solid; border-radius: 16px; background-color: #e3e3e3;">
        Score: {{ userScoreGoogle }}/{{ googleQuizData.length }}
      </v-container>
      <form @submit.prevent="submitQuizGoogle"
        style="margin: 24px auto; display: flex; justify-content: start; align-items: start; flex-direction: column;">
        <div v-for="(item, index) in googleQuizData" :key="index"
          style="display: flex; flex-direction: column; justify-content: start; align-items: start;">
          <div style="margin-bottom: 20px;">
            <p style="font-size: large; font-weight: bold;">
              {{ item.question }}
            </p>
            <div v-for="(option, index) in item.options" :key="index"
              style="display: flex; justify-content: start; align-items: start; gap: 4px">
              <div style="display: flex; justify-content: center; align-items: center; gap: 10px;">
                <input type="radio" :disabled="showAnswersGoogle" id="option" :value="option" :name="item.question">
                <label for={option}
                  :style="showAnswersGoogle && option == item.correct ? 'color: #34a853; font-weight: 600' : ''">{{
                  option }}</label>
              </div>
            </div>
            <div v-if="showAnswersGoogle == true"
              style="border-radius: 12px; background-color: #c3ecf6; padding: 20px; margin: 12px 12px; display: flex; column-gap: 12px;">
              <v-icon>mdi-lightbulb-on-outline</v-icon>
              <p v-if="item.hasOwnProperty('triviaLink')">
                <a :href="item.triviaLink" target="_blank" rel="noopener noreferrer" style="margin:0;display:inline;float:left">X</a>
              <p style="margin:0;display:inline;float:right">{{ item.trivia }}</p>
              </p>
              <p v-else>{{ item.trivia }}</p>
            </div>
          </div>
        </div>
        <button
          style="padding: 12px 24px; background-color: #f9ab00; color: black; margin-top: 16px; border-radius: 8px;">
          Submit
        </button>
      </form>
    </v-container>
  </NuxtLayout>
</template>


<script setup>
import { useFirestore } from 'vuefire';
import { useCurrentUser } from 'vuefire';
import { doc, setDoc } from "firebase/firestore";

const { mainData, googleQuizData } = useJSONData();
const showAnswersGoogle = useState('showAnswersGoogle', () => false);
const countdown = useState('countdown', () => 300);
const userScoreGoogle = useState('userScoreGoogle', () => -1);

const db = useFirestore()
const user = useCurrentUser();

onNuxtReady(() => {

  showAnswersGoogle.value = window.localStorage.getItem('quizCompletedGoogle') === 'true';
  countdown.value = parseInt(window.localStorage.getItem('countdown')) || 300;
  userScoreGoogle.value = parseInt(window.localStorage.getItem('userScoreGoogle')) || -1;

  if (window.localStorage.getItem('quizCompletedGoogle') === 'true') {
    const userAnswersGoogle = JSON.parse(window.localStorage.getItem('userAnswersGoogle'));
    googleQuizData.forEach(item => {
      const selectedOptionGoogle = userAnswersGoogle.find(answer => answer.question === item.question);
      if (selectedOptionGoogle) {
        item.selectedOptionGoogle = selectedOptionGoogle.selectedOptionGoogle;
      }
      // show the user answer by setting radio
      const radio = document.querySelector(`input[name="${item.question}"][value="${item.selectedOptionGoogle}"]`);
      if (radio) {
        radio.checked = true;
      }
    });
  }

  const timer = setInterval(() => {
    countdown.value -= 1;
    if (countdown.value <= 0 || showAnswersGoogle.value) {
      clearInterval(timer);
      submitQuizGoogle();
    }
  }, 1000);
});
definePageMeta({
  middleware: ['auth'],
  layout: false,
});

useSeoMeta({
  contentType: "text/html; charset=utf-8",
  title: "Google Quiz - " + mainData.eventInfo.name + " | " + mainData.communityName,
  description: mainData.eventInfo.description.short,
  keywords: mainData.seo.keywords,
  ogLocale: 'en_US',
  author: "Manas Malla",
  creator: "Manas Malla",
  viewport: "width=device-width, initial-scale=1.0",
  ogTitle: "Google Quiz - " + mainData.eventInfo.name + " | " + mainData.communityName,
  ogDescription: mainData.eventInfo.description.short,
  ogImage: `${mainData.seo.hostUrl}/thumbnail.png?auto=format&fit=crop&frame=1&h=512&w=1024`,
  ogUrl: mainData.seo.hostUrl,
  ogType: "website",
  twitterTitle:
    "Google Quiz - " + mainData.eventInfo.name + " | " + mainData.communityName,
  twitterDescription: mainData.eventInfo.description.short,
  twitterImage: `${mainData.seo.hostUrl}thumbnail.png?auto=format&fit=crop&frame=1&h=512&w=1024`,
  twitterCard: "summary_large_image",
});
function submitQuizGoogle(event) {
  showAnswersGoogle.value = true;

  // Create an array to hold user answers
  const userAnswersGoogle = [];

  // Loop through the quiz data and gather selected options
  googleQuizData.forEach(item => {
    // Get the selected value for each question
    const selectedOptionGoogle = event.target.querySelector(`input[name="${item.question}"]:checked`);

    // If an option is selected, add it to the userAnswersGoogle array
    if (selectedOptionGoogle) {
      userAnswersGoogle.push({
        question: item.question,
        selectedOptionGoogle: selectedOptionGoogle.value // Get the value from the selected input
      });
    }
  });
  const userScoreGoogleCalculated = userAnswersGoogle.reduce((score, answer) => {

    if (answer.selectedOptionGoogle === googleQuizData.find(item => item.question === answer.question).correct) {
      return score + 1;
    }
    return score;
  }, 0);
  userScoreGoogle.value = userScoreGoogleCalculated;
  window.scrollTo(0, 0);
  window.localStorage.setItem('userScoreGoogle', userScoreGoogleCalculated);
  window.localStorage.setItem('userAnswersGoogle', JSON.stringify(userAnswersGoogle));
  window.localStorage.setItem('quizCompletedGoogle', true);
  window.localStorage.setItem('countdown', countdown);
  console.log(db);
  console.log(user.value.uid);
  const firestoreDoc = setDoc(doc(db, "users", user.value.uid, "arcade", "google"), {
    uid: user.value.uid,
    userAnswersGoogle: JSON.stringify(userAnswersGoogle),
    userScoreGoogle: userScoreGoogleCalculated,
    timestamp: new Date(),
    quizCompletedGoogle: true,
    countdown: countdown.toString()
  }, { merge: true });
  alert("You've just earned the Google Guru badge. Check it out on your profile.")
  // Log the collected answers
  console.log("User Answers:", userAnswersGoogle);
}
</script>

<style scoped></style>