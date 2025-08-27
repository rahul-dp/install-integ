<template>
  <div class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" @click.self="$emit('close')">
    <div class="bg-white rounded-lg w-full max-w-md">
      <div class="flex items-center justify-between p-4 border-b border-gray-200">
        <div class="flex items-center space-x-3">
            <h4 class="font-medium text-gray-900">Connect your {{ integration.name }} account</h4>
        </div>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-500">
          <svg class="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div class="p-6 text-center">
        <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
          <span class="text-3xl">{{ integration.icon || '🔑' }}</span>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">Connect with {{ integration?.name }}</h3>
        <p class="text-sm text-gray-500 mb-6">
          You'll be redirected to {{ integration?.name }} to authorize access to your account.
        </p>
        <button 
          @click="handleConnect"
          class="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          Connect {{ integration?.name }}
          <svg class="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  integration: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['connect', 'close']);

const handleConnect = () => {
  // In a real app, this would redirect to the OAuth provider
  // For demo, we'll just emit the connect event
  emit('connect', props.integration);
};
</script>
