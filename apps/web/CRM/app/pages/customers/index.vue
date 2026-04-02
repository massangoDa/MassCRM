<script setup lang="ts">

import AddModal from "~/components/shared/AddModal.vue";

async function createCustomer() {

}
</script>

<template>
  <UDashboardPanel id="customers/index">
    <template #header>
      <UDashboardNavbar title="Customers">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <UButton icon="i-lucide-plus" size="md" class="rounded-full" @click="createCustomer">顧客を追加</UButton>
          <AddModal />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <h1>いぇあ</h1>
    </template>
  </UDashboardPanel>
</template>

<style scoped>

</style>
