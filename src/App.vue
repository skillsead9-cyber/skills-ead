<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import DefaultLayout from '@/layouts/default.vue'
import EmptyLayout from '@/layouts/empty.vue'
import LandingLayout from '@/layouts/landing.vue'

const route = useRoute()

const layout = computed(() => {
  if (route.meta.layout === 'landing') {
    return LandingLayout
  }
  return route.meta.layout === 'empty' ? EmptyLayout : DefaultLayout
})
</script>

<style>
@import '@/assets/styles/main.css';
</style>
