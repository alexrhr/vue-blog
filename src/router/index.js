import Overview from "@/views/posts/Overview.vue";
import Users from "@/views/Users.vue";
import Categories from "@/views/Categories.vue";
import Read from "@/views/posts/Read.vue";
import Create from "@/views/posts/Create.vue";

const routes = [
  {path: '/startseite', component: Overview},
  {path: '/', component: Overview},
  {path: '/posts/:id', component: Read},
  {path: '/hinzufügen', component: Create},
  {path: '/posts/update', component: Overview},
  {path: '/posts/save', component: Overview},
  {path: '/posts/delete', component: Overview},
  {path: '/categories', component: Categories},
  {path: '/finanzen', component: Users},
];
export default routes;
