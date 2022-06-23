<template>
  <div class="row container  " >
    <!--    {{process.employee}}-->
    <div class=" text-h4 edit-pading col-12 col-sm-4">
      Assign Stage To Item
      <!--      {{getItemList}}-->
      <!--      {{ getStageList }}-->
    </div>
<!--        :class="succ ? 'bg-blue-1' : '' "-->
    <div class="q-pa-md col-12 col-sm-8  rounded-borders "
    >
      <q-stepper
        v-model="step"
        vertical
        color="primary"
        animated
      >
        <!--   select employee    -->
        <q-step
          :name="1"
          title="Select Item"
          icon="eva-person-outline"
          :done="step > 1"
        >
          <div>
            Select Item
          </div>
          <div>
            <q-select
              label="Item"
              transition-show="flip-up"
              transition-hide="flip-down"
              filled
              v-model="processData.item_id"
              :options="getItemList"
              style="width: 250px"
            />
          </div>
          <q-stepper-navigation>
            <q-btn @click="stepOne" color="primary" label="Continue" />
          </q-stepper-navigation>
        </q-step>
        <!-- select Items -->
        <q-step
          :name="2"
          title="Select stages"
          caption="Optional"
          icon="playlist_play"
          :done="step > 2"
        >
          <div>
            <div>
              Select multiple stage or one
            </div>
            <div>
              <q-select
                label="stages"
                transition-show="flip-up"
                transition-hide="flip-down"
                filled
                multiple
                v-model="processData.stage_id"
                :options="getStageList"
                style="width: 250px"
              />
            </div>
          </div>
          <q-stepper-navigation>
            <q-btn @click="stepTwo" color="primary" label="Continue" />
            <q-btn flat @click="backStep" color="primary" label="Back" class="q-ml-sm" />
          </q-stepper-navigation>
        </q-step>
        <!--   submit    -->
        <q-step
          :name="3"
          title="Create an ad"
          icon="add_comment"
        >
          <p v-if="processData.item_id">
            <q-icon name="eva-checkmark-circle" color="primary" size="sm" />
            you have selected the item : (  <span class="text-blue">  {{processData.item_id.label}} </span>)
          </p>
          <p class="text-red" v-else  >
            <q-icon name="eva-alert-triangle" color="red-5" size="sm" />
            you are not selected the item ( You must select one item to continue)
          </p>
          <p v-if="processData.stage_id.length">
            <q-icon name="eva-checkmark-circle" color="primary" size="sm" />
            you have selected the employees : ( <span class="text-blue">  {{processData.stage_id.map( doc => doc.label ).toString()}}</span>)
          </p>
          <p class="text-red" v-else>
            <q-icon name="eva-alert-triangle" color="red-5" size="sm" />
            you are not selected any the stage ( You must select one stage at least to continue)
          </p>
          <q-inner-loading :showing="visible">
            <q-spinner-gears size="50px" color="primary" />
          </q-inner-loading>
          <q-stepper-navigation>
            <div class="row justify-between">
              <div class="col-10 col-sm-6 row">
            <q-btn :disable="!succ"  @click="submit" color="primary" label="Assign" />
            <q-btn flat  color="primary" @click="backStep" label="Back" class="q-ml-md" />
              </div>
              <div class="sm-hide xs-hide col-sm-6 row justify-end ">
            <q-btn  outline color="red-3" @click="claear" label="clear" class="" />
              </div>
            </div>
          </q-stepper-navigation>
        </q-step>
      </q-stepper>
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
      step: 1,
      processData: {
        item_id:'',
        stage_id:[],
      }
    }
  },

  computed:{

    getItemList(){
      return this.$store.getters['Item/listItem']
    },
    getStageList(){
      return this.$store.getters['Stage/stageList']
    },
    succ(){
      if (this.processData.item_id && this.processData.stage_id.length ){
        return true
      }else {
        return false
      }
    },
  },
  methods:{
    stepOne(){
      this.step = 2;
    },
    stepTwo (){
      this.step = 3;
    },
    backStep(){
      this.step = this.step-1;
    },
    submit(){
      this.visible = true
      var item = this.processData.item_id.value
      var stage = this.processData.stage_id.map( e => e.value)
      this.$store.dispatch("Process/assignStageToItem" ,
        {item_id :item ,stage_ids: stage }).then(
        res =>{
          this.visible = false
          this.$q.notify("assign successfully");
        }
      ).catch( err =>{
        this.visible = false
        this.$q.notify(err);
        }
      )
    },
    claear(){
      this.step = 1
      this.processData = {
        item_id:'',
          stage_id:[],
      }
    }
  },
  created() {
    this.getDataList("Item/getItemsList");
    this.getDataList("Stage/getStageList");
  }
}
</script>

