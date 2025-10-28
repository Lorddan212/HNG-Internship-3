import { createRouter, createWebHistory } from "vue-router";
import Landing from "../pages/Landing.vue";
import Login from "../pages/auth/Login.vue";
import Signup from "../pages/auth/Signup.vue";
import Dashboard from "../pages/Dashboard.vue";
import Tickets from "../pages/tickets/Tickets.vue";
import TicketForm from "../pages/tickets/TicketForm.vue";
import { getSession } from "../services/authService.js";

const requireAuth = (to, from, next) => {
  const session = getSession();
  if (!session) next("/auth/login");
  else next();
};

const routes = [
  { path: "/", component: Landing },
  { path: "/auth/login", component: Login },
  { path: "/auth/signup", component: Signup },
  { path: "/dashboard", component: Dashboard, beforeEnter: requireAuth },
  { path: "/tickets", component: Tickets, beforeEnter: requireAuth },
  { path: "/tickets/new", component: TicketForm, beforeEnter: requireAuth },
  { path: "/tickets/:id/edit", component: TicketForm, beforeEnter: requireAuth },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
