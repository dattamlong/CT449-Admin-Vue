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
                <a-avatar :size="300" :src="getImg" @click="() => setVisible(true)" />
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
            <a-avatar v-else :size="300">
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
            @handleSubmit="$emit('handleSubmit', formState)"
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
//props
const emit = defineEmits(['handleSubmit'])
const props = defineProps(['fields', 'initState', 'message'])
//import
import { UserOutlined } from '@ant-design/icons-vue'
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { uploadImage } from '@/api/dataController'
import DForm from '@/components/Form/DForm.vue'

//init
const baseURL = import.meta.env.VITE_BE_ENDPOINT
const labelCol = { span: 4 }
const wrapperCol = { span: 14 }
const route = useRoute()
const isFormChanged = ref(false)
const formState = ref({})
const inputRef = ref(null)
const imageUrl = ref('')
const visible = ref(false)

//watch update
watch(
  () => props.initState,
  (value) => {
    formState.value = JSON.parse(JSON.stringify(value))
  }
)

watch(
  () => JSON.stringify(formState.value),
  (value) => {
    isFormChanged.value = value !== JSON.stringify(props.initState)
  }
)

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
  if (props.initState.avatar) return baseURL + '/' + props.initState.avatar
  return false
})
</script>

<style lang="scss"></style>
