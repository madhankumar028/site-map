'use strict';

let utilService = {
    httpClient: (reqOptions) => {
        return fetch(`${reqOptions.url}`, { 
            method  : reqOptions.method,
        }).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error('Something went wrong')
            }
        });
    }
}

export default utilService;
