<template>
  <form @submit.prevent="handleSubmit" class="form-container">
    <h2 class="form-title">{{ isEditing ? 'Edit Expense' : 'Add New Expense' }}</h2>
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
    
    <div class="form-actions">
      <button type="submit" class="submit-button">{{ isEditing ? 'Update Expense' : 'Add Expense' }}</button>
      <button v-if="isEditing" type="button" @click="cancelEdit" class="cancel-button">Cancel</button>
    </div>
  </form>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useExpenseStore } from '@/stores/expense';
import { useGroupStore } from '@/stores/group';

const expenseStore = useExpenseStore();
const groupStore = useGroupStore();

const props = defineProps({
  editingExpense: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(['cancel-edit']);

const isEditing = ref(false);
const form = ref({
  id: null,
  title: '',
  amount: 0,
  date: new Date().toISOString().split('T')[0],
  groupId: null
});

const groups = ref([]);

onMounted(() => {
  groups.value = groupStore.groups;
});

watch(() => props.editingExpense, (newVal) => {
  if (newVal) {
    isEditing.value = true;
    form.value = {
      id: newVal.id,
      title: newVal.title,
      amount: newVal.amount,
      date: newVal.date,
      groupId: newVal.groupId
    };
  } else {
    resetForm();
  }
});

const handleSubmit = () => {
  if (isEditing.value) {
    expenseStore.updateExpense(form.value);
  } else {
    expenseStore.addExpense(form.value);
  }
  resetForm();
};

const cancelEdit = () => {
  resetForm();
  emit('cancel-edit');
};

const resetForm = () => {
  isEditing.value = false;
  form.value = {
    id: null,
    title: '',
    amount: 0,
    date: new Date().toISOString().split('T')[0],
    groupId: null
  };
};
</script>

<style scoped>
.form-actions {
  display: flex;
  gap: 1rem;
}

.cancel-button {
  background-color: #f44336;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.cancel-button:hover {
  background-color: #d32f2f;
}
</style>