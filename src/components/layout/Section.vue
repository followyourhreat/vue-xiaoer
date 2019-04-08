<template>
  <div class="section">
    <div class="section-header">
      <div class="left">
        <img v-if="icon" class="section-icon" :src="icon">
        {{title}}
      </div>
      <div class="right">
        <slot name="action"/>
      </div>
    </div>
    <div class="section-content">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'section',
  props: {
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String
    },
    color: {
      type: String,
      default: '#2d8cf0'
    }
  }
}
</script>

<style lang=less>
.section {
  &-header {
    display: flex;
    justify-content: space-between;
    line-height: 50px;
    padding: 0 15px;
    .left {
      display: flex;
      align-items: center;
    }
    .right {
      cursor: pointer;
    }
  }
  &-content {
    padding: 10px;
    /*background-color: #fff;*/
  }
  &-icon {
    margin-right: 10px;
  }
}
</style>
