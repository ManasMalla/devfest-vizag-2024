<template>
  <div style="width: 80vw; margin-top: 36px;">
    <div class="calendar__3ASh5">
      <!-- Time Bar -->
      <div class="timeBar__b9M84">
        <div v-for="time in times" :key="time">
          <span>{{ time }}</span>
        </div>
      </div>

      <!-- Days and Events -->
      <div v-for="(day, index) in days" :key="index" class="day__2Fs_v">
        <div class="date__HrqQp">
          <span class="dateWeekday__c6J_B">{{ day.weekday }}</span>
          <span class="dateDayNumber__KJVBf">{{ day.day }}</span>
        </div>
        <div class="row__WRVvc" v-for="track in day.tracks">
          <div v-for="(event, idx) in track.events" :key="idx"
            :class="['event__YGTKe', ['eventRed__2g88B', 'eventBlue__3pTyG', 'eventYellow__1FduS', 'eventGreen__2A2MQ'].sort(() => 0.5 - Math.random())[0]]"
            :style="'grid-column: ' + (calculateTimeline(event.start_at, event.stop_at))">
            <div class="eventIcon__3jIwU">
              <svg><!-- Icon Here --></svg>
            </div>
            <div class="eventLabel__1xNJF">
              <span class="eventTitle__2IhWF">{{ event.title }}</span>
              <!-- <span class="formattedEventTime__1x2iy">{{ event.time }}</span> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { ushaAgenda } = useJSONData();
const tracks = [...new Set(ushaAgenda.map((agenda) => agenda.track_title))];
console.log(tracks);
const dayOneTracks = ushaAgenda.filter((agenda) => (new Date(ushaAgenda[0].start_at)).getDate() == 7);
console.log(dayOneTracks);
const days = [
  {
    weekday: "Mon",
    day: 20,
    tracks: tracks.map((track) => {
      return {
        track,
        events: dayOneTracks.filter((agenda) => agenda.track_title === track),
      };
    }),
  },
];
function calculateTimeline(a, b) {
  const s = new Date(a);
  const e = new Date(b);
  const offset = s - new Date(s.getFullYear(), s.getMonth(), s.getDate(), 8, 0, 0);
  const duration = e - s;
  return `${(offset / 60000) / 10 + 1} / span ${(duration / 60000) / 10}`;
}
</script>

<script>
export default {
  data() {
    return {
      times: [
        "8AM",
        "9",
        "10",
        "11",
        "12PM",
        "1",
        "2",
        "3",
        "4",
        "5PM",
      ],
      headers: ["Route", "Start Time", "End Time", "Stops"],
      routes: [
        { isHeader: false, data: ["Route A", "6:00 AM", "8:00 AM", "5 Stops"] },
        { isHeader: true, data: ["Special Schedule", "", "", ""] },
      ],
    };
  },
};
</script>

<style scoped>
/*
 * Utility function to calculate the width of a desired column span (1 or more columns)
 *
 * Example usage:
 * getSpanWidth(2) // returns the width of 2 columns in the default breakpoint (mobile)
 * getSpanWidth(2, 6, $bp-desktop) // returns the width of 2 columns when inside a 6 column container in desktop
 *
 * Given the complexity of the grid system, it's impossible for the function to
 * determine the width without knowing if it should be calculating a column
 * width inside a container that spans all columns, or just some columns.
 * It's also impossible to determine the correct column gap to use in the
 * calculation, so the function requests the breakpoint, but will the mobile
 * gap as default. Finally, it's possible to ask the function to include an
 * extra gap at the end of the calculation, this can be useful if you are
 * trying to offset an element 3 columns to the right, where you need that
 * extra gap to offset it properly (e.g. left: getSpanWidth(3, 4, 6, $bp-desktop, true))
 *
 * @param $column-span: the number of columns you wish to calculate the width for
 * @param $columns: the number of columns the parent container spans in the grid
 *   defaults to all columns in the current breakpoint
 * @param $bp: the breakpoint to use for the column gap calculation
 * @param $include-last-gap: if you wish to add the width of 1 column gap to
 *   the calculation
 */
.agenda__2Cuil {
  width: 100%;
}

.calendar__3ASh5 {
  margin: 0 auto;
  max-width: 1056px;
  position: relative;
}

@media screen and (min-width: 1024px) {
  .calendar__3ASh5 {
    padding: 38px 0 76px 60px;
  }

  .calendar__3ASh5:after {
    content: '';
    height: 50px;
    left: -500px;
    position: absolute;
    right: -500px;
    width: 10000px;
    border-bottom: 1px solid #F1F3F4;
  }
}

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

@media screen and (min-width: 1024px) {
  .row__WRVvc {
    display: grid;
    grid-template-columns: repeat(64, 1fr);
    height: 50px;
  }
}

