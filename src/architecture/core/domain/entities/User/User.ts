import z from "zod";

/* Entitie User */
export type User = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}

export type UserResponse = {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    Course: any | null;
}

/* Zod Validations */
export const createUserSchema = z.object({
    first_name: z.string({ error: 'First name is required' }).min(1, 'Put one caracter').max(50, 'Max 50 caracters'),
    last_name: z.string({ error: 'Last name is required' }).min(1, 'Put one caracter').max(50, 'Max 50 caracters'),
    email: z.email({ error: 'Email is required' }).min(1, 'Put one caracter'),
    phone: z.string({ error: 'Phone is required' }).regex(/^\d+$/, "Solo se permiten números")
});

export type TCreateUserInput = z.infer<typeof createUserSchema>

/* export const updateUserSchema = createUserSchema.partial().extend({
        id: z.uuid("Invalid user id"),
    });
 */
export type TUpdateUserInput = z.infer<typeof createUserSchema>