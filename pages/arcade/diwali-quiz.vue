<template>
  <NuxtLayout name="default">
    <v-container fluid class="mt-5 w-100">
      <v-row>
        <v-col cols="12" style="width: 100%;">
          <img :src="'../../img/arcade/diwali-dhamaka.png'"
            style="height: 280px; border-radius:24px;object-fit: cover; width:100%;" />
        </v-col>
        <v-col>
          <h2>Light Up the Leaderboard ✨</h2>
          <p style="max-width: 86ch">Ready to shine brighter than a diya 🪔?<br/>From mythology to traditions, put your Diwali knowledge to the test in this exciting quiz and see if you have what it takes to conquer the leaderboard!. Climb the leaderboard and win amazing prizes! </p>
        </v-col>
        <v-col cols="3" class="ml-4" style="border: 2px #202023 solid; padding: 16px; border-radius: 24px; width: fit-content; display: flex; justify-content: center; align-items: center;">
          <p style="font-size: 4rem;">{{ Math.floor(countdown / 60) }}:{{ countdown % 60 < 10 ? '0' : '' }}{{ countdown % 60 }}</p>
        </v-col>
      </v-row>



      <v-container>
        <v-row justify="start" style="column-gap: 8px;">

          <v-container
            style="padding: 4px 6px; border: 1px #202023 solid; border-radius: 80px; display: flex; column-gap: 12px; align-items:center; width: fit-content; margin:0">
            <img :src="'../img/team/manas.jpg'"
              style="width: 28px; height: 28px; object-fit:cover; border-radius: 20px;" />
            <p class="mr-2" style="font-size: 14px; font-weight: 600;">Manas Malla</p>
          </v-container>
          <v-container
            style="padding: 4px 6px; border: 1px #202023 solid; border-radius: 80px; display: flex; column-gap: 12px; align-items:center; width: fit-content; margin:0">
            <img :src="'../img/team/kavya.png'"
              style="width: 28px; height: 28px; object-fit:cover; border-radius: 20px;" />
            <p class="mr-2" style="font-size: 14px; font-weight: 600;">Kavya Chandana</p>
          </v-container>
        </v-row>
      </v-container>
      <v-container v-if="userScore >= 0" style="margin-top: 24px; width: fit-content; border: 2px #202023 solid; border-radius: 16px; background-color: #e3e3e3;">
        Score: {{ userScore }}/{{ diwaliQuizData.length }}
      </v-container>
      <form @submit.prevent="submitQuiz"
        style="margin: 24px auto; display: flex; justify-content: start; align-items: start; flex-direction: column;">
        <div v-for="(item, index) in diwaliQuizData" :key="index"
          style="display: flex; flex-direction: column; justify-content: start; align-items: start;">
          <div style="margin-bottom: 20px;">
            <p style="font-size: large; font-weight: bold;">
              {{ item.question }}
            </p>
            <div v-for="(option, index) in item.options" :key="index"
              style="display: flex; justify-content: start; align-items: start; gap: 4px">
              <div style="display: flex; justify-content: center; align-items: center; gap: 10px;">
                <input type="radio" :disabled="showAnswers" id="option" :value="option" :name="item.question">
                <label for={option} :style="showAnswers && option == item.correct ? 'color: #34a853; font-weight: 600' : ''">{{ option }}</label>
              </div>
            </div>
            <div v-if="showAnswers == true" style="border-radius: 12px; background-color: #c3ecf6; padding: 20px; margin: 12px 12px; display: flex; column-gap: 12px;">
              <v-icon>mdi-lightbulb-on-outline</v-icon>
              <p>{{ item.trivia }}</p>
            </div>
          </div>
        </div>
        <button style="padding: 12px 24px; background-color: #f9ab00; color: black; margin-top: 16px; border-radius: 8px;">
          Submit
        </button>
      </form>
    </v-container>
  </NuxtLayout>
</template>


<script setup>
import { useFirestore }  from 'vuefire';
import { useCurrentUser } from 'vuefire';
import { doc, setDoc } from "firebase/firestore"; 

