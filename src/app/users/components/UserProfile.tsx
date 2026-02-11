import { User } from "@/src/architecture/core/domain/entities/User/User";

type UserProfileProps = {
    user: User;
}

export default function UserProfile({ user }: UserProfileProps) {
    return (
        <div>
            <h1>Nombre:{user.firstName} Apellido: {user.lastName}</h1>
            <p>Email: {user.email}</p>
            <p>Teléfono: {user.phone}</p>
        </div>
    )
}