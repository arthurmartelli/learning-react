import { User } from "@auth0/auth0-react";

export type PROFILE = User;

export type DB_PROFILE = {
    uid?: string,
    username?: string,
    email?: string,
    email_verified?: boolean,
    created_at?: string,
    last_login?: string,
};

export type POST = {
    pid?: string,
    title?: string,
    body?: string,
    user_id?: string,
    created_at?: string,
}

export type COMMENT = {
    cid?: string,
    body?: string,
    user_id?: string,
    post_id?: string,
    created_at?: string,
}
