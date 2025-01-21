<script setup lang="ts">
import Loader from "@/components/Loader.vue";
import UpgradeToPro from "@/components/UpgradeToPro.vue";
</script>

<template>
  <VApp>
    <Loader />
    <RouterView />
    <UpgradeToPro />
  </VApp>
</template>
