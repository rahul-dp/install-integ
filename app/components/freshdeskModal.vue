<template>
  <div class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" @click.self="$emit('close')">
    <div class="bg-white rounded-lg w-full max-w-2xl">
      <div class="flex items-center justify-between p-4 border-b border-gray-200">
        <div class="flex items-center space-x-3">
          <span class="text-2xl">🎫</span>
          <h4 class="font-medium text-gray-900 text-lg">Freshdesk Integration</h4>
        </div>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-500">
          <svg class="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div class="p-6 max-h-[60vh] overflow-y-auto">
        <div class="mb-6">
          <h3 class="text-lg font-medium text-gray-900 mb-3">Features</h3>
          <ul class="space-y-3">
            <li class="flex items-start">
              <svg class="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>View and manage Freshdesk tickets directly from Dialpad</span>
            </li>
            <li class="flex items-start">
              <svg class="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Automatically create tickets from missed calls</span>
            </li>
            <li class="flex items-start">
              <svg class="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>View customer information and ticket history during calls</span>
            </li>
            <li class="flex items-start">
              <svg class="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Sync call recordings with Freshdesk tickets</span>
            </li>
            <li class="flex items-start">
              <svg class="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Get real-time notifications for ticket updates</span>
            </li>
          </ul>
        </div>

        <div class="bg-blue-50 p-4 rounded-lg mb-6">
          <h4 class="font-medium text-blue-800 mb-2">Requirements</h4>
          <ul class="text-sm text-blue-700 space-y-1">
            <li>• Freshdesk account with admin access</li>
            <li>• Your Freshdesk domain (e.g., yourcompany.freshdesk.com)</li>
            <li>• API key from your Freshdesk account</li>
          </ul>
        </div>
      </div>

      <div class="bg-gray-50 px-4 py-3 flex justify-between items-center rounded-b-lg">
        <a href="https://support.freshdesk.com/support/solutions/215517" target="_blank" class="text-sm text-gray-600 hover:text-gray-900 flex items-center">
          <span>Learn more about Freshdesk API</span>
          <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
        <button 
          @click="handleAdd"
          class="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          Add Freshdesk
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['close', 'add']);

const handleAdd = () => {
  // Emit add event to parent component
  emit('add');
  // Close the modal
  emit('close');
};
</script>
