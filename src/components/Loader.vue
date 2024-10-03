<template>
  <div>
    <div v-if="loading" class="loader">
      <div class="loader-spinner"></div>
      <p class="loader-progress">{{ progress }}%</p>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      progress: 0
    };
  },
  mounted() {
    const interval = setInterval(() => {
      if (this.progress < 100) {
        this.progress += 10;
      } else {
        clearInterval(interval);
        this.loading = false;
      }
    }, 1000);
  }
};
</script>

<style scoped>
@import "@/assets/styles/fonts.scss";


.loader {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.loader-spinner {
  border: 16px solid #f3f3f3;
  border-top: 16px solid #3498db;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
}

.loader-progress {
  font-family: Archangelsk;
  font-weight: 400;
  font-size: 50px;
  margin-top: 10px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
