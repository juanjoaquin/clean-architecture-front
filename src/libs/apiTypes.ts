export type ApiResponse<T> =
    | {
        success: true;
        data: T;
        message?: string;
    }
    | {
        success: false;
        error: any;
        message?: string;
        errorCode?: string;
        details?: Record<string, unknown>;
    };
