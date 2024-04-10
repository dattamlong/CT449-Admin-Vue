<template>
  <div>
    <a-card :bordered="false" class="header-solid h-full" :bodyStyle="{ padding: 0 }">
      <template #title>
        <h5 class="font-semibold m-0">Danh sách tài khoản</h5>
      </template>
      <a-table
        :customRow="customRow"
        :loading="loading"
        :columns="columns"
        :data-source="users"
        :pagination="false"
        :style="{ cursor: 'pointer' }"
      >
      </a-table>
    </a-card>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getList } from '@/api/dataController'
import router from '@/router'

const loading = ref(false)
const columns = [
  {
    title: 'Tên',
    dataIndex: 'firstName',
    key: 'firstName'
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email'
  },
  {
    title: 'Phone number',
    dataIndex: 'phoneNumber',
    key: 'email'
  },
  {
    title: 'Giới tính',
    dataIndex: 'gender',
    key: 'gender'
  }
]

const users = ref(null)

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
