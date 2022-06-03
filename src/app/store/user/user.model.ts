import { User } from "src/app/models/backend/user";

export { User, Recruiter, Employee } from "src/app/models/backend/user";
export { Roles } from 'src/app/models/backend/role'

export interface EmailPasswordCredentials {
    email: string;
    passworrd: string;
}

export type UserCreateRequest = Omit<User, 'uid' | 'email' | 'created'>