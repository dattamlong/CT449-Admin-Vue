<template>
  <div>
    <user-form
      v-if="!loading"
      :fields="fields"
      :initState="initState"
      @handleSubmit="handleSubmit"
      :message="message"
    />
    <div v-else>
      <Spin />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import UserForm from '@/components/Form/UserForm.vue'
import { create } from '@/api/dataController'
import { useRoute } from 'vue-router'
import router from '@/router'
import Spin from '@/components/Spin.vue'

const route = useRoute()
const id = route.params.id
const loading = ref(false)
const initState = ref({})
const message = ref({})

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
        value: 'unknown'
      }
    ]
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'phoneNumber'
  },
  {
    title: 'Địa chỉ',
    dataIndex: 'address'
  },
  {
    title: 'Email',
    dataIndex: 'email'
  },
  {
    title: 'Mật khẩu',
    dataIndex: 'password',
    typeData: 'password'
  }
]

const handleSubmit = async (data) => {
  loading.value = true
  try {
    const { firstName, lastName, phoneNumber, gender, birthday, avatar, email, password, address } =
      data
    await create('users', {
      firstName,
      lastName,
      phoneNumber,
      gender,
      birthday,
      avatar,
      address,
      email,
      password
    })
    router.push('/users')
  } catch (error) {
    message.value = error.response.data
  }
  loading.value = false
}
</script>
