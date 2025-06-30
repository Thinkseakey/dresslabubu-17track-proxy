export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  const { tracking_number, carrier_code } = req.body;

  if (!tracking_number || !carrier_code) {
    res.status(400).json({ error: 'Missing parameters' });
    return;
  }

  const result = await fetch('https://api.17track.net/track/v2', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      '17token': process.env.TOKEN
    },
    body: JSON.stringify({
      tracking_number,
      carrier_code
    })
  });

  const data = await result.json();
  res.status(200).json(data);
}
