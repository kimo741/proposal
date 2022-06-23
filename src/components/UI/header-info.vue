<template>
  <div class="row text-h1 edit-pading q-pa-xl">
    <slot></slot>
    <q-space />
    <q-btn
    @click="$emit('addNew')"
    color="black"
    rounded
       >
      <q-icon name="add" />
      <q-tooltip v-if="!$q.screen.lt.md" class="bg-red-5 text-black">
        Add New Row
      </q-tooltip>
    </q-btn>
  </div>
</template>

<script>
export default {

  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.edit-pading {
  @media (max-width: $breakpoint-xs-max) {
    margin: 30px 30px 0 0 !important;
    padding: 0 !important;
    height: min-content !important;
  }
  .eddit-head {
    @media (max-width: $breakpoint-xs-max) {
    }
  }
}
</style>
