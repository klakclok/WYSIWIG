<template>
  <div class="btn">
    <button
        @click="functionEditor"
        :disabled="disableFunction"
    >
      <slot></slot>
    </button>
  </div>
</template>

<script>
export default {
  props: ['functionEditor', 'disableFunction'],

}
</script>

<style scoped>
.btn{
  width: 42px;
  height: 38px;
  background-color: #282828;
  border-radius: 5px;
  margin-right: 12px;
}
</style>
