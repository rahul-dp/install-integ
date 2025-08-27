<template>
  <div class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" @click.self="$emit('close')">
    <div class="bg-white rounded-lg w-full max-w-md">
      <div class="flex items-center justify-between p-4 border-b border-gray-200">
        <div class="flex items-center space-x-3">
            <span class="text-xs">{{ integration.icon || '🔑' }}</span>
            <h4 class="font-medium text-gray-900">Connect your {{ integration.name }} account</h4>
        </div>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-500">
          <svg class="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div class="p-6">

        <div class="space-y-4">
          <!-- Company Domain Field -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Company domain
            </label>
            <div class="mt-1 flex rounded-md">
              <span class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                https://
              </span>
              <input 
                type="text" 
                v-model="formData.domain" 
                :placeholder="'your-company-name'" 
                class="flex-1 min-w-0 block w-full px-3 py-2 rounded-none border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                @input="formatDomain"
              >
              <span v-if="integration.domainSuffix" class="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                {{ integration.domainSuffix }}
              </span>
            </div>
            <p class="mt-1 text-xs text-gray-500">
              Enter your company's domain (e.g., {{ 'your-company' + (integration.domainSuffix || '.example.com') }})
            </p>
          </div>

          <!-- API Key Field -->
          <div v-for="field in fields" :key="field.name">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              {{ field.label || field.name }}
            </label>
            <div class="mt-1 flex rounded-md">
              <span v-if="field.prefix" class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                {{ field.prefix }}
              </span>
              <input 
                :type="field.type || 'text'" 
                v-model="formData[field.name]" 
                :placeholder="field.placeholder || ''"
                class="flex-1 min-w-0 block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                :class="{
                  'rounded-l-md': !field.prefix,
                  'rounded-r-md': !field.suffix && !field.type === 'password',
                  'rounded-none': field.prefix || field.suffix
                }"
              >
              <span v-if="field.suffix" class="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                {{ field.suffix }}
              </span>
              <button 
                v-if="field.type === 'password'" 
                @click="togglePasswordVisibility(field.name)"
                type="button"
                class="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                <span v-if="!showPassword[field.name]">
                  <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                </span>
                <span v-else>
                  <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </span>
              </button>
            </div>
            <p v-if="field.hint" class="mt-1 text-xs text-gray-500">{{ field.hint }}</p>
          </div>
        </div>
      </div>

      <div class="bg-gray-50 px-4 py-3 flex justify-end space-x-3 rounded-b-lg">
        <button 
          @click="$emit('close')"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          Cancel
        </button>
        <button 
          @click="handleSubmit"
          :disabled="!isFormValid"
          class="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Connect
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const props = defineProps({
  integration: {
    type: Object,
    default: () => ({
      name: '',
      icon: '',
      iconBg: '',
      description: '',
      domainSuffix: '',
      fields: []
    })
  }
});

const emit = defineEmits(['close', 'connect']);

const formData = ref({
  domain: '',
  // Other fields will be added dynamically
});

const showPassword = ref({});

// Initialize form data and password visibility
onMounted(() => {
  // Initialize fields from props
  if (props.integration.fields) {
    props.integration.fields.forEach(field => {
      formData.value[field.name] = field.value || '';
      if (field.type === 'password') {
        showPassword.value[field.name] = false;
      }
    });
  }
});

// Format domain input to remove protocol and path
const formatDomain = (event) => {
  let value = event.target.value;
  // Remove protocol and trailing slashes
  value = value.replace(/^https?:\/\//, '').replace(/\/$/, '');
  // Remove any path after domain
  value = value.split('/')[0];
  formData.value.domain = value;
};

const togglePasswordVisibility = (fieldName) => {
  showPassword.value[fieldName] = !showPassword.value[fieldName];
  
  // Toggle input type
  const input = document.querySelector(`input[name="${fieldName}"]`);
  if (input) {
    input.type = showPassword.value[fieldName] ? 'text' : 'password';
  }
};

const fields = computed(() => {
  return props.integration.fields?.length 
    ? props.integration.fields 
    : [
        {
          name: 'apiKey',
          label: 'API key',
          type: 'password',
          hint: 'You can find this in your account settings',
          required: true
        }
      ];
});

const isFormValid = computed(() => {
  // Check if domain is filled
  if (!formData.value.domain) return false;
  
  // Check if all required fields are filled
  return fields.value.every(field => {
    if (field.required) {
      const value = formData.value[field.name];
      return value !== undefined && value !== null && value !== '';
    }
    return true;
  });
});

const handleSubmit = () => {
  if (isFormValid.value) {
    emit('connect', formData.value);
  }
};
</script>
