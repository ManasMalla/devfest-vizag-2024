<style>
.responsive-grid {
  display: flex;
  flex-direction: column;
}

@media (min-width: 800px) {
  .responsive-grid {
    flex-direction: row;
  }
}
</style>
<template>
  <NuxtLayout name="default">
    <v-container fluid class="mt-5">
      <v-row style="display: flex;" class="responsive-grid">
        <v-col md="4">
          <h1>Profile</h1>
          <p>
            Our mission is to equip our community members with practical skills,
            enabling them to communicate their insights.
          </p>
          <div class="mt-8" style="display:flex; align-items: center; flex-direction: column;">
            <img :src="userDetails.photoURL" alt="Profile Picture"
              style="border-radius: 80px; margin-bottom: 16px; object-fit: cover; z-index: 50" width="160"
              height="160" />
            <div
              style="display:flex; width: 100%; align-items: center; flex-direction: column; outline: 1px solid #202023; border-radius: 24px; padding: 24px; transform: translateY(-80px); position: relative;">
              <div
                style="position: absolute; height: 180px; width: 180px; border-radius: 100px; border: 1px solid #202023; top:-106px; background-color: #fff; clip-path: inset(58% 0 0 0);" />
              <div style="height: 80px;" />
              <div style="display: flex; align-items: center; column-gap: 8px; font-size: 20px;">
                <p>{{ userDetails.displayName }}</p>
                <p
                  style="padding: 6px 12px;font-size: 12px; border-radius: 6px; color: #202023; border: 1px #202023 solid; background-color: #f9ab00; width: fit-content;">
                  Attendee</p>
              </div>
              <p v-if="userDetails && userDetails.company && userDetails.company.designation && userDetails.company.name"
                class="mt-2">{{ userDetails.company.designation }}, {{ userDetails.company.name }}</p>
              <p v-if="userDetails && userDetails.communityTitle">{{ userDetails.communityTitle }}</p>
              <a style="display: flex; align-items: center;  column-gap: 4px; margin-top: 12px; border: 1px solid #dadce0; color: #1a73e8; padding: 6px 12px; border-radius: 48px; text-decoration:none;" :href="'https://devfest.vizag.dev/p/' + userDetails.username"
                v-if="userDetails && userDetails.username">devfest.vizag.dev/p/{{ userDetails.username }} <v-icon size="16">mdi-arrow-top-right</v-icon></a>
              <v-divider style="width: 100%; margin: 12px 0px; opacity: 100%;"></v-divider>
              <div v-if="userDetails && !showEditor"
                style="display: flex; flex-direction: column; align-items: start; width: 100%; font-size: 14px;">
                <p style="font-weight: 600; margin-top: 8px; margin-bottom: 4px;">City/Town</p>
                <p v-if="userDetails.city">{{ userDetails.city }}</p>
                <p style="font-weight: 600; margin-top: 8px; margin-bottom: 4px;">Bio</p>
                <p v-if="userDetails.bio">{{ userDetails.bio }}</p>
                <p style="font-weight: 600; margin-top: 8px; margin-bottom: 4px;">Stats</p>
                <p><v-icon>mdi-star-circle-outline</v-icon> {{ badges.filter((e) => e.earned).length }} • Badges earned
                </p>
                <p style="font-weight: 600; margin-top: 8px; margin-bottom: 4px;">Links</p>

                <ul v-if="userDetails.socials" style="list-style: none;">
                  <li style="display: flex; column-gap: 12px; margin-top: 8px; margin-bottom: 8px"
                    v-for="item in userDetails.socials" :key="item.icon">
                    <v-icon>{{ item.icon }}</v-icon>
                    <a :href="item.provider == 'instagram' ? ('https://instagram.com/' + item.name) : item.provider == 'github' ? ('https://github.com/' + item.name) : item.provider == 'linkedin' ? ('https://linkedin.com/in/' + item.name) : (item.name)"
                      target="_blank" style="text-decoration: none; color: #202023;">{{ item.name }}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </v-col>
        <v-col md="8" sm="12">
          <v-card class="pa-3">
            <v-row>
              <v-col v-for="(item, index) in badges" cols="6" sm="6" md="3">

                <v-dialog v-model="dialog" width="800" persistent>
                  <template v-slot:activator="{ props: activatorProps }">
                    <v-container v-bind="activatorProps"
                      style="display: flex; flex-direction: column; align-items: center; justify-items: center">
                      <div style="position: relative; width: 70%; cursor: pointer;">
                        <img :src="'/img/arcade/badges/' + item.image"
                          :style="'width: 100%;' + (item.earned ? '' : 'filter: saturate(0); opacity: 0.3;')" />
                        <v-icon v-if="!item.earned"
                          style="position: absolute; margin: auto; top: 0; left:0; right: 0; bottom: 0; font-size: 48px; color: rgb(90, 90, 90);">mdi-lock</v-icon>
                      </div>
                      <p style="font-size: 16px; font-weight: 600;">{{ item.name }}</p>
                      <p style="font-size: 13px; opacity: 60%;" v-if="item.date !== 'Not earned'"> {{ item.date }}</p>
                      <button
                        style="font-size: 13px; border: 1px solid black; padding: 4px 12px; border-radius: 20px; margin-top: 4px;"
                        v-if="item.date === 'Not earned'"> Learn More <v-icon>mdi-arrow-right</v-icon></button>
                    </v-container>
                  </template>

                  <v-card max-width="800" rounded="xl" class="pa-4" style="border: 2px solid black">
                    <v-container fluid>
                      <v-row>
                        <v-col cols="3">
                          <v-img :src="'/img/arcade/badges/' + item.image" style="width: 100%" />
                        </v-col>
                        <v-col>
                          <h1 class="mt-3 mb-0">{{ item.name }}</h1>
                          <p style="font-weight: 500" class="mt-n1">
                            {{ item.date === 'Not earned' ? 'Not earned' : 'Earned on ' + item.date }}
                          </p>
                          <p style="margin: 8px 0px; white-space: pre-line;">
                            {{ item.description }}
                          </p>
                          <div v-if="item.earned" style="display: flex; column-gap: 12px;">
                            <p>Share: </p>
                            <v-icon>mdi-instagram</v-icon>
                            <v-icon>mdi-linkedin</v-icon>
                            <v-icon>mdi-gmail</v-icon>
                            <v-icon>mdi-whatsapp</v-icon>
                            <v-icon>mdi-twitter</v-icon>
                          </div>
                          <v-btn v-if="!item.earned" class="my-3" :href="item.link">Claim now</v-btn>

                        </v-col>
                      </v-row>
                    </v-container>
                    <template v-slot:actions>
                      <v-btn text @click="dialog = false">Close</v-btn>
                    </template>
                  </v-card>
                </v-dialog>

              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>

    </v-container>
  </NuxtLayout>
