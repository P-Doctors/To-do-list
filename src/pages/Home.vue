<template>
  <div class="contents">
    <header>
      <div class="todayDate">
        今日の日付
      </div>
      <button class="button1">Sign in</button>
      <button class="button2">Log in</button>
    </header>
    <main>
      <h1>TO DO LIST</h1>
      <button>START</button>
    </main>   
  </div>
</template>

<style scoped>
  header{
    padding: 10px;
    position: relative;
  }
  .todayDate{
    display: flex;
    justify-content: center;
    font-size: 50px;
  }
  .button1{
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 40px;
    background-color: orangered;
    color:#ffffff;
  }
  .button2{
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 40px;
    background-color: orange;
    color:#ffffff;
  }
</style>