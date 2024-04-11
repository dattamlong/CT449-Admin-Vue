<template>
  <a-form
    id="form-update"
    layout="vertical"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    :hideRequiredMark="true"
    :model="formState"
    autoComplete="false"
    @submit.prevent="$emit('handleSubmit')"
  >
    <a-form-item
      v-for="(field, index) in fields"
      :key="index"
      :label="field.title"
      class="mb-10"
      :validateStatus="message[field.dataIndex] ? 'error' : undefined"
      :help="message[field.dataIndex] || undefined"
    >
      <component
        :type="field.typeData ? field.typeData : undefined"
        :is="getFieldComponent(field)"
        :placeholder="field.title"
        v-model:value="formState[field.dataIndex]"
        :valueFormat="field.type === 'date' ? 'YYYY-MM-DDTHH:mm:ssZ' : undefined"
        :format="field.type === 'date' ? 'DD/MM/YYYY' : undefined"
      >
        <a-select-option
          v-for="(option, index) in field.options"
          :value="option.value"
          :key="index"
        >
          {{ option.title }}</a-select-option
        >
      </component>
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button
        type="primary"
        block
        html-type="submit"
        class="login-form-button"
        :loading="loading"
        :disabled="!isFormChanged"
      >
        Lưu
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script setup>
const emit = defineEmits(['handleSubmit'])
const props = defineProps([
  'fields',
  'labelCol',
  'wrapperCol',
  'formState',
  'message',
  'isFormChanged'
])

const getFieldComponent = (field) => {
  if (field.type === 'date') {
    return 'a-date-picker'
  } else if (field.type === 'option') {
    return 'a-select'
  } else {
    return 'a-input'
  }
}
</script>

<style lang="scss"></style>
