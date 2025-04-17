<template>
  <div class="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
    <!-- No expenses message -->
    <div v-if="expenses.length === 0" class="text-center text-gray-500 py-8">
      No expenses yet. Add your first expense!
    </div>

    <!-- Table for expenses -->
    <div v-else>
      <table class="min-w-full table-auto border-collapse">
        <thead>
          <tr class="bg-gray-100 border-b">
            <th class="py-3 px-4 text-left font-semibold text-gray-700">Title</th>
            <th class="py-3 px-4 text-left font-semibold text-gray-700">Amount</th>
            <th class="py-3 px-4 text-left font-semibold text-gray-700">Date</th>
            <th class="py-3 px-4 text-left font-semibold text-gray-700">Group</th>
            <th class="py-3 px-4 text-center font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="expense in expenses" :key="expense.id" class="border-b hover:bg-gray-50">
            <td class="py-4 px-4 text-gray-800">{{ expense.title }}</td>
            <td class="py-4 px-4 text-gray-800">${{ expense.amount.toFixed(2) }}</td>
            <td class="py-4 px-4 text-gray-800">{{ formatDate(expense.date) }}</td>
            <td class="py-4 px-4 text-gray-800" v-if="expense.groupId">{{ getGroupName(expense.groupId) }}</td>
            <td class="py-4 px-4 text-center">
              <!-- Edit button -->
              

              <button @click="editExpense(expense)" class="action-button edit">
                Edit
              </button>

              <!-- Delete Button -->
              <button @click="$emit('delete', expense.id)" class="action-button delete">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Total Expenses -->
    <div class="mt-6 text-right text-xl font-semibold text-gray-700 border-t pt-4">
      <span class="mr-2">Total:</span>${{ totalExpenses.toFixed(2) }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useExpenseStore } from '@/stores/expense';
import { useGroupStore } from '@/stores/group';
import { formatDate } from '@/utills/formatDate';

const expenseStore = useExpenseStore();
const groupStore = useGroupStore();


const emit = defineEmits(['delete', 'edit']);

const expenses = computed(() => expenseStore.expenses);
const totalExpenses = computed(() => expenseStore.totalExpenses);

// Function to get group name by groupId
const getGroupName = (groupId) => {
  const group = groupStore.getGroupById(groupId);
  return group ? group.name : 'No Group';
};
const editExpense = (expense) => {
  emit('edit', expense);
};
</script>

<style scoped>
/* Additional styles for a cleaner table look */
table {
  width: 100%;

  border-spacing: 0;
}

th,
td {
  text-align: left;
  border: 1px solid #e0e0e0;
  background-color: black;
}

th {

  background-color: black;
  color: white;
  font-weight: bold;
  padding: 12px;
  text-align: left;
  font-size: 1rem;

}

td {
  padding: 12px;
  color: white;
  font-size: 1rem;

}

button {
  cursor: pointer;
  color: white;
  background-color: red;
}
</style>
