<template>
  <div>
    <h1>Finanzen</h1>
    <div v-for="user in users" :key="user.id">
      <!--<p>Benutzer: {{ user.name }}</p>
      <p>Kontostand: {{ user.balance }}</p>-->

      <!-- VCard für jeden Benutzer -->
      <VCard class="mx-auto" max-width="280" :title="user.name" :subtitle="`${user.name} on 2023-11-15, 05:15`">
        <VDivider />
        <VCardText>
          Kontostand: {{ user.balance }} <p></p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
        </VCardText>
        <form @submit.prevent="withdrawMoney(user.id)">
          <label for="amount">Betrag zum Abbuchen:</label>
          <input type="number" v-model="withdrawAmount" id="amount" />
          <button type="submit">Abheben</button>
        </form>
      </VCard>

      <!-- Formular zum Abbuchen -->


      <br /><br />
    </div>
    <div>
      <form @submit.prevent="abbuchen">
        <label for="amount">Betrag zum Abbuchen:</label>
        <input type="number" v-model="withdrawAmount" id="amount" />
        <button type="submit">Abheben</button>
      </form>
    </div>
  </div>
</template>

<script>
import userData from "./users.json";
//const fs = require('fs');
//const path = require('path');

/*
export default {
  data() {
    return {
      users: userData,
      withdrawAmount: 0,
    };
  },
  methods: {
    withdrawMoney(userId) {
      // Finde den Benutzer mit der angegebenen ID
      const user = this.users.find((u) => u.id === userId);

      if (user) {
        // Überprüfe, ob genug Geld auf dem Konto ist
        if (user.balance >= this.withdrawAmount) {
          // Führe die Abbuchung durch
          user.balance -= this.withdrawAmount;
        } else {
          // Falls nicht genug Geld vorhanden ist, kannst du hier eine entsprechende Fehlermeldung einfügen
          console.log("Nicht genug Geld auf dem Konto");
        }
      }

      // Setze den Abbuchungsbetrag zurück
      this.withdrawAmount = 0;
    },
  },
};
*/
export default {
  data() {
    return {
      users: userData,
      withdrawAmount: 0,
    };
  },
  methods: {
    withdrawMoney(userId) {
      // Finde den Benutzer mit der angegebenen ID
      const user = this.users.find((u) => u.id === userId);

      if (user) {
        // Überprüfe, ob genug Geld auf dem Konto ist
        if (user.balance >= this.withdrawAmount) {
          // Führe die Abbuchung durch
          user.balance -= this.withdrawAmount;

          // Speichere die Änderungen in der JSON-Datei
          const jsonFilePath = path.resolve(__dirname, 'users.json');
          const jsonString = JSON.stringify(this.users, null, 2);
          fs.writeFileSync(jsonFilePath, jsonString);
        } else {
          // Falls nicht genug Geld vorhanden ist, kannst du hier eine entsprechende Fehlermeldung einfügen
          console.log("Nicht genug Geld auf dem Konto");
        }
      }

      // Setze den Abbuchungsbetrag zurück
      this.withdrawAmount = 0;
    },
  },
};

</script>
<script setup>
</script>

<template>
  <h1>Users</h1>
</template>
