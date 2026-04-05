<script setup lang="ts">
import AddModal from "~/components/shared/AddModal.vue";
import {type CreateCustomerInput, CreateCustomerSchema, type Customer} from "~/schemas/customer.validation";
import type {FormType} from "~/schemas/form.validation";
import type {TableColumn} from "@nuxt/ui/components/Table.vue";
import {row} from "@unovis/ts/components/timeline/style";

const toast = useToast()
const { customersQuery, createCustomerMutation } = useCustomersQuery()

const globalFilter = ref('')

const formField = [
  {
    name: 'name',
    label: '取引先・氏名',
    type: 'text',
    placeholder: '株式会社〇〇 / 山田 太郎',
    required: true,
  },
  {
    name: 'category',
    label: '属性',
    type: 'select',
    options: [
      "見込み客",
      "顧客（既存）",
      "顧客（継続中）",
      "パートナー/協力会社",
      "仕入先",
      "競合/調査対象",
      "その他"
    ]
  },
  {
    name: 'status',
    label: '状況',
    type: 'select',
    options: [
      "未アプローチ",
      "交渉中",
      "契約中",
      "保留",
      "失注/終了"
    ]
  },
  {
    name: 'email',
    label: 'メールアドレス',
    type: 'email',
    placeholder: 'example@mail.com'
  },
  {
    name: 'phone',
    label: '電話番号',
    type: 'phone',
    placeholder: '090-0000-0000'
  },
  {
    name: 'address',
    label: '住所',
    type: 'text',
    placeholder: '長野県北安曇郡'
  },
  {
    name: 'website',
    label: 'Webサイト',
    type: 'text',
    placeholder: 'https://massango.jp',
  },
  {
    name: 'description',
    label: '備考・メモ',
    type: 'textarea',
    placeholder: '会社の説明や備考を入力',
  }
] satisfies FormType[]

const columns: TableColumn<Customer>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => row.index + 1
  },
  {
    accessorKey: 'name',
    header: '取引先・氏名',
    cell: ({ row }) => {
      return h(resolveComponent('NuxtLink'), {
        to: `/customers/${row.original.id}`
      }, () => row.original.name)
    }
  },
  {
    accessorKey: 'category',
    header: '属性',
  },
  {
    accessorKey: 'status',
    header: '状況',
  },
  {
    accessorKey: 'email',
    header: 'メールアドレス',
  },
  {
    accessorKey: 'phone',
    header: '電話番号',
  },
  {
    accessorKey: 'website',
    header: 'Webサイト',
  },
]

async function handleCreateCustomer(data: CreateCustomerInput) {
  try {
    await createCustomerMutation.mutateAsync(data)
    toast.success({ title: "顧客の追加に成功", message: "顧客が正常に追加されました" })
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
            :forms="formField"
            @submit="handleCreateCustomer"
          />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="flex flex-col flex-1 w-full">
        <div class="flex py-3.5 border-b border-accented">
          <UInput v-model="globalFilter" class="max-w-sm" placeholder="Filter" />
        </div>

        <UTable
          sticky
          ref="table"
          :data="customersQuery.data.value"
          :columns="columns"
          v-model:global-filter="globalFilter"
          class="flex-1"
        />
      </div>
    </template>
  </UDashboardPanel>
</template>

<style scoped>

</style>
