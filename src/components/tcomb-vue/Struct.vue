<template>
  <component :is="templateComponent" :name="name" :type="type" :value="value">
    <component
      v-for="input in inputs"
      :key="input.name"
      :ref="_getInputRefName(input.name)"
      :slot="input.name"
      :is="input.component"
      :name="input.name"
      :type="input.type"
      :value="_safeGetValue(input.name)"
      :path="[...path, input.name]"
      @change="handleChange(input.name, $event)"
    />
  </component>
</template>


<script>
import t from 'tcomb-validation'

import { getInputFactory, ValidationResult, log } from './util'

import Struct from '../tcomb-vue-templates-bootstrap/Struct.vue'

export default {
  name: 't-struct',
  props: ['type', 'value', 'name', 'path'],
  data () {
    return {
      templateComponent: Struct,
      hasError: false,
      inputs: Object.entries(this.type.meta.props)
        .map(([name, type]) => ({ name, type, component: getInputFactory(type) }))
    }
  },
  methods: {
    _getInputRefName (name) {
      return `input__${name}`
    },
    getValue () {
      if (this.value == null && this.type.meta.kind !== 'maybe') {
        return {}
      }

      const value = this.inputs
        .reduce((acc, { name }) => {
          const input = this.$refs[this._getInputRefName(name)]

          if (typeof input.getValue === 'function') {
            const value = input.getValue()

            acc[name] = value
          }

          return acc
        }, {})

      const validationResult = t.validate(value, this.type)

      this.hasError = !validationResult.isValid()

      return value
    },
    _safeGetValue (name) {
      if (this.value == null) {
        return null
      }

      return this.value[name]
    },
    handleChange (name, value) {
      const updated = {
        ...this.value,
        [name]: value
      }

      this.$emit('change', updated)
    },
    validate () {
      log.trace('validating t-fieldset', this.path)

      const validationErrors = Object.values(this.$refs)
        .filter(r => typeof r.validate === 'function')
        .map(r => r.validate())
        .filter(r => !r.isValid())

      const result = new ValidationResult(validationErrors)

      log.trace('t-fieldset', this.path, 'is valid:', result.isValid(), 'errors:', result.errors)

      return result
    }
  }
}
</script>
