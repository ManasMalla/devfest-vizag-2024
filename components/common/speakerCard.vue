<template>
  <v-dialog v-model="dialog" width="900" persistent>
    <template v-slot:activator="{ props: activatorProps }">
      <div style="cursor: pointer" v-bind="activatorProps" class="text-center image-container">
        <v-img alt="frame" class="frame" src="/assets/img/frame.png"></v-img>
        <v-img class="avatar" aspect-ratio="1" cover :alt="props.data.name" :src="props.data.image.length
          ? '/img/speakers/' + props.data.image
          : '/img/common/avatar.png'
          "></v-img>
        <h3 class="mt-n1">{{ props.data.name }}</h3>
        <p style="font-size: 90%">{{ props.data.company.name }}</p>
      </div>
    </template>

    <v-card max-width="800" rounded="xl" class="pa-4" style="border: 2px solid black">
      <v-container fluid>
        <v-row>
          <v-col md="4" cols="12">
            <div class="text-center image-container">
              <v-img alt="frame" class="frame" src="/assets/img/frame.png"></v-img>
              <v-img class="avatar" :alt="props.data.name" aspect-ratio="1" cover :src="props.data.image.length
                ? '/img/speakers/' + props.data.image
                : '/img/common/avatar.png'
                "></v-img>
            </div>
          </v-col>
          <v-col md="8" cols="12">
            <h1 class="mt-3 mb-0 sname">{{ props.data.name }}</h1>
            <p v-if="props.data.community_title" style="font-weight: 500" class="mt-n1 stitle">
              {{ props.data.community_title }} |
              {{ props.data.company.designation }},
              {{ props.data.company.name }}
            </p>
            <p v-if="!props.data.community_title" style="font-weight: 500" class="mt-n1 stitle">

              {{ props.data.company.designation }},
              {{ props.data.company.name }}
            </p>
            <p class="mt-4 sbio" :class="isReadMore ? 'readMore' : ''">{{ props.data.bio }}</p>
            <button style="color: #4285f4; font-weight: bold; font-size: small"
            @click="() => {
              isReadMore = !isReadMore;
            }"
            >
              Read {{isReadMore ? 'Less' : 'More'}}
            </button>

            <common-speaker-social-button :socialLinks="props.data.social" />
          </v-col>
        </v-row>
      </v-container>
      <template v-slot:actions>
        <v-btn v-if="props.data.mentor && canRequestTime && user" text variant="flat" @click="requestTime"
          style="background-color: #ffd427; color: black;"><span class="mr-1" style="font-weight: 600;">Request
            Time</span><v-icon>mdi-timer-outline</v-icon></v-btn>
        <v-btn v-if="props.data.mentor && !canRequestTime && user" text variant="flat" disabled
          style="color: black;"><span class="mr-1" style="font-weight: 600;">Application
            Pending</span><v-icon>mdi-timer-outline</v-icon></v-btn>
        <v-chip prepend-icon="mdi-login" class="mt-4" v-if="!user">Sign in to request 1:1 session</v-chip>
        <v-btn text @click="dialog = false">Close</v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<script setup>
// Props
const emit = defineEmits(['request-time']);
const user = useCurrentUser();

const isReadMore = useState('isReadMore', () => false);

const props = defineProps({
  data: {
    type: Object,
    default: {},
  },
  canRequestTime: {
    type: Boolean,
    default: true,
  },
});

// Reactive variables
const dialog = ref(false);

const requestTime = () => {
  dialog.value = false;
  emit("request-time", props.data);
};
</script>

<style scoped>
.image-container {
  position: relative;
  width: 80%;
  margin-top: 20px;
}

.avatar {
  width: 100%;
  height: auto;
  position: relative;
  border: 1px solid white;
}

.frame {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 5;
}

h4,
p {
  position: relative;
  z-index: 10;
}

@media screen and (max-width: 840px) {
  .sname{
    font-size: x-large;
  }
  .stitle{
    font-size: smaller;
  }
  .sbio{
    font-size: small;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
    line-clamp: 5;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .sbio.readMore{
    font-size: small;
    display: unset;
    -webkit-box-orient: unset;
    -webkit-line-clamp: unset;
    line-clamp: unset;
    text-overflow: unset;
    overflow: unset;
  }
}
</style>
