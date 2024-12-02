<template>
    <v-dialog v-model="dialog" closeOnBack="true">
        <template v-slot:activator="{ props: activatorProps }">
            <v-card v-bind="activatorProps" v-if="connection" :key="connection?.username">
                <v-col style="text-align: center; padding: 1.5rem 0px;">
                    <img referrerPolicy="no-referrer"
                        style="width: 96px; height: 96px; border-radius: 48px; padding: 2px; border: 1.5px solid #202023;"
                        :src="connection.photoURL" />
                    <h3 class="mt-4">{{ connection?.displayName ?? "User" }}</h3>
                    <p v-if="connection?.company">{{ connection.company.designation }}, {{
                        connection.company.name }}
                    </p>
                    <v-chip variant="text" style="background-color: #c3ecf6;" class="mt-4" rounded>Attendee</v-chip>
                </v-col>
            </v-card>

        </template>
        <v-card class="badge-card"
            style="border-radius: 24px; margin: 12px; max-height: 500px; margin-left: auto; margin-right: auto; position: relative;"
            elevation="0" :color="'#CEE6C1'">
            <div
                style="display: flex; flex-direction: row; column-gap: 24px; padding: 12px; align-items: center; width: fit-content;">
                <img :src="connection.photoURL"
                    style="height: 240px; width: 100%; object-fit: cover; border-radius: 14px; object-position: top;" />
                <div class="card-inner-div"
                    style="width: fit-content; margin-top: 12px; display: flex; flex-direction: column; flex-shrink: 0;">
                    <div style="width: 100%; flex-grow: 1; margin-right: 24px;">
                        <h2 style="line-height: 100%; flex-shrink: 0;">{{ connection.displayName }}
                        </h2>
                        <p style="opacity: 50%; font-weight: 600; margin-bottom: 6px;">@{{ connection.username }}
                        </p>
                        <p style="font-size: 14px;" v-if="connection.company">{{ connection.company.designation }}, {{
                            connection.company.name }}
                        </p>
                        <v-row class="my-2 pl-3" style="column-gap: 12px; flex-grow: 0;">
                            <v-icon>mdi-linkedin</v-icon>
                            <v-icon>mdi-github</v-icon>
                            <v-icon>mdi-web</v-icon>
                        </v-row>
                    </div>
                    <div class="my-2" style="flex-grow: 1; max-width: 200px">
                        <v-chip
                            style="width: fit-content; font-size: 12px; display: inline-flex; margin-right: 4px; margin-top: 8px;">#WebAssembly</v-chip>
                        <v-chip
                            style="width: fit-content; font-size: 12px; display: inline-flex; margin-right: 4px; margin-top: 8px;">#Android</v-chip>
                        <v-chip
                            style="width: fit-content; font-size: 12px; display: inline-flex; margin-right: 4px; margin-top: 8px;">#Kotlin</v-chip>
                        <v-chip
                            style="width: fit-content; font-size: 12px; display: inline-flex; margin-right: 4px; margin-top: 8px;">#Kotlin</v-chip>
                    </div>
                    <!-- <p style="position: absolute; right: 16px; bottom: 12px; opacity: 0.4; font-weight: 600">
                        #Web</p> -->
                </div>
            </div>
            <img src="/img/attendee/mobile.png" height="80"
                style="width: auto; object-fit: contain; position: absolute; bottom: 10px; left: 12px;" />

        </v-card>
    </v-dialog>
</template>

<script setup>
const dialog = ref();
defineProps({
    connection: {
        type: Object,
        required: true
    }
})
</script>