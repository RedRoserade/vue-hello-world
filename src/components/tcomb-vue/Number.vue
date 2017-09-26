<template>
    <input
      type="number"
      v-bind:name="name"
      v-bind:value="value"
      v-on:input="handleChange"
    />
</template>

<script>
import t from 'tcomb-validation'

export default {
  name: 't-number',
  props: ['name', 'value', 'name'],
  data () {
    return {
      hasError: false
    }
  },
  methods: {
    getValue () {
      const result = t.validate(this.value, this.type)

      this.hasError = !result.isValid()

      return result.value
    },
    handleChange (e) {
      this.$emit('change', e.target.valueAsNumber)
    }
  }
}
</script>
