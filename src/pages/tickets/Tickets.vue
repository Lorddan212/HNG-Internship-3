<template>
  <div class="tickets-page">
    <div class="tickets-container">
      <h1 class="title">Your Tickets 🎫</h1>

      <div class="ticket-actions">
        <router-link to="/dashboard" class="btn back-btn">← Back to Dashboard</router-link>
        <router-link to="/tickets/new" class="btn add-btn">+ Create New Ticket</router-link>
      </div>

      <div v-if="tickets.length === 0" class="no-tickets">
        <p>No tickets found. Click “+ Create New Ticket” to create one!</p>
      </div>

      <div v-else class="tickets-grid">
        <div
          v-for="ticket in tickets"
          :key="ticket.id"
          class="ticket-card"
        >
          <h2>{{ ticket.title }}</h2>
          <span :class="['status-tag', ticket.status]">{{ formatStatus(ticket.status) }}</span>

          <p v-if="ticket.description" class="desc">{{ ticket.description }}</p>

          <div class="actions">
            <router-link :to="`/tickets/${ticket.id}/edit`" class="edit">Edit</router-link>
            <button class="delete" @click="deleteTicket(ticket.id)">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const tickets = ref([]);

const loadTickets = () => {
  const saved = JSON.parse(localStorage.getItem("tickets")) || [];
  tickets.value = saved;
};

const deleteTicket = (id) => {
  if (confirm("Are you sure you want to delete this ticket?")) {
    const updated = tickets.value.filter((t) => t.id !== id);
    tickets.value = updated;
    localStorage.setItem("tickets", JSON.stringify(updated));
  }
};

const formatStatus = (status) => {
  if (status === "open") return "Open";
  if (status === "in_progress") return "In Progress";
  if (status === "closed") return "Closed";
  return status;
};

onMounted(loadTickets);
</script>

<style scoped>
.tickets-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #0000ff, #00ffff);
  padding: 2rem;
}

.tickets-container {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2.5rem;
  width: 100%;
  max-width: 1000px;
  color: white;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.title {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  font-weight: 700;
}

.ticket-actions {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.btn {
  padding: 0.8rem 1.4rem;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
  font-size: 1rem;
}

.add-btn {
  background: linear-gradient(90deg, #0000ff, #00ffff);
  color: white;
}

.add-btn:hover {
  background: linear-gradient(90deg, #00ffff, #0000ff);
}

.back-btn {
  background: rgba(255, 255, 255, 0.25);
  color: white;
}

.back-btn:hover {
  background: rgba(255, 255, 255, 0.4);
}

.tickets-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
}

.ticket-card {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  padding: 1.5rem;
  text-align: left;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}

.ticket-card h2 {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.8rem;
}

.desc {
  font-size: 0.9rem;
  margin: 0.5rem 0 1rem;
  color: #e0f7ff;
}

.status-tag {
  display: inline-block;
  padding: 0.3rem 0.8rem;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 600;
}

.status-tag.open {
  background: #b2f5ea;
  color: #065f46;
}

.status-tag.in_progress {
  background: #fef3c7;
  color: #92400e;
}

.status-tag.closed {
  background: #e5e7eb;
  color: #374151;
}

.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}

.edit {
  color: #00ffff;
  font-weight: 600;
  cursor: pointer;
}

.delete {
  color: #ff4d4f;
  background: none;
  border: none;
  font-weight: 600;
  cursor: pointer;
}

.no-tickets {
  color: #f0f8ff;
  font-size: 1.1rem;
  margin-top: 2rem;
}

@media (max-width: 600px) {
  .ticket-actions {
    flex-direction: column;
    align-items: center;
  }

  .tickets-container {
    padding: 2rem 1.2rem;
  }
}
</style>
