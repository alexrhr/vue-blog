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
    });
    // Reload the user list after updating
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
          <v-card-subtitle>{{ user.balance }}</v-card-subtitle>
          <v-card-text>{{ user.verhaelt }}</v-card-text>

          <v-card-actions>
            <v-btn color="red-darken-4" variant="elevated" @click="deleteUser(user.id)">
              Delete
            </v-btn>
            <v-btn color="primary" variant="elevated" @click="viewUserDetails(user.id)">
              View Details
            </v-btn>
            <v-btn color="green" variant="elevated" @click="editUser(user)">
              Update
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Edit User Dialog -->
    <v-dialog v-if="editedUser" v-model="editedUser" persistent>
      <v-card>
        <v-card-title>Edit User</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="saveUserChanges">
            <v-text-field v-model="editedUser.name" label="Name"></v-text-field>
            <v-text-field v-model="editedUser.balance" label="Balance"></v-text-field>
            <v-text-field v-model="editedUser.verhaelt" label="Verhaelt"></v-text-field>
            <v-btn type="submit" color="primary">Save Changes</v-btn>
            <v-btn @click="cancelEdit" color="grey">Cancel</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>