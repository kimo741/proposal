<template>
  <q-card class="col-6 q-px-md cursor-pointer">
    <q-card-section class="text-center">
      {{ caption }}
      <br>
      <strong>{{ title }}</strong>
    </q-card-section>
    <q-separator />
    <q-card-section class="flex flex-center">
      <div>{{ count }}</div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },

    caption: {
      type: String,
      default: ''
    },

    count: {
      type: Number,
      default: null
    },
  }
}
</script>
