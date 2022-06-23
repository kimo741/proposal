<template>
  <div class="container page-content">
    <DynamicSearch
      :column="column"
      @search="
        (val) => {
          search = val;
          emitSearch(val);
        }
      "
    />

    <div class="q-gutter-x-md q-mb-lg row justify-center">
      <q-slide-transition>
        <!-- change template to div for transiton 👆 -->
        <div v-if="selected.length">
          <q-btn
            v-for="(action, i) in actions"
            :key="i"
            :color="action.color"
            :icon="action.icon"
            flat
            round
            size="md"
            @click="emitAction(action.event)"
          >
            <q-tooltip>
              {{ action.label }}
            </q-tooltip>
          </q-btn>
        </div>
      </q-slide-transition>
    </div>

    <div v-if="!loading" class="flex-table">
      <!--    Right click Actions Massage    -->
      <q-tooltip v-if="$q.platform.is.desktop" class="bg-amber text-black">
        Right/Click To Show Actions
      </q-tooltip>
      <!--    Table Header    -->
      <template v-if="column.length">
        <DynamicHeader
          v-if="!$q.screen.lt.md"
          :column="column"
          @checkAll="checkAll"
          @sort="emitSort"
        />
      </template>
      <!--    Table Row    -->

      <!--    List Row    -->
      <template v-if="rows.length">
        <!--    List Row    -->
        <template v-if="!$q.screen.lt.md">
          <div v-for="(row, i) in rows"
               :class="selected.filter((item) => item.id === row.id).length ?
                'active-row':'back' "
               :key="i" class="flex-table-item">
            <!--    Right click Actions    -->
            <q-menu context-menu touch-position>
              <q-list bordered class="q-pa-sm" dense style="min-width: 100px">
                <q-item class="q-py-md text-grey-8">
                  <q-item-section>Select Action</q-item-section>
                </q-item>
                <q-separator />
                <q-item-label
                  v-for="(action, i) in actions"
                  :key="i"
                  v-close-popup
                  v-ripple
                  class="text-black cursor-pointer"
                  clickable
                  header
                  @click="emitSingelAction(action.event, row)"
                  >{{ action.label }}
                </q-item-label>
              </q-list>
            </q-menu>
            <!--    Checkbox To Select row    -->
            <div class="flex-table-cell text-primary col-id">
              {{ i + 1 }})
              <q-checkbox
                v-model="selected"
                :val="row"
                checked-icon="eva-checkmark-square"
                class="q-mp-md"
                color="secondary"
                keep-colo
                left-label
                unchecked-icon="eva-square"
                @click.native="selectedItems(row)"
              />
            </div>

            <!--    Row Cell   -->
            <div
              v-for="(col, i) in column"
              :key="i"
              class="flex-table-cell text-center"
              :style="'width: calc(100% / ' + (column.length + 1) + ');'"
            >
              <div class="full-width">
                <div v-if="!col.custom">
                  {{ row[col.name] }}
                </div>

                <q-avatar
                  square
                  size="50px"
                  v-if="col.isImage && col.custom"
                  class="text-center"
                >
                  <q-img :src="row[col.name]" />
                </q-avatar>

                <a
                  class="text-secondary"
                  :href="'mailto:' + row[col.name]"
                  v-if="col.email && col.custom"
                >
                  {{ row[col.name] }}
                </a>

                <a
                  class="text-secondary"
                  :href="'tel:' + row[col.name]"
                  v-if="col.phone && col.custom"
                >
                  {{ row[col.name] }}
                </a>

                <div v-if="col.name_en && col.custom">
                  {{ row[col.name].en }}
                </div>

                <div v-if="col.name_ar && col.custom">
                  {{ row[col.name].ar }}
                </div>

                <div v-if="col.desc_en && col.custom">
                  {{ row[col.name].en }}
                </div>

                <div v-if="col.desc_ar && col.custom">
                  {{ row[col.name].ar }}
                </div>

                <q-chip
                  :color="row[col.name] === 'publish' ? 'teal' : 'red'"
                  text-color="white"
                  outline
                  :label="row[col.name]"
                  v-if="col.cat_state && col.custom"
                />

                <q-chip
                  :color="row[col.name] === 'offer' ? 'teal' : 'red'"
                  text-color="white"
                  outline
                  :label="row[col.name]"
                  v-if="col.offer_type && col.custom"
                />

                <q-chip
                  :color="row[col.name] === 'main' ? 'teal' : 'red'"
                  text-color="white"
                  outline
                  :label="row[col.name]"
                  v-if="col.type && col.custom"
                />

                <q-chip
                  :color="sub_type[row[col.name]]"
                  text-color="white"
                  class="glossy"
                  :label="row[col.name]"
                  v-if="col.sub_type && col.custom"
                />

                <q-chip
                  :color="row[col.name.value] !== null ? 'red-3' : 'teal'"
                  text-color="white"
                  :outline="row[col.name.value] === null ? true : false"
                  :label="row[col.name]"
                  v-if="col.inv_parent && col.custom"
                />
                <q-chip
                  :color="row[col.name.value] !== null ? 'red-3' : 'teal'"
                  text-color="white"
                  outline
                  :label="row[col.name]"
                  v-if="col.end_date && col.custom"
                />
              </div>
            </div>
          </div>
        </template>

        <!--    End List Row    -->

        <!--    Grid Row    -->
        <template v-else>
          <div>
            <!--    Grid Row    -->
            <q-card
              v-for="(row, i) in rows"
              :key="i"
              @click.native="emitSelectedItemsMobile(i)"
              class="q-my-lg card-edite"
              :class="
                selected.filter((item) => item.id === row.id).length
                  ? 'active-card'
                  : 'back'
              "
            >
              <q-list>
                <q-item class="card-edite__container">
                  <q-item-section>
                    <q-item-label>
                      {{ i + 1 }} )
                      <q-checkbox
                        v-model="selected"
                        :val="row"
                        :ref="'select' + i"
                        checked-icon="eva-checkmark-square"
                        class=""
                        color="secondary"
                        keep-colo
                        left-label
                        unchecked-icon="eva-square"
                      />
                    </q-item-label>
                  </q-item-section>
                </q-item>

                <q-separator />

                <q-item
                  v-for="(col, i) in column"
                  :key="i"
                  class="card-edite__container--content"
                >
                  <q-item-section>
                    <q-item-label caption>{{ col.label }}</q-item-label>
                    <q-item-label>
                      <div v-if="!col.custom">
                        {{ row[col.name] }}
                        <q-separator />
                      </div>

                      <q-avatar
                        square
                        size="50px"
                        v-if="col.isImage && col.custom"
                        class="text-center"
                      >
                        <q-img :src="row[col.name]" />
                        <q-separator />
                      </q-avatar>

                      <a
                        class="text-secondary"
                        :href="'mailto:' + row[col.name]"
                        v-if="col.email && col.custom"
                      >
                        {{ row[col.name] }}
                        <q-separator />
                      </a>

                      <a
                        class="text-secondary"
                        :href="'tel:' + row[col.name]"
                        v-if="col.phone && col.custom"
                      >
                        {{ row[col.name] }}
                        <q-separator />
                      </a>

                      <div v-if="col.name_en && col.custom">
                        {{ row[col.name].en }}
                        <q-separator />
                      </div>

                      <div v-if="col.name_ar && col.custom">
                        {{ row[col.name].ar }}
                        <q-separator />
                      </div>

                      <div v-if="col.desc_en && col.custom">
                        {{ row[col.name].en }}
                        <q-separator />
                      </div>

                      <div v-if="col.desc_ar && col.custom">
                        {{ row[col.name].ar }}
                        <q-separator />
                      </div>

                      <q-chip
                        :color="row[col.name] === 'publish' ? 'teal' : 'red'"
                        text-color="white"
                        outline
                        :label="row[col.name]"
                        v-if="col.cat_state && col.custom"
                      />
                      <q-separator />
                      <!--                      {{ row[col.name] }}-->
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card>
          </div>
        </template>
        <!--    Grid Row    -->
      </template>
      <template v-else>
        <no-data-animate
          text="Sorry! no Data founded in this table try to add new row"
        />
      </template>
    </div>

    <SkeletonMobile v-else-if="$q.screen.lt.md" />
    <DynamicSkeleton v-else-if="!$q.screen.lt.md" :column="column" />

    <template v-if="!loading && rows.length">
      <div class="q-pa-lg flex flex-center">
        <q-pagination
          v-model="pagination.current"
          :boundary-numbers="false"
          :max="pagination.last_page"
          @input="$emit('pagination', pagination)"
          :max-pages="6"
          color="red-4"
        />
      </div>
      total rows {{ data.total }} per page
      <q-select
        falt
        color="secondary"
        @input="$emit('pagination', pagination)"
        v-model="pagination.per_page"
        :options="per_pageOptions"
        style="width: 60px"
        class="inline-block"
      />
    </template>
  </div>
