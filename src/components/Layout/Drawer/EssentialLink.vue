<template>
  <div>
    <!--  Link without dorpdown list  -->
    <q-item clickable tag="a" :to="{ name: link }" v-if="link !== '#'">
      <q-item-section v-if="icon" avatar>
        <q-icon :name="icon" />
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ title }}</q-item-label>
        <q-item-label caption>
          {{ caption }}
        </q-item-label>
      </q-item-section>
    </q-item>

    <!--  Link with dorpdown list  -->
    <q-expansion-item
      v-else
      expand-separator
      :icon="icon"
      :label="title"
      :caption="caption"
    >
      <q-list class="q-ml-md">
        <q-item
          v-for="(i, index) in subLinks"
          :key="index"
          clickable
          tag="a"
          :to="{ name: i.link }"
        >
          <q-item-section v-if="i.icon" avatar>
            <q-icon :name="i.icon" />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ i.title }}</q-item-label>
            <q-item-label caption>
              {{ i.caption }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-expansion-item>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },

    caption: {
      type: String,
      default: "",
    },

    link: {
      type: String,
      default: "#",
    },

    icon: {
      type: String,
      default: "",
    },
    subLinks: {
      default: () => {
        return [];
      },
    },
  },
};
</script>
