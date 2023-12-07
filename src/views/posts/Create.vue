<template>
  <v-container>
    <h1>User List</h1>
    <v-row>
      <v-col v-for="user in users" :key="user.id" sm="6" lg="4">
        <v-card @click="viewUserDetails(user.id)">
          <v-card-title>{{ user.name }}</v-card-title>
          <v-card-subtitle>{{ user.balance }}</v-card-subtitle>
          <v-card-text>{{ user.verhaelt }}</v-card-text>

          <!-- Separate v-card for the v-text-field -->
          <v-card>
            <v-text-field v-model="withdrawAmount" label="Withdraw Amount" type="number" />
          </v-card>

          <!-- Separate v-card for the Withdraw button -->
          <v-card>
            <v-btn @click.stop="withdraw(user.id, withdrawAmount)">Withdraw</v-btn>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { collection, getDoc, getDocs, doc, updateDoc } from 'firebase/firestore';
import db from '/src/views/db';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const users = ref([]);
const withdrawAmount = ref(0);

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

async function withdraw(userId, amount) {
  const userRef = doc(collection(db, 'benutzer'), userId);

  try {
    // Get the current user data
    const userSnapshot = await getDoc(userRef);
    const userData = userSnapshot.data();

    // Check if the withdrawal amount is valid
    if (amount > 0 && amount <= userData.balance) {
      // Update the balance by subtracting the withdrawal amount
      await updateDoc(userRef, {
        balance: userData.balance - amount,
      });

      // Reload the user list after the withdrawal
      await loadUsers();

      // Navigate to the main page
      router.push('/');
    } else {
      console.error('Invalid withdrawal amount or insufficient balance.');
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
}
</script>