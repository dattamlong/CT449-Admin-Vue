<template>
  <div>
    <a-card :bordered="false" class="header-solid h-full" :bodyStyle="{ padding: 0 }">
      <template #title>
        <a-row type="flex" align="middle">
          <a-col :span="24" :md="12">
            <h5 class="font-semibold m-0">Quản lý Mượn sách</h5>
          </a-col>
          <a-col
            :span="24"
            :md="11"
            style="display: flex; align-items: center; justify-content: flex-end"
          >
            <a-input-search
              placeholder="Tìm kiếm..."
              style="width: 200px"
              :loading="loading"
              @search="onSearch"
              enter-button
            />
          </a-col>
        </a-row>
      </template>
      <a-button
        @click="() => router.push('/borrows/create')"
        class="fab"
        :style="{ fontSize: '16px', zIndex: 100 }"
        shape="circle"
      >
        <SwitcherOutlined />
      </a-button>
      <a-table
        :customRow="customRow"
        :loading="loading"
        :columns="columns"
        :data-source="borrows"
        :pagination="false"
        :style="{ cursor: 'pointer' }"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'borrowingDay' && record.borrowingDay">
            <span>{{ formatDate(record.borrowingDay) }}</span></template
          >

          <template v-if="column.key === 'reader' && record.reader">
            <router-link :to="`/users/${record.reader._id}`" @click.stop>{{
              record.reader.firstName
            }}</router-link></template
          >

          <template v-if="column.key === 'book' && record.book">
            <router-link :to="`/books/${record.book._id}`" @click.stop>{{
              record.book.title
            }}</router-link></template
          >

          <template v-if="column.key === 'returnDay' && record.returnDay">
            <span>{{ formatDate('2024-04-22T22:42:18.000Z') }}</span></template
          >
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script setup>
const columns = [
  {
    title: 'Đọc giả',
    dataIndex: 'reader',
    key: 'reader'
  },
  {
    title: 'Sách',
    dataIndex: 'book',
    key: 'book'
  },
  {
    title: 'Ngày mượn',
    dataIndex: 'borrowingDay',
    key: 'borrowingDay'
  },
  {
    title: 'Ngày trả',
    dataIndex: 'returnDay',
    key: 'returnDay'
  }
]
const baseURL = import.meta.env.VITE_BE_ENDPOINT
import { onMounted, ref } from 'vue'
import { getList } from '@/api/dataController'
import { SwitcherOutlined } from '@ant-design/icons-vue'
import router from '@/router'
import formatDate from '@/utils/formatDate'

//init
const loading = ref(false)
const borrows = ref([])

//fuction
const onSearch = async (text) => {
  loading.value = true
  try {
    const res = await getList('books', text)
    users.value = res.data
  } catch (error) {
    console.log(error)
  }
  loading.value = false
}

onMounted(async () => {
  loading.value = true
  try {
    const res = await getList('borrows')
    const { data: books } = await getList('books')
    const { data: users } = await getList('users')

    const processedBook = books.reduce((prev, book) => {
      return { ...prev, [book._id]: book }
    }, {})

    const processedUser = users.reduce((prev, user) => {
      return { ...prev, [user._id]: user }
    }, {})

    borrows.value = res.data.map((item) => {
      const reader = processedUser[item.reader]
      const book = processedBook[item.book]
      return { ...item, reader, book }
    })
  } catch (error) {
    console.log(error)
  }
  loading.value = false
})

const customRow = (record) => {
  return {
    onClick: () => {
      router.push('/borrows/' + record._id)
    }
  }
}
</script>

<style lang="scss"></style>
