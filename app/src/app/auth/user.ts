export interface User {
    id: number;
    name: string;
    email: string;
    gender: string;
    birthday: Date;
    auth_type:
    {
        type: string;
    }
}
