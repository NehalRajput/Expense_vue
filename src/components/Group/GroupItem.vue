<template>
  <div class="group-item">
    <div class="group-info">
      <h3>{{ group.name }}</h3>
      <p>{{ group.description }}</p>
      <p>Expenses: {{ expenseCount }}</p>
    </div>
    <div class="btn-group">
      <button class="action-button edit" @click="$emit('edit', group.id)">Edit</button>
      <button class="action-button delete" @click="$emit('delete', group.id)">Delete</button>
    </div>
  </div>
</template>


<script setup>
import { computed } from 'vue';
import { useExpenseStore } from '@/stores/expense';

const props = defineProps({
  group: {
    type: Object,
    required: true
  }
});

const expenseStore = useExpenseStore();

const expenseCount = computed(() => {
  return expenseStore.getExpensesByGroup(props.group.id).length;
});

defineEmits(['edit', 'delete']);
</script>
