type LogLevel = 'debug' | 'info' | 'warn' | 'error';

type LoggerOptions = {
    layer: string;
    context?: string;
};

const isProd = process.env.NODE_ENV === 'production';

const shouldLog = (level: LogLevel) => {
    if (!isProd) return true;
    return level === 'error' || level === 'warn';
};

const formatMessage = (
    level: LogLevel,
    layer: string,
    context: string | undefined,
    message: string
) => {
    const time = new Date().toISOString();
    const ctx = context ? ` [${context}]` : '';
    return `[${time}] [${level.toUpperCase()}] [${layer}]${ctx} ${message}`;
};

export const Logger = {
    debug(options: LoggerOptions, message: string, data?: unknown) {
        if (!shouldLog('debug')) return;
        console.debug(
            formatMessage('debug', options.layer, options.context, message),
            data ?? ''
        );
    },

    info(options: LoggerOptions, message: string, data?: unknown) {
        if (!shouldLog('info')) return;
        console.info(
            formatMessage('info', options.layer, options.context, message),
            data ?? ''
        );
    },

    warn(options: LoggerOptions, message: string, data?: unknown) {
        if (!shouldLog('warn')) return;
        console.warn(
            formatMessage('warn', options.layer, options.context, message),
            data ?? ''
        );
    },

    error(options: LoggerOptions, message: string, error?: unknown) {
        if (!shouldLog('error')) return;
        console.error(
            formatMessage('error', options.layer, options.context, message),
            error
        );
    },
};
