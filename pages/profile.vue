<template>
  <NuxtLayout name="default">
    <v-container fluid class="mt-5">
      <v-row>
        <v-col md="4">
          <h1>Profile</h1>
          <p>
            Our mission is to equip our community members with practical skills,
            enabling them to communicate their insights.
          </p>
          <div v-if="user" class="mt-8" style="display:flex; align-items: center; flex-direction: column;">
            <img :src="user.photoURL.split('=s96-c')[0]" alt="Profile Picture"
              style="border-radius: 80px; margin-bottom: 16px; object-fit: cover;" width="160" height="160" />
            <div style="display: flex; align-items: center; column-gap: 8px; font-size: 20px;">
              <p>{{ user.displayName }}</p>
              <p
                style="padding: 6px 12px;font-size: 12px; border-radius: 6px; color: white; border: 1px #202023 solid; background-color: #f9ab00; width: fit-content;">
                Attendee</p>
            </div>
            <!-- <p class="mt-2">Founder, The Ananta Studio</p>
                <p>Google Product Expert, Android</p> -->
          </div>
        </v-col>
        <v-col md="8">
          <v-card class="pa-3">
            <v-row>
              <v-col v-for="(item, index) in badges" cols="3"
                style="display: flex; flex-direction: column; align-items: center; justify-items: center">
                <img :src="'img/arcade/badges/' + item.image" :style="'width: 70%;' + (item.earned ? '' : 'filter: saturate(0); opacity: 0.3;')" />
                <p style="font-size: 16px; font-weight: 600;">{{ item.name }}</p>
                <p style="font-size: 13px; opacity: 60%">{{ item.date }}</p>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>

    </v-container>
  </NuxtLayout>
</template>

<script setup>
import { doc } from 'firebase/firestore';
import moment from 'moment';

const { mainData } = useJSONData();
const user = useCurrentUser();
const db = useFirestore();
const badges = useState('badges', () => []);

onMounted(() => {
  watch(user, async (newUser) => {
    if (user.value) {
      const { data: config, promise } = useDocument(doc(db, "users", user.value.uid, "arcade", "diwali"));
      const badgeData = await promise.value;
      
        badges.value.push({
          name: "Diwali Dhamaka",
          date: (moment(badgeData.timestamp.toDate())).format('DD MMM YYYY'),
          image: "diwali-dhamaka-badge.svg",
          earned: (badgeData)['quizCompleted']
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

<style scoped></style>