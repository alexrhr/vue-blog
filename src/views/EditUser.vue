<script setup>
import {query, where, addDoc, collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { useRouter } from 'vue-router';
import { onMounted, ref } from "vue";
import db from '/src/views/db';

const nameError = ref(false);
const verError = ref(false);
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


onMounted(async () => {
  if (props.id) await loadUser(props.id);
});

/**
 * Lädt die Daten aller bereits existierenden Personen
 * @returns {Promise<void>}
 */
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
    name.value = 'No entry with user id ' + props.id;
  }
}

/**
 * Lädt den Benutzer und seine Daten hoch
 * @returns {Promise<void>}
 */
async function saveUser() {
  if (!name.value.trim()) {
    nameError.value = true;
    return;
  } else {
    nameError.value = false;
  }

  if (!verhaelt.value.trim()) {
    verError.value = true;
    return;
  } else {
    verError.value = false;
  }

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
  };

  if (isNewUser.value) {
    await addDoc(userRef, newUserData);
  } else {
    await setDoc(doc(userRef, props.id), newUserData);
  }
  await router.push('/');
}

/**
 * verhindert das eingeben von nicht richtig typisierten Geburtstagen
 * @param v
 * @returns {boolean|string}
 */
const validateGeburtstag = (v) => {
  const regeln = /^(0[1-9]|[1-2][0-9]|3[0-1]).(0[1-9]|1[0-2]).(\d{4})$/;

  if (!regeln.test(v)) {
    return 'Ungültiges Format. Verwenden Sie das Format DD.MM.YYYY oder DD-MM-YYYY';
  }
  const [, day, month, year] = regeln.exec(v);
  if (parseInt(day, 10) > 31 || parseInt(day, 10) < 1 || parseInt(month, 10) > 12 || parseInt(month, 10) < 1) {
    return 'Ungültiges Datum.';
  }
  return true;
};

/**
 * Spricht eine Warnung aus vor negativen Zahlen oder Zahlen mit
 * mehr als zwei Nachkommastellen. Verhindert diese jedoch nicht, da es Ausnahmefälle
 * geben könnte
 * @param v
 * @returns {boolean|string}
 * @constructor
 */
const PositiveNummer = (v) => {
  const parsedValue = parseFloat(v);

  if (isNaN(parsedValue) || parsedValue < 0) {
    return 'Die Zahl sollte positiv sein.';
  }
  if (!/^\d+(\.\d{1,2})?$/.test(v)) {
    return 'Die Zahl sollte maximal zwei Nachkommastellen haben.';
  }
  return true;
};

/**
 * Verhindert die Doppelung von Namen
 * @param v
 * @returns {Promise<boolean|string>}
 */
const einzigartigerName = async (v) => {
  const Ref = collection(db, "benutzer");
  const q = query(Ref, where('name', '==', v));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.size > 0) {
    return 'Dieser Name ist bereits vergeben. Bitte wähle einen anderen.';
  }

  return true;
};

</script>

<template>
  <v-container >
    <h1>{{ isNewUser ? 'Benutzer hinzufügen' : `Edit '${name}'` }}</h1>
    <v-row>
      <v-col width="auto" sm="8" lg="4">
        <v-sheet class="pa-3" elevation="4">
          <v-form @submit.prevent="saveUser">
            <v-row v-if="nameError">
              <v-col>
                <v-alert type="error">Name is required.</v-alert>
              </v-col>
            </v-row>
            <v-text-field label="Name" variant="outlined" required v-model="name" placeholder="Name der neuen Person" :error="nameError" :rules="[einzigartigerName]"/>
            <v-text-field label="Geburtstag" variant="outlined" v-model="geburtstag" placeholder="Geburtstag bitte im Format 00.00.0000 oder 00-00-0000" :rules="[validateGeburtstag]"/>
            <v-row v-if="verError">
              <v-col>
                <v-alert type="error">Bitte geben sie das bestehende Verhältnis an.</v-alert>
              </v-col>
            </v-row>
            <v-text-field label="Verhältnis" variant="outlined" v-model="verhaelt" placeholder="Verhältnis zum Benutzer"/>
            <v-text-field label="Kontostand" variant="outlined" type="number" v-model="balance" placeholder="Kontostand"/>
            <v-text-field label="Aktiendepot" variant="outlined" type="number" v-model="aktiendepot" placeholder="Aktueller Wert des Aktiendebots" :rules="[PositiveNummer]"/>
            <v-text-field label="Schulden" variant="outlined" type="number" v-model="debt" placeholder="Schulden der Person" :rules="[PositiveNummer]"/>
            <v-text-field label="Gehalt" variant="outlined" type="number" v-model="Gehalt" placeholder="Gehalt der Person" :rules="[PositiveNummer]"/>
            <v-text-field label="Sonstige Einnahmen" variant="outlined" type="number" v-model="sonstigeein" placeholder="Sonstige Einnahmen" :rules="[PositiveNummer]"/>
            <v-text-field label="Ratenzahlung" variant="outlined" type="number" v-model="ratenzahlung" placeholder="Falls Schulden vorhanden was sind die Ratenzahlungen" :rules="[PositiveNummer]" />
            <v-text-field label="Sonstige Ausgaben" variant="outlined" type="number" v-model="sonstigeaus" placeholder="Andere Ausgaben" :rules="[PositiveNummer]"/>

            <v-spacer class="mt-4"/>
            <v-btn size="large" elevation="4" color="grey darken-1" @click="router.push('/users')">Abbrechen</v-btn>
            <v-btn type="submit" size="large" elevation="4" color="primary" class="float-end">Speichern</v-btn>
          </v-form>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>
