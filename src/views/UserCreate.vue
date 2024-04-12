<template>
  <d-form
    @handleSubmit="handleSubmit"
    :fields="fields"
    :labelCol="labelCol"
    :wrapperCol="wrapperCol"
    :formState="formState"
    :message="message"
    :isFormChanged="isFormChanged"
  />
</template>

<script setup>
import { create } from '@/api/dataController'
import router from '@/router'
import { ref, watch } from 'vue'
import DForm from '@/components/Form/ DForm.vue'

//Colums
const fields = [
  {
    title: 'Họ',
    dataIndex: 'lastName'
  },
  {
    title: 'Tên',
    dataIndex: 'firstName'
  },
  {
    title: 'Ngày sinh',
    dataIndex: 'birthday',
    type: 'date'
  },
  {
    title: 'Giới tính',
    dataIndex: 'gender',
    type: 'option',
    options: [
      {
        title: 'Nam',
        value: '0'
      },
      {
        title: 'Nữ',
        value: '1'
      },
      {
        title: '',
        value: 'unknow'
      }
    ]
  },
  {
    title: 'Email',
    dataIndex: 'email'
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'phoneNumber'
  },
  {
    title: 'Mật khẩu',
    dataIndex: 'password',
    typeData: 'password'
  }
]
const labelCol = { span: 4 }
const wrapperCol = { span: 14 }
const loading = ref(false)
const formState = ref({})
const message = ref({})
const isFormChanged = ref(false)

watch(
  () => JSON.stringify(formState.value),
  (value) => {
    isFormChanged.value = value !== ''
  }
)

const handleSubmit = async () => {
  loading.value = true
  try {
    const { firstName, lastName, email, phoneNumber, gender, birthday, password } = formState.value
    await create('users', {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      gender,
      birthday
    })
    router.push('/users')
  } catch (error) {
    message.value = error.response.data
  }

  loading.value = false
}
</script>

<style lang="scss"></style>
