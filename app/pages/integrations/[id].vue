<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Back Navigation -->
    <NuxtLink 
      to="/settings/integrations" 
      class="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
    >
      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      Back to Integrations
    </NuxtLink>

    <!-- Integration Header -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
      <div class="p-6">
        <div class="flex items-start justify-between">
          <div class="flex items-center space-x-4">
            <div :class="['w-16 h-16 rounded-lg flex items-center justify-center', currentIntegration.iconBg]">
              <span class="text-3xl">{{ currentIntegration.icon }}</span>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-gray-900">{{ currentIntegration.name }}</h1>
              <p class="text-gray-600">{{ currentIntegration.description }}</p>
              <div class="flex items-center gap-3 mt-2">
                <span :class="[
                  'px-2 py-1 text-xs rounded-full',
                  isAuthenticating
                    ? 'bg-blue-100 text-blue-800'
                    : (isConnected 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-600')
                ]">
                  {{ isAuthenticating ? 'Authenticating...' : (isConnected ? 'Connected' : 'Not Connected') }}
                </span>
                <span class="text-sm text-gray-500">
                  Category: {{ currentIntegration.category }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Configuration Tabs -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
      <div class="border-b border-gray-200">
        <nav class="flex -mb-px">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'px-6 py-3 text-sm font-medium border-b-2 transition-colors',
              activeTab === tab.id
                ? 'text-blue-600 border-blue-600'
                : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
            ]"
          >
            {{ tab.label }}
          </button>
        </nav>
      </div>

      <!-- Tab Content -->
      <div class="p-6">
        <!-- General Tab -->
        <div v-if="activeTab === 'general'">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Configuration Settings</h2>
          
          <div class="space-y-6">
            <div v-if="currentIntegration.authType === 'apiKey'">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                API Key
              </label>
              <input
                type="password"
                v-model="settings.apiKey"
                placeholder="Enter your API key"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p class="mt-1 text-sm text-gray-500">Your API key is encrypted and stored securely</p>
            </div>
            <div v-if="currentIntegration.domainSuffix">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Domain
              </label>
              <input
                type="text"
                v-model="settings.domain"
                :placeholder="`Enter your ${currentIntegration.name} domain (e.g. example${currentIntegration.domainSuffix})`"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Webhook URL
              </label>
              <input
                type="url"
                v-model="settings.webhookUrl"
                placeholder="https://your-domain.com/webhook"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Sync Frequency
              </label>
              <select
                v-model="settings.syncFrequency"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="realtime">Real-time</option>
                <option value="5min">Every 5 minutes</option>
                <option value="15min">Every 15 minutes</option>
                <option value="hourly">Hourly</option>
                <option value="daily">Daily</option>
              </select>
            </div>

            <div class="flex items-center justify-between py-4 border-t border-gray-200">
              <div>
                <h3 class="font-medium text-gray-900">Enable Notifications</h3>
                <p class="text-sm text-gray-500">Receive alerts for important events</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="settings.notifications" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div class="flex justify-end gap-3 pt-4">
              <button 
                class="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                :disabled="isAuthenticating"
                :class="{ 'opacity-60 cursor-not-allowed': isAuthenticating }"
              >
                Cancel
              </button>
              <button 
                @click="saveSettings"
                :disabled="isAuthenticating"
                :class="[
                  'px-4 py-2 text-white rounded-lg transition-colors',
                  isAuthenticating ? 'bg-blue-400 cursor-not-allowed opacity-70' : 'bg-blue-600 hover:bg-blue-700'
                ]"
              >
                {{ isConnected ? 'Save Settings' : (isAuthenticating ? 'Connecting…' : 'Save & Connect') }}
              </button>
            </div>
          </div>
        </div>

        <!-- Call Logging Tab -->
        <div v-if="activeTab === 'call-logging'">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Call Logging Configuration</h2>
          <p class="text-gray-600">Configure how calls are logged and tracked for this integration.</p>
          <!-- Add call logging specific content here -->
        </div>
      </div>
    </div>

    <!-- Danger Zone -->
    <div v-if="isAdded" class="mt-6 bg-red-50 border border-red-200 rounded-lg p-6">
      <h3 class="text-lg font-semibold text-red-900 mb-2">Danger Zone</h3>
      <p class="text-sm text-red-700 mb-4">
        These actions are destructive. Disconnect will stop all sync. Delete will remove this integration from your account.
      </p>
      <div class="flex items-center gap-3">
        <button
          @click="showDisconnectModal = true"
          class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Disconnect Integration
        </button>
        <button
          @click="showDeleteModal = true"
          class="px-4 py-2 bg-white text-red-700 border border-red-300 rounded-lg hover:bg-red-100 transition-colors"
        >
          Delete Integration
        </button>
      </div>
    </div>

    <!-- Disconnect Confirmation Modal -->
    <div v-if="showDisconnectModal" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="absolute inset-0 bg-black/30" @click="showDisconnectModal = false"></div>
      <div class="relative z-10 w-full max-w-md bg-white rounded-lg shadow-lg border border-gray-200 p-6">
        <h4 class="text-lg font-semibold text-gray-900 mb-2">Disconnect Integration</h4>
        <p class="text-sm text-gray-600 mb-4">Are you sure you want to disconnect {{ currentIntegration.name }}? You can reconnect later.</p>
        <div class="flex justify-end gap-2">
          <button class="px-3 py-2 rounded-lg border" @click="showDisconnectModal = false">Cancel</button>
          <button class="px-3 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700" @click="confirmDisconnect">Disconnect</button>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="absolute inset-0 bg-black/30" @click="showDeleteModal = false"></div>
      <div class="relative z-10 w-full max-w-md bg-white rounded-lg shadow-lg border border-gray-200 p-6">
        <h4 class="text-lg font-semibold text-gray-900 mb-2">Delete Integration</h4>
        <p class="text-sm text-gray-600 mb-4">This will permanently remove {{ currentIntegration.name }} from your integrations list. This action cannot be undone.</p>
        <div class="flex justify-end gap-2">
          <button class="px-3 py-2 rounded-lg border" @click="showDeleteModal = false">Cancel</button>
          <button class="px-3 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700" @click="deleteIntegration">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const { upsertIntegration, removeIntegration, getIntegrationById } = useIntegrations()
