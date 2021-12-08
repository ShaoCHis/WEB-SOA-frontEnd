<template>
  <!-- App.vue -->

<v-app>
  <v-navigation-drawer app>
    <!-- -->
  </v-navigation-drawer>

  <v-app-bar app>
    <!-- -->
  </v-app-bar>

  <!-- Sizes your content based upon application components -->
  <v-main>

    <!-- Provides the application the proper gutter -->
    <v-container fluid>

      <!-- If using vue-router -->
      <router-view></router-view>
      <identify></identify>
    </v-container>
  </v-main>

  <v-footer app>
    <!-- -->
  </v-footer>
</v-app>
</template>
<script>
import identify from '../components/identify.vue';

export default {
  components: { identify },
  created() {},
  mounted() {
    this.GetTest();
  },
  methods: {
    GetTest() {
      this.$axios
        .get("/api/hospitals/1")
        .then((Response) => {
          console.log(Response);
        })
        .catch((error) => {
          console.log(2);
        });
    },
  },
};
</script>

<style>
.myy {
  background-color: red;
  width: 150px;
  height: 150px;
}
</style>