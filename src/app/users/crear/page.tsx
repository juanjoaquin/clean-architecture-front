'use server';

import CreateUserForm from "../components/CreateUserForm";

export default async function Page() {
    return (
        <div className="content-container">
            <div className="space-y-12">
                <div>
                    <h1 className="text-2xl font-bold">Crear Usuario</h1>
                </div>
                <div>
                    <CreateUserForm />
                </div>
            </div>
        </div>
    )
}
