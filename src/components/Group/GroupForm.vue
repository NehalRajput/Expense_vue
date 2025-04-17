<template>
  <form @submit.prevent="handleSubmit" class="form-container">
    <h2 class="form-title">{{ formTitle }}</h2>
    <div class="form-group">
      <label for="name">Group Name</label>
      <input id="name" v-model="form.group_name" type="text" required class="form-input" placeholder="e.g., Vacation, Home, etc." />
    </div>

   
    <button type="submit" class="submit-button">{{ formButtonText }}</button>
  </form>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useGroupStore } from '@/stores/group';

const groupStore = useGroupStore();

const form = ref({
  name: ''

});

const formTitle = ref('Create New Group');
const formButtonText = ref('Create Group');
const editingGroupId = ref(null);

const props = defineProps({
  group: {
    type: Object,
    required: false
  }
});

watch(() => props.group, (newGroup) => {
  if (newGroup) {
    form.value = { ...newGroup };
    formTitle.value = 'Edit Group';
    formButtonText.value = 'Save Changes';
    editingGroupId.value = newGroup.id;
  }
});

const handleSubmit = () => {
  if (editingGroupId.value) {
    groupStore.updateGroup(editingGroupId.value, form.value);
  } else {
    groupStore.addGroup(form.value);
  }

  form.value = {
    name: ''
   
  };
};
</script>
