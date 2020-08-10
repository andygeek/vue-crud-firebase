<template>
  <div id="app">
    <div class="navbar navbar-dark bg-dark">
        <div class="container">
            <h2 class="text-white">Firestore VueJS</h2>
        </div>
    </div>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>
<style scoped>
.container {
  max-width: 1000px;
}
</style>