.eventIcon__3jIwU {
  padding-right: 20px;
}

@media screen and (min-width: 1024px) {
  .eventIcon__3jIwU {
    padding-right: 8px;
  }
}

.eventIcon__3jIwU svg {
  max-height: 18px;
  width: 18px;
}

.eventLabel__1xNJF {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
}

.eventTitle__2IhWF {
  font-size: 12px;
  line-height: 14px;
  font-weight: 500;
  font-family: "Roboto", arial, sans-serif;
  margin-bottom: 2px;

}

@media screen and (min-width: 1024px) {
  .eventTitle__2IhWF {
    font-size: 14px;
    line-height: 18px;
    font-weight: 400;
    font-family: "Google Sans", arial, sans-serif;
    margin-bottom: 0;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    text-overflow: ellipsis;
  }
}

.formattedEventTime__1x2iy {
  font-size: 12px;
  line-height: 14px;
  font-weight: 400;
  font-family: "Roboto", arial, sans-serif;
}

.event__YGTKe {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  height: 48px;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  margin: 8px 0;
  padding: 16px;
}

@media screen and (min-width: 1024px) {
  .event__YGTKe {
    font-size: 14px;
    line-height: 18px;
    font-weight: 400;
    border-bottom: 1px solid #FFFFFF;
    height: 50px;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    letter-spacing: 0.2px;
    margin: 0;
    padding: 0;
  }
}

.eventGrey__JYwoo {
  background-color: #F1F3F4;
}

.eventRed__2g88B {
  background-color: #FAD2CF;
}

.eventBlue__3pTyG {
  background-color: #4285F4;
  color: #FFFFFF;
}

.eventYellow__1FduS {
  background-color: #FBBC04;
}

.eventGreen__2A2MQ {
  background-color: #5BB974;
  color: #FFFFFF;
}

.eventRedBorder__237a4 {
  border: 2px solid #D93025;
  background-color: #FFFFFF;
}

.eventDarkBlue__3iEqq {
  background-color: #174EA6;
  color: #FFFFFF;
}

/*
 * Utility function to calculate the width of a desired column span (1 or more columns)
 *
 * Example usage:
 * getSpanWidth(2) // returns the width of 2 columns in the default breakpoint (mobile)
 * getSpanWidth(2, 6, $bp-desktop) // returns the width of 2 columns when inside a 6 column container in desktop
 *
 * Given the complexity of the grid system, it's impossible for the function to
 * determine the width without knowing if it should be calculating a column
 * width inside a container that spans all columns, or just some columns.
 * It's also impossible to determine the correct column gap to use in the
 * calculation, so the function requests the breakpoint, but will the mobile
 * gap as default. Finally, it's possible to ask the function to include an
 * extra gap at the end of the calculation, this can be useful if you are
 * trying to offset an element 3 columns to the right, where you need that
 * extra gap to offset it properly (e.g. left: getSpanWidth(3, 4, 6, $bp-desktop, true))
 *
 * @param $column-span: the number of columns you wish to calculate the width for
 * @param $columns: the number of columns the parent container spans in the grid
 *   defaults to all columns in the current breakpoint
 * @param $bp: the breakpoint to use for the column gap calculation
 * @param $include-last-gap: if you wish to add the width of 1 column gap to
 *   the calculation
 */
.shuttleRouteTable__3Bjbp {
  border: 1px solid #E8EAED;
  border-spacing: 0;
  table-layout: fixed;
  margin-top: 28px;
  width: 100%;
}

.shuttleRouteTable__3Bjbp td,
.shuttleRouteTable__3Bjbp th {
  padding: 4px 8px;
}

.shuttleRouteTable__3Bjbp tbody tr:not(.scheduleHeaderRow__3Lwdz) {
  border-left: 1px solid #E8EAED;
  border-right: 1px solid #E8EAED;
}

.shuttleRouteTable__3Bjbp tbody tr:not(.scheduleHeaderRow__3Lwdz):nth-child(even) {
  background-color: #F8F9FA;
}

.tableHeader__34Spa tr {
  text-align: left;
}

.tableHeader__34Spa th {
  font-size: 18px;
  line-height: 32px;
  font-weight: 500;
  padding: 12px 8px;
}

.scheduleBaseHeaderRow__3HWQA th {
  font-size: 16px;
  line-height: 28px;
  font-weight: 500;
  padding: 8px;
}

.scheduleHeaderRow__3Lwdz {
  background-color: #E8EAED;
}

.scheduleHeaderRow__3Lwdz th {
  font-size: 12px;
  line-height: 22px;
  font-weight: 500;
  text-align: left;
}

.heading__Ars3I {
  margin-top: 68px;
}

.heading__Ars3I:first-of-type {
  margin-top: 40px;
}
</style>
