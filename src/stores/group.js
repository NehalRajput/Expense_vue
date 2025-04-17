import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useGroupStore = defineStore('group', () => {
  const groups = ref([]);
  const GROUPS_KEY = 'vue-expense-tracker-groups';

  if (localStorage.getItem(GROUPS_KEY)) {
    groups.value = JSON.parse(localStorage.getItem(GROUPS_KEY));
  }

  function saveToLocalStorage() {
    localStorage.setItem(GROUPS_KEY, JSON.stringify(groups.value));
  }

  function addGroup(group) {
    groups.value.push({
      id: Date.now(),
      ...group
    });
    saveToLocalStorage();
  }

  function deleteGroup(id) {
    groups.value = groups.value.filter(group => group.id !== id);
    saveToLocalStorage();
  }

  function updateGroup(id, updatedGroup) {
    const index = groups.value.findIndex(group => group.id === id);
    if (index !== -1) {
      groups.value[index] = { id, ...updatedGroup };
      saveToLocalStorage();
    }
  }

  function getGroupById(id) {
    return groups.value.find(group => group.id === id);
  }

  return {
    groups,
    addGroup,
    deleteGroup,
    updateGroup,
    getGroupById
  };
});
