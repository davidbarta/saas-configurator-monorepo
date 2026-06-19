'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useConfiguratorStore } from '@/stores/configurator';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/stores/auth';
import { useLocaleStore } from '@/stores/locale';

export default function CheckoutForm() {
  const t = useLocaleStore(state => state.t);
  const selectedTariff = useConfiguratorStore(state => state.selectedTariff);
  const selectedModules = useConfiguratorStore(state => state.selectedModules);

  const user = useAuthStore(state => state.user);

  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

  type CheckoutFormValues = z.infer<typeof checkoutSchema>;
  const checkoutSchema = z.object({
    name: z.string().min(1, t('auth.nameRequired')),
    email: z.string().min(1, t('auth.emailRequired')).email(t('auth.emailInvalid')),
    company: z.string().optional(),
    terms: z.literal(true, {
      errorMap: () => ({ message: t('checkout.errors.terms') })
    })
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: '',
      email: '',
      company: ''
    }
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
        company: ''
      });
    }
  }, [user, reset]);

  const onSubmit = async (values: CheckoutFormValues) => {
    setSubmitError(null);
    setSubmitSuccess(false);

    // Total price calculation
    const base = selectedTariff?.basePrice || 0;
    const addons = selectedModules.reduce((sum, mod) => sum + mod.price, 0);
    const totalPrice = base + addons;

    const payload = {
      totalPrice,
      selectedTariff,
      selectedModules,
      userId: user?.id || null,
      customer: values
    };

    try {
      const response = await fetch('http://localhost:4000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong when saving the order.');
      }

      setSubmitSuccess(true);
      reset({
        name: user?.name || '',
        email: user?.email || '',
        company: ''
      });
    } catch (error: unknown) {
      console.error('Order Submit Error:', error);

      if (error instanceof Error) {
        setSubmitError(error.message || 'Unable to connect to server.');
      } else {
        setSubmitError('Unable to connect to server.');
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 bg-white p-6 rounded-xl border border-slate-200 shadow-sm"
    >
      <h2 className="text-lg font-semibold text-slate-800 border-b border-slate-100 pb-3">
        {t('checkout.title')}
      </h2>

      {submitSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm rounded-lg font-medium">
          {t('checkout.success')}
        </div>
      )}

      {submitError && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-800 text-sm rounded-lg font-medium">
          {t('checkout.errors.error')}: {submitError}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
            {t('checkout.name')}
          </label>
          <input
            id="name"
            type="text"
            {...register('name')}
            className={`w-full px-3 py-2 rounded-lg border outline-none transition-all ${
              errors.name
                ? 'border-red-500 ring-2 ring-red-200'
                : 'border-slate-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent'
            }`}
          />
          {errors.name && (
            <p className="text-xs text-red-600 mt-1 font-medium">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
            {t('checkout.email')}
          </label>
          <input
            id="email"
            type="email"
            {...register('email')}
            className={`w-full px-3 py-2 rounded-lg border outline-none transition-all ${
              errors.email
                ? 'border-red-500 ring-2 ring-red-200'
                : 'border-slate-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent'
            }`}
          />
          {errors.email && (
            <p className="text-xs text-red-600 mt-1 font-medium">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="companyName" className="block text-sm font-medium text-slate-700 mb-1">
          {t('checkout.company')}
        </label>
        <input
          id="companyName"
          type="text"
          {...register('company')}
          className="w-full px-3 py-2 rounded-lg border outline-none transition-all"
        />
      </div>

      <div>
        <label htmlFor="terms" className="flex items-center gap-2 cursor-pointer">
          <input
            id="terms"
            type="checkbox"
            {...register('terms')}
            className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300"
          />
          <span className="text-sm font-medium text-slate-700">{t('checkout.terms')}</span>
        </label>
        {errors.terms && (
          <p className="text-xs text-red-600 mt-1 font-medium">{errors.terms.message}</p>
        )}
      </div>

      <div className="pt-4 border-t border-slate-100 flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg
            hover:bg-indigo-700 transition-colors disabled:opacity-70 cursor-pointer"
        >
          {isSubmitting ? t('checkout.submitting') : t('checkout.submit')}
        </button>
      </div>
    </form>
  );
}
