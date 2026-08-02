interface FetchRetryOptions {
  maxRetries?: number;
  retryDelay?: number;
  timeout?: number;
}

/**
 * Fetches a resource with retry capabilities
 * @param url - The URL to fetch
 * @param options - Fetch options plus retry configuration
 * @param retryOptions - Configuration for retries
 * @returns Response from the fetch operation
 */
export async function fetchWithRetry(
  url: string,
  options?: RequestInit,
  retryOptions: FetchRetryOptions = {}
): Promise<Response> {
  const {
    maxRetries = 3,
    retryDelay = 1000,
    timeout = 5000
  } = retryOptions;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  const fetchWithTimeout = () => 
    fetch(url, {
      ...options,
      signal: controller.signal
    });

  let lastError: Error = new Error("Unknown error occurred");
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await fetchWithTimeout();
      clearTimeout(timeoutId);
      
      // If response is not ok, throw error for retry
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return response;
    } catch (error) {
      if (error instanceof Error) {
        lastError = error;
      }
      
      // Don't retry if we've run out of attempts
      if (attempt === maxRetries - 1) {
        break;
      }

      // Don't retry if explicitly aborted
      if (error instanceof Error && error.name === "AbortError") {
        throw error;
      }

      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, retryDelay * (attempt + 1)));
    }
  }

  throw lastError;
}

/**
 * Wrapper for image fetching with specific retry configuration
 */
export async function fetchImage(
  url: string,
  options?: RequestInit
): Promise<Response> {
  return fetchWithRetry(url, options, {
    maxRetries: 3,
    retryDelay: 1500,  // Longer delay for images
    timeout: 10000     // Longer timeout for images
  });
}
