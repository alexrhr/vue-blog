
<script setup>
import BlogIcon from "@/components/icons/IconBlog.vue";
import {ref} from 'vue'

const drawer = ref(true)
</script>

<template>
  <VLayout row wrap rounded rounded-md align-start>
    <VAppBar rounded class="transparent">
      <VAppBarNavIcon variant="text" @click.stop="drawer = !drawer"/>
      <VToolbarTitle>Budget-Planer</VToolbarTitle>

      <VSpacer></VSpacer>


      <VBtn variant="text" icon>
        <VIcon>mdi-dots-vertical</VIcon>
        <VMenu activator="parent">
          <VList density="compact">
            <VListItem>Profile</VListItem>
            <VListItem>Settings</VListItem>
          </VList>
        </VMenu>
      </VBtn>
    </VAppBar>

    <VBottomNavigation grow >
      <VBtn size="large" link to="/startseite">
        Startseite
      </VBtn>
      <VBtn size="large" link to="/finanzen">
        Finanzen
      </VBtn>
      <VBtn size="large" link to="/aktualisieren">
        Aktualisieren
      </VBtn>
    </VBottomNavigation>

    <VNavigationDrawer mobile-breakpoint="sm" v-model="drawer" class="transparent">
      <VList>
        <VListItem  link to="/startseite">
          Startseite
        </VListItem>
        <VListItem  link to="/finanzen">
          Finanzen
        </VListItem>
        <VListItem  link to="/aktualisieren">
          Aktualisieren
        </VListItem>
        <VListItem  link to="/hinzufügen">
          Hinzufügen
        </VListItem>
      </VList>
    </VNavigationDrawer>

    <VMain>
      <RouterView></RouterView>
    </VMain>
    <VBtn link to="/hinzufügen"
          variant="elevated" icon="mdi-plus" color="indigo-darken-4"
          position="fixed" size="large" style="bottom:5em; right:3em">
    </VBtn>


  </VLayout>
</template>

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

