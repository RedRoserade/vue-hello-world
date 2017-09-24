import t from 'tcomb'

import TextBox from './TextBox.vue'
import DateTime from './DateTime.vue'
import Number from './Number.vue'

t.String.getTcombFormFactory = () => TextBox
t.Date.getTcombFormFactory = () => DateTime
t.Number.getTcombFormFactory = () => Number
