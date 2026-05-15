<script setup lang="ts">
import { useForm, useField } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '@/stores/auth';
import { useConfiguratorStore } from '@/stores/configurator';

const { t } = useI18n();
const authStore = useAuthStore();
const configStore = useConfiguratorStore();

const validationSchema = toTypedSchema(
  z.object({
    name: z.string().min(1, t('checkout.errors.required')),
    email: z.string().min(1, t('checkout.errors.required')).email(t('checkout.errors.email')),
    company: z.string().optional(),
    terms: z.boolean().refine(val => val === true, {
      message: t('checkout.errors.terms')
    })
  })
);

const { handleSubmit, isSubmitting } = useForm({
  validationSchema,
  initialValues: {
    name: authStore.user?.name || '',
    email: authStore.user?.email || '',
    company: '',
    terms: false
  }
});

const { value: name, errorMessage: nameError } = useField<string>('name');
const { value: email, errorMessage: emailError } = useField<string>('email');
const { value: company } = useField<string>('company');
const { value: terms, errorMessage: termsError } = useField<boolean>('terms');

const onSubmit = handleSubmit(values => {
  const payload = {
    customer: values,
    order: {
      tariff: configStore.selectedTariff,
      addons: configStore.selectedModules,
      totalPrice: configStore.totalPrice
    }
  };

  console.log('🚀 API sent:', JSON.stringify(payload, null, 2));
  alert(t('checkout.success'));
});
</script>

<template>
  <form
    @submit="onSubmit"
    class="space-y-5 bg-white p-6 rounded-xl border border-slate-200 shadow-sm"
  >
    <h2 class="text-lg font-semibold text-slate-800 border-b border-slate-100 pb-3">
      {{ $t('checkout.title') }}
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div>
        <label for="name" class="form-label">{{ $t('checkout.name') }}</label>
        <input
          v-model="name"
          type="text"
          id="name"
          :class="['input-default', nameError ? 'input-border-error' : 'input-border']"
        />
        <p v-if="nameError" class="error-message">{{ nameError }}</p>
      </div>

      <div>
        <label for="email" class="form-label">{{ $t('checkout.email') }}</label>
        <input
          v-model="email"
          type="email"
          id="email"
          :class="['input-default', emailError ? 'input-border-error' : 'input-border']"
        />
        <p v-if="emailError" class="error-message">{{ emailError }}</p>
      </div>
    </div>

    <div>
      <label for="companyName" class="form-label">{{ $t('checkout.company') }}</label>
      <input
        v-model="company"
        type="text"
        id="companyName"
        class="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all"
      />
    </div>

    <div>
      <label class="flex items-center gap-2 cursor-pointer">
        <input
          v-model="terms"
          type="checkbox"
          class="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300"
        />
        <span class="text-sm text-slate-700">{{ $t('checkout.terms') }}</span>
      </label>
      <p v-if="termsError" class="error-message">{{ termsError }}</p>
    </div>

    <div class="pt-4 border-t border-slate-100 flex justify-end">
      <button
        type="submit"
        :disabled="isSubmitting"
        class="px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-70 cursor-pointer"
      >
        {{ isSubmitting ? '...' : $t('checkout.submit') }}
      </button>
    </div>
  </form>
</template>

<style scoped>
@reference "../style.css";

.input-default {
  @apply w-full px-3 py-2 rounded-lg border outline-none transition-all;
}
.input-border {
  @apply border-slate-300;
  &:focus {
    @apply ring-2 ring-indigo-600;
    border-color: transparent;
  }
}
.input-border-error {
  @apply border-red-500;
  &:focus {
    @apply ring-2 ring-red-200;
  }
}
.error-message {
  @apply text-xs text-red-600 mt-1 font-medium;
}
.form-label {
  @apply block text-sm font-medium text-slate-700 mb-1;
}
</style>
