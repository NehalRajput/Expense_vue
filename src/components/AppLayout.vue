<template>
  <div class="app-layout">
    <header class="app-header">
      <h1>Expense Tracker</h1>
      <nav class="nav-links">
        <router-link to="/">Dashboard</router-link>
        <router-link to="/expenses">Expenses</router-link>
        <router-link to="/groups">Groups</router-link>
      </nav>
    </header>
    
    <main class="app-main">
      <slot></slot>
    </main>
    
    <footer class="app-footer">
      <p>© 2023 Expense Tracker</p>
    </footer>
  </div>
</template>

<script setup>
// No script needed for basic layout
</script>

<style scoped>

.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
; /* Black background for the entire layout */
}

.app-header {
  background-color: #111827; /* Dark blackish background for header */
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.app-header h1 {
  margin: 0;
  font-size: 1.5rem;
}

.nav-links {
  display: flex;
  gap: 1rem;
}

.nav-links a {
  color: white;
  text-decoration: none;
  padding: 0.5rem;
  border-radius: 4px;
}

.nav-links a:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.nav-links a.router-link-exact-active {
  background-color: rgba(255, 255, 255, 0.3);
}

.app-main {
  flex: 1;
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  color: white; /* White text for better contrast */
}

.app-footer {
  background-color: #111827; /* Dark blackish background for footer */
  color: white;
  padding: 1rem;
  text-align: center;
}

</style>