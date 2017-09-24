<template>
  <div>
    This is a test.

    <t-form
      ref="form"
      :type="modelType"
      :value="value"
      @change="handleChange"
    />

    <pre style="text-align: left">{{ valueAsJson }}</pre>

    <button type="button" @click="getValueFromForm">Get value</button>
  </div>
</template>


<script>
import t from 'tcomb'

import TCombForm from './tcomb-vue/Form.vue'

const Test = t.struct({
  someText: t.String,
  someOptions: t.enums({
    hi: 'Hi!',
    ho: 'Ho!',
    whatsUp: "What's up?"
  }),
  someDate: t.Date,
  someNumber: t.Number,
  someNestedStruct: t.struct({
    nestedString: t.String,
    someNestedDate: t.Date
  })
})

export default {
  name: 'form-test',
  components: {
    't-form': TCombForm
  },
  data () {
    return {
      modelType: Test,
      value: null
    }
  },
  methods: {
    handleChange: function (value) {
      this.value = value
    },
    getValueFromForm () {
      console.log(this.$refs.form.getValue())
    }
  },
  computed: {
    valueAsJson: function () {
      return JSON.stringify(this.value, null, 2)
    }
  }
}
</script>
