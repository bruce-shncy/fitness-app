import { API_BASE_URL } from "./config";

const ACCESS_TOKEN_STORAGE_KEY = "fitnessapp_admin_token";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

type ApiError = {
    message: string;
    error: Record<string, string>;
};

const getToken = (): string | null => {
    if (typeof window === "undefined") return null;
    return window.localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
};

export const setToken = (token: string) => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, token);
};

export const clearToken = () => {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
};

/**
 * Creating request wrapper function
 * @param path - string
 * @param method - HttpMethod
 * @param body  - optional
 */

export const request = async <T>(
    path: string,
    method: HttpMethod = "GET",
    body?: unknown
): Promise<T> => {
    // Create headers
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        Accept: "application/json",
    };

    const token = getToken();
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    // Create request config
    const requestConfig: RequestInit = {
        method,
        headers,
    };

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
