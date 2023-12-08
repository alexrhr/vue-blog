<script setup>
import { ref, onMounted } from 'vue';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import db from '/src/views/db';
import { useRouter } from 'vue-router';

const router = useRouter();
const users = ref([]);
const editedUser = ref(null);

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

function viewUserDetails(userId) {
  router.push(`/users/${userId}`);
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
    <h1>User List</h1>
    <v-row>
      <v-col v-for="user in users" :key="user.id" sm="6" lg="4">
        <v-card>
          <v-card-title>{{ user.name }}</v-card-title>
          <v-card-subtitle>Kontostand: {{ user.balance }}</v-card-subtitle>
          <v-card-text>Geb. {{ user.geburtstag }}</v-card-text>

          <v-card-actions>
            <v-btn color="primary" variant="elevated" @click="viewUserDetails(user.id)">
              Ansehen
            </v-btn>
            <v-btn color="green" variant="elevated" @click="editUser(user)">
              Aktualisieren
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-if="editedUser" v-model="editedUser" persistent>
      <v-card>
        <v-card-title>Aktualisierung der Daten von {{editedUser.name}}</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="saveUserChanges">
            <v-text-field v-model="editedUser.name" label="Name"></v-text-field>
            <v-text-field v-model="editedUser.balance" label="Kontostand"></v-text-field>
            <v-text-field v-model="editedUser.verhaelt" label="Verhältnis"></v-text-field>
            <v-text-field v-model="editedUser.geburtstag" label="Geburtstag" placeholder="Bitte im Format 00-00-0000"></v-text-field>
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