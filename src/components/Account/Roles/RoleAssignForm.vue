<template>
  <q-list separator bordered padding>
    <q-item>
      <q-item-section>
        <q-item-label overline>Assign permission to role</q-item-label>
        <q-item-label> {{ row.name }} </q-item-label>
        <q-item-label caption>Every user will have this role will be able to take the assigned permissions.</q-item-label>
      </q-item-section>
    </q-item>

    <q-separator spaced />
    <q-item-label header class="text-primary">Permissions</q-item-label>
<!--{{ ids }}-->
<!--    <q-item-->
<!--      :active="true" active-class="text-primary "-->
<!--      clickable-->
<!--      v-ripple-->
<!--      @click="$refs['checkAllIDs'][0].$el.click()" >-->
<!--      <q-item-section class="">Check all</q-item-section>-->
<!--      <q-item-section side>-->
<!--        <q-checkbox size="md" ref="checkAllIDs" v-model="ids" @change="" val="all"  />-->
<!--      </q-item-section>-->
<!--    </q-item>-->

    <q-item
      :active="true" active-class="text-primary "
      @click="$refs['item' + i][0].$el.click()"
      clickable
      v-ripple
      v-for="( permission, i ) in permissionsList"
      :key="i" >
      <q-item-section class="text-capitalize">{{ permission.name }}</q-item-section>
      <q-item-section side>
        <q-checkbox size="md" :ref="'item' + i " v-model="ids" :val="permission.val"  />
      </q-item-section>
    </q-item>

    <q-separator spaced />
    <q-item-label header class="text-primary">Permissions</q-item-label>
    <q-item >
      <q-item-section>
        <q-separator class="q-mb-md"/>
        <div class="q-px-lg bg-white q-gutter-x-md">
          <q-btn color="red" label="cancel" outline @click="$store.state.global.formDrawerOpen = false" />
          <q-btn color="secondary" label="save" @click="submit" />
        </div>
      </q-item-section>
    </q-item>



    <q-separator spaced inset="item" />
    <q-inner-loading :showing="visible">
      <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading>
  </q-list>

</template>
<script>
import {email} from "src/Mixins/EmailVildate";
export default {
  props: ['row'],
  mixins: [email],
  data() {
    return {
      ids: [],
      checkAllIDs: [],
      isPwd: false,
      permissionsList: [],
      payload:[],
    }
  },

  methods: {
    async submit() {
      this.visible = true
      this.payload = {
        role_id: this.row.id,
        perm_ids: this.ids
      }
      await this.$store.dispatch('Roles/assignPermissionToRole', this.payload)
        .then( data  => {
          this.visible = false
          this.$store.commit('OPENE_FORM_DROWER')
          this.$q.notify('Data add successfully')
        })
        .catch( err => {
          this.error(err)
        })
    },
    async getData(){
      this.visible = true
      await this.$store.dispatch("Permissions/getAssgendPermissions", this.row.id).then(data => {
        this.ids = data.map(item => {
          return item.id
        })
      })
      await this.$store.dispatch("Permissions/getPermissionsList", this.payload).then(() => {
        const list = this.$store.getters['Permissions/listOfPermissions']
        list.forEach((item, i) => {
          // this.checkAllIDs[i] = item.value
          this.permissionsList[i] =  {
            status:  false,
            name: item.label.replace('-', ' '),
            val: item.value
          }
        })
        this.visible = false
      });
    }

  },
  computed: {

  },
  created() {
    this.getData()
  }
};
</script>
<style lang="scss" scoped>
.form {
  text-align: center;
  margin: auto !important;
  width: 100% !important;
  text-align: center;
}

.edit-width {
  width: 80% !important;
  margin: auto !important;
}
</style>
