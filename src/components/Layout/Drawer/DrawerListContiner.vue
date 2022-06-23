<template>
  <div>
    <q-list>
      <q-item-label header class="text-grey-8"> Essential Links </q-item-label>
      <EssentialLink
        v-for="(link, i) in essentialLinks"
        :key="i"
        v-bind="link"
      />
    </q-list>
  </div>
</template>

<script>
import EssentialLink from "components/Layout/Drawer/EssentialLink.vue";

export default {
  components: {
    EssentialLink,
  },
  data() {
    return {
      essentialLinks: [
        {
          title: "Dashboard",
          caption: "",
          icon: "las la-tachometer-alt",
          link: "Dashboard",
          subLinks: [],
        },
        {
          title: "Setting",
          caption: "",
          icon: "settings",
          link: "#",
          subLinks: [
            {
              title: "Categories",
              caption: "",
              icon: "category",
              link: "Categories",
              subLinks: [],
            },
            {
              title: "Employee",
              caption: "",
              icon: "badge",
              link: "Employee",
            },
            {
              title: "Item",
              caption: "",
              icon: "inventory_2",
              link: "Item",
            },
            {
              title: "Stage",
              caption: "",
              icon: "recycling",
              link: "Stage",
            },
            {
              title: "General Setting",
              caption: "",
              icon: "eva-settings-2-outline",
              link: "General",
            },
          ],
        },
        {
          title: "Client",
          caption: "",
          icon: "attribution",
          link: "Client",
        },
        {
          title: "Process",
          caption: "",
          icon: "account_tree",
          link: "Process",
        },
      ],
    };
  },
};
</script>
