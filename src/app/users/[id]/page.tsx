'use server';

import { getUserByIDAction } from "@/src/architecture/presentation/actions/getUserByID.action";
import UserProfile from "../components/UserProfile";

type ParamsProps = {
    params: Promise<{ id: string }>;
}

export default async function Page({ params }: ParamsProps) {
    const { id } = await params;

    const result = await getUserByIDAction(id);

    if (!result.success) {
        return <div>Error</div>;
    }

    const user = result.data;

    return <UserProfile user={user} />
}