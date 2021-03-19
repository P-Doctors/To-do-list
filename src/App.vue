<template>
  <div id="app">
    <div id="nav">
      <router-link to="/home">Home</router-link> |
      <router-link to="/hoge">Hoge</router-link> |
      <router-link to="/mypage">MyPage</router-link> |
      <router-link to="/calendar">Calendar</router-link> |
    </div>
    <router-view></router-view>
  </div>
</template>