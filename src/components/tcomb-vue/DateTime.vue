<script>
import t from 'tcomb-validation'

import { log, pathToString } from './util'

import DateTime from '../tcomb-vue-templates-bootstrap/DateTime.vue'

export default {
  name: 't-datetime',
  props: ['value', 'type', 'path'],
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
    handleChange (value) {
      this.$emit('change', value)
    },
    validate () {
      log.trace('validating t-datetime', this.path)

      const result = t.validate(this.value, this.type)

      this.hasError = !result.isValid()

      log.trace('t-datetime', this.path, 'is valid:', !this.hasError)

      return result
    }
  },
  render (h) {
    return h(
      DateTime,
      {
        props: {
          name: pathToString(this.path),
          value: this.value,
          hasError: this.hasError,
          path: this.path
        },
        on: {
          change: this.handleChange
        }
      }
    )
  }
}
</script>
