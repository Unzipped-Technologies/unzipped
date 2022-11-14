const API_URL = 'http://localhost:3000';

export const API = {
    async getUser() {      
        try {
            const response = await fetch(`${API_URL}/api/auth/current_user`, {
                method: 'GET',
                credentials: 'include'
            })
            const r =  await response.json()
            // console.log(r, 'RESPONSE')
            return r
        } catch (e) {
            console.error(e, 'Get user error')
        }
    }
};

export const SuccessStatusCode = [200, 201, 202];
