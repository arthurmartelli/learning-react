import axios, { AxiosResponse } from "axios";
import { DB_PROFILE } from "../store/actions/action_types";

async function get_user_from_db(uid: string): Promise<DB_PROFILE> {
    try {
        const response: AxiosResponse<DB_PROFILE[]> = await axios.get('/api/users/get_username', {
            params: { uid },
        });

        // Check if the response data array is not empty
        if (response.data.length > 0) {
            return response.data[0];
        } else {
            throw new Error('User not found'); // Throw an error if user is not found
        }
    } catch (error) {
        throw new Error('Error fetching user from the database'); // Throw an error if there's an error in the request
    }
}

export { get_user_from_db }