import axios from 'axios';

axios.interceptors.response.use(
    response => response,
    error => {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                // Gestion des erreurs spécifiques du backend
                switch (error.response.status) {
                    case 400:
                        return Promise.reject(new Error(error.response.data.message || 'Invalid request'));
                    case 500:
                        return Promise.reject(new Error('An error occurred while processing your request.'));
                    default:
                        return Promise.reject(new Error('An unexpected error occurred.'));
                }
            } else if (error.request) {
                return Promise.reject(new Error('Unable to reach the server.'));
            }
        }
        return Promise.reject(error);
    }
);