<template>
  <div class="auth-page">
    <div class="auth-container">
      <h2>Login to Your Account</h2>
      <p class="subtitle">Access your dashboard and manage your tickets</p>

      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label>Email</label>
          <input
            type="email"
            v-model="email"
            placeholder="Enter your email"
            required
          />
        </div>

        <div class="form-group">
          <label>Password</label>
          <input
            type="password"
            v-model="password"
            placeholder="Enter your password"
            required
          />
        </div>

        <p v-if="error" class="error">{{ error }}</p>

        <button type="submit" class="btn primary-btn">Login</button>
      </form>

      <p class="switch">
        Don’t have an account?
        <router-link to="/auth/signup">Sign Up</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { saveSession } from "../../services/authService.js";

const router = useRouter();
const email = ref("");
const password = ref("");
const error = ref("");

const handleLogin = () => {
  error.value = "";

  // Simple validation
  if (!email.value || !password.value) {
    error.value = "Please fill in all fields.";
    return;
  }

  // Retrieve stored user
  const storedUser = JSON.parse(localStorage.getItem("ticketapp_user"));

  if (!storedUser) {
    error.value = "No account found. Please sign up first.";
    return;
  }

  // Verify credentials
  if (
    storedUser.email === email.value &&
    storedUser.password === password.value
  ) {
    saveSession({
      firstName: storedUser.firstName || "User",
      lastName: storedUser.lastName || "",
      email: storedUser.email,
    });
    router.push("/dashboard");
  } else {
    error.value = "Invalid email or password.";
  }
};
</script>

<style scoped>
.auth-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #0000ff, #00ffff);
  padding: 1.5rem;
}

.auth-container {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  padding: 2.5rem;
  width: 100%;
  max-width: 420px;
  text-align: center;
}

h2 {
  color: #0000ff;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #666;
  font-size: 0.95rem;
  margin-bottom: 2rem;
}

.form-group {
  text-align: left;
  margin-bottom: 1.2rem;
}

label {
  display: block;
  margin-bottom: 0.4rem;
  font-weight: 600;
  color: #0000ff;
}

input {
  width: 100%;
  padding: 0.7rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
  transition: 0.3s;
}

input:focus {
  border-color: #00ffff;
  box-shadow: 0 0 6px #00ffff80;
}

.btn {
  width: 100%;
  padding: 0.8rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  color: white;
  background: linear-gradient(90deg, #0000ff, #00ffff);
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn:hover {
  background: linear-gradient(90deg, #00ffff, #0000ff);
}

.switch {
  margin-top: 1.2rem;
  font-size: 0.95rem;
}

.switch a {
  color: #0000ff;
  font-weight: 600;
}

.error {
  color: red;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}
</style>
