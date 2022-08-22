const express = require('express');

const app = express();

app.get('/api', (req, res) => {
  res.json({ message: 'Hello World from the server' });
});

const port = process.env.port || 3001;
app.listen(port, () => console.log(`Server running on port ${port}`));
