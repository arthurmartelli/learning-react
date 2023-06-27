import axios, { AxiosResponse } from "axios";

export type DB_PROFILE = {
    uid?: string,
    username?: string,
    email?: string,
    email_verified?: boolean,
    created_at?: string,
    last_login?: string,
};

async function send_profile_to_db(user: DB_PROFILE, sender: Function) {
    await axios.post("/api/users", user);

    axios
        .get("/api/users", {
            params: { email: user.email },
        })
        .then((res: AxiosResponse<DB_PROFILE[]>) => sender(res.data[0]));
}

async function get_user_from_db(uid: string): Promise<DB_PROFILE> {
    try {
        const response: AxiosResponse<DB_PROFILE[]> = await axios.get('/api/users/get_username', {
            params: { uid },
        });
        // Check if the response data array is not empty
        if (response.data.length > 0) return response.data[0];
        throw new Error('User not found'); // Throw an error if user is not found
    } catch (error) {
        throw new Error('Error fetching user from the database'); // Throw an error if there's an error in the request
    }
}

export { get_user_from_db, send_profile_to_db }