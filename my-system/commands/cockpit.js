import blessed from 'blessed';
import si from 'systeminformation';
import profiler from '../core/system/profiler.js';

/**
 * Tactical Cockpit TUI
 * Professional terminal interface for My-System OS.
 */
export const cockpitCommand = async () => {
    const screen = blessed.screen({
        smartCSR: true,
        title: 'MY-SYSTEM COCKPIT'
    });

    // 1. Header
    const header = blessed.box({
        top: 0,
        left: 0,
        width: '100%',
        height: 3,
        content: '{center}{bold}🚀 MY-SYSTEM | TACTICAL COCKPIT{/center}',
        tags: true,
        border: { type: 'line' },
        style: { border: { fg: '#58a6ff' } }
    });

    // 2. Metrics Panel
    const metricsPanel = blessed.list({
        top: 3,
        left: 0,
        width: '30%',
        height: '40%',
        label: ' HARDWARE METRICS ',
        border: { type: 'line' },
        style: { border: { fg: '#accent' } }
    });

    // 3. Log Stream Panel
    const logsPanel = blessed.box({
        top: 3,
        right: 0,
        width: '70%',
        height: '70%',
        label: ' LIVE LOG STREAM ',
        border: { type: 'line' },
        padding: 1,
        style: { border: { fg: '#30363d' } }
    });

    // 4. Status Panel
    const statusPanel = blessed.box({
        bottom: 0,
        left: 0,
        width: '100%',
        height: 3,
        content: `  Session: ${profiler.getSessionId()} | Press 'q' to exit`,
        style: { bg: '#21262d', fg: '#8b949e' }
    });

    screen.append(header);
    screen.append(metricsPanel);
    screen.append(logsPanel);
    screen.append(statusPanel);

    // Update Metrics
    const updateMetrics = async () => {
        const cpu = await si.currentLoad();
        const mem = await si.mem();
        const items = [
            `CPU: ${Math.round(cpu.currentLoad)}%`,
            `RAM: ${Math.round((mem.active / mem.total) * 100)}%`,
            `TEMP: ${Math.round((await si.cpuTemperature()).main || 0)}°C`,
            `UPTIME: ${profiler.getUptime()}s`
        ];
        metricsPanel.setItems(items);
        screen.render();
    };

    setInterval(updateMetrics, 2000);

    screen.key(['q', 'C-c'], () => process.exit(0));
    screen.render();
};

export default cockpitCommand;
