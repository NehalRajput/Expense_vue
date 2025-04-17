<template>
  <AppLayout>
    
    <div class="dashboard">
      <div class="stats-cards">
        <!-- Your existing stat cards -->
        <div class="stat-card total-card">
          <h3>Total Expenses</h3>
          <p>${{ totalExpenses.toFixed(2) }}</p>
          <span class="stat-subtitle">All Time</span>
        </div>
        
        <div class="stat-card monthly-card">
          <h3>This Month</h3>
          <p>${{ monthlyExpenses.toFixed(2) }}</p>
          <span class="stat-subtitle">{{ currentMonth }}</span>
        </div>
        
        <div class="stat-card highest-card">
          <h3>Highest Spending</h3>
          <p v-if="highestExpense">{{ highestExpense.title }} - ${{ highestExpense.amount.toFixed(2) }}</p>
          <p v-else>No expenses</p>
          <span class="stat-subtitle">{{ currentMonth }}</span>
        </div>
        
        
      </div>

      <br>
      <!-- Expenses Table -->
      <div class="table-section">
        <div class="section-header">
          <h2>Recent Expenses</h2>
          <router-link to="/expenses" class="view-all">View All</router-link>
        </div>
        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Group</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="expense in recentExpenses" :key="expense.id">
                <td>{{ expense.title }}</td>
                <td class="amount-cell">${{ expense.amount.toFixed(2) }}</td>
                <td>{{ formatDate(expense.date) }}</td>
                <td>{{ getGroupName(expense.groupId) || '-' }}</td>
                <td class="actions-cell">
                  <button @click="handleDeleteExpense(expense.id)" class="delete-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </button>
                </td>
              </tr>
              <tr v-if="recentExpenses.length === 0">
                <td colspan="5" class="empty-table-message">
                  <div class="empty-icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M3 3h18v18H3zM8 8v8m8-8v8"></path>
                    </svg>
                  </div>
                  <p>No expenses recorded yet</p>
                  <router-link to="/expenses" class="add-link">Add Expense</router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Groups Table -->
      <div class="table-section">
        <div class="section-header">
          <h2>Your Groups</h2>
          <router-link to="/groups" class="view-all">View All</router-link>
        </div>
        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Total Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="group in groups" :key="group.id">
                <td>{{ group.name }}</td>
                <td class="amount-cell">${{ getGroupTotal(group.id).toFixed(2) }}</td>
                <td class="actions-cell">
                  <button @click="handleDeleteGroup(group.id)" class="delete-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </button>
                </td>
              </tr>
              <tr v-if="groups.length === 0">
                <td colspan="5" class="empty-table-message">
                  <div class="empty-icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <p>No groups created yet</p>
                  <router-link to="/groups" class="add-link">Create Group</router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import { computed } from 'vue';
import AppLayout from '@/components/AppLayout.vue';
import { useExpenseStore } from '@/stores/expense';
import { useGroupStore } from '@/stores/group';

const expenseStore = useExpenseStore();
const groupStore = useGroupStore();

const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });

const totalExpenses = computed(() => expenseStore.totalExpenses);
const groups = computed(() => groupStore.groups);

const monthlyExpenses = computed(() => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  
  return expenseStore.expenses
    .filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getMonth() === currentMonth && 
             expenseDate.getFullYear() === currentYear;
    })
    .reduce((total, expense) => total + expense.amount, 0);
});

const highestExpense = computed(() => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  
  const monthlyExpenses = expenseStore.expenses
    .filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getMonth() === currentMonth && 
             expenseDate.getFullYear() === currentYear;
    });
    
  if (monthlyExpenses.length === 0) return null;
    
  return monthlyExpenses.reduce((highest, expense) => 
    expense.amount > highest.amount ? expense : highest
  );
});

const recentExpenses = computed(() => {
  return [...expenseStore.expenses]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);
});

const formatDate = (dateString) => {
  if (!dateString) return '';
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const getGroupName = (groupId) => {
  const group = groupStore.groups.find(g => g.id === groupId);
  return group ? group.name : '';
};

const getExpenseCount = (groupId) => {
  return expenseStore.expenses.filter(e => e.groupId === groupId).length;
};

const getGroupTotal = (groupId) => {
  return expenseStore.expenses
    .filter(e => e.groupId === groupId)
    .reduce((total, expense) => total + expense.amount, 0);
};

const handleDeleteExpense = (id) => {
  expenseStore.deleteExpense(id);
};

const handleDeleteGroup = (id) => {
  groupStore.deleteGroup(id);
};
</script>

<style scoped>
/* Keep your existing stat cards styles */

.table-section {
  background: black;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
}
.stats-cards{
  background-color: black;
  line-height: normal;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem;

  border-radius: 12px;  
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);  
  color:white;
  font-family: 'Courier New', monospace;
  font-size: 1.2rem;
 


}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.section-header h2 {
  margin: 0;
  font-size: 1.25rem;
  color: #333;
}

.view-all {
  color: #42b983;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
}

.view-all:hover {
  text-decoration: underline;
}

.table-container {
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
  color: white;
}

.data-table th {
  text-align: left;
  padding: 1rem;
  background-color: #f8f9fa;
  color: #555;
  font-weight: 500;
  border-bottom: 2px solid #eee;
}

.data-table td 
{
  font-family: 'Courier New', monospace;
  font-size: 1.2rem;
  padding: 1rem;
  border-bottom: 1px solid #eee;
  vertical-align: middle;
}

.data-table tr:last-child td {
  border-bottom: none;
}



.amount-cell {
  font-weight: 600;
  font-family: 'Courier New', monospace;
}

.actions-cell {
  text-align: center;
  width: 60px;
}

.delete-btn {
  background: none;
  border: none;
  color: #e74c3c;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.delete-btn:hover {
  background-color: rgba(231, 76, 60, 0.1);
}

.empty-table-message {
  text-align: center;
  padding: 2rem;
  color: #666;
}

.empty-icon {
  margin-bottom: 1rem;
  color:black;
}

.empty-icon svg {
  stroke-width: 1.5;
}

.add-link {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #42b983;
  color: black;
  border-radius: 6px;
  text-decoration: none;
  font-size: 0.9rem;
  transition: background-color 0.2s ease;
}

.add-link:hover {
  background-color: #369f6b;
}

@media (max-width: 768px) {
  .data-table {
    font-size: 0.85rem;
  }
  
  .data-table th,
  .data-table td {
    padding: 0.75rem;
  }
}
</style>