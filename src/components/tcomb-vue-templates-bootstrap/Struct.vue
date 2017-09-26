<template>
  <fieldset>
    <legend v-if="!!label">{{ label }}</legend>

    <slot v-for="field in fieldNames" :name="field" />
  </fieldset>
</template>


<script>
export default {
  name: 't-struct-bootstrap',
  props: ['type', 'name', 'value'],
  computed: {
    fieldNames () {
      return Object.keys(this.type.meta.props)
    }
  },
  data () {
    return {
      label: this.name
    }
  }
}
</script>
