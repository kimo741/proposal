<template>
  <div>

  </div>
</template>
<script>
export default {
  props: ["data", "actions"],
  data() {
    return {};
  },
  computed: {
    selectedUsers: {
      get() {
        return this.$store.getters["getSelectedUsers"];
      },
    },
  },

  methods: {
    selectedItems(row) {
      this.$store.dispatch("updateSelected", row);
      console.log(this.selectedUsers);
    },
  },
};
</script>
<style lang="scss" scoped></style>
