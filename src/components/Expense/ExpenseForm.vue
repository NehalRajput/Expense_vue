<template>
  <form @submit.prevent="handleSubmit" class="form-container">
    <h2 class="form-title">Add New Expense</h2>
    <div class="form-group">
      <label for="title">Title</label>
      <input id="title" v-model="form.title" type="text" required class="form-input" placeholder="Dinner, Groceries, etc." />
    </div>
    
    <div class="form-group">
      <label for="amount">Amount</label>
      <div class="input-with-symbol">
        <span class="currency-symbol">$</span>
        <input id="amount" v-model.number="form.amount" type="number" step="0.01" required class="form-input" placeholder="0.00" />
      </div>
    </div>
    
    <div class="form-row">
      <div class="form-group half-width">
        <label for="date">Date</label>
        <input id="date" v-model="form.date" type="date" required class="form-input" />
      </div>
      
      <div class="form-group half-width">
        <label for="group">Group</label>
        <select id="group" v-model="form.groupId" class="form-input">
          <option value="">No Group</option>
          <option v-for="group in groups" :key="group.id" :value="group.id">
            {{ group.name }}
          </option>
        </select>
      </div>
    </div>
    
    <button type="submit" class="submit-button">Add Expense</button>
  </form>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useExpenseStore } from '@/stores/expense';
import { useGroupStore } from '@/stores/group';

const expenseStore = useExpenseStore();
const groupStore = useGroupStore();

const form = ref({
  title: '',
  amount: 0,
  date: new Date().toISOString().split('T')[0],
  groupId: null
});

const groups = ref([]);

onMounted(() => {
  groups.value = groupStore.groups;
});

const handleSubmit = () => {
  expenseStore.addExpense(form.value);
  form.value = {
    title: '',
    amount: 0,
    date: new Date().toISOString().split('T')[0],
    groupId: null
  };
};
</script>