<template>
  <q-footer
    v-show="this.$q.screen.lt.md"
    elevated
    class="bg-white footer-edite shadow-up-25"
  >
    <!-- :v-model="$route.name" -->
    <q-tabs narrow-indicator align="justify" dense class="text-primary">
      <div class="full-width q-ma-auto flex justify-around">
        <!-- <q-item
              :class="$route.name == 'Dashboard' ? 'q-item.q-router-link--active' : ''"
              :to="{ name :'Dashboard'}">
              <q-tab
              :ripple="true"
              name="home"
              icon="eva-home"
        />
            </q-item> -->
        <!-- <q-item :to="{ name :'Products'}" >
              <q-tab
                :ripple="true"
                name="movies"
                icon="movie"
              />
            </q-item> -->
        <!-- <q-item :to="{ name :'Users'}" >
              <q-tab
                :ripple="true"
                name="alarms"
                icon="eva-person"
                to="/User"
            />
            </q-item> -->
      </div>
    </q-tabs>
  </q-footer>
</template>
<script>
export default {
  data() {
    return {
      tab: "home",
    };
  },
};
</script>
<style lang="scss" scoped></style>

.q-item.q-router-link--active,