const activeTab = ref('general')
const showDisconnectModal = ref(false)
const showDeleteModal = ref(false)
const isAuthenticating = ref(false)

const integrationIdRef = computed(() => String(route.params.id))
const storeIntegration = computed(() => getIntegrationById(integrationIdRef.value))
const isAdded = computed(() => !!storeIntegration.value)
const isConnected = computed(() => !!storeIntegration.value?.connected)

const tabs = [
  { id: 'general', label: 'General' },
  { id: 'call-logging', label: 'Call logging' },
]

// Integration buttons data - this should match the data from integrations.vue
const integrationButtons = [
  { icon: '💬', name: 'Slack', description: 'Connect your Slack workspace', domainSuffix: '.slack.com', iconBg: 'bg-purple-100', apiKeyHint: 'Find this in Slack API settings', authType: 'apiKey', category: 'Communication' },
  { icon: '📅', name: 'Google Calendar', description: 'Sync your calendar events', domainSuffix: '.google.com', iconBg: 'bg-blue-100', authType: 'oauth', category: 'Productivity' },
  { icon: '☁️', name: 'Salesforce', description: 'Connect your Salesforce account', domainSuffix: '.salesforce.com', iconBg: 'bg-sky-100', authType: 'apiKey', category: 'CRM' },
  { icon: '🎯', name: 'Zendesk', description: 'Connect your Zendesk support', domainSuffix: '.zendesk.com', iconBg: 'bg-orange-100', authType: 'apiKey', category: 'Support' },
  { icon: '📹', name: 'Zoom', description: 'Connect your Zoom account', iconBg: 'bg-blue-100', authType: 'oauth', category: 'Communication' },
  { icon: '📦', name: 'Dropbox', description: 'Connect your Dropbox', iconBg: 'bg-indigo-100', authType: 'apiKey', category: 'Storage' },
  { icon: '👥', name: 'Microsoft Teams', description: 'Connect Microsoft Teams', iconBg: 'bg-purple-100', authType: 'oauth', category: 'Communication' },
  { icon: '🐙', name: 'GitHub', description: 'Connect GitHub repository', iconBg: 'bg-gray-100', authType: 'apiKey', category: 'Development' },
  { icon: '📊', name: 'Google Analytics', description: 'Connect Google Analytics', iconBg: 'bg-green-100', authType: 'apiKey', category: 'Analytics' },
  { icon: '🔧', name: 'Webhook', description: 'Set up a custom webhook', iconBg: 'bg-gray-200', authType: 'oauth', category: 'Development' },
  { text: 'Freshdesk', name: 'Freshdesk', description: 'Connect Freshdesk support', domainSuffix: '.freshdesk.com', iconBg: 'bg-orange-100', authType: 'apiKey', category: 'Support' },
  { icon: '🔍', name: 'Search', description: 'Search for more integrations', iconBg: 'bg-gray-200', authType: 'apiKey', category: 'Other' }
];

