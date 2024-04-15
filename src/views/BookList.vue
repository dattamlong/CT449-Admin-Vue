<template>
  <div>
    <a-card :bordered="false" class="header-solid h-full" :bodyStyle="{ padding: 0 }">
      <template #title>
        <a-row type="flex" align="middle">
          <a-col :span="24" :md="12">
            <h5 class="font-semibold m-0">Quản lý sách</h5>
          </a-col>
          <a-col
            :span="24"
            :md="11"
            style="display: flex; align-items: center; justify-content: flex-end"
          >
            <a-input-search
              placeholder="Tên tài khoản..."
              style="width: 200px"
              :loading="loading"
              @search="onSearch"
              enter-button
            />
          </a-col>
        </a-row>
      </template>
      <a-button
        @click="() => router.push('/books/create')"
        class="fab"
        :style="{ fontSize: '16px', zIndex: 100 }"
        shape="circle"
      >
        <BookOutlined />
      </a-button>
      <a-table
        :customRow="customRow"
        :loading="loading"
        :columns="columns"
        :data-source="users"
        :pagination="false"
        :style="{ cursor: 'pointer' }"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'gender'">
            <a-tag :color="record.gender === '0' ? '#87d068' : '#108ee9'">
              {{ record.gender === '0' ? 'Nam' : 'Nữ' }}</a-tag
            >
          </template>

          <template v-if="column.key === 'birthday' && record.birthday">
            <span>{{ formatDate(record.birthday) }}</span></template
          >

          <template v-if="column.key === 'publisher' && record.publisher">
            <span>{{ record.publisher.name }}</span></template
          >

          <template v-if="column.key === 'title'">
            <div class="table-avatar-info">
              <a-avatar shape="square" :src="baseURL + '/' + record.image">
                <template #icon><UserOutlined /></template
              ></a-avatar>
              <div class="avatar-info">
                <h6>{{ record.title }}</h6>
                <p>{{ record.author }}</p>
              </div>
            </div>
          </template>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script setup>
const columns = [
  {
    title: 'Sách',
    dataIndex: 'title',
    key: 'title'
  },
  {
    title: 'Giá',
    dataIndex: 'price',
    key: 'price'
  },
  {
    title: 'Năm xuất bản',
    dataIndex: 'publishYear',
    key: 'publishYear'
  },
  {
    title: 'nhà xuất bản',
    dataIndex: 'publisher',
    key: 'publisher'
  }
]
const baseURL = import.meta.env.VITE_BE_ENDPOINT
import { UserOutlined } from '@ant-design/icons-vue'
import { onMounted, ref } from 'vue'
import { getList } from '@/api/dataController'
import { BookOutlined } from '@ant-design/icons-vue'
import router from '@/router'

//init
const loading = ref(false)
const users = ref(null)

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
    const res = await getList('books')
    const publishers = await getList('publishers')

    const processed = publishers.data.reduce((prev, publisher) => {
      return { ...prev, [publisher._id]: publisher }
    }, {})

    users.value = res.data.map((item) => {
      const publisher = processed[item.publisher]
      return { ...item, publisher }
    })
  } catch (error) {
    console.log(error)
  }
  loading.value = false
})

const customRow = (record) => {
  return {
    onClick: () => {
      router.push('/books/' + record._id)
    }
  }
}
</script>

<style lang="scss"></style>
