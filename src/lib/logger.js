import pino from 'pino';
import { AsyncLocalStorage } from 'node:async_hooks';

/**
 * Storage for request-scoped metadata (requestId, userId, etc.)
 * This allows the logger to automatically include context without manual passing.
 */
export const logContext = new AsyncLocalStorage();

const isProd = process.env.NODE_ENV === 'production';

// Fields that should never be logged in plain text
const redactFields = [
  'password',
  'passwordHash',
  'token',
  'accessToken',
  'refreshToken',
  'secret',
  'nid',
  'contact',
  'customerPhone',
  'customerEmail',
  '*.password',
  '*.token',
  '*.secret',
];

const baseLogger = pino({
  level: process.env.LOG_LEVEL || 'info',
  redact: {
    paths: redactFields,
    placeholder: '[REDACTED]',
  },
  // Automatically inject request context if available
  mixin() {
    return logContext.getStore() || {};
  },
  formatters: {
    level: (label) => {
      return { level: label.toUpperCase() };
    },
  },
  timestamp: pino.stdTimeFunctions.isoTime,
  transport: isProd
    ? undefined
    : {
        target: 'pino-pretty',
        options: {
          colorize: true,
          ignore: 'pid,hostname',
          translateTime: 'SYS:standard',
        },
      },
});

/**
 * Enhanced Logger with Context Helper
 */
const logger = {
  info: (msg, meta = {}) => baseLogger.info(meta, msg),
  warn: (msg, meta = {}) => baseLogger.warn(meta, msg),
  error: (msg, meta = {}, error = null) => {
    const errObj = error instanceof Error ? { err: { message: error.message, stack: error.stack } } : {};
    baseLogger.error({ ...meta, ...errObj }, msg);
  },
  debug: (msg, meta = {}) => baseLogger.debug(meta, msg),
};

export default logger;
