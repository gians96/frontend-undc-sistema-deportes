import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import InscripcionesLayout from "@/layouts/InscripcionesLayout.vue";
import AdminLayout from "@/layouts/AdminLayout.vue";
import Home from "@/views/Home.vue";
import Inscripciones from "@/views/Inscripciones.vue";
import AdminIndex from "@/views/Admin/index.vue";
import AdminVoucher from "@/views/Admin/voucher.vue";
import AdminEquipos from "@/views/Admin/equipos.vue";
import AdminPartidos from "@/views/Admin/partidos.vue";
import NoEncontrado from "@/views/error/NoEncontrado.vue";
import NoAutorizado from "@/views/error/NoAutorizado.vue";
import Login from "@/views/Login.vue";
import { useAuthStore } from '@/stores/auth' 

const routes = [
  {
    path: "/",
    component: DefaultLayout,
    children: [
      {
        path: "",
        name: "Inicio",
        component: Home,
      },
    ],
  },
  {
    path: "/inscripciones",
    component: InscripcionesLayout,
    children: [
      {
        path: "",
        name: "Inscripciones",
        component: Inscripciones,
      },
    ],
  },
  {
    path: "/admin",
    component: AdminLayout,
    // CAMBIO CLAVE: Usa metadatos para marcar la ruta como privada
    meta: { requiresAuth: true }, 
    children: [
      {
        path: "dashboard",
        name: "AdminDashboard",
        component: AdminIndex,
      },
      {
        path: "voucher",
        name: "AdminVoucher",
        component: AdminVoucher,
      },
      {
        path: "equipos",
        name: "AdminEquipos",
        component: AdminEquipos,
      },
      {
        path: "partidos",
        name: "AdminPartidos",
        component: AdminPartidos,
      },
    ],
  },
  // Rutas públicas (no necesitan meta)
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/403",
    name: "NoAutorizado",
    component: NoAutorizado,
  },
  {
    path: "/404",
    name: "NoEncontrado",
    component: NoEncontrado,
  },
  // Catch all - debe ir al final
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Bandera para asegurar que la verificación solo se haga una vez por recarga.
let isInitialCheckDone = false;

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  // Define si la ruta requiere autenticación usando el metadato
  const requiresAuth = to.meta.requiresAuth;

  // 1. CHEQUEO INICIAL (solo si vamos a una ruta protegida o al login)
  if (!isInitialCheckDone && (requiresAuth || to.name === 'Login')) {
    await authStore.verificarSesion();
    isInitialCheckDone = true;
  }

  // 2. COMPROBACIÓN DEL ACCESO

  // A) Si la ruta requiere autenticación Y el usuario NO está logueado
  if (requiresAuth && !authStore.isLoggedIn) {
    // Redirigir al login solo si no estamos ya en él
    if (to.name !== 'Login') {
      next({ name: 'Login' });
    } else {
      next(); // Ya estamos en /login, permitimos el paso
    }
  }
  // B) Si el usuario ya está logueado y trata de ir a /login, redirigir al dashboard
  else if (to.name === 'Login' && authStore.isLoggedIn) {
    next({ name: 'AdminDashboard' });
  }
  // C) En cualquier otro caso (ruta pública o ruta privada con sesión activa)
  else {
    next();
  }
});

export default router;
