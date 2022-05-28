import { Employee } from "./roles/employee";
import { Recruiter } from "./roles/recruiter";

export { Employee } from "./roles/employee";
export { Recruiter } from "./roles/recruiter";

import { FieldValue } from 'firebase/firestore'

export interface User {
    uid: string;
    name: string;
    photoURL: string;
    email: string;
    country: string;
    about?: string;
    roleId: string;
    role: Employee | Recruiter;
    created: FieldValue;
    updated?: FieldValue;
}