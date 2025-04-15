<template>
  <form @submit.prevent="handleSubmit">
    <div class="form-group">
      <label for="name">Group Name</label>
      <input id="name" v-model="form.name" type="text" required />
    </div>
    
    <div class="form-group">
      <label for="description">Description</label>
      <textarea id="description" v-model="form.description"></textarea>
    </div>
    
    <button type="submit">Create Group</button>
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