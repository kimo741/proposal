<template>
  <div>
    <DrawerHeader />
    <DrawerListContiner />
  </div>
</template>

<script>
import DrawerHeader from "components/Layout/Drawer/DrawerHeader";
import DrawerListContiner from "components/Layout/Drawer/DrawerListContiner";

export default {
  components: {
    DrawerListContiner,
    DrawerHeader,
  },
}
</script>
