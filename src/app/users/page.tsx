'use server';

import { Suspense } from "react";
import UsersTable from "./components/UsersTable";
import { TableSkeleton } from "@/src/architecture/presentation/components/ui/TableSkeleton";
import Link from "next/link";
import { Plus } from "lucide-react";
import { PageTitle } from "@/src/architecture/presentation/components/PageTitle";


export default async function Page() {

    return (
        <>
            <div className="content-container">

                <PageTitle
                    title="Usuarios"
                    description="Administra todos los usuarios del sistema"
                    actions={
                        <Link
                            href="/users/crear"
                            className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Nuevo Usuario
                        </Link>
                    }
                />
            </div>
            <Suspense fallback={<TableSkeleton columns={5} rows={5} />}>
                <UsersTable />
            </Suspense>
        </>
    )

}