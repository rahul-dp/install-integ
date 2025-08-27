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
                  currentIntegration.connected 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-600'
                ]">
                  {{ currentIntegration.connected ? 'Connected' : 'Not Connected' }}
                </span>
                <span class="text-sm text-gray-500">
                  Category: {{ currentIntegration.category }}
                </span>
              </div>
            </div>
          </div>
          <button
            v-if="!currentIntegration.connected"
            @click="connectIntegration"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Connect
          </button>
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
        <!-- Settings Tab -->
        <div v-if="activeTab === 'settings'">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Configuration Settings</h2>
          
          <div class="space-y-6">
            <div>
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
              <button class="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                Cancel
              </button>
              <button 
                @click="saveSettings"
                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>

        <!-- Activity Tab -->
        <div v-if="activeTab === 'activity'">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          
          <div class="space-y-4">
            <div v-for="activity in activities" :key="activity.id" class="flex items-start space-x-3 py-3 border-b border-gray-100">
              <div :class="[
                'w-2 h-2 rounded-full mt-2',
                activity.type === 'success' ? 'bg-green-500' : 
                activity.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
              ]"></div>
              <div class="flex-1">
                <p class="text-sm font-medium text-gray-900">{{ activity.message }}</p>
                <p class="text-xs text-gray-500">{{ activity.timestamp }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Permissions Tab -->
        <div v-if="activeTab === 'permissions'">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Permissions & Access</h2>
          
          <div class="space-y-4">
            <div v-for="permission in permissions" :key="permission.id" class="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <h3 class="text-sm font-medium text-gray-900">{{ permission.name }}</h3>
                <p class="text-sm text-gray-500">{{ permission.description }}</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="permission.enabled" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Danger Zone -->
    <div v-if="currentIntegration.connected" class="mt-6 bg-red-50 border border-red-200 rounded-lg p-6">
      <h3 class="text-lg font-semibold text-red-900 mb-2">Danger Zone</h3>
      <p class="text-sm text-red-700 mb-4">
        Disconnecting this integration will stop all data synchronization and may affect dependent workflows.
      </p>
      <button
        @click="showDisconnectModal = true"
        class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
      >
        Disconnect Integration
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const activeTab = ref('settings')
const showDisconnectModal = ref(false)

const tabs = [
  { id: 'settings', label: 'Settings' },
  { id: 'activity', label: 'Activity' },
  { id: 'permissions', label: 'Permissions' },
  { id: 'call-logging', label: 'Call logging' },
]

// Mock data - in real app, fetch based on route.params.id
const integrationData = {
  'slack': {
    id: 'slack',
    name: 'Slack',
    category: 'Communication',
    icon: '💬',
    iconBg: 'bg-purple-100',
    description: 'Send notifications and messages to Slack channels',
    connected: true
  },
  'google-calendar': {
    id: 'google-calendar',
    name: 'Google Calendar',
    category: 'Calendar',
    icon: '📅',
    iconBg: 'bg-blue-100',
    description: 'Sync events and meetings with Google Calendar',
    connected: true
  },
  'salesforce': {
    id: 'salesforce',
    name: 'Salesforce',
    category: 'CRM',
    icon: '☁️',
    iconBg: 'bg-sky-100',
    description: 'Integrate with Salesforce CRM for customer data',
    connected: false
  }
}

const currentIntegration = computed(() => {
  return integrationData[route.params.id] || integrationData['slack']
})

const settings = ref({
  apiKey: '',
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

const connectIntegration = () => {
  // Handle connection logic
  console.log('Connecting integration...')
}

const saveSettings = () => {
  // Handle save logic
  console.log('Saving settings...', settings.value)
}
</script>
