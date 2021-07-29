import { toast } from 'react-toastify';

export function globalErrorHandler(error) {
    if (error && error.message)
        toast.error(error.message);
    else
        toast.error('An error occured!');

    return Promise.reject(false);
}

export function responseToJson(response) {
    return response.json().then(json => {
        return response.ok ? json : Promise.reject(json);
    });
}