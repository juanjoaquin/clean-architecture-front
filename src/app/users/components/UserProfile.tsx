import { User } from "@/src/architecture/core/domain/entities/User/User";
import Link from "next/link";
import DeletePacienteForm from "./DeletePacienteForm";

type UserProfileProps = {
    user: User;
}

export default function UserProfile({ user }: UserProfileProps) {
    return (
        <div>
            <h1>Nombre:{user.firstName} Apellido: {user.lastName}</h1>
            <p>Email: {user.email}</p>
            <p>Teléfono: {user.phone}</p>
            <Link href={`/users/${user.id}/editar`}>Editar</Link>
            <DeletePacienteForm id={user.id} />
        </div>
    )
}