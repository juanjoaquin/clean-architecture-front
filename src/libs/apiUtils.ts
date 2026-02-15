// libs/apiUtils.ts

// 🔹 Respuesta estándar del backend
export interface BackendResponse<T> {
    message: string;
    status: number;
    data: T;
}

// 🔹 Códigos semánticos de error (DOMINIO)
export type ErrorCode =
    | 'NOT_FOUND'
    | 'UNAUTHORIZED'
    | 'FORBIDDEN'
    | 'VALIDATION'
    | 'CONFLICT'
    | 'TIMEOUT'
    | 'UNKNOWN';

// 🔹 Resultado estándar para toda la app
export type Result<T> =
    | {
        success: true;
        data: T;
    }
    | {
        success: false;
        error: string;
        code?: ErrorCode;
    };

// 🔹 Helper success
export const Success = <T>(data: T): Result<T> => ({
    success: true,
    data,
});

// 🔹 Helper error (IMPORTANTE)
export const Err = (
    error: string,
    code: ErrorCode = 'UNKNOWN'
): Result<never> => ({
    success: false,
    error,
    code,
});