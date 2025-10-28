<template>
  <div class="auth-page">
    <div class="auth-container">
      <h2>Create an Account</h2>
      <p class="subtitle">Join TicketPro to manage your tickets efficiently</p>

      <form @submit.prevent="handleSignup">
        <div class="form-group">
          <label>First Name</label>
          <input
            type="text"
            v-model="firstName"
            placeholder="Enter your first name"
            required
          />
        </div>

        <div class="form-group">
          <label>Last Name</label>
          <input
            type="text"
            v-model="lastName"
            placeholder="Enter your last name"
            required
          />
        </div>

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
            placeholder="Create a password"
            required
          />
        </div>

        <div class="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            v-model="confirmPassword"
            placeholder="Re-enter your password"
            required
          />
        </div>

        <p v-if="error" class="error">{{ error }}</p>
        <p v-if="success" class="success">{{ success }}</p>

        <button type="submit" class="btn primary-btn">Sign Up</button>
      </form>

      <p class="switch">
        Already have an account?
        <router-link to="/auth/login">Login</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const firstName = ref("");
const lastName = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const error = ref("");
const success = ref("");

const handleSignup = () => {
  error.value = "";
  success.value = "";

  if (!firstName.value || !lastName.value || !email.value || !password.value || !confirmPassword.value) {
    error.value = "All fields are required.";
    return;
  }

  if (password.value !== confirmPassword.value) {
    error.value = "Passwords do not match.";
    return;
  }

  // Save to localStorage
  const user = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    password: password.value,
  };

  localStorage.setItem("ticketapp_user", JSON.stringify(user));
  success.value = "Signup successful! Redirecting to login...";

  setTimeout(() => {
    router.push("/auth/login");
  }, 1500);
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
  max-width: 440px;
  text-align: center;
}

h2 {
  color: #0000ff;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #161414;
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
  color: #000000;
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
  font-size: 1rem;
  font-weight: 700;
  color: white;
  background: #0000ff;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn:hover {
   background: #00ffff;
  color: #000000;
  font-weight: 700;
}

.switch {
  margin-top: 1.2rem;
  font-size: 1rem;
}

.switch a {
  color: #0000ff;
  font-weight: 800;
}

.error {
  color: red;
  font-size: 1rem;
  margin-bottom: 1rem;
}

.success {
  color: green;
  font-size: 1rem;
  margin-bottom: 1rem;
}
</style>
