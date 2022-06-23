<template>
  <div class="row container">
<!--    {{process.employee}}-->
    <div class=" text-h4 edit-pading col-12 col-sm-4">
      Assign Employee & Stage To Item
<!--      {{getItemList}}-->
<!--      {{ getStageList }}-->
    </div>
    <div class="q-pa-md col-12 col-sm-8 ">
      <q-stepper
              v-model="step"
              vertical
              color="primary"
              animated
      >
        <!--   select employee    -->
        <q-step
              :name="1"
              title="Select employee"
              icon="eva-person-outline"
              :done="step > 1"
        >
         <div>
              Select multiple employees or one
         </div>
          <div>
            <q-select
              label="Employees"
              transition-show="flip-up"
              transition-hide="flip-down"
              filled
              multiple
              v-model="process.employee"
              :options="getEmpList"
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
              title="Select Item"
              caption="Optional"
              icon="playlist_play"
              :done="step > 2"
        >
          <div>
            <div>
                Select an Item
            </div>
            <div>
                <q-select
                  label="Items"
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  filled
                  v-model="process.item_id"
                  :options="getItemList"
                  style="width: 250px"
                />
            </div>
          </div>
          <q-stepper-navigation>
            <q-btn @click="stepTwo" color="primary" label="Continue" />
            <q-btn flat @click="backStep" color="primary" label="Back" class="q-ml-sm" />
          </q-stepper-navigation>
        </q-step>
          <!-- select stage  -->
        <q-step
              :name="3"
              title="Select Stage"
              caption="Optional"
              icon="create_new_folder"
              :done="step > 3"
        >
          <div>
            <div>
              Select an Stage
            </div>
                  <div>
              <q-select
                label="Stages"
                transition-show="flip-up"
                transition-hide="flip-down"
                filled
                v-model="process.stage_id"
                :options="getStageList"
                style="width: 250px"
              />
            </div>
          </div>
          <q-stepper-navigation>
            <q-btn @click="stepThree" color="primary" label="Continue" />
            <q-btn flat @click="backStep" color="primary" label="Back" class="q-ml-sm" />
          </q-stepper-navigation>
        </q-step>
        <!--   submit    -->
        <q-step
          :name="4"
          title="Create an ad"
          icon="add_comment"
        >
          <p v-if="process.employee.length">
            <q-icon name="eva-checkmark-circle" color="primary" size="sm" />
            you have selected the employees : ( <span class="text-blue">  {{process.employee.map( doc => doc.label ).toString()}}</span>)
          </p>
          <p class="text-red" v-else>
            <q-icon name="eva-alert-triangle" color="red-5" size="sm" />
          you are not selected any the employee ( You must select one employee at least )
          </p>
          <p v-if="process.item_id">
            <q-icon name="eva-checkmark-circle" color="primary" size="sm" />
            you have selected the item : (  <span class="text-blue">  {{process.item_id.label}} </span>)
          </p>
          <p class="text-red" v-else  >
            <q-icon name="eva-alert-triangle" color="red-5" size="sm" />
            you are not selected the item  ( You must select item to continue )
          </p>
          <p v-if="process.stage_id">
            <q-icon name="eva-checkmark-circle" color="primary" size="sm" />
            you have selected the stage : ( <span class="text-blue">{{ process.stage_id.label }}</span>)
          </p>
          <p class="text-red" v-else>
            <q-icon name="eva-alert-triangle" color="red-5" size="sm" />
            you are not selected the stage ( You must select stage to continue )
          </p>
          <q-stepper-navigation>
            <div class="row justify-between">
              <div class="col-10 col-sm-6 row">
                    <q-btn :disable="succ"  @click="submit" color="primary" label="Assign" class="" />
                    <q-btn flat  color="primary" @click="backStep" label="Back" class="q-ml-sm " />
              </div>
              <div class="sm-hide xs-hide col-sm-6 row justify-end ">
                   <q-btn outline color="red-3" @click="claear" label="clear" class="" />
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
      process:{
        item_id:'',
        stage_id:'',
        employee:[]
      }
    }
  },

  computed:{
    getEmpList(){
    return this.$store.getters['Employee/empList']
    },
    getItemList(){
    return this.$store.getters['Item/listItem']
    },
    getStageList(){
    return this.$store.getters['Stage/stageList']
    },
    succ(){
      if (this.process.item_id && this.process.stage_id && this.process.employee.length ){
       return false
      }else {
        return true
      }
    },
  },
  methods:{
    claear(){
      this.step = 1
      this.process = {
        item_id:'',
        stage_id:'',
        employee:[]
      }
    },
    stepOne(){
      this.step = 2;
    },
    stepTwo (){
      this.step = 3;
    },
    stepThree(){
      this.step = 4;
    },
    backStep(){
      this.step = this.step-1;
    },
    submit(){
      this.visible = true
      var item = this.process.item_id.value
      var stage = this.process.stage_id.value
      var opjEmp = [];
      var emp =this.process.employee.map(e =>
      { opjEmp.push(Object.assign({},
                  {id: e.value} ,
          { hours :e.hour_cost}
      ))})
        // console.log( item,  stage , opjEmp  )
    this.$store.dispatch("Process/assignEmpToStage" ,
      {item_id :item ,stage_id: stage , employee:opjEmp }).then(
        res =>{
        this.visible = false
        this.$q.notify("assign successfully");
      }).catch(err =>{
      this.visible = false
      this.$q.notify(err);
    })
    },
    // Object.assign({} , {i.value ,i.hour_cost })
  },
  created() {
    this.getDataList("Employee/getListEmployee");
    this.getDataList("Item/getItemsList");
    this.getDataList("Stage/getStageList");
  }
}
</script>

