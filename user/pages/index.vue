<template>
  <div class="my">
    my
    <div class="myy">111</div>
  </div>
</template>
<script>
export default {
  created() {},
  mounted(){
    this.GetTest();
  },
  methods: {
    GetTest() {
      this.$axios
        .get("/api/hospitals/1")
        .then(Response => {
          console.log(Response);
        })
        .catch(error => {
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