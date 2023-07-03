import axios, { AxiosResponse } from "axios";

export type COMMENT = {
    cid?: string,
    body?: string,
    user_id?: string,
    post_id?: string,
    created_at?: string,
}

function get_post_comments(post_id: string): Promise<AxiosResponse<COMMENT[]>> {
    return axios.get("/api/comments", { params: { post_id } })
}

type PostComment = {
    body: string,
    user_id: string,
    post_id: string,
}

function post_comment(new_comment: PostComment): Promise<AxiosResponse> {
    return axios.post("/api/comments", new_comment);
}

type EditedComment = {
    body: string,
    user_id: string,
    post_id: string,
    cid: string,
}

function edit_comment(edited_comment: EditedComment): Promise<AxiosResponse> {
    return axios.put("/api/comments", edited_comment)
}

function delete_comment(cid: string): Promise<AxiosResponse> {
    return axios.delete("/api/comments", { params: { cid, }, })
}

function get_unique_comments(comments: COMMENT[]): COMMENT[] {
    return Array.from(
        new Set(comments.map((comment) => comment.cid))
    ).map((cid) => {
        return comments.find((comment) => comment.cid === cid);
    }) as COMMENT[]
}

export { get_post_comments, post_comment, edit_comment, delete_comment, get_unique_comments }
