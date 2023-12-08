<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { doc, getDoc } from 'firebase/firestore';
import db from '/src/views/db';

const props = defineProps(['id']);
const router = useRouter();

const user = ref({});

onMounted(async () => {
  await loadUser(props.id);
});

watch(() => router.currentRoute.params, async (toParams, previousParams) => {
  if (toParams.id !== previousParams.id) {
    // Lade Benutzerdaten erneut, wenn sich die Benutzer-ID ändert
    await loadUser(toParams.id);
  }
});

async function loadUser(userId) {
  const userDocRef = doc(db, 'benutzer', userId);
  const userDocSnapshot = await getDoc(userDocRef);

  if (userDocSnapshot.exists()) {
    const userData = userDocSnapshot.data();
    user.value = {
      id: userDocSnapshot.id,
      name: userData.name,
      balance: userData.balance,
      geburtstag: userData.geburtstag,
      verhaelt: userData.verhaelt,
      aktiendepot: userData.aktiendepot,
      debt: userData.debt,
      Gehalt: userData.Gehalt,
      sonstigeein: userData.sonstigeein,
      ratenzahlung: userData.ratenzahlung,
      sonstigeaus: userData.sonstigeaus,
    };
  }
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
                <strong>Verhältnis zum Benutzer:</strong> {{ user.verhaelt }}
              </div>
              <div>
                <strong>Kontostand:</strong> {{ user.balance }}
              </div>
              <div>
                <strong>Aktiendepot:</strong> {{ user.aktiendepot }}
              </div>
              <div>
                <strong>Schulden:</strong> {{ user.debt }}
              </div>
              <div>
                <strong>Gehalt:</strong> {{ user.Gehalt }}
              </div>
              <div>
                <strong>Sonstige Einnahmen:</strong> {{ user.sonstigeein }}
              </div>
              <div>
                <strong>Ratenzahlung:</strong> {{ user.ratenzahlung }}
              </div>
              <div>
                <strong>Sonstige Ausgaben:</strong> {{ user.sonstigeaus }}
              </div>
            </v-card-text>

            <v-card-actions>

              <v-btn color="grey darken-1" variant="elevated" link to="/users">
                Abbrechen
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>
