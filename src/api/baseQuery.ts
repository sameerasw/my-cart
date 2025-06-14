import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { clearAuth } from "../store/authSlice";
import config from "../config";

// Logging utility
const logAPI = (message: string, data?: any) => {
  if (config.ENABLE_API_LOGGING) {
    console.log(`🔗 API: ${message}`, data || "");
  }
};

const logAPIError = (message: string, error?: any) => {
  if (config.ENABLE_API_LOGGING) {
    console.error(`❌ API Error: ${message}`, error || "");
  }
};

const logAPIWarning = (message: string, data?: any) => {
  if (config.ENABLE_API_LOGGING) {
    console.warn(`⚠️ API Warning: ${message}`, data || "");
  }
};

// Create base query with interceptor
const baseQuery = fetchBaseQuery({
  baseUrl: config.API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    // Get token from Redux state
    const token = (getState() as any).auth.token;

    // If we have a token, add it to headers
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
      logAPI("Token added to request headers");
    }

    // Set content type
    headers.set("content-type", "application/json");

    return headers;
  },
});

// Create base query with interceptor for error handling
const baseQueryWithInterceptor: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // Log request details
  const url = typeof args === "string" ? args : args.url;
  const method = typeof args === "string" ? "GET" : args.method || "GET";
  const body = typeof args === "string" ? undefined : args.body;

  logAPI(`Request: ${method} ${url}`, body ? { body } : undefined);

  const startTime = Date.now();
  const result = await baseQuery(args, api, extraOptions);
  const endTime = Date.now();
  const duration = endTime - startTime;

  // Log response details
  if (result.data) {
    logAPI(`Response: ${method} ${url} (${duration}ms)`, {
      status: "success",
      data: result.data,
    });
  }

  // Handle 401 Unauthorized responses
  if (result.error && result.error.status === 401) {
    logAPIError(`Unauthorized: ${method} ${url} (${duration}ms)`, result.error);
    // Clear auth state and redirect to login
    api.dispatch(clearAuth());
    logAPIWarning("Authentication expired. Please login again.");
  }

  // Handle other common errors
  if (result.error && result.error.status === 403) {
    logAPIError(`Forbidden: ${method} ${url} (${duration}ms)`, result.error);
    logAPIWarning("Access forbidden. Insufficient permissions.");
  }

  if (result.error && result.error.status >= 500) {
    logAPIError(`Server Error: ${method} ${url} (${duration}ms)`, result.error);
    logAPIError("Server error occurred. Please try again later.");
  }

  // Log other errors
  if (
    result.error &&
    result.error.status &&
    result.error.status < 500 &&
    result.error.status !== 401 &&
    result.error.status !== 403
  ) {
    logAPIError(`Client Error: ${method} ${url} (${duration}ms)`, result.error);
  }

  return result;
};

export default baseQueryWithInterceptor;
