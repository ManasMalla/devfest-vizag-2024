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
          <div v-if="user" class="mt-8" style="display:flex; align-items: center; flex-direction: column;">
            <div style="position: relative;">
              <img class="photoURLClass" referrerPolicy="no-referrer"
                v-if="userDetails.photoURL !== null && userDetails.photoURL !== undefined && userDetails.photoURL !== ''"
                :src="userDetails.photoURL" alt="Profile Picture"
                style="border-radius: 80px; margin-bottom: 8px; object-fit: cover; z-index: 50; position: relative; cursor: pointer"
                width="160" height="160" />
              <img referrerPolicy="no-referrer" v-else
                src="https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
                style="border-radius: 80px; margin-bottom: 16px; object-fit: cover; z-index: 100; position: relative;"
                width="160" height="160" />
              <v-progress-circular style="position: absolute; top: -5px; left: -5px; z-index: 70;" :size="170"
                v-if="isUploadingFile" indeterminate color="primary"></v-progress-circular>
              <div class="edit-overlay" @click="openFileInput"
                style="position: absolute; background-color: rgba(218, 220, 224, 0.5); width: 40px; height: 40px; border-radius: 80px; z-index: 100; cursor: pointer; display: flex; justify-content: center; align-items: center; top: 0; right: 0;">
                <v-icon size="20">mdi-pencil</v-icon>
              </div>
            </div>

            <!-- take headshot file input -->
            <input type="file" ref="headshotFileInput" accept="image/*" style="display: none;"
              @change="handleFileChange">
            <div
              style="display:flex; width: 100%; align-items: center; flex-direction: column; outline: 1px solid #202023; border-radius: 24px; padding: 24px; transform: translateY(-80px); position: relative;">
              <div
                style="position: absolute; height: 180px; width: 180px; border-radius: 100px; border: 1px solid #202023; top:-106px; background-color: #fff; clip-path: inset(58% 0 0 0);" />
              <div style="height: 80px;"></div>
              <div style="display: flex; align-items: center; column-gap: 8px; font-size: 20px;">
                <p>{{ user.displayName }}</p>
                <p
                  :style="'padding: 6px 12px;font-size: 12px; border-radius: 6px; border: 1px #202023 solid; width: fit-content; background-color: ' + (userDetails.role === 'Organizer' ? '#ea4335; color: white;' : userDetails.role === 'Volunteer' ? '#4285f4;  color: white;' : userDetails.role === 'Speaker' ? '#34a853;  color: white;' : '#f9ab00;  color: #202023;')">
                  {{ userDetails.role || 'Attendee' }}</p>
              </div>
              <p v-if="userDetails && userDetails.company && userDetails.company.designation && userDetails.company.name"
                class="mt-2">{{ userDetails.company.designation }}, {{ userDetails.company.name }}</p>
              <p v-if="userDetails && userDetails.communityTitle">{{ userDetails.communityTitle }}</p>
              <a style="display: flex; align-items: center;  column-gap: 4px; margin-top: 12px; border: 1px solid #dadce0; color: #1a73e8; padding: 6px 12px; border-radius: 48px; text-decoration:none;"
                :href="'https://devfest.vizag.dev/p/' + userDetails.username"
                v-if="userDetails && userDetails.username">devfest.vizag.dev/p/{{ userDetails.username }} <v-icon
                  size="16">mdi-arrow-top-right</v-icon></a>
              <v-divider style="width: 100%; margin: 12px 0px; opacity: 100%;"></v-divider>
              <div v-if="userDetails && !showEditor"
                style="display: flex; flex-direction: column; align-items: start; width: 100%; font-size: 14px;">
                <p v-if="userDetails.speaker" style="font-weight: 600; margin-top: 8px; margin-bottom: 4px;">Talk Title
                </p>
                <p v-if="userDetails.speaker">{{ userDetails.speaker.talk || 'N/a' }}</p>
                <p v-if="userDetails.city && userDetails.city != ''"
                  style="font-weight: 600; margin-top: 8px; margin-bottom: 4px;">City/Town</p>
                <p v-if="userDetails.city && userDetails.city != ''">{{ userDetails.city }}</p>
                <p v-if="userDetails.bio && userDetails.bio != ''"
                  style="font-weight: 600; margin-top: 8px; margin-bottom: 4px;">Bio</p>
                <p v-if="userDetails.bio && userDetails.bio != ''">{{ userDetails.bio }}</p>
                <p v-if="userDetails.domainsInterested && userDetails.domainsInterested.length > 0"
                  style="font-weight: 600; margin-top: 8px; margin-bottom: 4px;">Domains Interested</p>
                <v-chip style="margin: 4px;"
                  v-if="userDetails.domainsInterested && userDetails.domainsInterested.length > 0"
                  v-for="domain in userDetails.domainsInterested">{{ domain }}</v-chip>
                <p style="font-weight: 600; margin-top: 8px; margin-bottom: 4px;">Stats</p>
                <p><v-icon>mdi-star-circle-outline</v-icon> {{ badges.filter((e) => e.earned).length }} • Badges earned
                </p>
                <p v-if="(userDetails.socials?.length ?? 0) > 0"
                  style="font-weight: 600; margin-top: 8px; margin-bottom: 4px;">
                  Links</p>

                <ul v-if="userDetails.socials" style="list-style: none;">
                  <li style="display: flex; column-gap: 12px; margin-top: 8px; margin-bottom: 8px"
                    v-for="item in userDetails.socials" :key="item.icon">
                    <v-icon>{{ item.icon }}</v-icon>
                    <a :href="item.provider == 'instagram' ? ('https://instagram.com/' + item.name) : item.provider == 'github' ? ('https://github.com/' + item.name) : item.provider == 'linkedin' ? ('https://linkedin.com/in/' + item.name) : (item.name)"
                      target="_blank" style="text-decoration: none; color: #202023;">{{ item.name }}</a>
                  </li>
                </ul>
              </div>
              <div v-if="showEditor" style="width: 100%;">
                <v-form @submit.prevent="updateUserData">
                  <v-text-field v-model="userDetails.username" label="Username" style="width: 90%;"></v-text-field>
                  <v-text-field v-model="userDetails.city" label="City/Town" style="width: 90%;"></v-text-field>
                  <v-textarea v-model="userDetails.bio" label="Bio" style="width: 90%;"></v-textarea>
                  <v-row v-for="(social, index) in userDetails.socials" :key="index"
                    style="display: flex; flex-wrap: nowrap; gap: 2px; align-items: center;">
                    <v-select style="max-width: 100px;" v-model="social.provider" label="Select a Social Handle"
                      variant="outlined" :items="socialProviders" item-value="value">
                      <template v-slot:selection="{ props, item }">
                        <v-icon v-bind="props" style="display: block; align-items: center;">{{ item.raw.icon }}</v-icon>
                      </template>
                      <template v-slot:item="{ props, item }">
                        <v-icon v-if="sp.includes(item.raw)" v-bind="props"
                          style="display: block; margin: 12px; align-items: center;">{{ item.raw.icon }}</v-icon>
                      </template>
                    </v-select>
                    <v-text-field v-model="social.name" :label="social.provider" append-inner-icon="mdi-close"
                      @click:append-inner="() => removeSocial(index)" style="width: 90%;">
                    </v-text-field>
                  </v-row>
                  <v-autocomplete v-model="userDetails.domainsInterested" chips label="Interested Domains" :items="['Web', 'Mobile', 'Cloud', 'AI', 'Career'
                    , 'Entrepreneurship']" multiple></v-autocomplete>
                  <v-btn @click="addNewSocial" class="mr-4" variant="text">+ Add Social Handles</v-btn>
                  <button rounded v-if="showEditor"
                    style="border: 1px solid #202023; padding: 6px 16px; margin-top: 12px; border-radius: 40px; font-size: 14px;">
                    <v-progress-circular :size="20" indeterminate v-if="isSubmitLoading"></v-progress-circular>
                    <p v-if="!isSubmitLoading">{{
                      showEditor ? 'Submit' : 'Update Profile' }}
                    </p>
                  </button>
                </v-form>
              </div>
              <v-divider v-if="userDetails" style="width: 100%; margin: 12px 0px; opacity: 100%;"></v-divider>
              <v-row style="column-gap: 12px;">
                <button v-if="!showEditor" :onclick="showOrHideEditor"
                  style="border: 1.5px solid #202023; padding: 6px 16px; margin-top: 12px; border-radius: 40px; font-size: 14px;">{{
                    showEditor ? 'Submit' : 'Update Profile' }}</button>
                <button @click="() => {
                  auth.signOut();
                  $router.push('/');
                }" style="background-color: #1a73e8; color: white; border: 1.5px solid #1a73e8; padding: 6px 16px; margin-top: 12px;
                  border-radius: 40px; font-size: 14px;">Sign
                  Out</button>
              </v-row>
            </div>
          </div>
        </v-col>
        <v-col md="8" sm="12">
          <v-card class="pa-3">
            <h2 v-if="!user" class="mb-8 ma-4">Login to view profile!</h2>
            <v-row>
              <v-col v-for="(item, index) in badges" cols="6" sm="6" md="3">

                <v-dialog v-model="dialog" width="800" persistent>
                  <template v-slot:activator="{ props: activatorProps }">
                    <v-container v-bind="activatorProps"
                      style="display: flex; flex-direction: column; align-items: center; justify-items: center">
                      <div style="position: relative; width: 70%; cursor: pointer;">
                        <img :src="'img/arcade/badges/' + item.image"
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
                          <v-img :src="'img/arcade/badges/' + item.image" style="width: 100%" />
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

