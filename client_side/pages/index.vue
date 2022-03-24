<template>
  <Tutorial/>
</template>

<script>
export default {
  name: 'IndexPage',

  mounted(){
    this.$store.dispatch("fetch_data");
  }
}
</script>
