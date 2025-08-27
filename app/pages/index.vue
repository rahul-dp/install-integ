<template>
  <div class="flex flex-col h-screen">
    <!-- System Banner -->
    <div class="bg-black">
      <div class="px-12">
        <div class="py-3 flex items-center gap-4">
          <p class="text-sm text-white">
            Freshdesk is now available.
          </p>
          <button
            @click="openFreshdeskModal"
            class="inline-flex items-center text-sm font-medium bg-purple-600 hover:bg-purple-700 text-white px-2 py-1 rounded-sm"
          >
            Learn more
          </button>
        </div>
      </div>
    </div>

    <!-- Page Content -->
    <div class="flex flex-col flex-grow overflow-hidden">
      <!-- Page Header -->
      <div class="flex justify-center items-center h-16 bg-gray-100 border-b border-gray-200 flex-shrink-0">
        <p>header</p>
      </div>
      
      <!-- Main Content Area - Using flex-grow to fill available space -->
      <div class="flex flex-grow overflow-hidden">
        <div class="bg-gray-100 w-64 border-r border-gray-200 flex justify-center items-center flex-shrink-0">
            left-bar
        </div>
        <div class="w-full flex justify-center items-center overflow-auto">
            Conversation view
        </div>
        <div class="w-64 bg-gray-100 border-l border-gray-200 flex justify-center items-center flex-shrink-0">
            right-bar
        </div>
      </div>
    </div>

    <!-- Freshdesk Modal -->
    <FreshdeskModal 
      v-if="showFreshdeskModal"
      @close="closeFreshdeskModal"
      @add="handleAddFreshdesk"
    />
  </div>
</template>

<script setup>
import FreshdeskModal from '~/components/freshdeskModal.vue';
import { ref } from 'vue';
import { navigateTo } from '#app';

const showFreshdeskModal = ref(false);

const openFreshdeskModal = () => {
  showFreshdeskModal.value = true;
};

const closeFreshdeskModal = () => {
  showFreshdeskModal.value = false;
};

const handleAddFreshdesk = () => {
  // Navigate to settings page with query parameter to open Freshdesk modal
  navigateTo('/settings/integrations?add=freshdesk')
};
</script>