async function updateUserData(event) {

  isSubmitLoading.value = true;
  // check usernames presence
  const coll = collection(db, "users");
  const q = query(coll, where("username", "==", userDetails.value?.username), where('__name__', "!=", user.value.uid));
  const snapshot = await getCountFromServer(q);
  if (snapshot.data().count == 0) {

    // Check if user alreay exists or not
    const qn = query(coll, where("email", "==", user.value?.email));
    const querySnapshot = await getDocs(qn);
    console.log('querySnapshot =', querySnapshot);
    if (querySnapshot.empty) {
      await setDoc(doc(db, "users", user.value.uid), {
        email: user.value.email,
        username: userDetails.value?.username,
        bio: userDetails.value?.bio,
        city: userDetails.value?.city,
        socials: userDetails.value?.socials === undefined || userDetails.value?.socials === null ? [] : userDetails.value?.socials,
        photoURL: userDetails.value?.photoURL,
        displayName: user.value.displayName,
        domainsInterested: userDetails.value.domainsInterested
      });
    } else {
      await updateDoc(doc(db, "users", user.value.uid), {
        username: userDetails.value?.username,
        bio: userDetails.value?.bio,
        city: userDetails.value?.city,
        socials: userDetails.value?.socials === undefined || userDetails.value?.socials === null ? [] : userDetails.value?.socials,
        photoURL: userDetails.value.photoURL,
        displayName: user.value.displayName,
        domainsInterested: userDetails.value.domainsInterested
      });
    }
    showEditor.value = !showEditor.value;
    isSubmitLoading.value = false;
  }
  else {
    isSubmitLoading.value = false;
    alert(userDetails.value?.username + " is already in use!!");
    return;
  }

}

