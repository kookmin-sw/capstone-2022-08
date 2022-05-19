const API_ENDPOINT = "https://api.badhorse.link/v1";

const getResponseData = (response) => {
    try {
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            const errData = await response.json();
            throw errData;
        }
    } catch (e) {
        throw {
            message: e.message,
            status: e.status,
        };
    }
}

const request = {
    get : async (url) => {
        try {
            const response = await fetch(url);
            const data = getResponseData(response)
            return data
        } catch (e) {
            throw e
        }
    },

    post : async (url, body) => {
        try {
            const response = await fetch(url, {
                method : 'POST',
                body : JSON.stringify(body) 
            });
            const data = getResponseData(response)
            return data
        } catch (e) {
            throw e
        }
    }

}

const api = {
    fetchPredict: async (text) => {
        try {
            const data = await request.post(
                `${API_ENDPOINT}/predict/`,
                {text}
            );
            return data;
        } catch (e) {
            return e;
        }
    },
};

export default api;
