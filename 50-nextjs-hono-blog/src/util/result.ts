export type Result<T> = {
    success: boolean;
    data?: T;
    code?: number;
    message?: string;
}

/**
 * Fail
 * 
 * @param code code
 * @param message message
 * @returns fail result
 */
export const fail = <T>(code: number, message: string): Result<T> => {
    return { success: false, code: code, message: message };
}

/**
 * Success
 * 
 * @param data data
 * @returns success result
 */
export const success = <T>(data: T): Result<T> => {
    return { success: true, data: data };
}