<template>
  <form @submit.prevent="handleSubmit" class="form-container">
    <h2 class="form-title">Create New Group</h2>
    <div class="form-group">
      <label for="name">Group Name</label>
      <input id="name" v-model="form.name" type="text" required class="form-input" placeholder="e.g., Vacation, Home, etc." />
    </div>
    
    <div class="form-group">
      <label for="description">Description</label>
      <textarea id="description" v-model="form.description" class="form-input textarea" placeholder="Optional group description"></textarea>
    </div>
    
    <button type="submit" class="submit-button">Create Group</button>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { useGroupStore } from '@/stores/group';

const groupStore = useGroupStore();

const form = ref({
  name: '',
  description: ''
});

const handleSubmit = () => {
  groupStore.addGroup(form.value);
  form.value = {
    name: '',
    description: ''
  };
};
</script>