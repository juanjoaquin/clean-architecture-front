'use server';

import { Suspense } from "react";
import UsersTable from "./components/UsersTable";
import { TableSkeleton } from "@/src/architecture/presentation/components/ui/TableSkeleton";
import Link from "next/link";


export default async function Page() {

    return (
        <>
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">Usuarios</h1>
                </div>
                <div>
                    <Link href="/users/crear">
                        <span className="px-4 py-2 bg-blue-500 text-white font-medium rounded-md cursor-pointer hover:bg-blue-600">
                            Agregar Usuario

                        </span>
                    </Link>
                </div>
            </div>
            <Suspense fallback={<TableSkeleton columns={5} rows={5} />}>
                <UsersTable />
            </Suspense>
        </>
    )

}