</template>

<script setup>
const socialProviders = [
  { label: 'Instagram', value: 'instagram', icon: 'mdi-instagram' },
  { label: 'GitHub', value: 'github', icon: 'mdi-github' },
  { label: 'LinkedIn', value: 'linkedin', icon: 'mdi-linkedin' },
  { label: 'Website', value: 'website', icon: 'mdi-globe  ' },
];
let sp;
function showOrHideEditor() {
  showEditor.value = !showEditor.value;
}

// Reactive variables
const dialog = ref(false);
import { collection, doc, getDocs, limit, query, where } from 'firebase/firestore';
import moment from 'moment';

const { mainData } = useJSONData();
const user = useCurrentUser();
const db = useFirestore();
const badges = useState('badges', () => []);
const userDetails = useState('userDetails', () => ({}));
const showEditor = useState('showEditor', () => false);
const route = useRoute();


onMounted(async () => {
console.log(route.params.username);
       const q = query(collection(db, "users"), where("username", "==", route.params.username), limit(1));
       const snapshot = await getDocs(q);
       let profileUID;
       snapshot.forEach((doc)=> {
        userDetails.value = doc.data();
        profileUID = doc.id;
       });
      // console.log('Company Details', uD.company); userDetails.value = uD;
      // console.log('Company State', userDetails.value.company);
      const arcadeDataRef = computed(() => collection(db, "users", profileUID , "arcade"));
      const arcadeData = await getDocs(arcadeDataRef.value);
      var badgeData = [];
      arcadeData.forEach((doc) => {
        badgeData.push({ ...doc.data(), id: doc.id });
      });
      console.log('Badge Data', badgeData);
      badges.value.push({
        name: "Diwali Dhamaka",
        link: "/arcade/diwali-quiz",
        date: badgeData.filter((doc) => doc.id == 'diwali')[0]?.timestamp === undefined ? "Not earned" : ((moment(badgeData.filter((doc) => doc.id == 'diwali')[0]?.timestamp?.toDate())))?.format('DD MMM YYYY'),
        image: "diwali-dhamaka-badge.svg",
        earned: (badgeData.filter((doc) => doc.id == 'diwali')[0])?.quizCompleted || false,
        description: (badgeData.filter((doc) => doc.id == 'diwali')[0])?.quizCompleted ? "Boom! Victory is yours! You're a Diwali Quiz Mastermind, Illuminator!\nThis badge is proof of your festive brilliance.\nShare your triumph and inspire others to shine! #DevFestDiwali" : "Think you know Diwali? A hidden Diwali treasure awaits!\nIgnite your Diwali spirit! Unravel the secrets of the Festival of Lights by conquering the Diwali Quiz and this dazzling radiant badge is your reward for victory.\nSpark your inner knowledge and illuminate the leaderboard in the Diwali Quiz. ",
      }, {
        name: "Google Guru",
        link: "/arcade/google-quiz",
        date: badgeData.filter((doc) => doc.id == 'google')[0]?.timestamp === undefined ? "Not earned" : ((moment(badgeData.filter((doc) => doc.id == 'google')[0]?.timestamp?.toDate())))?.format('DD MMM YYYY'),
        image: "google-guru-badge.svg",
        earned: (badgeData.filter((doc) => doc.id == 'google')[0])?.quizCompletedGoogle || false,
        description: (badgeData.filter((doc) => doc.id == 'google')[0])?.quizCompletedGoogle ? "Congratulations, Google Guru! 🎉 You've aced the quiz and proven your tech expertise! This badge is a symbol of your tech brilliance and your passion for learning. #DevFestGoogleGuru. Let the world know your tech skills. Share your success and inspire others! 🚀" : "Think you know all Google? A Googolous adventure treasure awaits!\nIgnite your Google spirit! Unravel the secrets of the tech giant by conquering the Google Quiz and this dazzling radiant badge is your reward for victory.\nSpark your inner knowledge and illuminate the leaderboard in the Google Quiz. ",
      });
     
    
});
definePageMeta({
  layout: false,
});

useSeoMeta({
  contentType: "text/html; charset=utf-8",
  title: "Profile - " + mainData.eventInfo.name + " | " + mainData.communityName,
  description: mainData.eventInfo.description.short,
  keywords: mainData.seo.keywords,
  ogLocale: 'en_US',
  author: "Manas Malla",
  creator: "Manas Malla",
  viewport: "width=device-width, initial-scale=1.0",
  ogTitle: "Profile - " + mainData.eventInfo.name + " | " + mainData.communityName,
  ogDescription: mainData.eventInfo.description.short,
  ogImage: `${mainData.seo.hostUrl}/thumbnail.png?auto=format&fit=crop&frame=1&h=512&w=1024`,
  ogUrl: mainData.seo.hostUrl,
  ogType: "website",
  twitterTitle:
    "Profile - " + mainData.eventInfo.name + " | " + mainData.communityName,
  twitterDescription: mainData.eventInfo.description.short,
  twitterImage: `${mainData.seo.hostUrl}thumbnail.png?auto=format&fit=crop&frame=1&h=512&w=1024`,
  twitterCard: "summary_large_image",
});
</script>

<style scoped></style>