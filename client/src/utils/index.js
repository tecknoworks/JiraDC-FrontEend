import { toast } from 'react-toastify';

export function globalErrorHandler(error) {
    if (error && error.error)
        toast.error(error.error, {className: "error-auth"});
    else
        toast.error('An error occured!', {className: "error-general"});

    return Promise.reject(false);
}

export function responseToJson(response) {
    return response.json().then(json => {
        return response.ok ? json : Promise.reject(json);
    });
}