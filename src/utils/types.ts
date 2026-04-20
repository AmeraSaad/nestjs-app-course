export type JWTPayloadType = {
    id: number;
    UserType: string;
}

export type AccessTokenType = {
    accessToken: string,
    user: {
        id: number,
        email: string,
        username: string,
    }
}