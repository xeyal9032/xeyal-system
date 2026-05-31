import app from './app.js';
import chalk from 'chalk';

const PORT = process.env.PORT || 4000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n🚀 Xeyal Cloud Server is running on port ${PORT}`);
    console.log(`   Internal health check: http://0.0.0.0:${PORT}/health\n`);
});
