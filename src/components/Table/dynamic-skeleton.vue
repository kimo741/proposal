<template>
  <div>
    <div class="flex-table">

<!--      <div class="flex-table-header">-->
<!--        <span class="col-id">-->
<!--          #-->
<!--          <q-checkbox-->
<!--            v-model="lodaing"-->
<!--            checked-icon="eva-checkmark-square"-->
<!--            color="secondary"-->
<!--            class="q-mp-md"-->
<!--            keep-colo-->
<!--            unchecked-icon="eva-square"-->
<!--          />-->
<!--        </span>-->
<!--        <span @click="col.sort = !col.sort" class="cursor-pointer row items-center" v-for="(col, i) in column" :key="i">-->
<!--          <q-icon size="15px" style="padding-bottom: 3px" color="secondary" :name="col.sort ? 'eva-arrow-upward' : 'eva-arrow-downward'"  />-->
<!--          {{ col.label }}-->
<!--        </span>-->
<!--      </div>-->

      <div v-for="i in 3" :key="i" class=" flex-table-item">
        <div class="flex-table-cell text-primary col-id">
          <q-skeleton size="15px" />
          <q-skeleton size="15px" class="q-ml-sm" />
        </div>
        <!--        <div class="flex-table-cell col-id"></div>-->

        <div v-for="i in 5" :key="i" class="flex-table-cell"><q-skeleton width="80px" height="15px" class="q-ml-sm" /></div>
      </div>

    </div>
  </div>
</template>

<script>

export default {
props: ['column'],
  data() {
  return {
    lodaing: false
  }
  }
}
</script>

<style lang="scss" scoped>

</style>
