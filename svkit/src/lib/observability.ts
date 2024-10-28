export const logger = (name: string): Pick<typeof console, 'log' | 'warn' | 'error' | 'debug' | 'trace'> => {
  return {
    debug: (...data) => console.debug(`[${name}]`, ...data),
    error: (...data) => console.error(`[${name}]`, ...data),
    log: (...data) => console.log(`[${name}]`, ...data),
    trace: (...data) => console.trace(`[${name}]`, ...data),
    warn: (...data) => console.warn(`[${name}]`, ...data),
  }
}