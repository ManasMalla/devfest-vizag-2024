<template>
    <NuxtLayout name="default">
        <v-container fluid class="mt-5">
            <v-row>
                <v-col md="12">
                    <h1>Admin</h1>
                    <p>
                        Sort out the Request efforlessly.
                    </p>
                </v-col>
            </v-row>

            <!-- Table -->
            <v-table height="80%" fixed-header>
                <thead>
                    <tr>
                        <th class="text-left thStyling">
                            Question for
                        </th>
                        <th class="text-left thStyling">
                            Question Description
                        </th>
                        <th class="text-left thStyling">
                            Status
                        </th>
                        <th class="text-left thStyling">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in requestData" :key="index">
                        <td>{{ item.mentor }}</td>
                        <td>{{ item.questions }}</td>
                        <td :style="item.isApproved === false ? 'color: #fbbc04' : 'color: #34a853'">{{ item.isApproved === false ? "Pending" : 'Approved' }}</td>
                        <td>
                            <v-row style="gap: 10px;">
                                <v-icon @click="updateRequestStatus" class="action-btn" :color="'#ea4335'" style="cursor: pointer; " size="30">
                                    mdi-alpha-x-box-outline
                                </v-icon>
                                <v-icon @click="updateRequestStatus" class="action-btn" :color="'#34a853'" style="cursor: pointer; " size="30">
                                    mdi-check-circle
                                </v-icon>
                            </v-row>
                    </td>
                    </tr>
                </tbody>
            </v-table>

        </v-container>
    </NuxtLayout>
</template>

<script setup>
import { collection, getDocs, updateDoc } from 'firebase/firestore';
const { mainData } = useJSONData();

const user = useCurrentUser();
const db = useFirestore();

definePageMeta({
    layout: false,
});

const requestData = useState('requestData', () => []);


const fetchMentorRequest = async () => {
    try {
        const mentorRequestColl = await getDocs(collection(db, "mentor-request"));
        mentorRequestColl.forEach((doc) => {
            requestData.value.push(doc.data());
        });
    } catch (error) {
        console.error("Error in fetching Mentor Request Data.");
    }
}
watch(user, (_) => {
    if(user){
        fetchMentorRequest();
    }
});

const updateRequestStatus = async () => {
    try {
        // await updateDoc(collection)
    } catch (error) {
        console.error("Error in Updating Request Status.");
    }
}

useSeoMeta({
    contentType: "text/html; charset=utf-8",
    title:
        "Admin - " + mainData.eventInfo.name + " | " + mainData.communityName,
    description: mainData.eventInfo.description.short,
    keywords: mainData.seo.keywords,
    ogLocale: 'en_US',
    author: "The Ananta Studio",
    creator: "The Ananta Studio",
    viewport: "width=device-width, initial-scale=1.0",
    ogTitle:
        "Admin - " + mainData.eventInfo.name + " | " + mainData.communityName,
    ogDescription: mainData.eventInfo.description.short,
    ogImage: `${mainData.seo.hostUrl}/thumbnail.png?auto=format&fit=crop&frame=1&h=512&w=1024`,
    ogUrl: mainData.seo.hostUrl,
    ogType: "website",
    twitterTitle:
        "Admin - " + mainData.eventInfo.name + " | " + mainData.communityName,
    twitterDescription: mainData.eventInfo.description.short,
    twitterImage: `${mainData.seo.hostUrl}thumbnail.png?auto=format&fit=crop&frame=1&h=512&w=1024`,
    twitterCard: "summary_large_image",
});
</script>

<style scoped>
.action-btn:hover {
    transition: all;
    transform: scale(1.25);
    transition-duration: 250ms;
    filter: drop-shadow(0 0.2rem 0.25rem rgba(68, 68, 68, 0.2));
}

.thStyling{
    font-size: medium;
    font-weight: bold;
}

thead{
    background-color: red;
}
</style>