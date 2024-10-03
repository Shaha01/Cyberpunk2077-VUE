<template>
  <div class="wrapper">
    <Loader/>
    <Header/>
    <About/>
    <Sell/>
    <Yellow/>
    <Buy/>
    <Footer/>
  </div>
</template>



<script>


import Loader from "@/components/Loader.vue";
import Header from "@/components/Header.vue";
import About from "@/components/About.vue";
import Sell from "@/components/Sell.vue";
import Yellow from "@/components/Yellow.vue";
import Buy from "@/components/Buy.vue";
import Footer from "@/components/Footer.vue";




export default {
  components:{
    Loader,
    Header,
    About,
    Sell,
    Yellow,
    Buy,
    Footer
  }
}
</script>