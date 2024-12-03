<template>
  <div style="display: flex; flex-direction: column">
    <h2 class="my-5">Agenda</h2>
    <div style="margin-top: 36px;">
      <div class="calendar__3ASh5">
        <div v-for="(day, index) in days" :key="index" class="day__2Fs_v">
          <div class="date__HrqQp">
            <span class="dateWeekday__c6J_B">{{ day.weekday }}</span>
            <span class="dateDayNumber__KJVBf">{{ day.day }}</span>
          </div>
          <div style=" overflow: scroll">
            <div class="row__WRVvc" style="display: flex;" v-for="track in day.tracks">
              <CommonAgendaBar v-for="(event, index) in track.events" :event="event" :idx="index"
                :is-session-in-schedule="schedule.includes(event.id)" :on-add-to-schedule="() => {
                  if (schedule.includes(event.id)) {
                    schedule = schedule.filter((id) => id !== event.id);
                  } else {
                    schedule.push(event.id);
                  }
                }" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { getDoc, doc } from 'firebase/firestore';
import { useCurrentUser, useFirebaseAuth } from 'vuefire'
const { mainData } = useJSONData();
const db = useFirestore();

useSeoMeta({
  contentType: "text/html; charset=utf-8",
  title:
    "Agenda - " + mainData.eventInfo.name + " | " + mainData.communityName,
  description: mainData.eventInfo.description.short,
  keywords: mainData.seo.keywords,
  ogLocale: 'en_US',
  author: "The Ananta Studio",
  creator: "The Ananta Studio",
  viewport: "width=device-width, initial-scale=1.0",
  ogTitle:
    "Agenda - " + mainData.eventInfo.name + " | " + mainData.communityName,
  ogDescription: mainData.eventInfo.description.short,
  ogImage: `${mainData.seo.hostUrl}/thumbnail.png?auto=format&fit=crop&frame=1&h=512&w=1024`,
  ogUrl: mainData.seo.hostUrl,
  ogType: "website",
  twitterTitle:
    "Agenda - " + mainData.eventInfo.name + " | " + mainData.communityName,
  twitterDescription: mainData.eventInfo.description.short,
  twitterImage: `${mainData.seo.hostUrl}thumbnail.png?auto=format&fit=crop&frame=1&h=512&w=1024`,
  twitterCard: "summary_large_image",
});

const { scheduleData, sessionsData, speakersData } = useJSONData();
const tracks = [...new Set(sessionsData.map((agenda) => agenda.venue))];

const days = [
  {
    weekday: "Sat",
    day: 7,
    tracks: tracks.map((track) => {
      return {
        track,
        events: sessionsData.filter((ag) => ag.date == 'Dec 7, 2024').filter((agenda) => agenda.venue === track),
      };
    }),
  },
  {
    weekday: "Sun",
    day: 8,
    tracks: tracks.map((track) => {
      return {
        track,
        events: sessionsData.filter((ag) => ag.date == 'Dec 8, 2024').filter((agenda) => agenda.venue === track),
      };
    }),
  },
];
console.log(days);
const schedule = useState("userSchedule", () => []);
const user = useCurrentUser();
const auth = useFirebaseAuth();
// watch(user, (_) => {
//   if (user.value) {
//     console.log(user.value.uid);
//     getDoc(doc(db, "users", user.value.uid)).then(async (doc) => {
//       const d = await doc.data();
//       console.log(d.schedule);
//       if (doc.exists()) {
//         schedule.value = d.schedule;
//       }
//     });
//   }

// });
</script>



<style scoped>
.timeBar__b9M84 {
  display: none;
}

@media screen and (min-width: 1024px) {
  .timeBar__b9M84 {
    display: grid;
    grid-template-columns: repeat(42, 1fr);
    height: 100%;
    padding-bottom: 20px;
    position: absolute;
    top: 0;
    width: 100%;
  }

  .timeBar__b9M84>div {
    position: relative;
    grid-column: span 4;
  }

  .timeBar__b9M84>div:after {
    background-color: #F1F3F4;
    content: '';
    height: calc(100% - 37px);
    left: 0;
    position: absolute;
    top: 30px;
    width: 1px;
  }

  .timeBar__b9M84 span {
    font-size: 12px;
    line-height: 1;
    font-weight: 400;
    font-family: "Roboto", arial, sans-serif;
    margin-left: 4px;
  }
}

.timeWithSuffix__2uPth {
  margin-left: -18px;
}

.timeWithSuffix__2uPth:after {
  margin-left: 18px;
}

.timeWithoutSuffix__3FB5s {
  margin-left: -6px;
}

.timeWithoutSuffix__3FB5s:after {
  margin-left: 6px;
}

.day__2Fs_v {
  position: relative;
}

@media screen and (min-width: 1024px) {
  .day__2Fs_v:before {
    border-top: 1px solid #F1F3F4;
    content: '';
    height: 50px;
    left: -500px;
    position: absolute;
    right: -500px;
    width: 10000px;
    pointer-events: none;
  }
}

.date__HrqQp {
  font-size: 22px;
  line-height: 28px;
  font-weight: 400;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  padding: 16px 0;
}

@media screen and (min-width: 1024px) {
  .date__HrqQp {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    left: -60px;
    padding: 0;
    position: absolute;
    top: 8px;
  }
}

@media screen and (max-width: 1024px) {
  .dateWeekday__c6J_B:after {
    content: '. ';
    white-space: pre;
    pointer-events: none;
  }
}

@media screen and (min-width: 1024px) {
  .dateWeekday__c6J_B {
    font-size: 12px;
    line-height: 1;
    font-weight: 400;
    font-family: "Roboto", arial, sans-serif;
    margin-bottom: -4px;
    text-transform: uppercase;
  }
}

@media screen and (min-width: 1024px) {
  .dateDayNumber__KJVBf {
    font-size: 24px;
    line-height: 32px;
    font-weight: 400;
    text-align: center;
  }
}
</style>