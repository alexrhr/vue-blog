<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col>
        <v-card class="larger-card">
          <v-card-title class="headline">Willkommen bei Budget-Planer</v-card-title>
          <v-card-text>
            <p class="larger-text">
              Hast du dich je gefragt, wohin dein Geld verschwindet? Mit unserer Finanz-App behältst du den Überblick über Einnahmen, Ausgaben und sparst Zeit beim Verfolgen deiner Finanzen. Die App bietet dir somit einen guten Überblick über deine Finanzen.
            </p>

            <v-divider></v-divider>

            <v-card-title class="subheading">Übersichtliche Finanzstatistiken</v-card-title>
            <p class="larger-text">
              Verfolge mühelos dein Budget, sieh dir Ausgabemuster an und entdecke, wie du finanzielle Ziele erreichen kannst. Und das alles für deine ganze Familie.
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'BudgetPlaner',
  // Weitere Optionen für die Komponente können hier hinzugefügt werden
}
</script>

<style scoped>
.headline {
  font-size: 28px;
  font-weight: bold;
}

.subheading {
  font-size: 24px;
}

.larger-text {
  font-size: 18px;
}


</style>
