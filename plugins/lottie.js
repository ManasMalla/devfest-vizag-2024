import lottie from "lottie-web/build/player/lottie_light.min.js";

export default ({ app }, inject) => {
  inject("lottie", lottie);
};
