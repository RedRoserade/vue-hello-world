<template>
  <div :class="{ 'form-group': true, 'has-error': hasError }">
    <label :for="name" class="control-label">{{ label }}</label>

    <input
      type="text"
      class="form-control"
      :id="name"
      :name="name"
      :value="value"
      @input="handleChange"
    />

  </div>
</template>

<script>
export default {
  name: 't-textbox-bootstrap',
  props: ['name', 'path', 'value', 'hasError'],
  data () {
    return {
      label: this.name
    }
  },
  methods: {
    handleChange (evt) {
      let value = evt.target.value

      if (value.trim().length === 0) {
        value = null
      }

      this.$emit('change', value)
    }
  }
}
</script>
