export default {
  common: {
    currency: 'USD'
  },
  nav: {
    brand: 'SaaS CONFIG',
    dashboard: 'Dashboard',
    configurator: 'Konfigurátor',
    language: 'Jazyk',
    loggedInAs: 'Přihlášen jako'
  },
  dashboard: {
    title: 'Přehled a statistiky',
    noTariff: 'Zatím nemáš vybraný žádný tarif.',
    noTariffDesc: 'Ulož data v konfigurátoru a uvidíš je tady.',
    table: {
      id: 'ID Objednávky',
      dateCreated: 'Datum vytvoření',
      chosenTariff: 'Vybraný Tarif',
      activeModules: 'Aktivní Moduly',
      price: 'Celková cena',
      unknown: 'Neznámý',
      noModules: 'Žádné doplňkové moduly'
    }
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
    selectedBadge: 'Aktivní',
    selectedTariff: 'Aktivní tarif {tariff}',
    chooseTariff: 'Zvolit tarif {tariff}'
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
    name: 'Jméno',
    nameRequired: 'Jméno je povinné',
    email: 'E-mail',
    password: 'Heslo',
    passwordTooShort: 'Heslo musí mít alespoň 6 znaků',
    submit: 'Vstoupit do aplikace',
    logout: 'Odhlásit se',
    error: 'Neplatné přihlašovací údaje (zkus test / test).',
    greeting: 'Ahoj, {name}',
    emailRequired: 'Email je povinný',
    emailInvalid: 'Neplatný formát e-mailu',
    welcomeBack: 'Vítejte zpět',
    loginToYourAccount: 'Přihlaste se ke svému účtu',
    login: 'Přihlásit se',
    loggingIn: 'Přihlašuji...',
    accountExisting: 'Již máte účet?',
    accountNotExisting: 'Nemáte ještě účet?',
    register: 'Zaregistrovat se',
    registering: 'Vytvářím účet...',
    createAccount: 'Vytvořit účet',
    createAccountDescription: 'Zadejte své údaje pro registraci do SaaS aplikace'
  },
  checkout: {
    title: 'Dokončení objednávky',
    name: 'Jméno a příjmení',
    email: 'Pracovní e-mail',
    company: 'Název firmy (volitelné)',
    terms: 'Souhlasím s obchodními podmínkami',
    submit: 'Odeslat objednávku',
    submitting: 'Odesílám...',
    success: '🎉 Objednávka byla úspěšně odeslána!',
    errors: {
      error: '❌ Error',
      required: 'Toto pole je povinné',
      email: 'Zadejte platný e-mail',
      terms: 'Musíte souhlasit s podmínkami'
    }
  }
};
