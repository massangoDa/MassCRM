<script setup lang="ts">
import {type RegisterInput, RegisterSchema} from "~/schemas/auth.validation";
import type {AuthFormField} from "@nuxt/ui/components/AuthForm.vue";
import type {FormSubmitEvent} from "@nuxt/ui";

definePageMeta({
  layout: "auth"
})

const toast = useToast()
const { register } = useAuth()

const fields: AuthFormField[] = [{
  name: "name",
  type: "text",
  label: "Name",
  placeholder: "Mass Angoh",
  required: true
}, {
  name: "email",
  type: "email",
  label: "Email",
  placeholder: "massango@massango.jp",
  required: true
}, {
  name: "password",
  type: "password",
  label: "Password",
  required: true
}]

const providers = [{
  label: "Googleはまだ",
  icon: "i-simple-icons-google"
}]

async function onSubmit(payload: FormSubmitEvent<RegisterInput>) {
  try{
    await register(payload.data)
    toast.success({ title: "Register successfully", message: "Register successfully" })
  } catch (err: any) {
    toast.error({ title: "Register failed", message: err.message || "Register failed" })
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 p-4">
    <UPageCard class="w-full max-w-md">
      <UAuthForm
        :schema="RegisterSchema"
        title="Create an account"
        description="Create a account"
        icon="i-lucide-user-plus"
        :fields="fields"
        :providers="providers"
        @submit="onSubmit"
      >
      </UAuthForm>
      <NuxtLink to="/login">ログイン</NuxtLink>
    </UPageCard>
  </div>
</template>

<style scoped>

</style>
