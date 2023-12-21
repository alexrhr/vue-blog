import Overview from "@/views/posts/Overview.vue";
import Users from "@/views/Users.vue";
import Read from "@/views/posts/Read.vue";
import Read2 from "@/views/posts/Read2.vue";
import Create from "@/views/posts/Create.vue";

const routes = [
  {path: '/startseite', component: Overview},
  {path: '/', component: Overview},
  {path: '/users/:id', component: Read2},
  {path: '/hinzufügen', component: Create},
  {path: '/finanzen', component: Read},
  {path: '/posts/create', component: Users},
];
export default routes;
