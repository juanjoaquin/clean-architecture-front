// infrastructure/http/httpClient.ts
import { BackendResponse, Err, Success, Result } from "@/src/libs/apiUtils";

type NextOptions = {
    tags?: string[];
    revalidate?: number | false;
};

export class HttpClient {
    private baseUrl: string;

    constructor(baseUrl: string) {
        // Normaliza baseUrl: quita la barra final si existe
        this.baseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    }

    /**
     * Normaliza el endpoint para que siempre empiece con /
     */
    private normalizeEndpoint(endpoint: string): string {
        return endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    }

    /**
     * Desempaqueta BackendResponse<T> y devuelve Result<T>
     * Maneja errores HTTP, de red y timeout
     */
    private async request<T>(
        endpoint: string,
        options: RequestInit & { next?: NextOptions } = {}
    ): Promise<Result<T>> {
        const normalizedEndpoint = this.normalizeEndpoint(endpoint); // 👈 Normaliza
        const url = `${this.baseUrl}${normalizedEndpoint}`; // 👈 Siempre correcto
        const { next, ...fetchOptions } = options;

        try {
            const response = await fetch(url, {
                ...fetchOptions,
                ...(next && { next }),
                signal: AbortSignal.timeout(5000),
            });

            // Manejo de errores HTTP
            if (!response.ok) {
                const errorMessages: Record<number, string> = {
                    400: 'Solicitud inválida',
                    401: 'No autorizado',
                    403: 'Acceso denegado',
                    404: 'Recurso no encontrado',
                    422: 'Datos inválidos',
                    500: 'Error interno del servidor',
                    503: 'Servicio no disponible'
                };

                const message = errorMessages[response.status] ||
                    `Error HTTP ${response.status}`;

                return Err(message);
            }

            // Parse del JSON con estructura BackendResponse
            const json: BackendResponse<T> = await response.json();

            // Valida que tenga la estructura esperada {message, status, data}
            if (json.data === null || json.data === undefined) {
                return Err('Respuesta del servidor sin datos');
            }

            // Devuelve SOLO el data, desempaquetando el wrapper
            return Success(json.data);

        } catch (error: any) {
            // Manejo de errores de timeout
            if (error.name === "TimeoutError" || error.name === "AbortError") {
                return Err('La solicitud tardó demasiado tiempo');
            }

            // Errores de red
            if (error.message?.includes('fetch') || error.message?.includes('network')) {
                return Err('Error de conexión con el servidor');
            }

            // Error genérico
            return Err(error.message || 'Error desconocido al procesar la solicitud');
        }
    }

    async get<T>(
        endpoint: string,
        options: RequestInit & { next?: NextOptions } = {}
    ): Promise<Result<T>> {
        return this.request<T>(endpoint, {
            method: "GET",
            ...options
        });
    }

    async post<T>(
        endpoint: string,
        body: any,
        options: RequestInit & { next?: NextOptions } = {}
    ): Promise<Result<T>> {
        return this.request<T>(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...options.headers,
            },
            body: JSON.stringify(body),
            ...options,
        });
    }

    async put<T>(
        endpoint: string,
        body: any,
        options: RequestInit & { next?: NextOptions } = {}
    ): Promise<Result<T>> {
        return this.request<T>(endpoint, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                ...options.headers,
            },
            body: JSON.stringify(body),
            ...options,
        });
    }

    async patch<T>(
        endpoint: string,
        body: any,
        options: RequestInit & { next?: NextOptions } = {}
    ): Promise<Result<T>> {
        return this.request<T>(endpoint, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                ...options.headers,
            },
            body: JSON.stringify(body),
            ...options,
        });
    }

    async delete<T>(
        endpoint: string,
        options: RequestInit & { next?: NextOptions } = {}
    ): Promise<Result<T>> {
        return this.request<T>(endpoint, {
            method: "DELETE",
            ...options
        });
    }
}