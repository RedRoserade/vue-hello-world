<script>
import t from 'tcomb-validation'

import { getInputFactory, log } from './util'

import './setup'

export default {
  name: 't-form',
  props: ['type', 'value'],
  data () {
    return {
      currentValue: this.value
    }
  },
  watch: {
    value: function () {
      this.currentValue = this.value
    }
  },
  methods: {
    handleChange (value) {
      this.currentValue = value

      this.$emit('change', this.currentValue)
    },
    validate () {
      return t.validate(this.currentValue, this.type)
    },
    getValue () {
      const value = this.$refs.formComponent.getValue()

      const validationResult = t.validate(value, this.type)

      if (!validationResult.isValid()) {
        log.trace('Failed validation', validationResult, 'value:', value)
        return null
      }

      return validationResult.value
    }
  },
  render (h) {
    const { type } = this

    const factory = getInputFactory(type)

    return h(factory, {
      props: {
        value: this.currentValue,
        type: this.type,
        path: []
      },
      on: {
        change: this.handleChange
      },
      ref: 'formComponent'
    })
  }
}
</script>
