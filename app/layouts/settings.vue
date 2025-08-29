<template>
  <div class="w-full min-h-screen bg-gray-50">
    <!-- Top Header -->
    <header class="w-full h-16 bg-white border-b border-gray-200">
      <div class="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <h1 class="text-base font-semibold text-gray-900">Settings</h1>
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-1 text-gray-700 hover:text-gray-900 px-3 py-1.5 rounded-md border border-gray-300 bg-white hover:bg-gray-50 text-sm"
        >
          <span>Close</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </NuxtLink>
      </div>
    </header>

    <div class="flex">
      <!-- Left Sidebar -->
      <aside class="w-64 shrink-0 bg-white border-r border-gray-200 min-h-[calc(100vh-4rem)]">
        <nav class="p-4">
          <p class="px-3 pb-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">General</p>
          <NuxtLink
            to="/settings/integrations"
            class="flex items-center gap-2 px-3 py-2 rounded-md text-sm"
            :class="[
              isIntegrationsActive
                ? 'bg-gray-100 text-gray-900'
                : 'text-gray-700 hover:bg-gray-50'
            ]"
          >
            <span class="inline-flex items-center justify-center w-5 h-5 rounded text-[11px] bg-purple-100">🔌</span>
            <span>Integrations</span>
          </NuxtLink>
        </nav>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 p-8 max-w-7xl mx-auto">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const isIntegrationsActive = computed(() =>
  route.path.startsWith('/settings/integrations') || route.path.startsWith('/integrations/')
)
</script>
