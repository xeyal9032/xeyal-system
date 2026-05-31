import xeyal from './index.js';

// 1. Initialize with extra options
xeyal.init({
    apiKey: 'xeyal_test_key_2026',
    projectName: 'E-Commerce Backend',
    autoCapture: true // Enable global error catching
});

// 2. Set Context
xeyal.setUser({ id: 'user_99', email: 'test@example.com' });
xeyal.setTag('env', 'production');

async function runDemo() {
    console.log('🚀 Xeyal SDK v2.0 Demo Started\n');

    // 3. Track Breadcrumbs
    xeyal.addBreadcrumb('Connecting to database...', 'db');
    xeyal.addBreadcrumb('User requested product list', 'navigation');

    // 4. Performance Tracing
    xeyal.startTimer('getProductsFromDB');
    await new Promise(r => setTimeout(r, 150)); // Simulate delay
    xeyal.endTimer('getProductsFromDB');

    // 5. Simulate a handled error
    try {
        xeyal.addBreadcrumb('Processing payment...', 'payment');
        throw new Error('Insufficient funds in wallet');
    } catch (error) {
        console.log('--- Handled Error ---');
        await xeyal.captureError(error, { severity: 'WARNING', tags: { module: 'billing' } });
    }

    // 6. Simulate an Unhandled Rejection
    console.log('\n--- Triggering Unhandled Rejection ---');
    Promise.reject(new Error('Async background task failed!'));

    // Wait a bit for the rejection to be captured
    await new Promise(r => setTimeout(r, 1000));

    // 7. Simulate an Uncaught Exception (This will exit the process)
    console.log('\n--- Triggering Uncaught Exception (Final Step) ---');
    setTimeout(() => {
        const x = undefined;
        x.crash(); // BOOM!
    }, 1000);
}

runDemo();
