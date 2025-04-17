<template>
  <div>
    <ul>
      <li v-for="group in groupStore.groups" :key="group.id" class="group-item">
        <div>
          <strong>{{ group.group_name }}</strong>
        </div>
        <div>
          <button @click="$emit('editGroup', group)">Edit</button>
          <button @click="groupStore.deleteGroup(group.id)">Delete</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useGroupStore } from '@/stores/group';

const groupStore = useGroupStore();

onMounted(() => {
  groupStore.fetchGroups();
});
</script>