// Mock data - in real app, fetch based on route.params.id
const integrationData = {
  'slack': {
    id: 'slack',
    name: 'Slack',
    category: 'Communication',
    icon: '💬',
    iconBg: 'bg-purple-100',
    description: 'Send notifications and messages to Slack channels',
    connected: true,
    authType: 'apiKey'
  },
  'google-calendar': {
    id: 'google-calendar',
    name: 'Google Calendar',
    category: 'Calendar',
    icon: '📅',
    iconBg: 'bg-blue-100',
    description: 'Sync events and meetings with Google Calendar',
    connected: true,
    authType: 'oauth'
  },
  'salesforce': {
    id: 'salesforce',
    name: 'Salesforce',
    category: 'CRM',
    icon: '☁️',
    iconBg: 'bg-sky-100',
    description: 'Integrate with Salesforce CRM for customer data',
    connected: false,
    authType: 'apiKey'
  }
}

const currentIntegration = computed(() => {
  const routeId = route.params.id;
  
  // First check if it exists in our hardcoded data
  if (integrationData[routeId]) {
    return integrationData[routeId];
  }
  
  // If not, try to find it in the integration buttons by matching the ID format
  const buttonIntegration = integrationButtons.find(btn => {
    const buttonId = btn.name.toLowerCase().replace(/\s+/g, '-');
    return buttonId === routeId;
  });
  
  if (buttonIntegration) {
    return {
      id: routeId,
      name: buttonIntegration.name,
      category: buttonIntegration.category || 'Other',
      icon: buttonIntegration.icon || buttonIntegration.text?.charAt(0) || '🔗',
      iconBg: buttonIntegration.iconBg,
      description: buttonIntegration.description,
      connected: false, // New integrations start as not connected
      authType: buttonIntegration.authType,
      domainSuffix: buttonIntegration.domainSuffix,
      apiKeyHint: buttonIntegration.apiKeyHint
    };
  }
  
  // Fallback if integration not found
  return {
    id: routeId,
    name: 'Unknown Integration',
    category: 'Other',
    icon: '🔗',
    iconBg: 'bg-gray-100',
    description: 'Integration configuration',
    connected: false,
    authType: 'apiKey'
  };
})

const settings = ref({
  apiKey: '',
  domain: '',
  webhookUrl: '',
  syncFrequency: 'realtime',
  notifications: true
})

