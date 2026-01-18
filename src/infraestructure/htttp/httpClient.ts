
export class HttpClient {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    // Helper method to make fetch requests with a generic response type
    protected async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<{ data: T | null; error: string | null }> {
        const url = `${this.baseUrl}${endpoint}`;
        
        // Debug: ver la URL que se está construyendo

        try {
            const response = await fetch(url, {
                ...options,
                signal: AbortSignal.timeout(5000),
            });

            if (!response.ok) {
                return {
                    data: null,
                    error: `HTTP error! status: ${response.status}`,
                };
            }

            const data: T = await response.json();
            return { data, error: null };
        } catch (error: any) {
            console.error("Request failed:", error);

            if (error.name === "TimeoutError") {
                return { data: null, error: "Request timed out - no response within 5 seconds." };
            } else {
                return { data: null, error: error.message || "Request failed due to an unknown error" };
            }
        }
    }

    // GET request with a generic response type
    async get<T>(endpoint: string, options: RequestInit = {}): Promise<{ data: T | null; error: string | null }> {
        return this.request<T>(endpoint, { method: "GET", ...options });
    }

    // POST request with a generic response type
    async post<T>(
        endpoint: string,
        body: any,
        options: RequestInit = {}
    ): Promise<{ data: T | null; error: string | null }> {
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

    // PUT request with a generic response type
    async put<T>(
        endpoint: string,
        body: any,
        options: RequestInit = {}
    ): Promise<{ data: T | null; error: string | null }> {
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

    // DELETE request with a generic response type
    async delete<T>(endpoint: string, options: RequestInit = {}): Promise<{ data: T | null; error: string | null }> {
        return this.request<T>(endpoint, { method: "DELETE", ...options });
    }
}