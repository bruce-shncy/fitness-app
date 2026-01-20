export type ApiFetchOptions<Body> = {
    method?: string,
    headers?: Record<string,string>
    body?: Body
}


export const clientApiFetch = async<TResponse, TBody = unknown>(
    url: string, 
    options: ApiFetchOptions<TBody> = {}
): Promise<TResponse> => {

    const {method = "GET", headers, body} = options

    const response = await fetch(url, {
        method, 
        headers: {
            Accept: "application/json",
            ...(body ? {"Content-Type" : "application/json"} : {}),
            ...(headers ?? {})
        },
        body: body ? JSON.stringify(body) : undefined
    })

    if (!response.ok) {
        const errorJson = await response.json().catch(() => null)
        const message = errorJson?.message ?? `Request failed ${response.status}`
        const error = new Error(message) as Error & {status?: number; details: unknown}
        error.status = response.status 
        error.details = errorJson 
        throw error
    }

    if (response.status === 204) return null as TResponse

    const data = await response.json();
    return { status: response.status, data } as TResponse;
}