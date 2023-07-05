import axios from "axios";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { message } = req.body;

    const accessToken = process.env.LINE_TOKEN; // Replace with your Line Notify access token

    try {
      await axios.post(
        'https://notify-api.line.me/api/notify',
        { message },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${accessToken}`,
          },
        });
      res.status(200).json({ message: 'Notification sent successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to send notification' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

