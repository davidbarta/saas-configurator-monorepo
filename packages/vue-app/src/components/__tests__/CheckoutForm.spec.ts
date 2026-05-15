import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, VueWrapper, flushPromises } from '@vue/test-utils';
import { createPinia, setActivePinia, type Pinia } from 'pinia';
import CheckoutForm from '../CheckoutForm.vue';
import { useAuthStore } from '../../stores/auth';
import { useConfiguratorStore } from '../../stores/configurator';
import i18n from '../../i18n';

let pinia: Pinia;
let authStore: ReturnType<typeof useAuthStore>;
let configStore: ReturnType<typeof useConfiguratorStore>;
let wrapper: VueWrapper;

function createWrapper(): VueWrapper {
  return mount(CheckoutForm, {
    attachTo: document.body,
    global: {
      plugins: [pinia, i18n]
    }
  });
}

async function submitForm(w: VueWrapper) {
  await w.find('form').trigger('submit');
  // vee-validate debounces validation by 5ms via setTimeout
  await vi.advanceTimersByTimeAsync(10);
  await flushPromises();
}

describe('CheckoutForm.vue', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    setActivePinia(createPinia());
    pinia = createPinia();
    authStore = useAuthStore(pinia);
    configStore = useConfiguratorStore(pinia);
    window.alert = vi.fn();
  });

  afterEach(() => {
    wrapper?.unmount();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('renders form title and all field labels', () => {
    wrapper = createWrapper();

    expect(wrapper.text()).toContain('Dokončení objednávky');
    expect(wrapper.text()).toContain('Jméno a příjmení');
    expect(wrapper.text()).toContain('Pracovní e-mail');
    expect(wrapper.text()).toContain('Název firmy');
    expect(wrapper.text()).toContain('Souhlasím s obchodními podmínkami');
  });

  it('pre-fills name and email from auth store when user is logged in', async () => {
    authStore.user = { id: 'u_1', name: 'Jan Novák', email: 'jan@example.com' };

    wrapper = createWrapper();
    await wrapper.vm.$nextTick();

    expect((wrapper.find('#name').element as HTMLInputElement).value).toBe('Jan Novák');
    expect((wrapper.find('#email').element as HTMLInputElement).value).toBe('jan@example.com');
  });

  it('leaves name and email empty when no user is logged in', async () => {
    wrapper = createWrapper();
    await wrapper.vm.$nextTick();

    expect((wrapper.find('#name').element as HTMLInputElement).value).toBe('');
    expect((wrapper.find('#email').element as HTMLInputElement).value).toBe('');
  });

  it('shows required field errors when submitting empty form', async () => {
    wrapper = createWrapper();

    await submitForm(wrapper);

    expect(wrapper.text()).toContain('Toto pole je povinné');
  });

  it('shows email format error for invalid email', async () => {
    wrapper = createWrapper();

    await wrapper.find('#name').setValue('Jan Novák');
    await wrapper.find('#email').setValue('not-an-email');
    await submitForm(wrapper);

    expect(wrapper.text()).toContain('Zadejte platný e-mail');
  });

  it('shows terms error when terms checkbox is not checked', async () => {
    wrapper = createWrapper();

    await wrapper.find('#name').setValue('Jan Novák');
    await wrapper.find('#email').setValue('jan@example.com');
    await submitForm(wrapper);

    expect(wrapper.text()).toContain('Musíte souhlasit s podmínkami');
  });

  it('submits successfully and shows alert when all fields are valid', async () => {
    configStore.fetchInitialData();
    wrapper = createWrapper();

    await wrapper.find('#name').setValue('Jan Novák');
    await wrapper.find('#email').setValue('jan@example.com');
    await wrapper.find('input[type="checkbox"]').setValue(true);
    await submitForm(wrapper);

    expect(window.alert).toHaveBeenCalledWith('Objednávka byla úspěšně odeslána. Mrkni do konzole!');
  });

  it('renders submit button', () => {
    wrapper = createWrapper();

    const submitBtn = wrapper.find('button[type="submit"]');
    expect(submitBtn.exists()).toBe(true);
    expect(submitBtn.text()).toContain('Odeslat objednávku');
  });
});
