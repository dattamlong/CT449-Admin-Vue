<template>
  <borrow-form
    v-if="!loading"
    :fields="fields"
    :initState="initState"
    @handleSubmit="handleSubmit"
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
import { onBeforeMount, ref } from 'vue'
import router from '@/router'
import { create, getList } from '@/api/dataController'

//init

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
  }
])

//function
const handleSubmit = async (data) => {
  loading.value = true
  try {
    const { reader, book, borrowingDay, returnDay } = data
    await create('borrows', { reader, book, borrowingDay, returnDay })
    router.push('/borrows')
  } catch (error) {
    message.value = error.response.data
  }
  loading.value = false
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
</script>
