<template>
  <v-container fluid class="pa-0 ma-0">
    <v-row class="google-font mb-5 mt-0">
      <v-col
        v-for="(item, index) in sponsorsData"
        :key="index"
        cols="4" <!-- Ensures 3 columns per row for categories -->
      
        <div class="mb-3">
          <b>{{ item.category_name }}</b>
        </div>
        <div
          v-for="(sponsor, indexp) in item.sponsors"
          :key="indexp"
          style="background-color: #F3F3F3; border-radius: 15px; border: 1.5px solid black; width: 200px;  height: 150px;"
          class="pa-5 mb-3"
        >
          <ClientOnly>
            <v-tooltip location="bottom" :key="indexp">
              <template v-slot:activator="{ props }">
                <a
                  aria-label="sponsor name"
                  :href="sponsor.link"
                  target="_blank"
                  v-bind="props"
                  style="display:block; width:100%; height:100%;"
                >
                  <v-img
                  style="display:block; width:100%; height:100%;"
                    alt="sponsor-logo"
                    :src="'/img/sponsors/' + sponsor.logo"
                    max-height="100"
                    max-width="150"
                  ></v-img>
                </a>
              </template>
              <span>{{ sponsor.name }}</span>
            </v-tooltip>
          </ClientOnly>
          
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const { sponsorsData } = useJSONData();
</script>

<style>
</style>
