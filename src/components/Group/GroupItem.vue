<template>
  <div class="group-item">
    <div class="group-info">
      <h3>{{ group.name }}</h3>
      <p>{{ group.description }}</p>
      <p>Expenses: {{ expenseCount }}</p>
    </div>
    <button @click="$emit('delete', group.id)">Delete</button>
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

defineEmits(['delete']);
</script>