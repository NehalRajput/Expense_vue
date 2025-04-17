<template>
  <AppLayout>
    <h1>Groups</h1>
    <div class="group-page">
      <GroupForm :group="selectedGroup" />
      <GroupList @editGroup="handleEditGroup" />
    </div>
  </AppLayout>
</template>

<script setup>
import { ref } from 'vue';
import AppLayout from '@/components/AppLayout.vue';
import GroupForm from '@/components/Group/GroupForm.vue';
import GroupList from '@/components/Group/GroupList.vue';

const selectedGroup = ref(null);

const handleEditGroup = (group) => {
  selectedGroup.value = group;
};
</script>
