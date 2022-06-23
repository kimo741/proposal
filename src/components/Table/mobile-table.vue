<template>
  <div>
    <q-card
      v-for="(row, i) in data"
      :key="i"
      @click.native="emitSelectedItemsMobile(i)"
      class="q-my-lg"
    >
      <q-list>
        <q-item>
          <q-item-section>
            <q-item-label>
              {{ i + 1 }} )
              <q-checkbox
                v-model="selectedUsers"
                :val="row"
                :ref="'select' + i"
                checked-icon="eva-checkmark-square"
                class=""
                color="secondary"
                keep-colo
                left-label
                unchecked-icon="eva-square"
              />
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-separator />

        <q-item v-for="(col, i) in column" :key="i">
          <q-item-section>
            <q-item-label caption>{{ col.label }}</q-item-label>
            <q-item-label>{{ row[col.name] }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </div>
</template>
<script>
export default {
  props: ["data", "actions", "column"],
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
<style lang="scss"></style>
<template>
  <div>
    <q-card
      v-for="(row, i) in data"
      :key="i"
      @click.native="emitSelectedItemsMobile(i)"
      class="q-my-lg"
    >
      <q-list>
        <q-item>
          <q-item-section>
            <q-item-label>
              {{ i + 1 }} )
              <q-checkbox
                v-model="selectedUsers"
                :val="row"
                :ref="'select' + i"
                checked-icon="eva-checkmark-square"
                class=""
                color="secondary"
                keep-colo
                left-label
                unchecked-icon="eva-square"
              />
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-separator />

        <q-item v-for="(col, i) in column" :key="i">
          <q-item-section>
            <q-item-label caption>{{ col.label }}</q-item-label>
            <q-item-label>{{ row[col.name] }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </div>
</template>
<script>
export default {
  props: ["data", "actions", "column"],
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
<style lang="scss"></style>
