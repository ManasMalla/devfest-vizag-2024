import mainData from "../data/config.json";
import arcadeData from "../data/arcade.json";
import faqData from "../data/faq.json";
import scheduleData from "../data/schedule.json";
import sessionsData from "../data/sessions.json";
import speakersData from "../data/speakers.json";
import sponsorsData from "../data/sponsors.json";
import teamData from "../data/team.json";
import cocData from "../data/coc.json";
import navbarData from "../data/navbar.json";
import diwaliQuizData from "../data/diwali-quiz.json";
import googleQuizData from "../data/google-quiz.json";

export const useJSONData = () => {
  return {
    mainData,
    arcadeData,
    faqData,
    scheduleData,
    sessionsData,
    speakersData,
    sponsorsData,
    teamData,
    cocData,
    navbarData,
    diwaliQuizData,
    googleQuizData
  };
};
