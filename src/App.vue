<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
* {
  margin: 0;
  padding: 0;
}
@media screen and (max-width: 1200px) {
  html {
    font-size: 12px;
  }
}
@media screen and (min-width: 1201px) {
  html {
    font-size: 14px;
  }
}
.page-form2 .ivu-form-item-content {
  float: left;
}
.word-container .ivu-tabs-bar {
  border-bottom: none;
}
.word-container .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab {
  border-bottom: 1px solid #dddee1;
  margin-left: 15px;
  border-radius: 16px;
}
.ivu-modal .ivu-select-dropdown {
  top: 30px !important;
}
</style>
