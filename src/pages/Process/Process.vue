<template>
  <q-page>
    <div class="" >
    <assign-emp-to-item />
      <assign-stage-to-item  />
      <get-related-item />

    </div>
  </q-page>
</template>

<script>
import AssignEmpToItem from "components/process/assignEmpToItem";
import AssignStageToItem from "components/process/assignStageToItem";
import GetRelatedItem from "components/process/getRelatedItem";
export default {
  components: {GetRelatedItem, AssignStageToItem, AssignEmpToItem}
};
</script>

<style></style>
