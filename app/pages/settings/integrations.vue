<template>
  <div>
    <!-- Page Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Integrations</h1>
      <p class="mt-2 text-gray-600">Connect and manage third-party connections to Dialpad</p>
    </div>

    <!-- Add integrations CTA -->
    <div class="mb-8 flex flex-col gap-4 border border-gray-200 p-6 rounded-lg">
      <p class="font-medium text-sm">Add integrations to your organization</p>
      <div class="flex items-center flex-wrap gap-3">
        <button 
          v-for="(btn, index) in integrationButtons" 
          :key="index"
          @click="navigateToIntegration(btn)"
          class="bg-gray-200 hover:bg-gray-300 px-2 py-2 rounded-lg flex items-center justify-center text-white cursor-pointer"
          :class="{ 'bg-gray-300': btn.text }"
        >
          <span v-if="!btn.text" class="text-2xl">{{ btn.icon }}</span>
          <span v-else class="text-sm">{{ btn.text }}</span>
        </button>
      </div>
    </div>

    <!-- Integrations Grid -->
    <div class="flex flex-col gap-4">
      <div
        v-for="integration in connectedIntegrations"
        :key="integration.id"
        class="rounded-lg border border-gray-200"
      >
        <div class="rounded-lg">
          <div class="bg-gray-100 rounded-t-lg flex items-center justify-between px-6 py-4">
            <div class="flex items-center space-x-3">
              <div
                :class="[
                  'w-12 h-12 rounded-lg flex items-center justify-center',
                  integration.iconBg
                ]"
              >
                <span class="text-2xl">{{ integration.icon }}</span>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900">{{ integration.name }}</h3>
                <div class="flex items-center space-x-0.1">
                  <div 
                    :class="[
                      'size-2 rounded-full', 
                      integration.connected ? 'bg-green-500' : 'bg-rose-500'
                    ]"
                  ></div>
                  <span
                    :class="[
                      'px-2 py-1 text-xs',
                      integration.connected
                        ? 'text-green-900'
                        : 'text-rose-900'
                    ]"
                  >
                    {{ integration.connected ? 'Online' : 'Offline' }}
                  </span>
                </div>
              </div>
            </div>

            <NuxtLink
              :to="`/integrations/${integration.id}`"
              class="bg-purple-600 hover:bg-purple-700 text-white px-2 py-1 rounded-md text-sm"
            >
              {{ integration.connected ? 'Configure' : 'Connect' }}
            </NuxtLink>
          </div>

          <div id="integration-description" class="bg-white p-6 rounded-b-lg">
            <!-- Special notice for Salesforce -->
            <div v-if="integration.id === 'salesforce'" class="mb-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
              <div class="flex items-start">
                <div class="flex-shrink-0">
                </div>
                <div class="ml-1 w-full flex items-center justify-between">
                  <div class="">
                    <h3 class="text-sm font-medium text-gray-800">Update available</h3>
                    <p class="mt-1 text-xs text-gray-700">Update to version 2.0 to access all the new features.</p>
                  </div>
                  <div>
                    <button class="bg-purple-700 hover:bg-purple-700 text-white px-2 py-1 rounded-md text-sm">Update</button>
                  </div>
                </div>
              </div>
            </div>
            
            <div v-if="integration.connected" class="">
              <div class="flex flex-col gap-2">
                <div v-if="integration.company" class="flex items-center justify-between">
                  <div class="text-xs text-gray-500">Connected Account</div>
                  <div class="text-xs">{{ integration.company }}</div>
                </div>
                <div v-if="integration.instance" class="flex items-center justify-between">
                  <div class="text-xs text-gray-500">Instance URL</div>
                  <div class="text-xs truncate">{{ integration.instance }}</div>
                </div>
                <div v-if="integration.lastSynced" class="flex items-center justify-between">
                  <div class="text-xs text-gray-500">Last Synced</div>
                  <div class="text-xs">{{ integration.lastSynced }}</div>
                </div>
                <div v-if="integration.version" class="flex items-center justify-between">
                  <div class="text-xs text-gray-500">Version</div>
                  <div class="text-xs">{{ integration.version }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
definePageMeta({ layout: 'settings' })

// State
const router = useRouter();

// Use global store for connected integrations
const { connectedIntegrations } = useIntegrations();

// Computed
const route = useRoute();

// Methods
const navigateToIntegration = (integration) => {
  // Create a unique ID for the integration if it doesn't exist
  const integrationId = integration.name.toLowerCase().replace(/\s+/g, '-');
  
  // Navigate to the integration page which will open on the settings tab by default
  router.push(`/integrations/${integrationId}`);
};

onMounted(() => {
  // Check for query parameter to navigate to specific integration
  if (route.query.add === 'freshdesk') {
    // Find Freshdesk integration from the buttons
    const freshdeskIntegration = integrationButtons.find(btn => 
      btn.name.toLowerCase() === 'freshdesk'
    );
    
    if (freshdeskIntegration) {
      // Small timeout to ensure the component is fully mounted
      setTimeout(() => {
        navigateToIntegration(freshdeskIntegration);
      }, 100);
    }
  }
});

// Your existing integrationButtons array
const integrationButtons = [
  { icon: '💬', name: 'Slack', description: 'Connect your Slack workspace', domainSuffix: '.slack.com', iconBg: 'bg-purple-100', apiKeyHint: 'Find this in Slack API settings', authType: 'apiKey' },
  { icon: '📅', name: 'Google Calendar', description: 'Sync your calendar events', domainSuffix: '.google.com', iconBg: 'bg-blue-100', authType: 'oauth' },
  { icon: '☁️', name: 'Salesforce', description: 'Connect your Salesforce account', domainSuffix: '.salesforce.com', iconBg: 'bg-sky-100', authType: 'apiKey' },
  { icon: '🎯', name: 'Zendesk', description: 'Connect your Zendesk support', domainSuffix: '.zendesk.com', iconBg: 'bg-orange-100', authType: 'apiKey' },
  { icon: '📹', name: 'Zoom', description: 'Connect your Zoom account', iconBg: 'bg-blue-100', authType: 'oauth' },
  { icon: '📦', name: 'Dropbox', description: 'Connect your Dropbox', iconBg: 'bg-indigo-100', authType: 'apiKey' },
  { icon: '👥', name: 'Microsoft Teams', description: 'Connect Microsoft Teams', iconBg: 'bg-purple-100', authType: 'oauth' },
  { icon: '🐙', name: 'GitHub', description: 'Connect GitHub repository', iconBg: 'bg-gray-100', authType: 'apiKey' },
  { icon: '📊', name: 'Google Analytics', description: 'Connect Google Analytics', iconBg: 'bg-green-100', authType: 'apiKey' },
  { icon: '🔧', name: 'Webhook', description: 'Set up a custom webhook', iconBg: 'bg-gray-200', authType: 'oauth' },
  { text: 'Freshdesk', name: 'Freshdesk', description: 'Connect Freshdesk support', domainSuffix: '.freshdesk.com', iconBg: 'bg-orange-100', authType: 'apiKey' },
  { icon: '🔍', name: 'Search', description: 'Search for more integrations', iconBg: 'bg-gray-200', authType: 'apiKey' }
];


</script>
