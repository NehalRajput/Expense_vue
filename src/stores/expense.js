import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useExpenseStore = defineStore('expense', () => {
  const expenses = ref([]);
  
  // Local storage key
  const EXPENSES_KEY = 'vue-expense-tracker-expenses';
  
  // Load from localStorage
  if (localStorage.getItem(EXPENSES_KEY)) {
    expenses.value = JSON.parse(localStorage.getItem(EXPENSES_KEY));
  }
  
  // Save to localStorage
  function saveToLocalStorage() {
    localStorage.setItem(EXPENSES_KEY, JSON.stringify(expenses.value));
  }
  
  const totalExpenses = computed(() => {
    return expenses.value.reduce((total, expense) => total + expense.amount, 0);
  });
  
  function addExpense(expense) {
    expenses.value.push({
      id: Date.now(),
      ...expense
    });
    saveToLocalStorage();
  }
  
  function deleteExpense(id) {
    expenses.value = expenses.value.filter(expense => expense.id !== id);
    saveToLocalStorage();
  }
  
  function getExpensesByGroup(groupId) {
    return expenses.value.filter(expense => expense.groupId === groupId);
  }
  
  return {
    expenses,
    totalExpenses,
    addExpense,
    deleteExpense,
    getExpensesByGroup
  };
});