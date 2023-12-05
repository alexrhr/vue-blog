<script>
import userData from "../users.json";

export default {
  data() {
    return {
      user: {
        name: '',
        geb: '',
        ver: '',
        balance: 0,
        aktien: 0,
        debt: 0,
      },
    };
  },
  methods: {
    addUser() {
      // Füge hier die Logik zum Hinzufügen des Benutzers hinzu
    },
  },
};
</script>


<!--
<template>
  <div>
    <VCard class="mx-auto" max-width="280" :title="user.name" :subtitle="`${user.name} on 2023-11-15, 05:15`">
      <VDivider/>
      <VCardText>
        <form @submit.prevent="addUser">
          <label for="name">Name:</label>
          <input v-model="user.name" type="text" name="name" pattern="^[^\s]*$" placeholder="* name" required title="Bitte verwenden Sie keine Leerzeichen" />
          <p></p>

          <label for="geb">Geburtstag:</label>
          <p></p>
          <input v-model="user.geb" type="text" name="geb" pattern="^[^\s]*$" placeholder="Format muss sein: 00-00-0000" required title="Format muss sein: 00-00-0000" />
          <p></p>

          <label for="ver">Verhältnis zum Main:</label>
          <p></p>
          <input v-model="user.ver" type="text" name="ver" pattern="^[^\s]*$" placeholder="Format muss sein: 00-00-0000" required />
          <p></p>

          <label for="balance">Kontostand:</label>
          <p></p>
          <input v-model="user.balance" type="number" id="balance" name="balance" pattern="^[^\s]*$" placeholder="Konto" required />
          <p></p>

          <label for="aktien">Aktiendepot:</label>
          <p></p>
          <input v-model="user.aktien" type="number" id="aktien" name="aktien" pattern="^[^\s]*$" placeholder="aktien" required />
          <p></p>

          <label for="debt">Schulden:</label>
          <p></p>
          <input v-model="user.debt" type="number" id="debt" name="debt" pattern="^[^\s]*$" placeholder="Schulden" required />
          <p></p>

          <button type="submit">Benutzer hinzufügen</button>
        </form>
      </VCardText>
    </VCard>
  </div>
</template>
-->

<template>
  <div>
    <VCard class="mx-auto" max-width="280" :title="user.name" :subtitle="`${user.name} on 2023-11-15, 05:15`">
      <VDivider />
      <VCardText>
        <!-- Formular außerhalb von VCardText -->
        <form @submit.prevent="addUser">
          <label for="name">Name:</label>
          <input v-model="user.name" type="text" name="name" pattern="^[^\s]*$" placeholder="* name" required title="Bitte verwenden Sie keine Leerzeichen" />

          <p></p><label for="geb">Geburtstag:</label>
          <input v-model="user.geb" type="text" name="geb" pattern="^[^\s]*$" placeholder="Format muss sein: 00-00-0000" required title="Format muss sein: 00-00-0000" />

          <p></p><label for="ver">Verhältnis zum Main:</label>
          <input v-model="user.ver" type="text" name="ver" pattern="^[^\s]*$" placeholder="Format muss sein: 00-00-0000" required />

          <p></p><label for="balance">Kontostand:</label>
          <input v-model="user.balance" type="number" id="balance" name="balance" pattern="^[^\s]*$" placeholder="Konto" required />

          <p></p><label for="aktien">Aktiendepot:</label>
          <input v-model="user.aktien" type="number" id="aktien" name="aktien" pattern="^[^\s]*$" placeholder="aktien" required />

          <p></p><label for="debt">Schulden:</label>
          <input v-model="user.debt" type="number" id="debt" name="debt" pattern="^[^\s]*$" placeholder="Schulden" required />

          <p></p><button type="submit">Benutzer hinzufügen</button>
        </form>
      </VCardText>
    </VCard>
  </div>
</template>