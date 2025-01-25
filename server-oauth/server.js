const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/oauth/callback', (req, res) => {
  // Log all query parameters to debug
  console.log('Received callback with params:', req.query);
  
  // Check for either token or code in query parameters
  const token = req.query.token || req.query.code;
  
  if (token) {
    // Redirect back to the Expo app with the token
    const redirectUrl = `exp://10.7.1.21:19000/--/oauth/callback?token=${token}`;
    console.log('Redirecting to:', redirectUrl);
    res.redirect(redirectUrl);
  } else {
    console.log('No token found in query parameters');
    res.status(400).send('Token or authorization code not found in callback parameters');
  }
});

// Add a root route for testing
app.get('/', (req, res) => {
  res.send('OAuth server is running');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 