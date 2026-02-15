'use server';

import { getUserByIDAction } from "@/src/architecture/presentation/actions/getUserByID.action";
import UpdateUserForm from "../../components/UpdateUserForm";

interface PageProps {
    params: Promise<{id: string;}>
}

export default async function Page({ params }: PageProps) {
    const { id } = await params;

    const user = await getUserByIDAction(id);

    if (!user.success) {
        return <div>Error: {user.error}</div>;
    }

    const userData = user.data;


    return (
        <div className="content-container">
            <div className="space-y-12">
                <div>
                    <h1 className="text-2xl font-bold">Editar Usuario</h1>
                </div>
                <div>
                    <UpdateUserForm user={userData} />
                </div>
            </div>
        </div>
    )
}