const activities = ref([
  {
    id: 1,
    type: 'success',
    message: 'Successfully synced 150 records',
    timestamp: '2 hours ago'
  },
  {
    id: 2,
    type: 'info',
    message: 'Configuration updated',
    timestamp: '5 hours ago'
  },
  {
    id: 3,
    type: 'error',
    message: 'Failed to connect: Invalid API key',
    timestamp: '1 day ago'
  },
  {
    id: 4,
    type: 'success',
    message: 'Integration connected successfully',
    timestamp: '2 days ago'
  }
])

const permissions = ref([
  {
    id: 1,
    name: 'Read Messages',
    description: 'Access and read messages from channels',
    enabled: true
  },
  {
    id: 2,
    name: 'Write Messages',
    description: 'Send messages to channels and users',
    enabled: true
  },
  {
    id: 3,
    name: 'Manage Webhooks',
    description: 'Create and manage webhook endpoints',
    enabled: false
  },
  {
    id: 4,
    name: 'Access User Data',
    description: 'View user profiles and contact information',
    enabled: true
  }
])

const saveSettings = () => {
  // Handle connection logic based on auth type if not connected
  if (!isConnected.value) {
    if (currentIntegration.value.authType === 'oauth') {
      console.log('Starting OAuth flow for:', currentIntegration.value.name)
      // In a real app, this would redirect to OAuth provider
      // Simulate network/auth time
      isAuthenticating.value = true
      const integrationId = String(route.params.id)
      setTimeout(() => {
        upsertIntegration({
          id: integrationId,
          name: currentIntegration.value.name,
          icon: currentIntegration.value.icon,
          iconBg: currentIntegration.value.iconBg,
          description: currentIntegration.value.description,
          connected: true,
          category: currentIntegration.value.category,
          authType: currentIntegration.value.authType,
          version: '1.0.0',
          lastSynced: 'Just now'
        })
        isAuthenticating.value = false
        // Stay on settings page; header badge will reflect Connected via store
      }, 1200)
    } else {
      console.log('Connecting with API key for:', currentIntegration.value.name)
      // Validate that required fields are filled
      if (currentIntegration.value.domainSuffix && !settings.value.domain) {
        alert('Please enter your domain name');
        return;
      }
      if (!settings.value.apiKey) {
        alert('Please enter your API key');
        return;
      }
      // In a real app, this would make an API call to connect
      console.log('Connection settings:', settings.value);

      // On success, add/update the integration in the global list
      const integrationId = String(route.params.id)
      let instance = ''
      if (currentIntegration.value.domainSuffix && settings.value.domain) {
        const hasSuffix = settings.value.domain.endsWith(currentIntegration.value.domainSuffix)
        const domain = hasSuffix
          ? settings.value.domain
          : `${settings.value.domain}${currentIntegration.value.domainSuffix}`
        instance = `https://${domain}`
      } else {
        instance = settings.value.webhookUrl || ''
      }
      // Simulate network/auth time
      isAuthenticating.value = true
      setTimeout(() => {
        upsertIntegration({
          id: integrationId,
          name: currentIntegration.value.name,
          icon: currentIntegration.value.icon,
          iconBg: currentIntegration.value.iconBg,
          description: currentIntegration.value.description,
          connected: true,
          category: currentIntegration.value.category,
          authType: currentIntegration.value.authType,
          instance,
          version: '1.0.0',
          lastSynced: 'Just now'
        })
        isAuthenticating.value = false
        // Stay on settings page; header badge will reflect Connected via store
      }, 1200)
    }
  } else {
    // Just save settings if already connected
    console.log('Saving settings...', settings.value)
  }
}

const confirmDisconnect = () => {
  // Mark as offline but keep in list
  if (storeIntegration.value) {
    upsertIntegration({ ...storeIntegration.value, connected: false })
  }
  showDisconnectModal.value = false
}

const deleteIntegration = () => {
  const id = integrationIdRef.value
  removeIntegration(id)
  showDeleteModal.value = false
  router.push('/settings/integrations')
}
</script>
