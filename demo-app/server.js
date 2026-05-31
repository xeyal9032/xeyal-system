import express from 'express';

const app = express();
const PORT = 5000;

app.get('/', (req, res) => {
    res.send(`
        <html>
            <head>
                <title>Demo App</title>
                <style>
                    body { font-family: sans-serif; text-align: center; margin-top: 50px; background: #1a1a1a; color: #fff; }
                    h1 { color: #00ffcc; }
                </style>
            </head>
            <body>
                <h1>Demo App is Running!</h1>
                <p>Protected by My-System Auto-Fixer</p>
                <p>Port: ${PORT}</p>
            </body>
        </html>
    `);
});

app.listen(PORT, () => {
    console.log(`Demo App successfully running on port ${PORT}`);
});
