export default {
  common: {
    currency: 'USD'
  },
  nav: {
    brand: 'SaaS CONFIG',
    dashboard: 'Dashboard',
    configurator: 'Configurator',
    language: 'Language',
    loggedInAs: 'Logged in as'
  },
  dashboard: {
    title: 'Overview & Statistics',
    noTariff: 'No tariff selected yet.',
    noTariffDesc: 'Save data in the configurator to see it here.',
    table: {
      id: 'Order ID',
      dateCreated: 'Date created',
      chosenTariff: 'Chosen Tariff',
      activeModules: 'Active Modules',
      price: 'Total price',
      unknown: 'Unknown',
      noModules: 'No Addon Modules'
    }
  },
  configurator: {
    title: 'SaaS Configurator',
    description: 'Build your custom plan. Start with a base tariff and add modules.',
    currentPrice: 'Total price: {price} USD',
    tabs: {
      tariffs: '1. Tariff Selection',
      modules: '2. Addon Modules'
    }
  },
  selector: {
    title: 'Choose your base tariff',
    selectBtn: 'Select plan',
    selectedBadge: 'Active',
    selectedTariff: 'Active tariff {tariff}',
    chooseTariff: 'Choose tariff {tariff}'
  },
  tariffs: {
    starter: {
      name: 'Starter',
      desc: 'Perfect for starting projects and individuals.'
    },
    professional: {
      name: 'Professional',
      desc: 'For growing teams requiring advanced features and higher limits.'
    },
    enterprise: {
      name: 'Enterprise',
      desc: 'Maximum performance, dedicated support, and unlimited resources.'
    }
  },
  modules: {
    db: 'Extra Database (+10GB)',
    analytics: 'Advanced Analytics',
    sla: '24/7 SLA Support'
  },
  addons: {
    available: 'Available Modules',
    selected: 'Active Modules (drag here)',
    empty: 'No modules dragged here yet.',
    category: {
      resource: 'Resource',
      feature: 'Feature',
      support: 'Support'
    }
  },
  auth: {
    title: 'Sign In',
    name: 'Name',
    nameRequired: 'Name is required',
    email: 'Email',
    password: 'Password',
    passwordTooShort: 'Password has to have at least 6 characters',
    submit: 'Enter App',
    logout: 'Sign Out',
    error: 'Invalid credentials (try test / test).',
    greeting: 'Hello, {name}',
    emailRequired: 'Email is required',
    emailInvalid: 'Invalid email format',
    welcomeBack: 'Welcome back',
    loginToYourAccount: 'Login to your account',
    login: 'Login',
    loggingIn: 'Logging in...',
    accountExisting: 'Already have an account?',
    accountNotExisting: `You don't have an account?`,
    register: 'Register',
    registering: 'Creating account...',
    createAccount: 'Create account',
    createAccountDescription: 'Fill in you credentials in order to register to the application'
  },
  checkout: {
    title: 'Complete Order',
    name: 'Full Name',
    email: 'Work Email',
    company: 'Company Name (optional)',
    terms: 'I agree to the terms and conditions',
    submit: 'Submit Order',
    submitting: 'Submitting...',
    success: '🎉 Order successfully submitted!',
    errors: {
      required: 'This field is required',
      email: 'Enter a valid email',
      terms: 'You must agree to the terms'
    }
  }
};
