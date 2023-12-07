<script setup>
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import db from '/src/views/db';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps(['id']);
const router = useRouter();

// Vue variables
const user = ref({});

onMounted(async () => await loadUser(props.id));

// load the user from Firestore, using its ID
async function loadUser(id) {
  const userDoc = await getDoc(doc(db, 'benutzer', id));

  if (userDoc.exists()) {
    user.value = {
      name: userDoc.data().name,
      geburtstag: userDoc.data().geburtstag,
      verhaelt: userDoc.data().verhaelt,
      balance: userDoc.data().balance,
      aktiendepot: userDoc.data().aktiendepot,
      debt: userDoc.data().debt,
      Gehalt: userDoc.data().Gehalt,
      sonstigeein: userDoc.data().sonstigeein,
      ratenzahlung: userDoc.data().ratenzahlung,
      sonstigeaus: userDoc.data().sonstigeaus,
    };
  } else {
    // if user with this ID doesn't exist, show a warning
    user.value = { name: 'No entry with user id ' + props.id };
  }
}

// delete the user from Firestore, using its ID
async function deleteUser(id) {
  await deleteDoc(doc(db, 'benutzer', id));
  // forward to overview page
  router.push('/users');
}
</script>

<template>
  <v-container>
    <h1>{{ user.name ? `User: ${user.name}` : 'User Not Found' }}</h1>
    <v-row>
      <v-col sm="8" lg="4">
        <v-sheet class="pa-3" elevation="4">
          <v-card>
            <v-card-text>
              <div>
                <strong>Name:</strong> {{ user.name }}
              </div>
              <div>
                <strong>Geburtstag:</strong> {{ user.geburtstag }}
              </div>
              <div>
                <strong>Verhaelt:</strong> {{ user.verhaelt }}
              </div>
              <div>
                <strong>Balance:</strong> {{ user.balance }}
              </div>
              <div>
                <strong>Aktiendepot:</strong> {{ user.aktiendepot }}
              </div>
              <div>
                <strong>Debt:</strong> {{ user.debt }}
              </div>
              <div>
                <strong>Gehalt:</strong> {{ user.Gehalt }}
              </div>
              <div>
                <strong>Sonstige Einzahlung:</strong> {{ user.sonstigeein }}
              </div>
              <div>
                <strong>Ratenzahlung:</strong> {{ user.ratenzahlung }}
              </div>
              <div>
                <strong>Sonstige Auszahlung:</strong> {{ user.sonstigeaus }}
              </div>
            </v-card-text>

            <v-card-actions>
              <v-btn @click="deleteUser(props.id)" color="red darken-4" variant="elevated">
                Delete User
              </v-btn>
              <v-btn color="primary" variant="elevated" link :to="'/users/edit/' + props.id">
                Edit User
              </v-btn>
              <v-btn color="grey darken-1" variant="elevated" link to="/users">
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>
