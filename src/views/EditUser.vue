<script setup>
import {addDoc, collection, doc, getDoc, setDoc, updateDoc} from "firebase/firestore";
import { useRouter } from 'vue-router';
import { onMounted, ref } from "vue";
import db from '/src/db';

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
    name.value = 'No entry with user id ' + props.id;
  }
}

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
  };

  if (isNewUser.value) {
    await addDoc(userRef, newUserData);
  } else {
    await setDoc(doc(userRef, props.id), newUserData);
  }


  router.push('/');
}

function editUser(user) {
  editedUser.value = { ...user };
}

async function saveUserChanges() {
  if (editedUser.value) {
    const userDoc = doc(db, 'benutzer', editedUser.value.id);
    await updateDoc(userDoc, {
      name: editedUser.value.name,
      balance: editedUser.value.balance,
      verhaelt: editedUser.value.verhaelt,
      geburtstag: editedUser.value.geburtstag,
      aktiendepot: editedUser.value.aktiendepot,
      debt: editedUser.value.debt,
      Gehalt: editedUser.value.gehalt,
      sonstigeein: editedUser.value.sonstigeein,
      ratenzahlung: editedUser.value.ratenzahlung,
      sonstigeaus: editedUser.value.sonstigeaus,
    });

    await loadUsers();
    editedUser.value = null;
  }
}

function cancelEdit() {
  editedUser.value = null;
}


</script>

<template>
  <v-container>
    <h1>{{ isNewUser ? 'Benutzer hinzufügen' : `Edit '${name}'` }}</h1>
    <v-row>
      <v-col sm="8" lg="4">
        <v-sheet class="pa-3" elevation="4">
          <v-form @submit.prevent="saveUser">
            <v-text-field label="Name" variant="outlined" required v-model="name" placeholder="Name der neuen Person"/>
            <v-text-field label="Geburtstag" variant="outlined" v-model="geburtstag" placeholder="Geburtstag bitte im Format 00-00-0000"/>
            <v-text-field label="Verhältnis" variant="outlined" v-model="verhaelt" placeholder="Verhältnis zum Benutzer"/>
            <v-text-field label="Kontostand" variant="outlined" type="number" v-model="balance" placeholder="Kontostand"/>
            <v-text-field label="Aktiendepot" variant="outlined" type="number" v-model="aktiendepot" placeholder="Aktueller Wert des Aktiendebots"/>
            <v-text-field label="Schulden" variant="outlined" type="number" v-model="debt" placeholder="Schulden der Person"/>
            <v-text-field label="Gehalt" variant="outlined" type="number" v-model="Gehalt" placeholder="Gehalt der Person"/>
            <v-text-field label="Sonstige Einnahmen" variant="outlined" type="number" v-model="sonstigeein" placeholder="Sonstige Einnahmen"/>
            <v-text-field label="Ratenzahlung" variant="outlined" type="number" v-model="ratenzahlung" placeholder="Falls Schulden vorhanden was sind die Ratenzahlungen"/>
            <v-text-field label="Sonstige Ausgaben" variant="outlined" type="number" v-model="sonstigeaus" placeholder="Andere Ausgaben"/>

            <v-text-field label="Withdrawal Amount" variant="outlined" type="number" v-model="withdrawalAmount" placeholder="Wieviel möchten sie abbuchen"/>

            <v-spacer class="mt-4"/>
            <v-btn size="large" elevation="4" color="grey darken-1" @click="router.push('/users')">Cancel</v-btn>
            <v-btn type="submit" size="large" elevation="4" color="primary" class="float-end">Save</v-btn>
          </v-form>

        </v-sheet>
      </v-col>
    </v-row>

    <v-dialog v-if="editedUser" v-model="editedUser" persistent>
      <v-card>
        <v-card-title>Aktualisierung von {{user.name}}</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="saveUserChanges">
            <v-text-field v-model="editedUser.name" label="Name"></v-text-field>
            <v-text-field v-model="editedUser.balance" label="Kontostand"></v-text-field>
            <v-text-field v-model="editedUser.verhaelt" label="Verhältnis"></v-text-field>
            <v-text-field v-model="editedUser.geburtstag" label="Geburtstag"></v-text-field>
            <v-text-field v-model="editedUser.aktiendepot" label="Aktiendepot"></v-text-field>
            <v-text-field v-model="editedUser.debt" label="Schulden"></v-text-field>
            <v-text-field v-model="editedUser.gehalt" label="Gehalt"></v-text-field>
            <v-text-field v-model="editedUser.sonstigeein" label="Sonstige Einzahlung"></v-text-field>
            <v-text-field v-model="editedUser.ratenzahlung" label="Ratenzahlung"></v-text-field>
            <v-text-field v-model="editedUser.sonstigeaus" label="Sonstige Ausgaben"></v-text-field>
            <v-btn type="submit" color="primary">Änderungen speichern</v-btn>
            <v-btn @click="cancelEdit" color="grey">Abbrechen</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>