<template>
  <div class="">
    <q-card flat class="full-width">
      <q-skeleton class="full-width" height="50px" square />

      <q-card-section height="200px">
        <q-skeleton
          width="60%"
          height="30px"
          type="text"
          class="text-subtitle1"
        />
        <q-skeleton height="30px" type="text" class="text-subtitle1" />
        <q-skeleton
          width="80%"
          height="30px"
          type="text"
          class="text-caption"
        />
        <q-skeleton height="30px" type="text" class="text-subtitle1" />
        <q-skeleton
          width="40%"
          height="30px"
          type="text"
          class="text-subtitle1"
        />
        <q-skeleton
          width="100%"
          height="30px"
          type="text"
          class="text-caption"
        />
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss"></style>
