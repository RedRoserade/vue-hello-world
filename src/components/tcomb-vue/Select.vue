<template>
  <select v-bind:name="name" v-bind:value="value" v-on:change="handleChange">
    <option v-for="option in options" :value="option.value" :key="option.value">
      {{ option.text }}
    </option>
  </select>
</template>


<script>
import t from 'tcomb-validation'

export default {
  props: ['type', 'value', 'name'],
  data () {
    return {
      hasError: false
    }
  },
  computed: {
    options () {
      const { map } = this.type.meta

      return Object.entries(map).map(([value, text]) => ({ value, text }))
    }
  },
  methods: {
    getValue () {
      const result = t.validate(this.value, this.type)

      this.hasError = !result.isValid()

      return result.value
    },
    handleChange (evt) {
      this.$emit('change', evt.target.value)
    }
  }
}
</script>
