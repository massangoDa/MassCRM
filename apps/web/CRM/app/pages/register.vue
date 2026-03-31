<script setup lang="ts">
definePageMeta({
  layout: "auth"
})
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 p-4">
    <UPageCard class="w-full max-w-md">
      <UAuthForm
        title="Create an account"
        description="Create a account"
        icon="i-lucide-user-plus"
      >
      </UAuthForm>
    </UPageCard>
  </div>
</template>

<style scoped>

</style>
