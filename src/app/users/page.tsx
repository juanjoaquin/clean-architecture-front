'use server';

import { Suspense } from "react";
import UsersTable from "./components/UsersTable";
import { TableSkeleton } from "@/src/architecture/presentation/components/ui/TableSkeleton";

export default async function Page() {

    return (
        <Suspense fallback={<TableSkeleton columns={5} rows={5} />}>
            <UsersTable />
        </Suspense>
    )

}