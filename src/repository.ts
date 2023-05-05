import axios from "axios";
import Cookies from "js-cookie";

const REACT_APP_API_URL  = 'http://localhost:5000';

const repository = axios.create({
    baseURL: REACT_APP_API_URL
});

repository.interceptors.request.use(
    async (config) => {
        const access_token = Cookies.get('access_token_admin');

        if (access_token) {
            config.headers.set('Authorization', `Bearer ${access_token}`);
        }

        let curTime = Number(new Date().getTime()) / 1000;
        let expTime = Number(Cookies.get('expired_at_admin')) / 1000;
        
        if ((expTime - curTime) <= 0) {
            Cookies.remove('access_token_admin');
            Cookies.remove('expired_at_admin');
            window.location.replace("/app");
            return config;
        }

        if ((expTime - curTime) < 600 && (expTime - curTime) > 0) {
            try {
                Cookies.remove('access_token_admin');
                Cookies.remove('expired_at_admin');
                const response = await repository.get("auth/refresh-token", {
                    headers: {
                        'Authorization': `Bearer ${access_token}`
                    }
                });
                Cookies.set('access_token_admin', response.data.access_token);
                Cookies.set('expired_at_admin', response.data.expired_at);
            } catch (e) {
                Cookies.remove('access_token_admin');
                Cookies.remove('expired_at_admin');
                window.location.replace("/app");
                return config;
            }
        }

        return config;
    },
);

export default repository;
