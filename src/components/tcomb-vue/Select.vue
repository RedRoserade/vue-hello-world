<template>
  <select v-bind:name="name" v-bind:value="value" v-on:change="handleChange">
    <option v-for="option in options" v-bind:value="option.value">
      {{ option.text }}
    </option>
  </select>
</template>


<script>
export default {
  props: ['type', 'value', 'name'],
  computed: {
    options () {
      const { map } = this.type.meta

      return Object.entries(map).map(([value, text]) => ({ value, text }))
    }
  },
  methods: {
    handleChange (evt) {
      this.$emit('change', evt.target.value)
    }
  }
}
</script>
