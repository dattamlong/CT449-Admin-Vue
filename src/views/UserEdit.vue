<template>
  <div>
    <div
      class="profile-nav-bg"
      style="
        background-image: url('https://vietabinhdinh.edu.vn/wp-content/uploads/Anh-4K-%E2%80%93-Hinh-nen-4K-dep-nhat-the-gioi.jpg');
      "
    ></div>

    <a-card :bordered="false" class="card-profile-head" :bodyStyle="{ padding: 0 }">
      <a-row :gutter="24">
        <a-col :span="9">
          <a-flex vertical :gap="10" align="center">
            <template v-if="getImg">
              <div :style="{ cursor: 'pointer' }">
                <a-avatar :size="260" :src="getImg" @click="() => setVisible(true)" />
              </div>
              <div :style="{ display: 'none' }">
                <a-image
                  :preview="{
                    visible,
                    onVisibleChange: setVisible
                  }"
                  :src="imageUrl"
                  :previewMask="false"
                />
              </div>
            </template>
            <a-avatar v-else :size="128">
              <template #icon><UserOutlined /></template>
            </a-avatar>
            <a-button @click="handleClick">
              <upload-outlined></upload-outlined>
              Tải ảnh lên
            </a-button>

            <input
              ref="inputRef"
              name="avatar"
              type="file"
              @change="handleFileUpload"
              accept="image/*"
              :style="{ display: 'none' }"
            />
          </a-flex>
        </a-col>

        <a-col :span="15">
          <d-form
            @handleSubmit="handleSubmit"
            :fields="fields"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            :formState="formState"
            :message="message"
            :isFormChanged="isFormChanged"
          />
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script setup>
import { getOne, updateOne, uploadImage } from '@/api/dataController'

import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import DForm from '@/components/Form/ DForm.vue'
import router from '@/router'
const baseURL = import.meta.env.VITE_BE_ENDPOINT
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
    title: 'Số điện thoại',
    dataIndex: 'phoneNumber'
  }
]

const labelCol = { span: 4 }
const wrapperCol = { span: 14 }
const route = useRoute()
const loading = ref(false)
const formState = ref({})
const message = ref({})
const id = route.params.id
const isFormChanged = ref(false)
let user = null

const inputRef = ref(null)
const imageUrl = ref('')
const visible = ref(false)
const setVisible = (value) => {
  visible.value = value
}
const handleClick = () => {
  inputRef.value?.click()
}

const handleFileUpload = async (event) => {
  try {
    const el = event.target
    const file = el.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        imageUrl.value = reader.result
      }
      reader.readAsDataURL(file)
      const { data } = await uploadImage('avatar', file)
      formState.value.avatar = data.imagePath
    }
  } catch (err) {
    console.log(err)
  }
}

const getImg = computed(() => {
  if (imageUrl.value) return imageUrl.value

  if (formState.value.avatar) return baseURL + '/' + formState.value.avatar
  return false
})

watch(
  () => JSON.stringify(formState.value),
  (value) => {
    isFormChanged.value = value !== JSON.stringify(user)
  }
)

const handleSubmit = async () => {
  loading.value = true
  try {
    const { firstName, lastName, phoneNumber, gender, birthday, avatar } = formState.value
    await updateOne('users', id, {
      firstName,
      lastName,
      phoneNumber,
      gender,
      birthday,
      avatar
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
    user = await getOne('users', id)
    formState.value = JSON.parse(JSON.stringify(user))
  } catch (error) {
    console.log(error)
  }

  loading.value = false
})
</script>

<style lang="scss"></style>
