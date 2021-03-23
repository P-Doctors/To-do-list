<template>
  <div id="app">
    <div id="nav">
      <router-link to="/home">Home</router-link> |
      <router-link to="/hoge">Hoge</router-link> |
      <router-link to="/mypage">MyPage</router-link> |
      <router-link to="/selectuser">SelectUser</router-link> |
      <router-link to="/calendar">Calendar</router-link> |
    </div>
    <router-view></router-view>
  </div>
</template>

<style scoped>
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: #64bcfc;
  }

  /* #app{
    display: flex;
    justify-content: center;
    text-align: center;
  } */
</style>