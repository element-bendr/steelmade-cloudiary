import { APIError } from '@/lib/errors'

interface FetchOptions extends RequestInit {
  timeout?: number;
}

export async function safeFetch<T>(
  url: string,
  options: FetchOptions = {}
): Promise<T> {
  const { timeout = 5000, ...fetchOptions } = options;

  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
    });

    clearTimeout(id);

    if (!response.ok) {
      throw new APIError(
        `HTTP error! status: ${response.status}`,
        response.status,
        response.statusText
      );
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new APIError('Request timeout', 408, 'REQUEST_TIMEOUT');
      }
      throw new APIError(error.message);
    }
    
    throw new APIError('Unknown error occurred');
  }
}