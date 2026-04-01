<script setup lang="ts">
import {LoginSchema, type LoginInput} from "~/schemas/auth.validation";
import type {AuthFormField} from "@nuxt/ui/components/AuthForm.vue";
import type {FormSubmitEvent} from "@nuxt/ui";

definePageMeta({
  layout: "auth"
})

const toast = useToast()
const { login } = useAuth()

const fields: AuthFormField[] = [{
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

async function onSubmit(payload: FormSubmitEvent<LoginInput>) {
  try{
    await login(payload.data)
  } catch (err: any) {
    toast.error({ title: "Login failed", message: err.message || "Login failed" })
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 p-4">
    <UPageCard class="w-full max-w-md">
      <UAuthForm
        :schema="LoginSchema"
        title="Login"
        description="アカウントにアクセスするには、認証情報を入力してください。"
        icon="i-lucide-user-plus"
        :fields="fields"
        :providers="providers"
        @submit="onSubmit"
      >
      </UAuthForm>
      <NuxtLink to="/register">アカウントを作成</NuxtLink>
    </UPageCard>
  </div>
</template>

<style scoped>

</style>
