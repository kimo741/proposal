<template>
  <div>
    <q-avatar class="cursor-pointer">
      <img src="https://cdn.quasar.dev/img/avatar.png" />
      <q-menu
      transition-show="slide-left"           transition-hide="slide-right">
        <q-list style="min-width: 150px">
          <q-item
            v-for="( pr , i ) in profile" :key="i"
            clickable
            v-close-popup
            :to="{ name : pr.link }"
            >
            <q-item-section >
              <div class="row font-edite" >
                <div class="col-2">
                    <q-icon :name="pr.icon" />
                </div>
                <div class="col-10">
                    {{pr.lable}}
                </div >
              </div>
           </q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-avatar>
  </div>
</template>
<script>
export default {
  data(){
    return{
      profile:[
        {
          lable:"Profile",
          icon:'eva-person',
          link:'Profile'
        },
        {
          lable:"Notdication",
          icon:'eva-bell',
          link:''
        },
        {
          lable:"help",
          icon:'',
          link:''
        },
        {
          lable:"Logout",
          icon:'eva-log-out',
          link:''
        },
      ]
    }
  }
}

</script>
<style lang="scss" scoped>
.font-edite{
  font-size: 15px;
  font-weight: 500;
}
</style>
