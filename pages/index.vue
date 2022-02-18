<template>
  <Tutorial/>
</template>

<script>
import get_corruption_data from '@/utils/scraper.js';

export default {
  name: 'IndexPage',


  mounted(){
    console.log(get_corruption_data());
  }
}
</script>
