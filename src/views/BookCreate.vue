<template>
  <book-form
    v-if="!loading"
    :fields="fields"
    :initState="initState"
    @handleSubmit="handleSubmit"
    :message="message"
  />
  <div v-else>
    <Spin />
  </div>
</template>

<script setup>
import BookForm from '@/components/Form/BookForm.vue'
import { onBeforeMount, ref } from 'vue'
import router from '@/router'
import { create, getList } from '@/api/dataController'
import Spin from '@/components/Spin.vue'

//init
const loading = ref(false)
const initState = ref({})
const message = ref({})
const publishers = ref([])
const fields = ref([
  {
    title: 'Tựa sách',
    dataIndex: 'title'
  },
  {
    title: 'tác giả',
    dataIndex: 'author'
  },
  {
    title: 'Năm xuất bản',
    dataIndex: 'publishYear',
    typeData: 'number'
  },
  {
    title: 'Giá tiền (Đơn vị: VND)',
    dataIndex: 'price',
    typeData: 'number'
  },
  {
    title: 'Số lượng',
    dataIndex: 'quantity'
  }
])

//function
const handleSubmit = async (data) => {
  loading.value = true
  try {
    const { title, author, publishYear, price, quantity, image, publisher } = data

    await create('books', {
      title,
      author,
      publishYear,
      price,
      quantity,
      image,
      publisher
    })
    router.push('/books')
  } catch (error) {
    message.value = error.response.data
  }
  loading.value = false
}

onBeforeMount(async () => {
  try {
    const res = await getList('publishers')
    publishers.value = res.data
    const publisherOptions = res.data.map((publisher) => ({
      title: publisher.name,
      value: publisher._id
    }))

    fields.value = [
      ...fields.value,
      { title: 'Nhà xuất bản', dataIndex: 'publisher', type: 'option', options: publisherOptions }
    ]
  } catch (error) {
    alert('Cannot get publishers. Please try again')
  }
})
</script>
