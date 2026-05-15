export default {
  common: {
    currency: 'USD'
  },
  nav: {
    brand: 'SaaS CONFIG',
    dashboard: 'Dashboard',
    configurator: 'Configurator'
  },
  dashboard: {
    title: 'Overview & Statistics',
    noTariff: 'No tariff selected yet. Go to the configurator.'
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
    selectedBadge: 'Active'
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
    email: 'Email',
    password: 'Password',
    submit: 'Enter App',
    logout: 'Sign Out',
    error: 'Invalid credentials (try test / test).',
    greeting: 'Hello, {name}'
  },
  checkout: {
    title: 'Complete Order',
    name: 'Full Name',
    email: 'Work Email',
    company: 'Company Name (optional)',
    terms: 'I agree to the terms and conditions',
    submit: 'Submit Order',
    success: 'Order successfully submitted. Check the console!',
    errors: {
      required: 'This field is required',
      email: 'Enter a valid email',
      terms: 'You must agree to the terms'
    }
  }
};
