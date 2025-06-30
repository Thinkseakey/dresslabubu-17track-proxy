export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { tracking_number, carrier_code } = req.body;

  if (!tracking_number || !carrier_code) {
    return res.status(400).json({ message: 'Missing tracking number or carrier code' });
  }

  const apiKey = process.env.TRACKING_API_KEY;

  if (!apiKey) {
    return res.status(401).json({ message: 'API key missing' });
  }

  try {
    const response = await fetch('https://api.17track.net/track/v2/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        '17token': apiKey,
      },
      body: JSON.stringify({
        numbers: [tracking_number],
        carrier: carrier_code,
      }),
    });

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error) {
    return res.status(500).json({ message: 'Error contacting 17TRACK', error: error.message });
  }
}