const { mainData, diwaliQuizData } = useJSONData();
const showAnswers = useState('showAnswers', ()=>false);
const countdown = useState('countdown', ()=> 300);
const userScore = useState('userScore', ()=> -1);

const db = useFirestore()
const user = useCurrentUser();

onNuxtReady(() => {

  showAnswers.value = window.localStorage.getItem('quizCompleted') === 'true';
  countdown.value = parseInt(window.localStorage.getItem('countdown')) || 300;
  userScore.value = parseInt(window.localStorage.getItem('userScore')) || -1;

  if(window.localStorage.getItem('quizCompleted') === 'true'){
    const userAnswers = JSON.parse(window.localStorage.getItem('userAnswers'));
    diwaliQuizData.forEach(item => {
      const selectedOption = userAnswers.find(answer => answer.question === item.question);
      if(selectedOption){
        item.selectedOption = selectedOption.selectedOption;
      }
      // show the user answer by setting radio
      const radio = document.querySelector(`input[name="${item.question}"][value="${item.selectedOption}"]`);
      if(radio){
        radio.checked = true;
      }
    });
  }

  const timer = setInterval(() => {
  countdown.value -= 1;
  if (countdown.value <= 0 || showAnswers.value) {
    clearInterval(timer);
    submitQuiz();
  }
}, 1000);
});
definePageMeta({
  middleware: ['auth'],
  layout: false,
});

useSeoMeta({
  contentType: "text/html; charset=utf-8",
  title: "Diwali Quiz - " + mainData.eventInfo.name + " | " + mainData.communityName,
  description: mainData.eventInfo.description.short,
  keywords: mainData.seo.keywords,
  ogLocale: 'en_US',
  author: "Manas Malla",
  creator: "Manas Malla",
  viewport: "width=device-width, initial-scale=1.0",
  ogTitle: "Diwali Quiz - " + mainData.eventInfo.name + " | " + mainData.communityName,
  ogDescription: mainData.eventInfo.description.short,
  ogImage: `${mainData.seo.hostUrl}/thumbnail.png?auto=format&fit=crop&frame=1&h=512&w=1024`,
  ogUrl: mainData.seo.hostUrl,
  ogType: "website",
  twitterTitle:
    "Diwali Quiz - " + mainData.eventInfo.name + " | " + mainData.communityName,
  twitterDescription: mainData.eventInfo.description.short,
  twitterImage: `${mainData.seo.hostUrl}thumbnail.png?auto=format&fit=crop&frame=1&h=512&w=1024`,
  twitterCard: "summary_large_image",
});
function submitQuiz(event) {
  showAnswers.value = true;
  
  // Create an array to hold user answers
  const userAnswers = [];

  // Loop through the quiz data and gather selected options
  diwaliQuizData.forEach(item => {
    // Get the selected value for each question
    const selectedOption = event.target.querySelector(`input[name="${item.question}"]:checked`);
    
    // If an option is selected, add it to the userAnswers array
    if (selectedOption) {
      userAnswers.push({
        question: item.question,
        selectedOption: selectedOption.value // Get the value from the selected input
      });
    }
  });
  const userScoreCalculated = userAnswers.reduce((score, answer) => {
    if (answer.selectedOption === answer.correct) {
      return score + 1;
    }
    return score;
  }, 0);
  userScore.value = userScoreCalculated + 2;
  window.scrollTo(0, 0);
  window.localStorage.setItem('userScore', userScoreCalculated+2);
  window.localStorage.setItem('userAnswers', JSON.stringify(userAnswers));
  window.localStorage.setItem('quizCompleted', true);
  window.localStorage.setItem('countdown', countdown);
  console.log(db);
  console.log(user.value.uid);
  const firestoreDoc = setDoc(doc(db, "users",user.value.uid,"arcade","diwali"), {
    uid: user.value.uid,
    userAnswers: JSON.stringify(userAnswers),
    userScore: userScoreCalculated + 2,
    timestamp: new Date(),
    quizCompleted: true,
    countdown: countdown.toString()
  }, { merge: true});

  // Log the collected answers
  console.log("User Answers:", userAnswers);
}
</script>

<style scoped></style>