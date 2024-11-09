<template>
    <v-dialog v-model="dialog" width="800" persistent>
        <template v-slot:activator="{ props: activatorProps }">
            <v-card style="aspect-ratio: 1.24; display: flex; flex-direction: column;" class="pa-4" v-bind="activatorProps">
                <p style="font-weight: 600; font-size: 18px;">{{ props.session.title }}</p>
                <p style="font-size: 14px; margin-bottom: 12px; opacity: 0.7;">{{ props.session.track }}</p>
                <p>{{ props.session.description.substring(0, 50) }}{{ props.session.description.length >= 50
                    ? '...' : '' }}
                </p>
                <v-btn disabled class="mb-2"
                    style="width: fit-content; padding-left: 28px;margin-top: auto; padding-right: 28px; border-radius: 28px;">
                    <!-- color="#1A73E8" -->
                    Apply</v-btn>
            </v-card>
        </template>
        <v-card max-width="800" rounded="xl" class="pa-4" style="border: 2px solid black">
            <v-container fluid>
                <p style="font-size: 24px; font-weight: 600;">{{props.session.title}}</p>
                <p style="font-size: 18px; margin-bottom: 12px; opacity: 0.7;">{{props.session.format}} | {{ props.session.timeDuration }} mins</p>
                
                <p>{{ props.session.description }}</p>
            </v-container>
            <template v-slot:actions>
                <v-btn text @click="dialog = false">Close</v-btn>
            </template>
        </v-card>
    </v-dialog>
</template>
<script setup>
const dialog = ref(false);
const props = defineProps({
    session: {
        type: Object,
        default: {},
    },
});
</script>

<style scoped>
button.v-btn :disabled {
    background-color: #e5e5e5 !important;
}
</style>