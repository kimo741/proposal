<template>
  <div class="flex-table-header">
    <span class="col-id">
      #
      <q-checkbox
        v-model="checkAll"
        checked-icon="eva-checkmark-square"
        color="secondary"
        class="q-mp-md"
        @click.native="$emit('checkAll', checkAll)"
        keep-colo
        unchecked-icon="eva-square"
      />
    </span>
    <span
      class="cursor-pointer row items-center justify-center"
      v-for="(col, i) in column" :key="i"
      @click="col.sort = !col.sort; $emit('sort', { desc: col.sort , column: col.name })">
        <q-icon
          size="15px"
          style="padding-bottom: 3px"
          color="secondary"
          :name="col.sort ? 'eva-arrow-upward' : 'eva-arrow-downward'"  />
        {{ col.label }}
      </span>
  </div>
</template>

<script>
export default {
  props: ['column'],
  data() {
    return {
      checkAll: false,
    }
  },
  methods: {
    addToSelect( arrayKey, val) {
      this[arrayKey].arr.push(val)
      console.log(this[arrayKey])
    }
  }
}
</script>