async function addNewSocial() {
  if (userDetails.value.socials === undefined) {
    userDetails.value.socials = [];
  }
  sp = socialProviders.filter((e) => !userDetails.value.socials.map((e) => e.provider).includes(e.value));
  if (sp.length > 0) {
    userDetails.value.socials.push({ icon: sp[0].icon, name: '', provider: sp[0].value });
  }
  sp = socialProviders.filter((e) => !userDetails.value.socials.map((e) => e.provider).includes(e.value));
}

function removeSocial(index) {
  userDetails.value.socials = userDetails.value.socials.filter((item, i) => i != index);
  sp = socialProviders.filter((e) => !userDetails.value.socials.map((e) => e.provider).includes(e.value));
}
// Reactive variables
const dialog = ref(false);
import { signOut } from 'firebase/auth';
import { collection, doc, getDocs, updateDoc, query, where, getCountFromServer, setDoc } from 'firebase/firestore';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import moment from 'moment';

const auth = useFirebaseAuth();
const storage = useFirebaseStorage()

const { mainData } = useJSONData();
const user = useCurrentUser();
const db = useFirestore();
const badges = useState('badges', () => []);
const userDetails = useState('userDetails', () => ({}));
const showEditor = useState('showEditor', () => false);
const headshotFileInput = useState('headshotFileInput', () => null);
const isMounted = useState('isMounted', () => false);
const isSubmitLoading = useState('isSubmitLoading', () => false);
const isUploadingFile = useState('isUploadingFileStatus', () => false);


onMounted(() => {
  isMounted.value = true;
});

function openFileInput() {
  if (isMounted.value) {
    headshotFileInput.value?.click();
  } else {
    console.error("headshotFileInput ref not yet available");
  }
}
async function handleFileChange(event) {
  const file = event.target.files[0];
  if (file) {
    console.log("Selected file:", file);
    isUploadingFile.value = true;
    const newHeadShot = ref(storage, `headshots/${user.value.uid}.png`);

    try {
      await uploadBytes(newHeadShot, file);
      const headshotURL = await getDownloadURL(newHeadShot);
      console.log("Headshot URL = ", headshotURL);

      await updateDoc(doc(db, "users", user.value.uid), {
        photoURL: headshotURL
      });
      userDetails.value.photoURL = headshotURL;
      isUploadingFile.value = false;
      alert('Headshot updated successfully ✅')
    } catch (error) {
      isUploadingFile.value = false;
      console.error("Error in Uploading headshot to cloud!! = ", error);
      alert("Error in saving your request!");
    }
  }
};

onMounted(() => {
  watch(user, async (newUser) => {
    console.log(user.value?.displayName);
    if (user.value) {
      console.log("123", user.value?.displayName);
      // data.value = true;
      const { data: config, promise } = useDocument(doc(db, "users", user.value.uid));
      const uD = await promise.value;
      userDetails.value = uD;
      if (userDetails.value == null) {
        userDetails.value = {
          username: '',
          bio: '',
          city: '',
          socials: [],
        };
      }

      // set photo url to localstorage
      if (userDetails.value.photoURL !== '' && userDetails.value.photoURL !== null && userDetails.value.photoURL !== undefined) {
        localStorage.setItem('dv_photo_url', userDetails.value.photoURL);
      }

      const arcadeDataRef = computed(() => collection(db, "users", user.value.uid, "arcade"));
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
    }
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

<style scoped>
/* .edit-overlay{
  opacity: 0;
}
.edit-overlay:hover{
  opacity: 0.5;
} */
</style>