<script setup>
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from 'vue-router';
import { onMounted, ref } from "vue";
import db from '/src/views/db';

const props = defineProps(['id']);
const router = useRouter();

const isNewUser = ref(true);
const name = ref('');
const geburtstag = ref('');
const verhaelt = ref('');
const balance = ref(0);
const aktiendepot = ref(0);
const debt = ref(0);
const Gehalt = ref(0);
const sonstigeein = ref(0);
const ratenzahlung = ref(0);
const sonstigeaus = ref(0);

// New input field for withdrawal
const withdrawalAmount = ref(0);

onMounted(async () => {
  // only execute for an existing user
  if (props.id) await loadUser(props.id);
});

// loads the user from Firestore, using its ID
async function loadUser(id) {
  const userDoc = doc(collection(db, "benutzer"), id);
  const user = await getDoc(userDoc);

  if (user.exists()) {
    isNewUser.value = false;
    const userData = user.data();
    name.value = userData.name || '';
    geburtstag.value = userData.geburtstag || '';
    verhaelt.value = userData.verhaelt || '';
    balance.value = userData.balance || 0;
    aktiendepot.value = userData.aktiendepot || 0;
    debt.value = userData.debt || 0;
    Gehalt.value = userData.Gehalt || 0;
    sonstigeein.value = userData.sonstigeein || 0;
    ratenzahlung.value = userData.ratenzahlung || 0;
    sonstigeaus.value = userData.sonstigeaus || 0;
  } else {
    // if user with this ID doesn't exist, show a warning
    name.value = 'No entry with user id ' + props.id;
  }
}

// saves the form data to Firestore
async function saveUser() {
  const userRef = collection(db, "benutzer");
  const newUserData = {
    name: name.value,
    geburtstag: geburtstag.value,
    verhaelt: verhaelt.value,
    balance: balance.value,
    aktiendepot: aktiendepot.value,
    debt: debt.value,
    Gehalt: Gehalt.value,
    sonstigeein: sonstigeein.value,
    ratenzahlung: ratenzahlung.value,
    sonstigeaus: sonstigeaus.value
    // Füge weitere Felder hinzu, wenn benötigt
  };

  if (isNewUser.value) {
    await addDoc(userRef, newUserData);
  } else {
    await setDoc(doc(userRef, props.id), newUserData);
  }


  router.push('/');
}


</script>

<template>
  <v-container>
    <h1>{{ isNewUser ? 'Create new user' : `Edit '${name}'` }}</h1>
    <v-row>
      <v-col sm="8" lg="4">
        <v-sheet class="pa-3" elevation="4">
          <v-form @submit.prevent="saveUser">
            <v-text-field label="Name" variant="outlined" required v-model="name" placeholder="Enter user name..."/>
            <v-text-field label="Geburtstag" variant="outlined" v-model="geburtstag" placeholder="Enter birthday..."/>
            <v-text-field label="Verhaelt" variant="outlined" v-model="verhaelt" placeholder="Enter relationship..."/>
            <v-text-field label="Balance" variant="outlined" type="number" v-model="balance" placeholder="Enter balance..."/>
            <v-text-field label="Aktiendepot" variant="outlined" type="number" v-model="aktiendepot" placeholder="Enter stock portfolio..."/>
            <v-text-field label="Debt" variant="outlined" type="number" v-model="debt" placeholder="Enter debt..."/>
            <v-text-field label="Gehalt" variant="outlined" type="number" v-model="Gehalt" placeholder="Enter salary..."/>
            <v-text-field label="Sonstige Einzahlung" variant="outlined" type="number" v-model="sonstigeein" placeholder="Enter other income..."/>
            <v-text-field label="Ratenzahlung" variant="outlined" type="number" v-model="ratenzahlung" placeholder="Enter installment payment..."/>
            <v-text-field label="Sonstige Auszahlung" variant="outlined" type="number" v-model="sonstigeaus" placeholder="Enter other expenses..."/>
            <!-- Füge weitere Felder hinzu, wenn benötigt -->

            <!-- New input field for withdrawal -->
            <v-text-field label="Withdrawal Amount" variant="outlined" type="number" v-model="withdrawalAmount" placeholder="Enter withdrawal amount..."/>

            <v-spacer class="mt-4"/>
            <v-btn size="large" elevation="4" color="grey darken-1" @click="router.push('/users')">Cancel</v-btn>
            <v-btn type="submit" size="large" elevation="4" color="primary" class="float-end">Save</v-btn>
          </v-form>

        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>