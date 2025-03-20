const cors = require('cors');

// Enable CORS for all origins (this may be risky in production)
app.use(cors());

// Alternatively, restrict CORS to a specific origin (for added security)
app.use(cors({
    origin: 'https://codesensei-ashy.vercel.app',  // Your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }));
  
