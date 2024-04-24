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
import { onMounted, ref } from 'vue'
import router from '@/router'
import { getOne, updateOne } from '@/api/dataController'
import { useRoute } from 'vue-router'
import Spin from '@/components/Spin.vue'

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
  try {
    const { name, address } = data
    await updateOne('publishers', id, {
      name,
      address
    })
    router.push('/publishers')
  } catch (error) {
    message.value = error.response.data
  }
}

onMounted(async () => {
  loading.value = true
  try {
    initState.value = await getOne('publishers', id)
  } catch (error) {
    console.error('Lỗi xảy ra khi lấy dữ liệu:', error)
  }
  loading.value = false
})
</script>
