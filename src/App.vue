<template>
  <div id="app">
    <div id="nav">
      <router-link to="/home">Home</router-link> |
      <router-link to="/hoge">Hoge</router-link> |
      <!-- <router-link to="/auth">UserAuth</router-link> | -->

    </div>
    <router-view></router-view>
  </div>
</template>

<style>
  *{
    margin: 0 ;
    padding: 0 ;
    box-sizing: border-box;
  }

  #app{
    background-color: #67c7d4;
    color:#ffffff;
  }
</style>