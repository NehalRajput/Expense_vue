<template>
  <div class="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
    <div v-if="expenses.length === 0" class="text-center text-gray-500 py-8">
      No expenses yet. Add your first expense!
    </div>

    <div v-else class="space-y-4">
      <ExpenseItem 
        v-for="expense in expenses" 
        :key="expense.id" 
        :expense="expense" 
        @delete="handleDelete"
      />
    </div>

    <div class="mt-6 text-right text-xl font-semibold text-gray-700 border-t pt-4">
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
