<script setup lang="ts">
import UpgradeToPro from "@/components/UpgradeToPro.vue";
import Loader from "@/components/Loader.vue";
</script>

<template>
  <VApp>
    <Loader />
    <RouterView />
    <UpgradeToPro />
  </VApp>
</template>
