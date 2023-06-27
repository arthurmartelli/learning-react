import axios, { AxiosResponse } from "axios"

export type POST = {
    pid?: string,
    title?: string,
    body?: string,
    user_id?: string,
    created_at?: string,
}

type NewPost = {
    title: string,
    body: string,
    user_id: string,
};


function add_post(post: NewPost): Promise<AxiosResponse> {
    return axios.post("/api/posts", post)
}

function get_posts(): Promise<AxiosResponse<POST[]>> {
    return axios.get("/api/posts")
}

type EditPost = {
    title: string,
    body: string,
    user_id: string,
    pid: string,
}

function edit_post(edited_post: EditPost): Promise<AxiosResponse> {
    return axios.put("/api/posts", edited_post)
}

function get_unique_posts(posts: POST[]): POST[] {
    const uniqueKeys: Record<string, boolean> = {};

    return posts.filter((post) => {
        const pid = post.pid;
        if (!pid || uniqueKeys[pid]) return false;
        uniqueKeys[pid] = true;
        return true;
    })
}

async function delete_post(post_id: string) {
    await axios.delete("api/comments/post-comments", { params: { post_id } });
    await axios.delete("api/posts", { params: { pid: post_id } });
}

function get_user_posts(user_id: string): Promise<AxiosResponse<POST[]>> {
    return axios
        .get("api/users/user_posts", {
            params: {
                user_id: user_id,
            },
        })
}

export { add_post, get_posts, edit_post, get_unique_posts, delete_post, get_user_posts }
