export interface BaseAccount {
    username: string;
    password: string;
    userLevel: 1 | 2 | 3;
}
    
export interface Account extends BaseAccount {
    id: string;
}

export interface Login {
    username: string;
    password: string;
}