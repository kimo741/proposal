<template>
  <div>
    <div class="row justify-end q-mb-lg mob-edit">
      <q-input
        v-model="search.text"
        bg-color="white"
        dense
        icon="search"
        outlined
        placeholder="Try to search her"
        rounded
        style="max-width: 300px"
        v-on:keyup="emitSearch"
      >
        <template v-slot:append>
          <q-icon
            v-if="search.text !== ''"
            class="cursor-pointer"
            name="close"
            @click="
              search.text = '';
              emitSearch();
            "
          />
          <q-icon v-if="search.text === ''" name="search" />
          <q-icon class="cursor-pointer" :color="filter ? 'red': 'black'" name="eva-funnel-outline">
            <q-menu transition-hide="fade" transition-show="fade">
              <q-list style="min-width: 100px">
                <q-item v-close-popup clickable>
                  <q-item-section>Filter</q-item-section>
                </q-item>
                <q-item
                  v-for="(col, i) in column"
                  :key="i"
                  v-ripple
                  :active="true"
                  clickable
                  @click="emitSelectedItemsSearch(i)"
                >
                  <q-item-section side>
                    <q-checkbox
                      v-model="search.arr"
                      :val="col.name"
                      checked-icon="eva-checkmark-square"
                      :ref="'search' + i"
                      color="secondary"
                      keep-colo
                      unchecked-icon="eva-square"
                    />
                  </q-item-section>
                  <q-item-section class="text-balck">{{
                    col.label
                  }}</q-item-section>
                </q-item>
                <q-separator />
                <q-item v-close-popup clickable>
                  <q-item-section class="text-caption"
                    >Choose search columns</q-item-section
                  >
                </q-item>
                <q-separator />
              </q-list>
            </q-menu>
          </q-icon>
        </template>
      </q-input>
    </div>
  </div>
</template>

<script>
export default {
  props: ["column"],
  data() {
    return {
      search: {
        text: "",
        arr: [],
      },
      filter: false
    };
  },
  methods: {
    emitSelectedItemsSearch(i) {
      this.filter = false
      this.$refs["search" + i][0].$el.click();
      this.emitSearch()
    },
    emitSearch() {
      if (!this.search.arr.length) {
        this.filter = true
        return this.$q.notify('Please choose a search column name.');
      }
      this.$emit("search", this.search);
    },
  },
};
</script>
<style>
.mob-edit {
  @media (max-width: $breakpoint-sm-max) {
    margin: 0 !important;
  }
}
</style>
