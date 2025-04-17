import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useGroupStore = defineStore('group', () => {
  const groups = ref([]);

  //  Fetch groups from PHP API
  async function fetchGroups() {
    try {
      const res = await fetch('http://localhost:8000/expense_api/api/get-groups.php');
      const data = await res.json();
      groups.value = data.groups;
    } catch (err) {
      console.error('Failed to fetch groups:', err);
    }
  }
 

  // Add group to backend
  async function addGroup(group) {
    try {
      const res = await fetch('http://localhost:8000/expense_api/api/add-group.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(group)
      });
      const data = await res.json();
      if (data.status === 'success') {
        fetchGroups(); // refresh after adding
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error('Error adding group:', err);
    }
  }

  //  Update group
  async function updateGroup(id, group) {
    try {
      const res = await fetch('http://localhost:8000/expense_api/api/update-group.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...group })
      });
      const data = await res.json();
      if (data.status === 'success') {
        fetchGroups();
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error('Error updating group:', err);
    }
  }

  //  Delete group
  async function deleteGroup(id) {
    try {
      const res = await fetch('http://localhost:8000/expense_api/api/delete-group.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      const data = await res.json();
      if (data.status === 'success') {
        fetchGroups();
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error('Error deleting group:', err);
    }
  }

  return {
    groups,
    fetchGroups,
    addGroup,
    updateGroup,
    deleteGroup
  };
});
