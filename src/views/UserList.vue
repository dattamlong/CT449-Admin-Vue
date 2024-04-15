<template>
  <div>
    <a-card :bordered="false" class="header-solid h-full" :bodyStyle="{ padding: 0 }">
      <template #title>
        <a-row type="flex" align="middle">
          <a-col :span="24" :md="12">
            <h5 class="font-semibold m-0">Danh sách tài khoản</h5>
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
        @click="() => router.push('/users/create')"
        class="fab"
        :style="{ fontSize: '16px', zIndex: 100 }"
        shape="circle"
      >
        <UserAddOutlined />
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

          <template v-if="column.key === 'firstName'">
            <div class="table-avatar-info">
              <a-avatar shape="square" :src="baseURL + '/' + record.avatar">
                <template #icon><UserOutlined /></template
              ></a-avatar>
              <div class="avatar-info">
                <h6>{{ record.firstName }}</h6>
                <p>{{ record.email }}</p>
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
    title: 'Tài khoản',
    dataIndex: 'firstName',
    key: 'firstName'
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber'
  },
  {
    title: 'Ngày sinh',
    dataIndex: 'birthday',
    key: 'birthday'
  },
  {
    title: 'Giới tính',
    dataIndex: 'gender',
    key: 'gender'
  }
]

const baseURL = import.meta.env.VITE_BE_ENDPOINT
import { UserOutlined } from '@ant-design/icons-vue'
import { onMounted, ref } from 'vue'
import { getList } from '@/api/dataController'
import { UserAddOutlined } from '@ant-design/icons-vue'
import router from '@/router'

//init
const loading = ref(false)
const users = ref(null)

//function
const formatDate = (isoDateString) => {
  const date = new Date(isoDateString)
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0') // Tháng bắt đầu từ 0 (tức là tháng 1 là 0)
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

const onSearch = async (text) => {
  loading.value = true
  try {
    const res = await getList('users', text)
    users.value = res.data
  } catch (error) {
    console.log(error)
  }
  loading.value = false
}

onMounted(async () => {
  loading.value = true
  try {
    const res = await getList('users')
    users.value = res.data
  } catch (error) {
    console.log(error)
  }
  loading.value = false
})

const customRow = (record) => {
  return {
    onClick: () => {
      router.push('/users/' + record._id)
    }
  }
}
</script>

<style lang="scss"></style>
