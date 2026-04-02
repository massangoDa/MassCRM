<script setup lang="ts">
import AddModal from "~/components/shared/AddModal.vue";
import {type CreateCustomerInput, CreateCustomerSchema} from "~/schemas/customer.validation";

const toast = useToast()

async function handleCreateCustomer(data: CreateCustomerInput) {
  try {
    await useCustomers().createCustomer(data)
  } catch (err: any) {
    toast.error({ title: "顧客の追加に失敗", message: err.message })
  }
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
          <AddModal
            button-label="顧客を追加"
            modal-description="顧客を追加するためのフォームを入力してください"
            :schema="CreateCustomerSchema"
            @submit="handleCreateCustomer"
          />
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
