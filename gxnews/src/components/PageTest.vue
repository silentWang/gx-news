<template>
  <div class="test">
    <div>{{msg}}</div>
  </div>
</template>

<script>
import Utils from "@/js/Utils"
export default {
  data () {
    return {
      msg: 'Welcome to secret park!'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.test {
  width: 100rem;
  background: chartreuse;
}
</style>
