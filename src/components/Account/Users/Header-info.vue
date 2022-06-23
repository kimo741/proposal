<template>
  <div class="row text-h1 edit-pading">
    <slot></slot>
    <q-space />
    <ButtonAnimat size="lg" color="black" rounded @click="$emit('addNew')">
      <q-icon name="add" />
      <q-tooltip v-if="!$q.screen.lt.md" class="bg-red-5 text-black">
        Add New Row
      </q-tooltip>
    </ButtonAnimat>
  </div>
</template>

<script>
import HeaderInfoCard from "components/UI/Header-info-card";
import ButtonAnimat from "components/UI/button-animat";
export default {
  components: { ButtonAnimat },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.edit-pading {
  margin-top: 30px;
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
