<template>
  <div>
    <div
      class="profile-nav-bg"
      style="background-image: url('../../../public/images/bg-profile.jpg')"
    ></div>

    <a-card :bordered="false" class="card-profile-head" :bodyStyle="{ padding: 0 }">
      <a-row :gutter="24">
        <a-col :span="9">
          <a-flex vertical :gap="10" align="center">
            <a-avatar
              shape="square"
              :src="baseURL + '/' + props.bookImages[formState.book]"
              :size="300"
            >
              <template #icon><UserOutlined /></template>
            </a-avatar>

            <div v-if="initState._id">
              <a-button @click="showConfirm" danger type="link">
                <DeleteOutlined /> Xóa theo dõi mượn sách</a-button
              >
            </div>
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
const emit = defineEmits(['handleSubmit', 'handleRemove'])
const props = defineProps(['fields', 'initState', 'message', 'bookImages'])
//import
import { UserOutlined, ExclamationCircleOutlined } from '@ant-design/icons-vue'
import { createVNode, ref, watch } from 'vue'
import DForm from '@/components/Form/DForm.vue'
import { Modal } from 'ant-design-vue'

//init
const baseURL = import.meta.env.VITE_BE_ENDPOINT
const labelCol = { span: 4 }
const wrapperCol = { span: 14 }
const isFormChanged = ref(false)
const formState = ref(JSON.parse(JSON.stringify(props.initState)))

const showConfirm = () => {
  Modal.confirm({
    centered: true,
    title: () => 'Bạn muốn xóa theo dõi mượn sách này?',
    icon: () => createVNode(ExclamationCircleOutlined),
    content: () => 'Hãy cân nhắc trước khi xóa vì bạn không thể phục hồi theo dỗi mượn sách này',
    onOk() {
      emit('handleRemove')
    },

    onCancel() {}
  })
}

//watch update
watch(
  () => JSON.stringify(formState.value),
  (value) => {
    isFormChanged.value = value !== JSON.stringify(props.initState)
  }
)
</script>

<style lang="scss"></style>
