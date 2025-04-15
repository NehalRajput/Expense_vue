<template>
  <AppLayout>
    <h1>Groups</h1>
    <div class="group-page">
      <GroupForm />
      <GroupList />
    </div>
  </AppLayout>
</template>

<script setup>
import AppLayout from '@/components/AppLayout.vue';
import GroupForm from '@/components/Group/GroupForm.vue';
import GroupList from '@/components/Group/GroupList.vue';
</script>