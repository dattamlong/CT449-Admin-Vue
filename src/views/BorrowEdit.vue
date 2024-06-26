<template>
  <borrow-form
    v-if="!loading"
    :fields="fields"
    :initState="initState"
    @handleSubmit="handleSubmit"
    @handleRemove="handleRemove"
    :message="message"
    :bookImages="bookImages"
  />
  <div v-else>
    <Spin />
  </div>
</template>

<script setup>
import Spin from '@/components/Spin.vue'
import BorrowForm from '@/components/Form/BorrowForm.vue'
import { onBeforeMount, onMounted, ref } from 'vue'
import router from '@/router'
import { deleteOne, getList, getOne, updateOne } from '@/api/dataController'
import { useRoute } from 'vue-router'

//init
const route = useRoute()
const id = route.params.id
const loading = ref(false)
const initState = ref({})
const message = ref({})
const bookImages = ref([])
const fields = ref([
  {
    title: 'Ngày mượn',
    dataIndex: 'borrowingDay',
    type: 'date'
  },
  {
    title: 'Ngày trả',
    dataIndex: 'returnDay',
    type: 'date'
  },
  {
    title: 'Trạng thái',
    dataIndex: 'isReturned',
    type: 'option',
    options: [
      {
        title: 'Đã trả',
        value: true
      },
      {
        title: 'Chưa trả',
        value: false
      }
    ]
  }
])

//function
const handleRemove = async () => {
  loading.value = true
  try {
    await deleteOne('borrows', id)
    router.push('/borrows')
  } catch (error) {
    console.error(error)
  }
  loading.value = false
}

const handleSubmit = async (data) => {
  try {
    const { reader, book, borrowingDay, returnDay } = data
    await updateOne('borrows', id, { reader, book, borrowingDay, returnDay })
    router.push('/borrows')
  } catch (error) {
    message.value = error.response.data
  }
}

onBeforeMount(async () => {
  loading.value = true
  try {
    const { data: books } = await getList('books')
    const { data: users } = await getList('users')
    const bookOptions = books.map((book) => ({
      title: book.title,
      value: book._id
    }))

    bookImages.value = books.reduce((prev, book) => {
      return { ...prev, [book._id]: book.image }
    }, {})

    const userOptions = users.map((user) => ({
      title: user.lastName + ' ' + user.firstName,
      value: user._id
    }))

    fields.value = [
      { title: 'Đọc giả', dataIndex: 'reader', type: 'option', options: userOptions },
      { title: 'Sách', dataIndex: 'book', type: 'option', options: bookOptions },
      ...fields.value
    ]
  } catch (error) {
    console.error('Xuất hiện lỗi khi lấy dữ liệu')
  }
  loading.value = false
})

onMounted(async () => {
  loading.value = true
  try {
    initState.value = await getOne('borrows', id)
  } catch (error) {
    console.error('Lỗi xảy ra khi lấy dữ liệu:', error)
  }
  loading.value = false
})
</script>
