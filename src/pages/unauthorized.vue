<script setup lang="ts">
import unauthorizedImage from "@images/pages/404.png";
</script>

<template>
  <div class="misc-wrapper">
    <ErrorHeader
      status-code="401"
      title="Unauthorized Access 🚫"
      description="You do not have permission to view this page."
    />

    <VBtn to="/" class="mb-6"> Back to Home </VBtn>

    <!-- 👉 Image -->
    <div class="misc-avatar w-100 text-center">
      <VImg
        :src="unauthorizedImage"
        alt="Unauthorized Access"
        :max-width="500"
        class="mx-auto"
      />
    </div>
  </div>
</template>

<style lang="scss">
@use "@core/scss/template/pages/misc.scss";
</style>
