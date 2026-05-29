import ConfiguratorClient from './ConfiguratorClient';

async function fetchConfiguratorData() {
  try {
    const res = await fetch('http://localhost:4000/api/configurator', {
      cache: 'no-store'
    });

    if (!res.ok) {
      throw new Error('Unable to fetch Express backend data');
    }

    return res.json();
  } catch (error) {
    console.error('SSR Fetch Error:', error);
    return { steps: [] };
  }
}

export default async function ConfiguratorPage() {
  const data = await fetchConfiguratorData();

  return <ConfiguratorClient initialData={data} />;
}
