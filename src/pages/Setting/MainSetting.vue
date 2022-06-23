<template>
  <div>
    <transition
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
