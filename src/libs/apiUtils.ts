export interface BackendResponse<T> {
    message: string;
    status: number;
    data: T;
}

export type Result<T, E = string> =
    | { success: true; data: T }
    | { success: false; error: E };

export const Success = <T>(data: T): Result<T, never> => ({
    success: true,
    data
});

export const Err = <E>(error: E): Result<never, E> => ({
    success: false,
    error
});