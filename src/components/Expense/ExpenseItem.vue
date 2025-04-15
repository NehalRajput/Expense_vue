<template>
  <div class="expense-item">
    <div class="expense-info">
      <h3>{{ expense.title }}</h3>
      <p>${{ expense.amount.toFixed(2) }}</p>
      <p>{{ formatDate(expense.date) }}</p>
      <p v-if="expense.groupId">Group: {{ groupName }}</p>
    </div>
    <button @click="$emit('delete', expense.id)">Delete</button>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useGroupStore } from '@/stores/group';
import { formatDate } from '@/utills/formatDate';

const props = defineProps({
  expense: {
    type: Object,
    required: true
  }
});

const groupStore = useGroupStore();

const groupName = computed(() => {
  if (!props.expense.groupId) return '';
  const group = groupStore.getGroupById(props.expense.groupId);
  return group ? group.name : '';
});

defineEmits(['delete']);
</script>