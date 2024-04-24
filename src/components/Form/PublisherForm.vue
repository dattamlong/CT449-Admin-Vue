<template>
  <div>
    <div
      class="profile-nav-bg"
      style="background-image: url('../../../public/images/bg-profile.jpg')"
    ></div>
    <a-card :bordered="false" class="card-profile-head" :bodyStyle="{ padding: 0 }">
      <a-row :gutter="24">
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
import { ref, watch } from 'vue'
import DForm from '@/components/Form/DForm.vue'

//init
const labelCol = { span: 4 }
const wrapperCol = { span: 14 }
const isFormChanged = ref(false)
const formState = ref(JSON.parse(JSON.stringify(props.initState)))

//watch update
watch(
  () => JSON.stringify(formState.value),
  (value) => {
    isFormChanged.value = value !== JSON.stringify(props.initState)
  }
)
</script>

<style lang="scss"></style>
