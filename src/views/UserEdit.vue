<template>
  <div>
    <user-form
      v-if="!loading"
      :fields="fields"
      :initState="initState"
      @handleSubmit="handleSubmit"
      @handleRemove="handleRemove"
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
import { deleteOne, getOne, updateOne } from '@/api/dataController'
import { useRoute } from 'vue-router'
import router from '@/router'
import Spin from '@/components/Spin.vue'

//init
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
  }
]

//function

const handleRemove = async () => {
  loading.value = true
  try {
    await deleteOne('users', id)
    router.push('/users')
  } catch (error) {
    console.error(error)
  }
  loading.value = false
}

const handleSubmit = async (data) => {
  try {
    const { firstName, lastName, phoneNumber, gender, birthday, avatar, address } = data
    await updateOne('users', id, {
      firstName,
      lastName,
      phoneNumber,
      gender,
      birthday,
      avatar,
      address
    })
    router.push('/users')
  } catch (error) {
    message.value = error.response.data
  }
}
onMounted(async () => {
  loading.value = true
  try {
    initState.value = await getOne('users', id)
  } catch (error) {
    console.error('Lỗi xảy ra khi lấy dữ liệu:', error)
  }
  loading.value = false
})
</script>
