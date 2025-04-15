import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useGroupStore = defineStore('group', () => {
  const groups = ref([]);
  
  // Local storage key
  const GROUPS_KEY = 'vue-expense-tracker-groups';
  
  // Load from localStorage
  if (localStorage.getItem(GROUPS_KEY)) {
    groups.value = JSON.parse(localStorage.getItem(GROUPS_KEY));
  }
  
  // Save to localStorage
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
  
  function getGroupById(id) {
    return groups.value.find(group => group.id === id);
  }
  
  return {
    groups,
    addGroup,
    deleteGroup,
    getGroupById
  };
});