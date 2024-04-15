<template>
  <book-form
    :fields="fields"
    :initState="initState"
    @handleSubmit="handleSubmit"
    :message="message"
  />
</template>

<script setup>
import BookForm from '@/components/Form/BookForm.vue'
import { onBeforeMount, onMounted, ref } from 'vue'
import router from '@/router'
import { getList, getOne, updateOne } from '@/api/dataController'
import { useRoute } from 'vue-router'

//init
const route = useRoute()
const id = route.params.id
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
    dataIndex: 'publishYear'
  },
  {
    title: 'giá tiền',
    dataIndex: 'price'
  },
  {
    title: 'số lượng',
    dataIndex: 'quantity'
  }
])

//function
const handleSubmit = async (data) => {
  loading.value = true
  try {
    const { title, author, publishYear, price, quantity, image, publisher } = data

    await updateOne('books', id, {
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
    const options = res.data.map((publisher) => ({ title: publisher.name, value: publisher._id }))
    fields.value = [
      ...fields.value,
      { title: 'Nhà xuất bản', dataIndex: 'publisher', type: 'option', options }
    ]
  } catch (error) {
    console.error('Xuất hiện lỗi khi lấy dữ liệu')
  }
})

onMounted(async () => {
  loading.value = true
  try {
    initState.value = await getOne('books', id)
  } catch (error) {
    console.error('Lỗi xảy ra khi lấy dữ liệu:', error)
  }
  loading.value = false
})
</script>
