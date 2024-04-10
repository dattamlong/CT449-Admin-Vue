<!-- 
	This is the tables page, it uses the dashboard layout in: 
	"./layouts/Dashboard.vue" .
 -->

<template>
  <div>
    <card-user-table :data="table1Data" :columns="table1Columns"></card-user-table>
  </div>
</template>

<script>
import CardUserTable from '@/components/Cards/CardUserTable.vue'
const columns = [
  {
    title: 'First name',
    dataIndex: 'firstName',
    key: 'firstName'
  },
  {
    title: 'Last name',
    dataIndex: 'lastName',
    key: 'firstName'
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender'
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address'
  },
  {
    title: 'Phone number',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber'
  }
]

const data = [
  {
    firstName: 'Dat',
    lastName: 'Nguyen',
    gender: 'unknow',
    address: 'Trương công định',
    phoneNumber: '0868246843'
  }
]

export default {
  components: {
    CardUserTable
  },
  data() {
    return {
      table1Data: data,
      table1Columns: columns
    }
  }
}
</script>

<style lang="scss"></style>
