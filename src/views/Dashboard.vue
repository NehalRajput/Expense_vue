<template>
  <AppLayout>
    <div class="dashboard">
      <div class="stats-cards">
        <div class="stat-card">
          <h3>Total Expenses</h3>
          <p>${{ totalExpenses.toFixed(2) }}</p>
        </div>
        
        <div class="stat-card">
          <h3>Number of Groups</h3>
          <p>{{ groups.length }}</p>
        </div>
      </div>
      
      <div class="recent-section">
        <h2>Recent Expenses</h2>
        <div v-if="recentExpenses.length > 0" class="recent-expenses">
          <ExpenseItem 
            v-for="expense in recentExpenses" 
            :key="expense.id" 
            :expense="expense" 
            @delete="handleDeleteExpense"
          />
        </div>
        <div v-else class="empty-state">
          No recent expenses
        </div>
      </div>
      
      <div class="groups-section">
        <h2>Your Groups</h2>
        <div v-if="groups.length > 0" class="groups-list">
          <GroupItem 
            v-for="group in groups" 
            :key="group.id" 
            :group="group" 
            @delete="handleDeleteGroup"
          />
        </div>
        <div v-else class="empty-state">
          No groups yet. <router-link to="/groups">Create one</router-link>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import { computed } from 'vue';
import AppLayout from '@/components/AppLayout.vue';
import ExpenseItem from '@/components/Expense/ExpenseItem.vue';
import GroupItem from '@/components/Group/GroupItem.vue';
import { useExpenseStore } from '@/stores/expense';
import { useGroupStore } from '@/stores/group';

const expenseStore = useExpenseStore();
const groupStore = useGroupStore();

const totalExpenses = computed(() => expenseStore.totalExpenses);
const groups = computed(() => groupStore.groups);

const recentExpenses = computed(() => {
  return [...expenseStore.expenses]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);
});

const handleDeleteExpense = (id) => {
  expenseStore.deleteExpense(id);
};

const handleDeleteGroup = (id) => {
  groupStore.deleteGroup(id);
};
</script>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.stats-cards {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.stat-card {
  flex: 1;
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.stat-card h3 {
  margin-top: 0;
  color: #666;
  font-size: 1rem;
}

.stat-card p {
  margin-bottom: 0;
  font-size: 1.5rem;
  font-weight: bold;
  color: #000000; /* changed to black */
}

.recent-section, .groups-section {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.recent-section h2, .groups-section h2 {
  margin-top: 0;
}

.recent-expenses, .groups-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.empty-state {
  padding: 1rem;
  text-align: center;
  color: #666;
}

.empty-state a {
  color: #000000; /* changed to black */
  text-decoration: none;
}

.empty-state a:hover {
  text-decoration: underline;
}

</style>