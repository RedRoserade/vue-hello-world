<script>
import t from 'tcomb-validation'

import TextBox from '../tcomb-vue-templates-bootstrap/TextBox.vue'

import { pathToString, log } from './util'

export default {
  name: 't-textbox',
  props: ['type', 'value', 'path'],
  data () {
    return {
      hasError: false
    }
  },
  methods: {
    handleChange (value) {
      this.$emit('change', value)
    },
    validate () {
      log.trace('validating t-textbox', this.path)

      const result = t.validate(this.value, this.type)

      this.hasError = !result.isValid()

      log.trace('t-textbox', this.path, 'is valid:', !this.hasError)

      return result
    }
  },
  render (h) {
    return h(
      TextBox,
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
