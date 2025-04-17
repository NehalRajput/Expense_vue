<template>
  <AppLayout>
    <h1>Expenses</h1>
    <div class="expense-page">
      <ExpenseForm 
        :editing-expense="editingExpense" 
        @cancel-edit="cancelEdit" 
      />
      <ExpenseList 
        @delete="deleteExpense" 
        @edit="startEditing" 
      />
    </div>
  </AppLayout>
</template>

<script setup>
import { ref } from 'vue';
import AppLayout from '@/components/AppLayout.vue';
import ExpenseForm from '@/components/Expense/ExpenseForm.vue';
import ExpenseList from '@/components/Expense/ExpenseList.vue';
import { useExpenseStore } from '@/stores/expense';

const expenseStore = useExpenseStore();
const editingExpense = ref(null);

const deleteExpense = (id) => {
  expenseStore.deleteExpense(id);
};

const startEditing = (expense) => {
  editingExpense.value = expense;
};

const cancelEdit = () => {
  editingExpense.value = null;
};
</script>