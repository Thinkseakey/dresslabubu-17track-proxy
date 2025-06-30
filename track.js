export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  const { tracking_number, carrier_code } = req.body;

  if (!tracking_number || !carrier_code) {
    return res.status(400).json({ error: 'Missing parameters' });
  }

  const response = await fetch('https://api.17track.net/track/v2/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      '17token': process.env.TRACK_API_KEY
    },
    body: JSON.stringify({
      data: [
        {
          number: tracking_number,
          carrier_code: carrier_code
        }
      ]
    })
  });

  const result = await response.json();
  res.status(200).json(result);
}
