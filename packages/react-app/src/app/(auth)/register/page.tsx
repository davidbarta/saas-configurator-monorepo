'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const registerSchema = z.object({
  name: z.string().min(1, 'Jméno je povinné'),
  email: z.string().min(1, 'E-mail je povinný').email('Neplatný formát e-mailu'),
  password: z.string().min(6, 'Heslo musí mít alespoň 6 znaků')
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  });

  const onSubmit = async (values: RegisterFormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('http://localhost:4000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      });

      const data = (await res.json()) as { success?: boolean; error?: string };

      if (!res.ok) {
        throw new Error(data.error || 'Registration unsuccessful.');
      }

      if (data.success) {
        router.push('/login');
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error while registering.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Vytvořit účet</h1>
          <p className="text-sm text-slate-500">
            Zadejte své údaje pro registraci do SaaS aplikace
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-800 text-sm rounded-lg font-medium">
            ❌ {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
              Celé jméno
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
            {isLoading ? 'Vytvářím účet...' : 'Zaregistrovat se'}
          </button>
        </form>

        <div className="text-center text-xs text-slate-500 border-t border-slate-100 pt-4">
          Již máte účet? Gentle připomínka:{' '}
          <Link href="/login" className="text-indigo-600 font-semibold hover:underline">
            Přihlaste se
          </Link>
        </div>
      </div>
    </div>
  );
}
