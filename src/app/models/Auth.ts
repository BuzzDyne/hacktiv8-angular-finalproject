export interface Register {
    username : string
    email    : string
    password : string
}

export interface Login {
    email    : string
    password : string
}
export interface AuthResponse {
    token   : string | null
    success : boolean
    errors  : string[]
}

export interface Jwt {
    Id      : string
    email   : string
    sub     : string
    jti     : string
    nbf     : number
    exp     : number
    iat     : number
}