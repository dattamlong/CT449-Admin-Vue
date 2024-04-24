<template>
  <publisher-form
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
</template>

<script setup>
import PublisherForm from '@/components/Form/PublisherForm.vue'
import { ref } from 'vue'
import router from '@/router'

import { useRoute } from 'vue-router'
import Spin from '@/components/Spin.vue'
import { create } from '@/api/dataController'

//init
const route = useRoute()
const id = route.params.id
const loading = ref(false)
const initState = ref({})
const message = ref({})
const fields = ref([
  {
    title: 'Tên',
    dataIndex: 'name'
  },
  {
    title: 'Địa chỉ ',
    dataIndex: 'address'
  }
])

//function
const handleSubmit = async (data) => {
  loading.value = true
  try {
    const { name, address } = data

    await create('publishers', {
      name,
      address
    })
    router.push('/publishers')
  } catch (error) {
    message.value = error.response.data
  }
  loading.value = false
}
</script>
