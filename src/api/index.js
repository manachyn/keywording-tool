export const API_ROOT = 'http://slicing.loc/api/v1/';

// const callApi = (endpoint, schema) => {
//     const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint
//
//     return fetch(fullUrl)
//         .then(response =>
//             response.json().then(json => {
//                 if (!response.ok) {
//                     return Promise.reject(json)
//                 }
//
//                 const camelizedJson = camelizeKeys(json)
//                 const nextPageUrl = getNextPageUrl(response)
//
//                 return Object.assign({},
//                     normalize(camelizedJson, schema),
//                     { nextPageUrl }
//                 )
//             })
//         )
// }


export function callApi(endpoint, method = 'get', body) {
    const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;

    return fetch(fullUrl, {
        headers: { 'Content-Type': 'application/json' },
        method,
        body: JSON.stringify(body), // this handles undefined body as well
    })
        .then(response => response.json().then(json => ({ json, response })))
        .then(({ json, response }) => {
            if (!response.ok) {
                return Promise.reject(json);
            }

            return json;
        });
}


// export default function callApi(endpoint, method = 'get', body) {
//     return fetch(`${API_URL}/${endpoint}`, { // power of template strings
//         headers: { 'content-type': 'application/json' }, // I forget to add this EVERY TIME
//         method, // object shorthand
//         body: JSON.stringify(decamelizeKeys(body)), // this handles undefined body as well
//     })
//     // a clever way to bundle together both the response object and the JSON response
//         .then(response => response.json().then(json => ({ json, response })))
//         .then(({ json, response }) => {
//             const camelizedJson = camelizeKeys(json);
//
//             if (!response.ok) {
//                 return Promise.reject(camelizedJson);
//             }
//
//             return camelizedJson;
//         })
//         // we could also skip this step and use try...catch blocks instead,
//         // but that way errors can easily bleed into wrong catch blocks
//         .then(
//             response => ({ response }),
//             error => ({ error })
//         );
// }