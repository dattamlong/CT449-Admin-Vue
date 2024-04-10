<template>
  <a-card :bordered="false" class="header-solid h-full" :bodyStyle="{ padding: 0 }">
    <template #title>
      <a-col :span="24" :md="12">
        <h5 class="font-semibold m-0">Danh sách người dùng</h5>
      </a-col>
    </template>
    <a-table :columns="columns" :data-source="data" :pagination="false"> </a-table>
  </a-card>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      // Active button for the "Authors" table's card header radio button group.
      authorsHeaderBtns: 'all'
    }
  }
}
</script>
