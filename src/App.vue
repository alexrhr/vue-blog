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
      <VBtn variant="text" icon="mdi-magnify"></VBtn>
      <VBtn variant="text" icon>
        <VIcon>mdi-filter</VIcon>
        <VMenu activator="parent">
          <VList density="compact">
            <VListItem>Attractions</VListItem>
            <VListItem>Beaches</VListItem>
            <VListItem>Cities</VListItem>
            <VListItem>Escape Rooms</VListItem>
            <VListItem>Mountains</VListItem>
            <VListItem>Museums</VListItem>
          </VList>
        </VMenu>
      </VBtn>

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
        <VIcon>mdi-note-plus</VIcon>
        Startseite
      </VBtn>
      <VBtn size="large" link to="/finanzen">
        <VIcon>mdi-shape</VIcon>
        Finanzen
      </VBtn>
      <VBtn size="large" link to="/hinzufügen">
        <VIcon>mdi-account-multiple</VIcon>
        Transaktionen hinzufügen
      </VBtn>
    </VBottomNavigation>

    <VNavigationDrawer mobile-breakpoint="sm" v-model="drawer" class="transparent">
      <VList>
        <VListItem :prepend-icon="BlogIcon" link to="/startseite">
          Startseite
        </VListItem>
        <VListItem prepend-icon="mdi-shape" link to="/finanzen">
          Finanzen
        </VListItem>
        <VListItem prepend-icon="mdi-account-multiple" link to="/hinzufügen">
          Transaktionen hinzufügen
        </VListItem>
      </VList>
    </VNavigationDrawer>

    <VMain>
      <RouterView></RouterView>
    </VMain>
    <VBtn link to="/posts/create"
          variant="elevated" icon="mdi-plus" color="indigo-darken-4"
          position="fixed" size="large" style="bottom:5em; right:3em">
    </VBtn>


  </VLayout>
</template>

