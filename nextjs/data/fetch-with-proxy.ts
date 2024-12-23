import { HttpsProxyAgent } from "https-proxy-agent";

export async function fetchWithProxy(targetUrl: string) {
  // Proxy configuration
  const proxyHost = 'gate.smartproxy.com';
  const proxyPort = '10001';
  const proxyUrl = `http://${process.env.SMARTPROXY_USER}:${process.env.SMARTPROXY_PASSWORD}@${proxyHost}:${proxyPort}`;

  // Create proxy agent
  const proxyAgent = new HttpsProxyAgent(proxyUrl);

  // In Node.js/Next.js environment, we need to use a custom fetch configuration
  const response = await fetch(targetUrl, {
    headers: {
      Accept: 'application/json',
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    },
    // @ts-expect-error - The Node.js fetch API types don't include the agent property
    agent: proxyAgent,
  });

  if (!response.ok) {
    throw new Error(
      `Proxy request failed: ${response.status} ${response.statusText}`
    );
  }
  const jsonResponse = await response.json();

  return jsonResponse;
}