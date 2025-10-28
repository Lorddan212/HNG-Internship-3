<template>
  <div class="dashboard-page">
    <div class="dashboard-container">
      <h1>Welcome, {{ userName }} 👋</h1>
      <p class="subtitle">Manage your tickets efficiently with TicketPro</p>

      <!-- 📊 Ticket Statistics -->
      <div class="stats-container">
        <div class="stat-card total">
          <h2>{{ stats.total }}</h2>
          <p>Total Tickets</p>
        </div>
        <div class="stat-card open">
          <h2>{{ stats.open }}</h2>
          <p>Open</p>
        </div>
        <div class="stat-card progress">
          <h2>{{ stats.inProgress }}</h2>
          <p>In Progress</p>
        </div>
        <div class="stat-card closed">
          <h2>{{ stats.closed }}</h2>
          <p>Closed</p>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="dashboard-buttons">
        <router-link to="/tickets" class="btn primary-btn">Manage Tickets</router-link>
        <button class="btn logout-btn" @click="handleLogout">Logout</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const userName = ref("User");
const stats = ref({
  total: 0,
  open: 0,
  inProgress: 0,
  closed: 0,
});

const loadTicketStats = () => {
  const storedTickets = JSON.parse(localStorage.getItem("ticketapp_tickets")) || [];
  stats.value.total = storedTickets.length;
  stats.value.open = storedTickets.filter(t => t.status === "open").length;
  stats.value.inProgress = storedTickets.filter(t => t.status === "in-progress").length;
  stats.value.closed = storedTickets.filter(t => t.status === "closed").length;
};

const loadUser = () => {
  const storedUser = JSON.parse(localStorage.getItem("ticketapp_user"));
  if (storedUser && storedUser.firstName && storedUser.lastName) {
    userName.value = `${storedUser.firstName} ${storedUser.lastName}`;
  } else if (storedUser && storedUser.email) {
    userName.value = storedUser.email;
  } else {
    router.push("/auth/login");
  }
};

onMounted(() => {
  loadUser();
  loadTicketStats();
  window.addEventListener("tickets-updated", loadTicketStats);
});

onBeforeUnmount(() => {
  window.removeEventListener("tickets-updated", loadTicketStats);
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
  background: #ffffff;
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 3rem 2rem;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

h1 {
  font-size: 2rem;
  margin-bottom: 0.8rem;
  font-weight: 700;
  color: #0000ff;
}

.subtitle {
  font-size: 1rem;
  color: #000000;
  margin-bottom: 2.5rem;
}

/* 📊 Statistics Section */
.stats-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1rem;
  margin-bottom: 2.5rem;
}

.stat-card {
  padding: 1.5rem 1rem;
  border-radius: 12px;
  color: #fff;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  animation: fadeIn 0.6s ease-in-out;
}

.stat-card h2 {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
}

.stat-card p {
  font-size: 0.9rem;
  opacity: 0.9;
}

/* Card Colors */
.stat-card.total {
  background: linear-gradient(135deg, #0000ff, #0099ff);
}
.stat-card.open {
  background: linear-gradient(135deg, #ffaa00, #ffcc00);
}
.stat-card.progress {
  background: linear-gradient(135deg, #00bfff, #00ffff);
}
.stat-card.closed {
  background: linear-gradient(135deg, #ff0000, #ff6666);
}

/* Buttons */
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
  background: #0000ff;
  color: white;
}

.primary-btn:hover {
  background: #00ffff;
  color: #000;
}

.logout-btn {
  background: #ff0000;
  color: white;
}

.logout-btn:hover {
  background: #f40000cb;
  color: #ffffff;
}

/* Animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
