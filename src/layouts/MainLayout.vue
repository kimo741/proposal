<template>
  <q-layout view="lHr lpR fFf">
    <q-img
      src="right.png"
      class="absolute-bottom-right cover-mob"
      width="600px"
    />
    <q-header class="header-edite bg-transparent">
      <q-toolbar class="q-pr-xl">
        <q-btn
          flat
          dense
          round
          color="black"
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title class="text-center text-black">
          <div v-show="this.$q.screen.lt.md" class="text-h1 q-mt-md">
            Levener
          </div>
          <!--          Levener-->
          <!--        <span class="text-caption block text-grey-3">{{ todaydate }}</span>-->
        </q-toolbar-title>

        <div>
          <DropdownProfile />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      elevated
      content-class="drawer fit"
    >
      <MainDrawer />
    </q-drawer>

    <q-page-container class="main-background">
      <router-view />
    </q-page-container>
    <MobileFotter />
  </q-layout>
</template>

<script>
import MainDrawer from "components/Layout/Drawer/MainDrawer.vue";
import DropdownProfile from "src/components/Account/dropdown-profile.vue";
import MobileFotter from "src/components/Layout/mobile-fotter.vue";

export default {
  name: "MainLayout",
  components: {
    MainDrawer,
    DropdownProfile,
    MobileFotter,
  },
  data() {
    return {
      leftDrawerOpen: false,
      tab: "home",
    };
  },
};
</script>
<style lang="scss">
.q-drawer--left.q-drawer--bordered {
  border: 1px solid #e5e9f2 !important;
}
.main-background {
  background: $mainBackground;
}
.footer-edite {
  height: 60px;
  color: $primary;
  margin: auto;
  text-align: center;
}
.cover-mob {
  @media (max-width: $breakpoint-sm-max) {
    width: 460px !important;
  }
}
</style>
