<template>
  <AppLayout>
    <h1>Expenses</h1>
    <div class="expense-page">
      <ExpenseForm />
      <ExpenseList />
    </div>
  </AppLayout>
</template>

<script setup>
import AppLayout from '@/components/AppLayout.vue';
import ExpenseForm from '@/components/Expense/ExpenseForm.vue';
import ExpenseList from '@/components/Expense/ExpenseList.vue';
</script>