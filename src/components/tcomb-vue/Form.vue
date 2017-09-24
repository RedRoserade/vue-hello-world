<script>
import t from 'tcomb-validation'

import { getInputFactory } from './util'

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
      return this.$refs.formComponent.validate()
    },
    getValue () {
      const validationResult = this.validate()

      if (!validationResult.isValid()) {
        return null
      }

      const result = t.validate(this.currentValue, this.type)

      if (!result.isValid()) {
        return null
      }

      return result.value
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
