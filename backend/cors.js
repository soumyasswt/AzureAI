const cors = require('cors');

// Enable CORS for all origins (this may be risky in production)
app.use(cors());

// Alternatively, restrict CORS to a specific origin (for added security)
app.use(cors({
    origin: 'http://localhost:3000',  // Your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }));
  
