export default {
  common: {
    currency: 'USD'
  },
  nav: {
    brand: 'SaaS CONFIG',
    dashboard: 'Dashboard',
    configurator: 'Konfigurátor'
  },
  dashboard: {
    title: 'Přehled a statistiky',
    noTariff: 'Zatím nemáš vybraný žádný tarif. Přejdi do konfigurátoru.'
  },
  configurator: {
    title: 'SaaS Konfigurátor',
    description: 'Sestav si plán na míru. Začni výběrem základu a přidej moduly.',
    currentPrice: 'Celková cena: {price} USD',
    tabs: {
      tariffs: '1. Výběr tarifu',
      modules: '2. Doplňkové moduly'
    }
  },
  selector: {
    title: 'Zvol si výchozí tarif',
    selectBtn: 'Zvolit tarif',
    selectedBadge: 'Aktivní'
  },
  tariffs: {
    starter: {
      name: 'Starter',
      desc: 'Ideální pro začínající projekty a jednotlivce.'
    },
    professional: {
      name: 'Professional',
      desc: 'Pro rostoucí týmy vyžadující pokročilé funkce a vyšší limity.'
    },
    enterprise: {
      name: 'Enterprise',
      desc: 'Maximální výkon, dedikovaná podpora a neomezené zdroje.'
    }
  },
  modules: {
    db: 'Extra databáze (+10GB)',
    analytics: 'Pokročilá analytika',
    sla: 'SLA Podpora 24/7'
  },
  addons: {
    available: 'Dostupné moduly',
    selected: 'Aktivní moduly (přetáhni sem)',
    empty: 'Zatím jsi nepřetáhl žádný modul.',
    category: {
      resource: 'Zdroj',
      feature: 'Funkce',
      support: 'Podpora'
    }
  },
  auth: {
    title: 'Přihlášení',
    email: 'E-mail',
    password: 'Heslo',
    submit: 'Vstoupit do aplikace',
    logout: 'Odhlásit se',
    error: 'Neplatné přihlašovací údaje (zkus test / test).',
    greeting: 'Ahoj, {name}'
  },
  checkout: {
    title: 'Dokončení objednávky',
    name: 'Jméno a příjmení',
    email: 'Pracovní e-mail',
    company: 'Název firmy (volitelné)',
    terms: 'Souhlasím s obchodními podmínkami',
    submit: 'Odeslat objednávku',
    success: 'Objednávka byla úspěšně odeslána. Mrkni do konzole!',
    errors: {
      required: 'Toto pole je povinné',
      email: 'Zadejte platný e-mail',
      terms: 'Musíte souhlasit s podmínkami'
    }
  }
};
