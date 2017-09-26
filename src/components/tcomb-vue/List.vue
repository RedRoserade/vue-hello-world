<template>
  <component
    :is="templateComponent"
    :name="name"
    :value="value"
    :type="type"
    @add="handleAdd"
    @remove="handleRemove"
    @swap="handleSwap"
  >
    <component
      v-for="(v, index) in value || []"
      :is="itemTemplateComponent"
      :key="index"
      :ref="`item_${index}`"
      :slot="index"
      :value="value[index]"
      :type="baseType"
      :path="[...path, index]"
      @change="handleChange(index, $event)"
    />
  </component>
</template>


<script>
import { ValidationResult, getBaseType, getInputFactory } from './util'

import List from '../tcomb-vue-templates-bootstrap/List.vue'

export default {
  name: 't-list',
  components: {
    't-list-bootstrap': List
  },
  props: ['type', 'value', 'name', 'path'],
  data () {
    const baseType = getBaseType(this.type)

    return {
      baseType: baseType,
      itemTemplateComponent: getInputFactory(baseType),
      templateComponent: List
    }
  },
  methods: {
    handleAdd () {
      this.$emit('change', [...(this.value || []), null])
    },
    handleChange (index, value) {
      this.value.splice(index, 1, value)

      this.$emit('change', this.value)
    },
    handleRemove (index) {
      this.value.splice(index, 1)
      this.$emit('change', this.value)
    },
    getValue () {
      // Return an empty list by default to prevent errors with the
      // component is initialized with null values.
      if (this.value == null && this.type.meta.kind !== 'maybe') {
        return []
      }

      return Object.values(this.$refs)
        // .filter(x => typeof x[0].getValue === 'function')
        .map(x => x[0].getValue())
    },
    validate () {
      const errors = Object.values(this.$refs)
        // .filter(x => typeof x[0].validate === 'function')
        .map(x => x[0].validate())
        .filter(x => !x.isValid())

      return new ValidationResult(errors)
    },
    handleSwap (index1, index2) {
      const copy = [...this.value]

      const idx1 = copy[index1]

      copy[index1] = copy[index2]

      copy[index2] = idx1

      this.$emit('change', copy)
    }
  }
}
</script>
