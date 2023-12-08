<script setup>
import { ref, onMounted } from 'vue';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import db from '/src/views/db';
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
      balance: userData.balance,
      geburtstag: userData.geburtstag,
    };
  });
}

/*function viewUserDetails(userId) {
  router.push(`/users/${userId}`);
}*/

function viewUserDetails(userId) {
  router.push({ path: `/users/${userId}` });
}

function viewUserDetails2(userId) {
  // Debugging: Logge die Benutzer-ID und den generierten Pfad
  console.log('Benutzer-ID:', userId);
  const path = `/users/${userId}`;
  console.log('Generierter Pfad:', path);

  // Versuche, zur Route zu navigieren
  router.push({ path });
}


async function deleteUser(userId) {
  await deleteDoc(doc(db, 'benutzer', userId));
  await loadUsers();
}
</script>

<template>
  <v-container>
    <h1>User List</h1>
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
            <v-btn color="primary" variant="elevated" @click="viewUserDetails(user.id)">
              Ansehen
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>