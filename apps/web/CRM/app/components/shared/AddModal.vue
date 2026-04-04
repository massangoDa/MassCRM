<script setup lang="ts">
import * as z from 'zod'
import type {FormSubmitEvent} from '@nuxt/ui'
import type {FormType} from "~/schemas/form.validation";

const props = defineProps<{
  buttonLabel: string,
  buttonIcon?: string,
  modalTitle?: string,
  modalDescription?: string,
  schema: z.ZodTypeAny,
  forms: FormType[]
}>()
const emit = defineEmits<{
  (e: "submit", data: any): void
}>()

const open = ref(false)
const state = reactive<Record<string, any>>({})

watchEffect(() => {
  for (const f of props.forms) {
    if (f.name in state) continue
    state[f.name] = f.type === 'number' ? null : ''
  }
})

function inputType(field: FormType) {
  switch (field.type) {
    case 'text':
      return 'text'
    case 'number':
      return 'number'
    case 'phone':
      return 'tel'
    case 'website':
      return 'url'
    case 'email':
      return 'email'
    default:
      return 'text'
  }
}

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
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <UFormField
            v-for="field in props.forms"
            :key="field.name"
            :label="field.label"
            :name="field.name"
            :required="field.required"
            :class="{ 'md:col-span-2': field.type === 'textarea' }"
          >
            <UTextarea
              v-if="field.type === 'textarea'"
              v-model="state[field.name]"
              class="w-full"
              :type="inputType(field)"
              :placeholder="field.placeholder"
            />
            <USelectMenu
              v-else-if="field.type === 'select'"
              v-model="state[field.name]"
              class="w-full"
              :items="field.options"
            />
            <UInput
              v-else
              v-model="state[field.name]"
              class="w-full"
              :type="inputType(field)"
              :placeholder="field.placeholder"
            />
          </UFormField>
        </div>

        <div class="flex justify-end gap-2">
          <UButton
            label="Cancel"
            color="neutral"
            variant="subtle"
            type="button"
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
