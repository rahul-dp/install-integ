export interface Integration {
  id: string
  name: string
  icon: string
  iconBg: string
  description: string
  connected: boolean
  category?: string
  instance?: string
  lastSynced?: string
  version?: string
  company?: string
  // Auth/UI helpers
  authType?: 'apiKey' | 'oauth'
  domainSuffix?: string
  apiKeyHint?: string
}

export const useIntegrations = () => {
  // Global reactive state of connected integrations
  const connectedIntegrations = useState<Integration[]>(
    'connected-integrations',
    () => [
      {
        id: 'slack',
        name: 'Slack',
        icon: '💬',
        iconBg: 'bg-purple-100',
        description: 'Connect your Slack workspace',
        connected: true,
        instance: 'https://workspace.slack.com',
        lastSynced: '2 minutes ago',
        version: '2.1.3',
        category: 'Communication',
      },
      {
        id: 'google-calendar',
        name: 'Google Calendar',
        icon: '📅',
        iconBg: 'bg-blue-100',
        description: 'Sync your calendar events',
        connected: true,
        instance: 'https://calendar.google.com',
        lastSynced: '5 minutes ago',
        version: '1.5.2',
        category: 'Productivity',
      },
      {
        id: 'salesforce',
        name: 'Salesforce',
        icon: '☁️',
        iconBg: 'bg-sky-100',
        description: 'Connect your Salesforce account',
        connected: true,
        instance: 'https://company.my.salesforce.com',
        lastSynced: '10 minutes ago',
        version: '3.0.1',
        category: 'CRM',
      },
    ]
  )

  const getIntegrationById = (id: string) =>
    connectedIntegrations.value.find((i) => i.id === id)

  const upsertIntegration = (integration: Integration) => {
    const idx = connectedIntegrations.value.findIndex((i) => i.id === integration.id)
    if (idx !== -1) {
      connectedIntegrations.value[idx] = {
        ...connectedIntegrations.value[idx],
        ...integration,
      }
    } else {
      connectedIntegrations.value.push(integration)
    }
  }

  const removeIntegration = (id: string) => {
    connectedIntegrations.value = connectedIntegrations.value.filter((i) => i.id !== id)
  }

  return { connectedIntegrations, getIntegrationById, upsertIntegration, removeIntegration }
}
