import { BackendResponse, Err, Result, Success } from "@/src/libs/apiUtils";

type NextOptions = {
  tags?: string[];
  revalidate?: number | false;
};

export class HttpClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
  }

  private normalizeEndpoint(endpoint: string): string {
    return endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit & { next?: NextOptions } = {},
    allowNull: boolean = false
  ): Promise<Result<T>> {
    const normalizedEndpoint = this.normalizeEndpoint(endpoint);
    const url = `${this.baseUrl}${normalizedEndpoint}`;
    const { next, ...fetchOptions } = options;

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        ...(next && { next }),
        signal: AbortSignal.timeout(5000),
      });

      // 🔴 HTTP → DOMINIO
      if (!response.ok) {
        switch (response.status) {
          case 404:
            return Err("Recurso no encontrado", "NOT_FOUND");
          case 401:
            return Err("No autorizado", "UNAUTHORIZED");
          case 403:
            return Err("Acceso denegado", "FORBIDDEN");
          case 422:
            return Err("Datos inválidos", "VALIDATION");
          case 408:
            return Err("Timeout de la solicitud", "TIMEOUT");
          default:
            return Err("Error del servidor", "UNKNOWN");
        }
      }

      const json: BackendResponse<T> = await response.json();

      if (!allowNull && (json.data === null || json.data === undefined)) {
        return Err("Respuesta del servidor sin datos", "UNKNOWN");
      }

      return Success(json.data);
    } catch (error: any) {
      if (error.name === "TimeoutError" || error.name === "AbortError") {
        return Err("La solicitud tardó demasiado tiempo", "TIMEOUT");
      }

      if (
        error.message?.includes("fetch") ||
        error.message?.includes("network")
      ) {
        return Err("Error de conexión con el servidor", "UNKNOWN");
      }

      return Err(error.message || "Error desconocido", "UNKNOWN");
    }
  }

  async get<T>(
    endpoint: string,
    options: RequestInit & { next?: NextOptions } = {}
  ): Promise<Result<T>> {
    return this.request<T>(endpoint, {
      method: "GET",
      ...options,
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
    return this.request<T>(
      endpoint,
      {
        method: "DELETE",
        ...options,
      },
      true // allowNull
    );
  }
}