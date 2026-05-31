import winston from 'winston';
import 'winston-daily-rotate-file';
import path from 'path';
import { fileURLToPath } from 'url';
import Transport from 'winston-transport';
import profiler from './profiler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SYSTEM_ROOT = path.resolve(__dirname, '../../');

const { combine, timestamp, printf, colorize, align } = winston.format;

/**
 * Modern Event-Based Format with Category Support
 */
const eventFormat = printf(({ level, message, timestamp, category = 'SYSTEM', ...meta }) => {
    const session = profiler.getSessionId();
    const metaStr = Object.keys(meta).length ? JSON.stringify(meta) : '';
    return `[${timestamp}] [${session}] [${category}] ${level}: ${message} ${metaStr}`;
});

/**
 * Custom Transport for Autopilot Analysis
 */
class AutopilotTransport extends Transport {
    constructor(opts) { super(opts); }
    log(info, callback) {
        setImmediate(async () => {
            const autopilot = (await import('../intelligence/autopilot.js')).default;
            autopilot.processLog(info.level, info.message);
        });
        callback();
    }
}

/**
 * Custom Transport to pipe logs to the Web Dashboard
 */
class DashboardTransport extends Transport {
  constructor(opts) {
    super(opts);
  }

  log(info, callback) {
    setImmediate(() => {
      if (global.dashboardIO) {
        try {
          global.dashboardIO.emit('log', {
              ...info,
              category: info.category || 'SYSTEM',
              session: profiler.getSessionId(),
              timestamp: new Date().toISOString()
          });
        } catch (e) {
            // Socket emission failed, likely a broken pipe.
            // We don't want to crash the whole process just for a dashboard log.
        }
      }
    });
    callback();
  }
}

// Log Rotation Config
const defaultRotateOptions = {
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d'
};

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    timestamp({ format: 'HH:mm:ss' }),
    eventFormat
  ),
  transports: [
    // 1. Log files (ALWAYS ACTIVE)
    new winston.transports.DailyRotateFile({
        ...defaultRotateOptions,
        filename: path.join(SYSTEM_ROOT, 'logs/system-%DATE%.log'),
        level: 'info'
    }),
    new winston.transports.DailyRotateFile({
        ...defaultRotateOptions,
        filename: path.join(SYSTEM_ROOT, 'logs/error-%DATE%.log'),
        level: 'error'
    }),
    new AutopilotTransport({ level: 'info' }),
    new DashboardTransport({ level: 'info' })
  ]
});

// 2. CONSOLE TRANSPORT (ONLY IF NOT IN JSON MODE)
if (process.env.XEYAL_JSON_MODE !== 'true') {
  logger.add(new winston.transports.Console({
    format: combine(
      colorize({ all: true }),
      eventFormat
    )
  }));
}

/**
 * Enhanced Event Logging
 */
logger.event = (name, category = 'SYSTEM', meta = {}) => {
    logger.info(`[EVENT:${name}]`, { event: name, category, ...meta });
};

/**
 * Noise Reduction (Debounce)
 */
const recentLogs = new Map();
const DEBOUNCE_TIME = 3000;

["info", "warn", "error"].forEach((level) => {
    const original = logger[level];
    logger[level] = (message, ...args) => {
        const key = `${level}:${message}`;
        const now = Date.now();
        if (recentLogs.has(key) && (now - recentLogs.get(key) < DEBOUNCE_TIME)) {
            // Ignore repetitive noise
            return;
        }
        recentLogs.set(key, now);
        original.call(logger, message, ...args);
    };
});

export default logger;
