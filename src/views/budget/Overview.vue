<script setup>
import {onMounted, ref} from 'vue';
import {collection, deleteDoc, doc, getDocs} from 'firebase/firestore';
import db from '/src/views/db';
import {useRouter} from 'vue-router';

const router = useRouter();
const users = ref([]);
const displayedUser = ref(null); // Hier wird der aktuell angezeigte Benutzer gespeichert


onMounted(async () => {
  await loadUsers();
});

async function loadUsers() {
  const usersCollection = collection(db, 'benutzer');
  const usersSnapshot = await getDocs(usersCollection);

  users.value = usersSnapshot.docs.map((doc) => {
    const userData = doc.data();
    return {
      id: doc.id,
      name: userData.name,
      balance: userData.balance,
      verhaelt: userData.verhaelt,
      geburtstag: userData.geburtstag,
      aktiendepot: userData.aktiendepot,
      debt: userData.debt,
      gehalt: userData.Gehalt,
      sonstigeein: userData.sonstigeein,
      ratenzahlung: userData.ratenzahlung,
      sonstigeaus: userData.sonstigeaus,
    };
  });
}

function viewUserDetails(user) {
  displayedUser.value = { ...user }; // Hier wird der Benutzer für die Anzeige kopiert
}

function closeDialog() {
  displayedUser.value = null; // Schließe das Dialogfenster
}

async function deleteUser(userId) {
  await deleteDoc(doc(db, 'benutzer', userId));
  await loadUsers();
}
</script>

<template>
  <v-container>
    <h1>Personen Liste: </h1>
    <v-row>
      <v-col v-for="user in users" :key="user.id" sm="6" lg="4">
        <v-card>
          <v-card-title>{{ user.name }}</v-card-title>
          <v-card-subtitle>{{ user.balance }}</v-card-subtitle>
          <v-card-text>{{ user.geburtstag }}</v-card-text>

          <v-card-actions>
            <v-btn color="red-darken-4" variant="elevated" @click="deleteUser(user.id)">
              Löschen
            </v-btn>
            <v-btn color="primary" variant="elevated" @click="viewUserDetails(user)">
              Ansehen
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-if="displayedUser" v-model="displayedUser" persistent>
      <v-card>
        <v-card-title>Anzeige der Daten von {{ displayedUser.name }}</v-card-title>
        <v-card-text>
          <v-container>
            <v-col cols="12">
              <strong>Name:</strong> {{ displayedUser.name }}
            </v-col>
            <v-col cols="12">
              <strong>Kontostand:</strong> {{ displayedUser.balance }}
            </v-col>
            <v-col cols="12">
              <strong>Verhältnis:</strong> {{ displayedUser.verhaelt }}
            </v-col>
            <v-col cols="12">
              <strong>Geburtstag:</strong> {{ displayedUser.geburtstag }}
            </v-col>
            <v-col cols="12">
              <strong>Aktiendepot:</strong> {{ displayedUser.aktiendepot }}
            </v-col>
            <v-col cols="12">
              <strong>Schulden:</strong> {{ displayedUser.debt }}
            </v-col>
            <v-col cols="12">
              <strong>Gehalt:</strong> {{ displayedUser.gehalt }}
            </v-col>
            <v-col cols="12">
              <strong>Sonstige Einzahlung:</strong> {{ displayedUser.sonstigeein }}
            </v-col>
            <v-col cols="12">
              <strong>Ratenzahlung:</strong> {{ displayedUser.ratenzahlung }}
            </v-col>
            <v-col cols="12">
              <strong>Sonstige Ausgaben:</strong> {{ displayedUser.sonstigeaus }}
            </v-col>
          </v-container>
          <v-btn @click="closeDialog" color="primary">Schließen</v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

