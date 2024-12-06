<template>
  <div>
    <p class="error">{{ error }}</p>
    <!-- <p class="decode-result">
      Result: <b>{{ result === '' ? 'Please Scan a QR Code' : result }}</b>
    </p> -->
    <p>Please Scan your QR</p>
    <div
      style="background-color: #e8eaed; border-radius: 24px; padding: 50px 15px; display: flex;flex-direction: column; gap: 10px ; justify-content: center; align-items: center;">
      <qrcode-stream style="width: 300px; height: 300px; border-radius: 24px"
        :constraints="{ facingMode: 'environment' }" :track="trackFunctionSelected.value" @error="onError"
        @detect="onDetect" />

      <h3>Username: @{{ result }}</h3>
      <h5 v-if="onErrorCheckin" style="color: #ea4335;">Error in Check in the user!!</h5>
      <h5 v-if="onSuccess" style="color: #34a853;">Checked in</h5>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { QrcodeStream } from 'vue-qrcode-reader'
import { collection, updateDoc, doc, query, where, limit, getDocs } from 'firebase/firestore';


const db = useFirestore();
const user = useCurrentUser();
const result = ref('');
const userUid = useState('userUid', () => '');
const error = ref('');
const onErrorCheckin = useState('onErrorCheckin', () => false);
const onSuccess = useState('onSuccess', () => false);
const authorizedUIDs = ['ooL4cJkNolQvxDgmEFsrAveKjFl2', 'oBYmZwFXDeS0O2uDryFuhw5ujd33', 'Ivz487Na8OWaLzoLNfnQHE1WI8o1'];

// Check if user is a AUTHORIZED USER or not, Redirect to home page if they aren't.
watch(user, (_) => {
  if (user.value && (!authorizedUIDs.includes(user.value.uid))) {
    navigateTo("/?refresh=true");
  }
});

onMounted(async () => {
  await nextTick();
  console.log('Admin page mounted = ', user.value);
  if (user.value) {
    if (!authorizedUIDs.includes(user.value.uid)) {
      navigateTo("/?refresh=true");
    }
  }
});

function onDetect(detectedCodes: any[]) {
  if (user.value && (!authorizedUIDs.includes(user.value.uid))) {
    navigateTo("/?refresh=true");
    return;
  }
  result.value = JSON.stringify(detectedCodes.map((code: { rawValue: any; }) => code.rawValue)).split('/p/')[1].slice(0, -2)
}

function paintOutline(detectedCodes: any, ctx: any) {
  for (const detectedCode of detectedCodes) {
    const [firstPoint, ...otherPoints] = detectedCode.cornerPoints

    ctx.strokeStyle = 'red'

    ctx.beginPath()
    ctx.moveTo(firstPoint.x, firstPoint.y)
    for (const { x, y } of otherPoints) {
      ctx.lineTo(x, y)
    }
    ctx.lineTo(firstPoint.x, firstPoint.y)
    ctx.closePath()
    ctx.stroke()
  }
}
function paintBoundingBox(detectedCodes: any, ctx: any) {
  for (const detectedCode of detectedCodes) {
    const {
      boundingBox: { x, y, width, height }
    } = detectedCode

    ctx.lineWidth = 2
    ctx.strokeStyle = '#007bff'
    ctx.strokeRect(x, y, width, height)
  }
}
function paintCenterText(detectedCodes: any, ctx: any) {
  for (const detectedCode of detectedCodes) {
    const { boundingBox, rawValue } = detectedCode

    const centerX = boundingBox.x + boundingBox.width / 2
    const centerY = boundingBox.y + boundingBox.height / 2

    const fontSize = Math.max(12, (50 * boundingBox.width) / ctx.canvas.width)

    ctx.font = `bold ${fontSize}px sans-serif`
    ctx.textAlign = 'center'

    ctx.lineWidth = 3
    ctx.strokeStyle = '#35495e'
    ctx.strokeText(detectedCode.rawValue, centerX, centerY)

    ctx.fillStyle = '#5cb984'
    ctx.fillText(rawValue, centerX, centerY)
  }
}

const trackFunctionOptions = [
  { text: 'nothing (default)', value: undefined },
  { text: 'outline', value: paintOutline },
  { text: 'centered text', value: paintCenterText },
  { text: 'bounding box', value: paintBoundingBox }
]
const trackFunctionSelected = ref(trackFunctionOptions[1])

function onError(err: { name: string; message: string; }) {
  error.value = `[${err.name}]: `
  if (err.name === 'NotAllowedError') {
    error.value += 'Camera access permission is required.'
  } else if (err.name === 'NotFoundError') {
    error.value += 'No camera found on this device.'
  } else if (err.name === 'NotReadableError') {
    error.value += 'The camera is already in use.'
  } else {
    error.value += err.message
  }
}

// Check in the user
watch(result, async (user) => {
  try {
    if (onErrorCheckin) {
      onErrorCheckin.value = false;
    }
    const q = query(collection(db, "users"), where("username", "==", user), limit(1));
    const snapshot = await getDocs(q);
    snapshot.forEach(async (Udoc) => {
      userUid.value = Udoc.id;
      if (Udoc.data()['check-in-day-0']) {
        alert(Udoc.data().username + "Already Checked in!");
        result.value = '';
        navigateTo("/checkin");
      }
      else {
        const date = new Date();
        const options: Intl.DateTimeFormatOptions = { weekday: 'short', day: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);
        if (formattedDate === '7 Sat') {
          await updateDoc(doc(db, "users", userUid.value), {
            'check-in-day-1': true
          });
          confirmationAlert();
        }
        else if (formattedDate === '8 Sun') {
          await updateDoc(doc(db, "users", userUid.value), {
            'check-in-day-2': true
          });
          confirmationAlert();
        }
        else if (formattedDate === '6 Fri') {
          await updateDoc(doc(db, "users", userUid.value), {
            'check-in-day-0': true
          });
          confirmationAlert();
        }

      }
    });
  } catch (error) {
    onErrorCheckin.value = true;
    console.error("Error in checkin the user : ", error);
  }
});

function confirmationAlert() {
  onSuccess.value = true;

  setTimeout(() => {
    onSuccess.value = false;
    result.value = '';
  }, 3000);
}
</script>

<style scoped>
.error {
  font-weight: bold;
  color: red;
}

.decode-result {
  font-size: 16px;
  margin-top: 10px;
}
</style>
