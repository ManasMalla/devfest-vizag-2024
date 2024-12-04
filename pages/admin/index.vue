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
            <v-table height="80%" fixed-header class="mt-5">
                <thead>
                    <tr>
                        <th class="text-left" style="font-weight: 800; background: #202124; color: #e8eaed; padding: 20px; ">
                            Question for
                        </th>
                        <th class="text-left" style="font-weight: 800; background: #202124; color: #e8eaed; padding: 17px; ">
                            Question Description
                        </th>
                        <th class="text-left" style="font-weight: 800; background: #202124; color: #e8eaed; padding: 18px; ">
                            Status
                        </th>
                        <th class="text-left" style="font-weight: 800; background: #202124; color: #e8eaed; width: 100px; ">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in requestData" :key="index">
                        <td>{{ item.mentor }}</td>
                        <td>{{ item.questions }}</td>
                        <td :style="item.status === 'approved' ? 'color: #34a853' : item.status === 'pending' ? 'color: #fbbc04' : 'color: #ea4335'">{{ item.status.charAt(0).toUpperCase() + item.status.slice(1) }}</td>
                        <td>
                            <v-row style="gap: 10px;">
                                <v-icon @click="updateRequestStatus(item, 'rejected', false)" class="action-btn" :color="'#ea4335'" style="cursor: pointer; " size="30">
                                    mdi-alpha-x-box-outline
                                </v-icon>
                                <v-icon @click="updateRequestStatus(item, 'approved', true)" class="action-btn" :color="'#34a853'" style="cursor: pointer; " size="30">
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
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
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
            const ADoc = {
                "id" : doc.id,
                ...doc.data()
            }
            requestData.value.push(ADoc);
        });
    } catch (error) {
        console.error("Error in fetching Mentor Request Data.");
    }
}
watch(user, (_) => {
    if(user.value && (user.value.uid === 'ooL4cJkNolQvxDgmEFsrAveKjFl2' || user.value.uid === 'oBYmZwFXDeS0O2uDryFuhw5ujd33' || user.value.uid === 'Ivz487Na8OWaLzoLNfnQHE1WI8o1') ){
        fetchMentorRequest();
    }
});

const updateRequestStatus = async (item, status, isApprovedStatus) => {
    try {
        if(item.status === status) return;

        await updateDoc(doc(db, "mentor-request", item.id), {
            isApproved : isApprovedStatus,
            status : status
        });
        const index = requestData.value.findIndex((obj) => obj.id === item.id);
        requestData.value[index] = {
            ...requestData.value[index],
            status,
            isApproved : isApprovedStatus
        };
        console.log('Local data = ', requestData.value[index]);
    } catch (error) {
        console.error("Error in Updating Request Status. : ", error);
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

</style>