<template>
  <a-card>
    <template #title>
      <h5 class="font-semibold m-0">Chỉnh sửa tài khoản</h5>
    </template>
    <a-form
      id="form-update"
      layout="vertical"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      autoComplete="off"
      :hideRequiredMark="true"
      :model="formState"
      @submit="handleSubmit"
    >
      <a-form-item
        :style="{ fontWeight: 700 }"
        v-for="(field, index) in fields"
        :key="index"
        :label="field.title"
        class="mb-10"
      >
        <component
          :is="getFieldComponent(field)"
          :placeholder="field.title"
          v-model:value="formState[field.dataIndex]"
        />
        <h7 v-if="message[field.dataIndex]">{{ message[field.dataIndex] }}</h7>
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" block html-type="submit" class="login-form-button"> Lưu </a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script setup>
import { getOne, updateOne } from '@/api/dataController'
import router from '@/router'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const loading = ref(false)
const formState = ref({})
const message = ref({})

const id = route.params.id

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
    type: 'option'
  },
  {
    title: 'Email',
    dataIndex: 'email'
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'phoneNumber'
  }
]

const labelCol = { span: 4 }
const wrapperCol = { span: 14 }

const getFieldComponent = (field) => {
  if (field.type === 'date') {
    return 'a-date-picker'
  } else if (field.type === 'option') {
    return 'a-select'
  } else {
    return 'a-input'
  }
}

const handleSubmit = async () => {
  loading.value = true
  try {
    const { firstName, lastName, email, phoneNumber, gender, birthday } = formState.value
    const res = await updateOne('users', id, {
      firstName,
      lastName,
      email,
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

onMounted(async () => {
  loading.value = true
  try {
    const res = await getOne('users', id)
    formState.value = res
  } catch (error) {
    console.log(error)
  }

  loading.value = false
})
</script>
