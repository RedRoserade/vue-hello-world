import { validate } from 'tcomb-validation'

import TextBox from './TextBox.vue'
import Select from './Select.vue'
import Struct from './Struct.vue'

export const log = {
  trace (...args) { console.debug('[tcomb-vue]', ...args) }
}

export function getInputFactory (type, options = undefined) {
  if (Object.hasOwnProperty.call(type, 'getTcombFormFactory')) {
    return type.getTcombFormFactory(options)
  }

  const { kind } = type.meta

  switch (kind) {
    case 'enums':
      return Select
    case 'struct':
    case 'interface':
      return Struct
    case 'list':
      console.log('TODO List')
      break
    case 'maybe':
      console.log('TODO maybe', type)
      break
  }

  return TextBox
}

export function validOrNull (value, type) {
  const result = validate(validate, type)

  if (result.isValid()) {
    return result.value
  }

  return null
}

export function pathToString (path) {
  return path.join('.')
}

export class ValidationResult {
  constructor (errors) {
    this.errors = errors
  }

  isValid () {
    return this.errors.length === 0
  }

  firstError () {
    if (this.isValid()) {
      return null
    }

    return this.errors[0]
  }
}
