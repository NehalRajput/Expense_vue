<template>
  <div class="group-list">
    <div v-if="groups.length === 0" class="empty-state">
      No groups yet. Create your first group!
    </div>
    
    <GroupItem 
      v-for="group in groups" 
      :key="group.id" 
      :group="group" 
      @delete="handleDelete"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import GroupItem from './GroupItem.vue';
import { useGroupStore } from '@/stores/group';

const groupStore = useGroupStore();

const groups = computed(() => groupStore.groups);

const handleDelete = (id) => {
  groupStore.deleteGroup(id);
};
</script>