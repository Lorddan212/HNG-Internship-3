<template>
  <div class="dashboard-page">
    <div class="dashboard-container">
      <h1>Welcome, {{ userName }} 👋</h1>
      <p class="subtitle">Manage your tickets efficiently with TicketPro</p>

      <div class="dashboard-buttons">
        <router-link to="/tickets" class="btn primary-btn">Go to Tickets</router-link>
        <button class="btn logout-btn" @click="handleLogout">Logout</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const userName = ref("User");

onMounted(() => {
  const storedUser = JSON.parse(localStorage.getItem("ticketapp_user"));
  if (storedUser && storedUser.firstName && storedUser.lastName) {
    userName.value = `${storedUser.firstName} ${storedUser.lastName}`;
  } else if (storedUser && storedUser.email) {
    userName.value = storedUser.email;
  } else {
    router.push("/auth/login");
  }
});

const handleLogout = () => {
  localStorage.removeItem("ticketapp_user");
  router.push("/auth/login");
};
</script>

<style scoped>
.dashboard-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #0000ff, #00ffff);
  color: #fff;
  padding: 1.5rem;
  text-align: center;
}

.dashboard-container {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 3rem 2rem;
  width: 100%;
  max-width: 480px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

h1 {
  font-size: 2rem;
  margin-bottom: 0.8rem;
  font-weight: 700;
  color: #fff;
}

.subtitle {
  font-size: 1rem;
  color: #e0f7ff;
  margin-bottom: 2.5rem;
}

.dashboard-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.btn {
  padding: 0.9rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
  font-size: 1rem;
}

.primary-btn {
  background: linear-gradient(90deg, #0000ff, #00ffff);
  color: white;
}

.primary-btn:hover {
  background: linear-gradient(90deg, #00ffff, #0000ff);
}

.logout-btn {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

.logout-btn:hover {
  background: rgba(255, 255, 255, 0.35);
}

@media (max-width: 600px) {
  h1 {
    font-size: 1.6rem;
  }

  .dashboard-container {
    padding: 2rem 1.5rem;
  }
}
</style>
