<template>
    <input
      type="number"
      v-bind:name="name"
      v-bind:value="value"
      v-on:input="handleChange"
    />
</template>

<script>
export default {
  name: 't-number',
  props: ['name', 'value', 'name'],
  methods: {
    handleChange (e) {
      this.$emit('change', e.target.valueAsNumber)
    }
  }
}
</script>
