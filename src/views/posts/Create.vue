<script setup>
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from 'vue-router';
import { computed, onMounted, ref } from "vue";

const props = defineProps(['id']);
const router = useRouter();

// Vue variables
const isNewPost = ref(true);
const title = ref('');
const categories = ref([]);
const body = ref('');

// validation rules
const titleRules = [(value) => !!value || 'Please enter a post title'];
const bodyRules = [(value) => !!value || 'Please enter some post content'];
const isValid = ref(true);

onMounted(async () => {
  // only execute for existing post
  if (props.id) await loadPost(props.id);
});

// loads the post from Firestore, using its ID
async function loadPost(id) {
  const postDoc = doc(collection(db, "benutzer"), id);
  const post = await getDoc(postDoc);

  if (post.exists()) {
    isNewPost.value = false;
    const postData = post.data();
    title.value = postData.title || '';
    body.value = postData.body || '';
    categories.value = postData.categories || [];
  } else {
    // if post with this ID doesn't exist, show a warning
    title.value = 'No entry with post id ' + props.id;
  }
}

// saves the form data to Firestore
async function savePost() {
  // if there is a validation error, abort
  if (!isValid.value) return;

  const postRef = collection(db, "benutzer");
  const newPostData = {
    title: title.value,
    body: body.value,
    categories: categories.value
  };

  if (isNewPost.value) {
    // create a new Post in Firestore
    await addDoc(postRef, newPostData);
  } else {
    // update the existing Post in Firestore
    await setDoc(doc(postRef, props.id), newPostData);
  }

  // forward to overview page
  router.push('/');
}
</script>

<template>
  <v-container>
    <h1>{{ isNewPost ? 'Create new post' : `Edit '${title}'` }}</h1>
    <v-row>
      <v-col sm="8" lg="4">
        <v-sheet class="pa-3" elevation="4">
          <v-form @submit.prevent="savePost">
            <v-text-field label="Title" variant="outlined" required v-model="title" :rules="titleRules" placeholder="Write your post title here..."/>
            <v-select label="Categories" variant="outlined" class="mt-3" multiple v-model="categories" :items="allCategories"/>
            <v-textarea label="Content" variant="outlined" rows="8" v-model="body" :rules="bodyRules"></v-textarea>
            <v-spacer class="mt-4"/>
            <v-btn size="large" elevation="4" color="grey darken-1" @click="router.push('/posts')">Cancel</v-btn>
            <v-btn type="submit" size="large" elevation="4" color="primary" class="float-end">Save</v-btn>
          </v-form>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>
