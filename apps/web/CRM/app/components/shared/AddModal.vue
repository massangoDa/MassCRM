<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const props = defineProps<{
  buttonLabel: string,
  buttonIcon?: string,
  modalTitle?: string,
  modalDescription?: string,
  schema: z.ZodTypeAny,
}>()
const emit = defineEmits<{
  (e: "submit", data: any): void
}>()

const open = ref(false)

const state = reactive<Record<string, any>>({})

async function onSubmit(event: FormSubmitEvent<unknown>) {
  emit('submit', event.data)
  open.value = false
}
</script>

<template>
  <UModal fullscreen v-model:open="open" :title="props.buttonLabel ?? props.modalTitle" :description="props.modalDescription" :ui="{ content: 'm-20 rounded-lg' }">
    <UButton :label="props.buttonLabel" :icon="props.buttonIcon ?? 'i-lucide-plus'" class="rounded-full" />

    <template #body>
      <UForm
        :schema="props.schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormField label="Name" placeholder="John Doe" name="name">
          <UInput v-model="state.name" class="w-full" />
        </UFormField>
        <UFormField label="Email" placeholder="john.doe@example.com" name="email">
          <UInput v-model="state.email" class="w-full" />
        </UFormField>
        <div class="flex justify-end gap-2">
          <UButton
            label="Cancel"
            color="neutral"
            variant="subtle"
            @click="open = false"
          />
          <UButton
            label="Create"
            color="primary"
            variant="solid"
            type="submit"
          />
        </div>
      </UForm>
    </template>
  </UModal>
</template>
