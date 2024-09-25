import axios from "axios";

// export const publicApi = axios.create({
//     baseURL: "https://certifylink-frontend.vercel.app",
//     withCredentials: true
// });
export const publicApi = axios.create({
    baseURL: "https://auto-dealer-backend.vercel.app/",
    withCredentials: true
});
