export default async function handler(req, res) {
  const apiKey = process.env.JASAOTP_KEY;

  const response = await fetch(`https://api.jasaotp.id/v1/operator-services?country=indonesia&apikey=${apiKey}`);
  const data = await response.json();

  res.status(200).json(data);
}
