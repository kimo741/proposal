<template>
  <div>
    <q-breadcrumbs
      class="text-brown"
      active-color="secondary"
      separator-color="black"
    >
      <template v-slot:separator>
        <q-icon size="1.5em" name="chevron_right" />
      </template>

      <q-breadcrumbs-el color="" label="Home" icon="home" to="/" />
      <!-- <q-breadcrumbs-el :label="this.$route.name" /> -->
      <q-breadcrumbs-el :label="this.$route.name" />
    </q-breadcrumbs>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
template
