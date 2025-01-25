const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/oauth/callback', (req, res) => {
  const token = req.query.token;
  if (token) {
    // Redirect back to the Expo app with the token
    res.redirect(`exp://10.7.1.21:19000/--/oauth/callback?token=${token}`);
  } else {
    res.status(400).send('Token not found');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 