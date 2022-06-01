import { User as DBUser, Employee } from 'src/app/models/backend/user'

export interface User extends DBUser {
    role: Employee
}