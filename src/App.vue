<template>
  <div class="wrapper">
    <Header/>
    <About/>
    <Sell/>
    <Yellow/>
    <Buy/>
    <Footer/>
  </div>
</template>



<script>

import Header from "@/components/Header.vue";
import About from "@/components/About.vue";
import Sell from "@/components/Sell.vue";
import Yellow from "@/components/Yellow.vue";
import Buy from "@/components/Buy.vue";
import Footer from "@/components/Footer.vue";



export default {
  components:{
    Header,
    About,
    Sell,
    Yellow,
    Buy,
    Footer
  }
}
</script>