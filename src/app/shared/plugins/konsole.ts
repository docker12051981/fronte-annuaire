
export abstract class konsole {
    static LOG_LEVELS = {
        ALL: parseInt('00000', 2),
        DEBUG: parseInt('00001', 2),
        LOG: parseInt('00010', 2),
        INFO: parseInt('00100', 2),
        WARN: parseInt('01000', 2),
        ERROR: parseInt('10000', 2),
        NONE: parseInt('11111', 2)
    };

    static logLevel = 'INFO';

    static toLog(param): boolean {
        const restrictionNum = this.LOG_LEVELS[this.logLevel];
        const requiredNum = this.LOG_LEVELS[param];

        return requiredNum > restrictionNum;
    }

    static setLogLevel(logLevel): any {
        logLevel = logLevel.toUpperCase();
        const logLevels = Object.keys(this.LOG_LEVELS);
        if (logLevels.indexOf(logLevel) > -1) {
            if (window && window.sessionStorage) { // for browser env.
                window.sessionStorage.setItem('konsole.LOG_LEVEL', logLevel);
            }
            this.logLevel = logLevel;
        } else {
            console.error(`Error, invalid logLevel, it must be one of ${logLevels}`);
        }
    }

    static getLogLevel(): string {
        if (window && window.sessionStorage) { // for browser env.
            return window.sessionStorage.getItem('konsole.LOG_LEVEL');
        } else {
            return this.logLevel;
        }
    }

    static debug(...args: Array<any>): void {
        this.toLog('DEBUG') && console.debug.apply(console, arguments);
    }

    static log(...args: Array<any>): void {
        this.toLog('LOG') && console.log.apply(console, arguments);
    }

    static info(...args: Array<any>): void {
        this.toLog('INFO') && console.info.apply(console, arguments);
    }

    static warn(...args: Array<any>): void {
        this.toLog('WARN') && console.warn.apply(console, arguments);
    }

    static error(...args: Array<any>): void {
        this.toLog('ERROR') && console.error.apply(console, arguments);
    }
}
