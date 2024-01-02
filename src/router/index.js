import Create from "@/views/budget/Create.vue";
import LandingPage from "@/views/budget/LandingPage.vue";
import Details from "@/views/budget/Details.vue";
import EditUser from "@/views/EditUser.vue";

const routes = [
  {path: '/startseite', component: LandingPage},
  {path: '/', component: LandingPage},
  {path: '/users/:id', component: Details},
  {path: '/hinzufügen', component: Create},
  {path: '/finanzen', component: Details},
  {path: '/budget/create', component: EditUser},
  {path: '/posts/create', component: EditUser},
];
export default routes;
