import { API_BASE_URL } from "./config";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

type ApiError = {
    message: string;
    error: Record<string, string>;
};


/**
 * Ensure all request are CSRF protected
 */

const ensureCsrfCookie = async () => {
    await fetch(`${API_BASE_URL?.replace("/api","")}/sanctum/csrf-cookie`, {
        method: 'GET',
        'credentials': 'include',
    })
}

/**
 * Creating request wrapper function
 * @param path - string
 * @param method - HttpMethod
 * @param body  - optional
 */

export const request = async <T>(
    path: string,
    method: HttpMethod = "GET",
    headerConfig: Record<string, string>,
    body?: unknown
): Promise<T> => {
    // Create headers
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        Accept: "application/json",
        ... (headerConfig ?? {})
    };

    // Create request config
    const requestConfig: RequestInit = {
        method,
        headers,
        credentials: 'include',
    };

    if (method !==  "GET") {
         await ensureCsrfCookie()
    }
    
    if (body && method !== "GET") {
        requestConfig.body = JSON.stringify(body);
    }

    try {
        // Create request
    
        const response = await fetch(`${API_BASE_URL}${path}`, requestConfig);

        if (!response.ok) {
            let details: ApiError | undefined;
            try {
                const json = await response.json();
                if (json && typeof json === "object") {
                    details = json as ApiError;
                }
            } catch {}

            const message =
                details?.message ??
                `Request failed with status ${response.status}`;

            // Error extraction
            const error = new Error(message) as Error & {
                status?: number;
                details?: ApiError;
            };

            error.status = response.status;
            error.details = details;

            throw error;
        }

        if (response.status === 204) {
            return null as unknown as T;
        }

        const text = await response.text();

        try {
            return JSON.parse(text) as T;
        } catch {
            return text as unknown as T;
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error("Unknown error occurred during request");
    }
};
