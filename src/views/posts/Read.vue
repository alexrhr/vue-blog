<script setup>
import { collection, getDocs } from 'firebase/firestore';
import db from '/src/views/db';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const users = ref([]);

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
      geburtstag: userData.geburtstag,
      verhaelt: userData.verhaelt,
      balance: userData.balance,
      aktiendepot: userData.aktiendepot,
      debt: userData.debt,
      Gehalt: userData.Gehalt,
      sonstigeein: userData.sonstigeein,
      ratenzahlung: userData.ratenzahlung,
      sonstigeaus: userData.sonstigeaus,
    };
  });
}

function viewUserDetails(userId) {
  router.push(`/users/${userId}`);
}
</script>

<template>
  <v-container>
    <h1>User List</h1>
    <v-row>
      <v-col v-for="user in users" :key="user.id" sm="6" lg="4">
        <v-card @click="viewUserDetails(user.id)">
          <v-card-title>{{ user.name }}</v-card-title>
          <v-card-subtitle>{{ user.geburtstag }}</v-card-subtitle>
          <v-card-text>{{ user.verhaelt }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
