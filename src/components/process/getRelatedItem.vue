<template>
  <div class=" row container" >
        <!--    header-->
<!--    {{relatedItem.items.stages.stages}}-->
    <div class=" text-h4 edit-pading col-12 col-sm-4">
      Get Related With Items
    </div>
<!--items-->
    <div class="q-pa-xl col-12 col-sm-8 ">
        <div class="">

        <q-select
          label="Item"
          transition-show="flip-up"
          transition-hide="flip-down"
          multiple
          filled
          v-model="selectedItems"
          :options="getItemList"
          style="width: 350px"
        >
          <template v-slot:after>
            <q-btn round dense flat size="lg" icon="send" color="primary"  @click="submit"   />
          </template>
        </q-select>
        </div>
    </div>

      <div v-if="Object.keys(relatedItem).length !== 0 " class="full-width">
            <table border = "1" v-for="( item , i ) in relatedItem.items" :key="i" >
              <tr v-for="(stage , j ) in item.stages" :key="j" >
                {{ stage.name }}
              </tr>
<!--              <tr v-for="(emp , r ) in stage.employees" :key="r" >-->
<!--                {{ emp[r] }}-->
<!--              </tr>-->

            </table>

    </div>


  </div>
</template>



<script>
import { table } from "src/Mixins/DynamicTable";
import { email } from "src/Mixins/EmailVildate";
export default {
  mixins:[table ,email ],
  data(){
    return{
      selectedItems:[]
    }
  },
  computed:{
    getItemList(){
      return this.$store.getters['Item/listItem']
    },
    relatedItem(){
      return this.$store.getters['Process/reatedItem']
    },
  },
  methods:{
    submit(){
      var itemId = this.selectedItems.map( i => i.value )
      console.log(itemId)
      this.$store.dispatch("Process/getRelatedItems" ,
        {item_ids:itemId }).then(
        res =>{this.$q.notify("assign successfully");
        }).catch( err =>{this.$q.notify(err);
        })
    },
  },
  created() {
    this.getDataList("Item/getItemsList");
  },
  updated() {
    // console.log(this.relatedItem)
  }
}
// <table border="1">
//   <tr>
//     <th>emp 1</th>
//     <th>emp 2</th>
//     <th>emp 3</th>
//   </tr>
//   <tr>
//     <td rowSpan="2">stage 1 emp 1</td>
//     <td>stage 1 emp 1</td>
//     <td>stage 1 emp 2</td>
//   </tr>
//   <tr>
//     <td>stage 2 emp 1</td>
//     <td>stage 2 emp 2</td>
//   </tr>
//   <tr>
//     <td colSpan="3">Row 3 Cell 1</td>
//   </tr>
// </table>
</script>

