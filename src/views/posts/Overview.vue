<script setup>
</script>

<template>
  <v-container>
    <h1>Startseite</h1>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="headline">Willkommen bei Budget-Planer</v-card-title>
          <v-card-text>
            <p>Hast du dich jemals gefragt, wohin dein Geld verschwindet? Mit unserer Finanz-App behältst du den Überblick über Einnahmen, Ausgaben und sparst Zeit beim Verfolgen deiner Finanzen. Die App bietet dir somit einen einen guten Überblick über deine Finanzen.</p>
          </v-card-text>

          <v-list>
            <v-list-item-group>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-chart-bar</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Übersichtliche Finanzstatistiken</v-list-item-title>
                  <p>
                    Verfolge mühelos dein Budget, sieh dir Ausgabenmuster an und entdecke, wie du deine finanziellen Ziele erreichen kannst. Und das alles für deine gesamte Familie.
                  </p>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-cash-multiple</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Transaktionshistorie</v-list-item-title>
                  <p>
                    Jede Ausgabe im Blick! Dafür musst du nur deine Ausgaben in unser Eingabefeld eingeben und schon wird es in der Übersicht aktualisiert und angezeigt.
                  </p>
                </v-list-item-content>

              </v-list-item>

              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-calendar-month</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Budgetplanung</v-list-item-title>
                  <p>
                    Durch den guten Überblick deiner Finaznzen, kannst du dein Budget besser einplanen. Mit benutzerfreundlichen Tools helfen wir dir, deine finanziellen Ziele zu erreichen.
                  </p>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-lock</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Sicherheit an erster Stelle</v-list-item-title>
                  <p>
                    Deine Finanzen sind sensibel – wir sorgen dafür, dass sie sicher und geschützt sind.
                  </p>
                </v-list-item-content>
              </v-list-item>

            </v-list-item-group>
          </v-list>

          <v-list-item>
            <v-list-item-title>Starte noch heute und erlebe, wie einfach Finanzmanagement sein kann!</v-list-item-title>
          </v-list-item>
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
  font-size: 3em;
  color: #3498db;
}
v-list-item-title{
  font-size: 2em;
  color: #030303;
  line-height: 1.6;
}
v-card-text{
  font-size: 2em;
  color: #030303;
  line-height: 1.6;
}
p {
  font-size: 1em;
  color: #8d8d8d;
  line-height: 1.6;
}
</style>