</template>

<script>
import DynamicSkeleton from "components/Table/dynamic-skeleton";
import DynamicSearch from "components/Table/dynamic-search";
import DynamicHeader from "components/Table/dynamic-header";
import SkeletonMobile from "components/UI/sketon-mobile.vue";
import noDataAnimate from "components/Table/no-data-animate.vue";
import { date } from "quasar";

export default {
  components: {
    DynamicSearch,
    DynamicSkeleton,
    DynamicHeader,
    SkeletonMobile,
    noDataAnimate,
  },
  props: ["actions", "data", "column", "loading", "show"],
  data() {
    return {
      left: true,
      pagination: {
        current: 1,
        last_page: 1,
        per_page: 10,
      },
      per_pageOptions: [10, 20, 30, 50, 100],
      selected: [],
      sub_type: {
        online: "teal",
        offline: "blue-grey",
        hub: "orange",
        maintenance: "orange",
        recycling: "red",
      },
      search: {
        text: "",
        arr: [],
      },
    };
  },
  watch: {
    data(val) {
      this.pagination.last_page = val.last_page;
      this.pagination.per_page = val.per_page;
    },
  },
  computed: {
    selectedUsers: {
      get() {
        return this.$store.getters["getSelectedUsers"];
      },
    },
    rows() {
      return this.data.data;
    },
  },
  filters: {
    fromatDate(val) {
      return date.formatDate(val, "D/M/YY h:m");
    },
  },
  methods: {
    addToSelect(arrayKey, val) {
      this[arrayKey].arr.push(val);
      // console.log(this[arrayKey]);
    },
    emitSearch(val) {
      this.pagination.current = 1;
      this.$emit("search", this.search);
    },
    emitSelectedItems() {
      console.log("Selected Items updated! ");
    },
    emitSelectedItemsMobile(i) {
      const el = this.$refs["select" + i][0].$el.click();
      console.log("Selected Items updated mobile! ");
    },
    emitSort(val) {
      console.log("Sort Row! ", val);
      this.$emit("sort", val);
    },
    emitAction(val) {
      console.log("Emit Action => ", val);
      this.$emit(val, this.selected);
    },
    emitSingelAction(action, row) {
      console.log("Emit Singel Row  => ", action);
      this.$emit(action, [row]);
    },
    checkAll(val) {
      if (!val) return (this.selected = []);
      this.selected = this.rows;
      console.log("All Items Selected! ");
    },
  },
};
</script>

<style lang="scss" scoped>
.but__mob-edite {
  @media (max-width: $breakpoint-sm-max) {
    margin: 0px !important;
  }
}
.card-edite {
  @media (max-width: $breakpoint-sm-max) {
    border-radius: 20px;
    margin: 20px auto !important;
    box-shadow: 0px 20px 60px 0px rgb(11 34 56 / 10%);
    border: 1px solid rgba(60, 70, 94, 0.144);
    display: block;
    position: relative;
    transition: all 0.4s ease-in-out;
  }
  &__container {
    &--content {
      @media (max-width: $breakpoint-sm-max) {
        margin: 10px;
        font-size: 15px;
      }
    }
  }
}
.active-card {
  transition: all 0.4s ease-in-out;
  background-color: $blue-grey-1;
  transform: scale(0.9);
  display: block;
}
.active-row{
  transition: all 0.4s ease-in-out;
  background-color: $blue-grey-1;
  transform: scale(0.95);
}
.back{
  transform: scale(1);
  transition: all 0.4s ease-in-out;
}
</style>
