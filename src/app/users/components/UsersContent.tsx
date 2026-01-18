'use server'

import { getAllUsersAction } from "@/src/application/actions/User/getAll.action";
import Link from "next/link";

export default async function UsersContent() {
    const result = await getAllUsersAction();

    if (result.error) {
        return <div>Error </div>;
    }

    const users = result?.data && result?.data.length > 0 ? result?.data : [];
    console.log("users", users);

    return (
        <section>
            <h1>Users</h1>
            <ul>
                {users.map((user) => (
                    <div key={user.id}>
                        <Link href={`/users/${user.id}`}>
                            {user.firstName} {user.lastName} - {user.id}
                        </Link>
                    </div>
                ))}
            </ul>
        </section >
    )
}
