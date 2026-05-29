'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/auth';
import Link from 'next/link';

const loginSchema = z.object({
  email: z.string().min(1, 'E-mail je povinný').email('Neplatný formát e-mailu'),
  password: z.string().min(6, 'Heslo musí mít alespoň 6 znaků')
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore(state => state.login);
  const storeError = useAuthStore(state => state.error);
  const isLoading = useAuthStore(state => state.isLoading);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (values: LoginFormValues) => {
    const success = await login(values.email, values.password);

    if (success) {
      router.push('/');
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Vítejte zpět</h1>
          <p className="text-sm text-slate-500">Přihlaste se ke svému účtu</p>
        </div>

        {storeError && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-800 text-sm rounded-lg font-medium">
            ❌ {storeError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
              E-mailová adresa
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

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
              Heslo
            </label>
            <input
              id="password"
              type="password"
              {...register('password')}
              className={`w-full px-3 py-2 rounded-lg border outline-none transition-all ${
                errors.password
                  ? 'border-red-500 ring-2 ring-red-200'
                  : 'border-slate-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent'
              }`}
            />
            {errors.password && (
              <p className="text-xs text-red-600 mt-1 font-medium">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 bg-indigo-600 text-white font-semibold rounded-lg
              hover:bg-indigo-700 transition-colors disabled:opacity-70 cursor-pointer text-sm"
          >
            {isLoading ? 'Přihlašuji...' : 'Přihlásit se'}
          </button>
        </form>

        <div className="text-center text-xs text-slate-500 border-t border-slate-100 pt-4">
          Nemáte ještě účet?{' '}
          <Link href="/register" className="text-indigo-600 font-semibold hover:underline">
            Zaregistrujte se
          </Link>
        </div>
      </div>
    </div>
  );
}
