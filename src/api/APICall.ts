import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios';

// 1. Configure the Base Instance
const apiClient: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api', // Your Slim 4 URL
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// 2. Request Interceptor: Automatically attach JWT from localStorage
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('admin_token');
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 3. Response Interceptor: Handle Global Errors (like 401 Unauthorized)
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        const isLoginRequest = error.config.url.includes('/auth/login');
        if (error.response?.status === 401 && !isLoginRequest) {
            // Token expired or invalid - Clear and Redirect
            localStorage.removeItem('admin_token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// 4. Export a clean wrapper for HTTP methods
const APICall = {
    get: <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => 
        apiClient.get<T>(url, config),
    
    post: <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => 
        apiClient.post<T>(url, data, config),
    
    put: <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => 
        apiClient.put<T>(url, data, config),
    
    // Removed the non-existent 'data' variable causing your error
    delete: <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => 
        apiClient.delete<T>(url, config),
};


export default APICall;
