<script setup>
import {onMounted, ref} from 'vue';
import {collection, doc, getDocs, deleteDoc, updateDoc} from 'firebase/firestore';
import db from '/src/views/db';
import {useRouter} from "vue-router";

const props = defineProps(['id'])
const router = useRouter()
const users = ref([]);
const editedUser = ref(null);
const withdrawDialog = ref(false);
const withdrawalAmount = ref(0);

const isActive = ref()

const isValid = ref()
const nameRules = [(value) => value?.trim() ? true : 'Bitte geben Sie den Namen ein']
const accountRules = [(value) => value ? true : 'Bitte geben Sie den Kontostand ein']

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


function editUser(user) {
  editedUser.value = {...user};
}


async function deleteUser(id) {
  await deleteDoc(doc(db, "benutzer", id));
  await loadUsers();
}

async function saveUserChanges() {
  console.log("saveUserChanges called");
  console.log("editedUser before update:", editedUser.value);  if (editedUser.value) {
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
  }  else {
    console.error("editedUser is null in saveUserChanges");
  }

  editedUser.value = null;

  console.log("editedUser after update:", editedUser.value);
  await  router.push('/');
}

function cancelEdit() {
  editedUser.value = null;
}

function openWithdrawDialog() {
  withdrawDialog.value = true;
}

async function withdrawUser() {
  if (editedUser.value && withdrawalAmount.value > 0) {
    const userDoc = doc(db, 'benutzer', editedUser.value.id);
    const newBalance = editedUser.value.balance - withdrawalAmount.value;

    await updateDoc(userDoc, {
      balance: newBalance,
    });

    await loadUsers();
    editedUser.value = null;
    withdrawDialog.value = false;
  }
}
</script>

<template>
  <v-container>
    <h1>Personen Liste: </h1>
    <v-row>
      <v-col v-for="user in users" :key="user.id" sm="6" lg="4">
        <v-card>
          <v-card-title>{{ user.name }}</v-card-title>
          <v-card-subtitle>Kontostand: {{ user.balance }}</v-card-subtitle>
          <v-card-text>Geb. {{ user.geburtstag }}</v-card-text>

          <v-card-actions>

            <v-dialog persistent width="auto" max-width="600">
              <template v-slot:activator="{ props }">
                <v-btn color="green" variant="elevated"
                       v-bind="props" @click="editUser(user)">
                  Aktualisieren
                </v-btn>
              </template>

              <template v-slot:default="{ isActive }">
                <v-card>
                  <v-card-title>Aktualisierung der Daten von {{ editedUser.name }}</v-card-title>
                  <v-card-text>
                    <v-form @submit.prevent="saveUserChanges" :model="isValid">
                      <v-row>
                        <v-col>
                          <v-text-field v-model="editedUser.name" label="Name"
                                        :rules="nameRules" density="compact"/>
                          <v-text-field v-model="editedUser.balance" label="Kontostand"
                                        type="number" :rules="accountRules" density="compact"/>
                          <v-text-field v-model="editedUser.verhaelt" label="Verhältnis" density="compact"/>
                          <v-text-field v-model="editedUser.geburtstag" label="Geburtstag"
                                        type="date" density="compact"/>
                        </v-col>
                        <v-col>
                          <v-text-field v-model="editedUser.aktiendepot" label="Aktiendepot" density="compact"
                                        type="number" min="0" step="1" max="999_999_999"/>
                          <v-card-title>Abheben von {{ editedUser?.name }}</v-card-title>
                          <v-text-field v-model="editedUser.debt" label="Schulden"
                                        type="number" density="compact"/>
                          <v-text-field v-model="editedUser.gehalt" label="Gehalt"
                                        type="number" density="compact"/>
                          <v-text-field v-model="editedUser.sonstigeein" label="Sonstige Einzahlung"
                                        type="number" density="compact"/>
                          <v-text-field v-model="editedUser.ratenzahlung" label="Ratenzahlung"
                                        type="number" density="compact"/>
                          <v-text-field v-model="editedUser.sonstigeaus" label="Sonstige Ausgaben"
                                        type="number" density="compact"/>
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn @click="isActive && (isActive.value = false)" variant="elevated" color="grey">
                      Abbrechen
                    </v-btn>
                    <v-col class="text-right">
                      <v-btn type="submit" variant="elevated" color="primary" @click="saveUserChanges">Speichern </v-btn>
                    </v-col>
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>


            <v-dialog width="auto">
              <template v-slot:activator="{ props }">
                <v-btn color="red-darken-4" variant="elevated" v-bind="props">Delete</v-btn>
              </template>
              <template v-slot:default="{ isActive }">
                <v-card>
                  <v-toolbar color="red-darken-4" title="Delete posting"/>
                  <v-card-text>
                    <div class="text-h4 pa-8">
                      Are you sure that you<br/> want to delete this post?
                    </div>
                  </v-card-text>
                  <v-card-actions class="justify-space-between">
                    <v-btn variant="elevated" color="grey-darken-1"
                           @click="isActive.value = false">
                      Abbrechen
                    </v-btn>
                    <v-btn variant="elevated" color="red-darken-4"
                           @click="deleteUser(user.id)">
                      Yes, delete
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>
            <v-dialog width="auto" v-if="withdrawDialog" v-model="withdrawDialog" persistent>
              <v-card>
                <v-card-title>Abheben von {{ user.name }}</v-card-title>
                <v-card-text>
                  <v-form @submit.prevent="withdrawUser">
                    <v-text-field v-model="withdrawalAmount" label="Abhebebetrag"></v-text-field>
                    <v-btn @click="withdrawDialog = false" color="grey">Abbrechen</v-btn>
                    <v-btn type="submit" color="primary">Abheben</v-btn>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-dialog>
            <v-btn color="red" variant="elevated" @click="openWithdrawDialog">
              Abheben
            </v-btn>

          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
