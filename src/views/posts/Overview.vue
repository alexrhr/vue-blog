<script setup>
</script>

<template>
  <v-container>
    <h1>Startseite</h1>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="headline">Willkommen bei Budget-Planer – deinem persönlichen Finanzmanager!</v-card-title>
          <v-card-text>
            <p>Hast du dich jemals gefragt, wohin dein Geld verschwindet? Mit unserer intuitiven Finanz-App behältst du den Überblick über Einnahmen, Ausgaben und sparst Zeit beim Verfolgen deiner Finanzen.</p>
          </v-card-text>

          <v-list>
            <v-list-item-group>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-chart-bar</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Übersichtliche Finanzstatistiken</v-list-item-title>
                  <v-list-item-subtitle>Verfolge mühelos dein Budget, sieh dir Ausgabenmuster an und entdecke, wie du deine finanziellen Ziele erreichen kannst.</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-cash-multiple</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Transaktionshistorie</v-list-item-title>
                  <v-list-item-subtitle>Jede Ausgabe im Blick! Von Großeinkäufen bis hin zu kleinen Kaffeeausgaben – behalte alles im Auge, um fundierte finanzielle Entscheidungen zu treffen.</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-calendar-month</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Budgetplanung</v-list-item-title>
                  <v-list-item-subtitle>Setze klare Ziele und erstelle Budgets für jeden Lebensbereich. Mit benutzerfreundlichen Tools helfen wir dir, deine finanziellen Ziele zu erreichen.</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-lock</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Sicherheit an erster Stelle</v-list-item-title>
                  <v-list-item-subtitle>Deine Finanzen sind sensibel – wir sorgen dafür, dass sie sicher und geschützt sind. Modernste Verschlüsselungstechnologien garantieren deine Privatsphäre.</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-earth</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Überall verfügbar</v-list-item-title>
                  <v-list-item-subtitle>Greife von überall auf deine Finanzdaten zu. Egal, ob du zu Hause oder unterwegs bist – deine Finanzen sind immer in Griffweite.</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>

          <v-card-text>
            <p>Starte noch heute und erlebe, wie einfach Finanzmanagement sein kann. Budget-Planer – Dein verlässlicher Partner für finanzielle Freiheit!</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Home',
}
</script>

<style scoped>
.headline {
  font-size: 2em;
  color: #3498db;
}

p {
  font-size: 1.2em;
  color: #555;
  line-height: 1.6;
}
</style>
