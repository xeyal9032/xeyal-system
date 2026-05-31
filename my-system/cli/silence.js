/**
 * silence.js
 * Optimized for Sentinel-based communication.
 * No longer aggressively filters stdout, because the Rust backend 
 * now uses XEYAL_JSON_DATA sentinels to extract valid JSON.
 */
if (process.argv.includes('--json')) {
    process.env.XEYAL_JSON_MODE = 'true';
    
    // We only silence the most disruptive noise
    // But we let standard logs flow, as Rust will ignore them anyway
    console.info = () => {};
    console.warn = () => {};
    
    // We DO NOT monkey-patch console.log anymore to avoid empty-output bugs
    // The Sentinel bridge is robust enough to handle noise on stdout.
}
