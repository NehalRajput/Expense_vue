<template>
  <div class="expense-list">
    <div v-if="expenses.length === 0" class="empty-state">
      No expenses yet. Add your first expense!
    </div>
    
    <ExpenseItem 
      v-for="expense in expenses" 
      :key="expense.id" 
      :expense="expense" 
      @delete="handleDelete"
    />
    
    <div class="total">
      Total: ${{ totalExpenses.toFixed(2) }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import ExpenseItem from './ExpenseItem.vue';
import { useExpenseStore } from '@/stores/expense';

const expenseStore = useExpenseStore();

const expenses = computed(() => expenseStore.expenses);
const totalExpenses = computed(() => expenseStore.totalExpenses);

const handleDelete = (id) => {
  expenseStore.deleteExpense(id);
};
</script>