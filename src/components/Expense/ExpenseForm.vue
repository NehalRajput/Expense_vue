<template>
  <form @submit.prevent="handleSubmit">
    <div class="form-group">
      <label for="title">Title</label>
      <input id="title" v-model="form.title" type="text" required />
    </div>
    
    <div class="form-group">
      <label for="amount">Amount</label>
      <input id="amount" v-model.number="form.amount" type="number" step="0.01" required />
    </div>
    
    <div class="form-group">
      <label for="date">Date</label>
      <input id="date" v-model="form.date" type="date" required />
    </div>
    
    <div class="form-group">
      <label for="group">Group</label>
      <select id="group" v-model="form.groupId">
        <option value="">No Group</option>
        <option v-for="group in groups" :key="group.id" :value="group.id">
          {{ group.name }}
        </option>
      </select>
    </div>
    
    <button type="submit">Add Expense</button>
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