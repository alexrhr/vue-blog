<template>
  <div>
    <h1>Finanzen</h1>
    <div v-for="user in users" :key="user.id">
      <!--<p>Benutzer: {{ user.name }}</p>
       Beispiel: Du kannst den Kontostand so anzeigen -->

      <!-- VCard für jeden Benutzer -->
      <VCard class="mx-auto" max-width="280" :title="user.name" :subtitle="`${user.name} on 2023-11-15, 05:15`">
        <VDivider/>
        <VCardText>
          Kontostand: {{user.balance}} <p></p>
          Aktiendepot: {{user.aktiendepot}} <p></p>
          Schulden: {{user.debt}}
        </VCardText>
      </VCard>

      <br/><br/>
    </div>
  </div>
</template>

<script>
import { defineProps } from 'vue';
import userData from "./users.json";

export default {
  props: {
    title: String,
  },
  data() {
    return {
      users: userData,
    };
  },
};
</script>