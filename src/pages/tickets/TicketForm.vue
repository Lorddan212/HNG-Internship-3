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

// Use unified localStorage key
const STORAGE_KEY = "ticketapp_tickets";

onMounted(() => {
  if (ticketId) {
    editMode.value = true;
    const tickets = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    const existing = tickets.find((t) => t.id === parseInt(ticketId));
    if (existing) {
      title.value = existing.title;
      status.value = existing.status;
      description.value = existing.description;
    }
  }
});

const handleSubmit = () => {
  const tickets = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

  if (editMode.value) {
    // Update existing ticket
    const updatedTickets = tickets.map((t) =>
      t.id === parseInt(ticketId)
        ? { ...t, title: title.value, status: status.value, description: description.value }
        : t
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTickets));
    alert("✅ Ticket updated successfully!");
  } else {
    // Create new ticket
    const newTicket = {
      id: Date.now(),
      title: title.value,
      status: status.value,
      description: description.value,
      createdAt: new Date().toISOString(),
    };
    tickets.push(newTicket);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
    alert("✅ Ticket created successfully!");
  }

  // Dispatch custom event to notify TicketList.vue
  window.dispatchEvent(new Event("tickets-updated"));

  // Redirect back to tickets page
  router.push("/tickets");
};
</script>

<style scoped>
.ticket-form-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100dvh; /* ✅ dynamic viewport height handles mobile keyboards better */
  background: linear-gradient(135deg, #0000ff, #00ffff);
  padding: 1.5rem;
  box-sizing: border-box;
}

.ticket-form-container {
  background: #fff;
  color: #000;
  border-radius: 16px;
  padding: 2rem;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
}

/* Heading */
h1 {
  text-align: center;
  font-size: 1.8rem;
  color: #0000ff;
  margin-bottom: 1.5rem;
}

/* Form */
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
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 0.6rem;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s ease;
}

input:focus,
select:focus,
textarea:focus {
  border-color: #00ffff;
  box-shadow: 0 0 4px rgba(0, 255, 255, 0.3);
}

textarea {
  resize: vertical;
}

/* Actions */
.form-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
}

/* Buttons */
.btn {
  padding: 0.8rem 1.4rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  text-decoration: none;
  text-align: center;
}

.submit-btn {
  background: #0000ff;
  color: white;
}

.submit-btn:hover {
  background: #00ffff;
  color: #000;
}

.back-btn {
  background: #0000ff;
  color: white;
}

.back-btn:hover {
  background: #00ffff;
  color: #000;
}

/* ✅ Improved mobile responsiveness */
@media (max-width: 768px) {
  .ticket-form-container {
    padding: 1.5rem 1rem;
    max-width: 90%;
  }

  .form-actions {
    flex-direction: column;
    gap: 0.8rem;
  }

  .btn {
    width: 100%;
  }

  h1 {
    font-size: 1.5rem;
  }
}
</style>
