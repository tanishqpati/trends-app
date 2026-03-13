import dotenv from 'dotenv';

dotenv.config();

const config = {
  port: process.env.PORT || 3001,
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/wellness-trend-radar',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  reddit: {
    clientId: process.env.REDDIT_CLIENT_ID,
    clientSecret: process.env.REDDIT_CLIENT_SECRET,
    username: process.env.REDDIT_USERNAME,
    password: process.env.REDDIT_PASSWORD,
  },
  youtubeApiKey: process.env.YOUTUBE_API_KEY,
  cacheTtlMs: 24 * 60 * 60 * 1000,
  wellnessKeywords: [
    'ashwagandha',
    'adaptogens',
    'collagen peptides',
    'probiotics',
    'vitamin d',
    'omega 3',
    'turmeric',
    'curcumin',
    'biotin',
    'melatonin',
    'magnesium',
    'berberine',
    'astragalus',
    'mushroom supplements',
    'gut health',
    'sleep supplements',
    'stress relief',
  ],
};

export default config;
