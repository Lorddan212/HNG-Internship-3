<template>
  <div class="ticket-form-page">
    <div class="ticket-form-container">
      <h1>{{ editMode ? "Edit Ticket ✏️" : "Create New Ticket 🎫" }}</h1>

      <form @submit.prevent="handleSubmit" class="ticket-form">
        <div class="form-group">
          <label>Title *</label>
          <input
            v-model="title"
            type="text"
            placeholder="Enter ticket title"
            required
          />
        </div>

        <div class="form-group">
          <label>Status *</label>
          <select v-model="status">
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        <div class="form-group">
          <label>Description</label>
          <textarea
            v-model="description"
            placeholder="Enter ticket details..."
            rows="4"
          ></textarea>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn submit-btn">
            {{ editMode ? "Update Ticket" : "Create Ticket" }}
          </button>
          <router-link to="/tickets" class="btn back-btn">
            ← Back to Tickets
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const title = ref("");
const status = ref("open");
const description = ref("");
const editMode = ref(false);
const ticketId = route.params.id || null;

onMounted(() => {
  if (ticketId) {
    editMode.value = true;
    const tickets = JSON.parse(localStorage.getItem("tickets")) || [];
    const existing = tickets.find((t) => t.id === parseInt(ticketId));
    if (existing) {
      title.value = existing.title;
      status.value = existing.status;
      description.value = existing.description;
    }
  }
});

const handleSubmit = () => {
  const tickets = JSON.parse(localStorage.getItem("tickets")) || [];

  if (editMode.value) {
    const updatedTickets = tickets.map((t) =>
      t.id === parseInt(ticketId)
        ? { ...t, title: title.value, status: status.value, description: description.value }
        : t
    );
    localStorage.setItem("tickets", JSON.stringify(updatedTickets));
    alert("✅ Ticket updated successfully!");
  } else {
    const newTicket = {
      id: Date.now(),
      title: title.value,
      status: status.value,
      description: description.value,
    };
    tickets.push(newTicket);
    localStorage.setItem("tickets", JSON.stringify(tickets));
    alert("✅ Ticket created successfully!");
  }

  router.push("/tickets");
};
</script>

<style scoped>
.ticket-form-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #0000ff, #00ffff);
  padding: 2rem;
}

.ticket-form-container {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  border-radius: 16px;
  padding: 2.5rem;
  width: 100%;
  max-width: 600px;
  color: white;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  text-align: left;
}

h1 {
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  font-weight: 700;
}

.ticket-form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: 600;
  margin-bottom: 0.5rem;
}

input,
select,
textarea {
  padding: 0.8rem;
  border-radius: 8px;
  border: none;
  outline: none;
  font-size: 1rem;
  color: #333;
}

textarea {
  resize: vertical;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
}

.btn {
  padding: 0.8rem 1.4rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  text-decoration: none;
}

.submit-btn {
  background: linear-gradient(90deg, #0000ff, #00ffff);
  color: white;
}

.submit-btn:hover {
  background: linear-gradient(90deg, #00ffff, #0000ff);
}

.back-btn {
  background: rgba(255, 255, 255, 0.25);
  color: white;
}

.back-btn:hover {
  background: rgba(255, 255, 255, 0.4);
}

@media (max-width: 600px) {
  .ticket-form-container {
    padding: 2rem 1.2rem;
  }
}
</style>
