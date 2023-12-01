<script setup>
import PostCard from "@/components/PostCard.vue";
</script>

<template>
  <v-container>
    <h1>Startseite</h1>
    <v-row>
      <h2>Willkommen bei Budget-Planer – deinem persönlichen Finanzmanager!</h2>

      <p>Hast du dich jemals gefragt, wohin dein Geld verschwindet? Mit unserer intuitiven Finanz-App behältst du den Überblick über Einnahmen, Ausgaben und sparst Zeit beim Verfolgen deiner Finanzen.</p>

      <ul>
        <li>📊 <strong>Übersichtliche Finanzstatistiken:</strong> Verfolge mühelos dein Budget, sieh dir Ausgabenmuster an und entdecke, wie du deine finanziellen Ziele erreichen kannst.</li>
        <li>💸 <strong>Transaktionshistorie:</strong> Jede Ausgabe im Blick! Von Großeinkäufen bis hin zu kleinen Kaffeeausgaben – behalte alles im Auge, um fundierte finanzielle Entscheidungen zu treffen.</li>
        <li>📅 <strong>Budgetplanung:</strong> Setze klare Ziele und erstelle Budgets für jeden Lebensbereich. Mit benutzerfreundlichen Tools helfen wir dir, deine finanziellen Ziele zu erreichen.</li>
        <li>🔒 <strong>Sicherheit an erster Stelle:</strong> Deine Finanzen sind sensibel – wir sorgen dafür, dass sie sicher und geschützt sind. Modernste Verschlüsselungstechnologien garantieren deine Privatsphäre.</li>
        <li>🌐 <strong>Überall verfügbar:</strong> Greife von überall auf deine Finanzdaten zu. Egal, ob du zu Hause oder unterwegs bist – deine Finanzen sind immer in Griffweite.</li>
      </ul>

      <p>Starte noch heute und erlebe, wie einfach Finanzmanagement sein kann. Budget-Planer – Dein verlässlicher Partner für finanzielle Freiheit!</p>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Home',
}
</script>

<style scoped>
h2 {
  font-size: 2em;
  color: #2d2525;
}

p {
  font-size: 1.2em;
  color: #2d2323;
  line-height: 1.6;
}

ul {
  list-style-type: none;
  color: #181515;
  padding: 0;
}

li {
  margin-bottom: 10px;
}
</style>

