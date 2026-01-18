import { getUserByIdAction } from "@/src/application/actions/User/getById.action";

type Params = {
    params: Promise<{ id: string }>;
}

export default async function UserPage({ params }: Params) {
    const { id } = await params;

    const result = await getUserByIdAction(id);
    console.log("result", result);
    if (result.error) {
        return <div>Error </div>;
    }

/*     const user = result?.data && result?.data ? result?.data : null;
    console.log("user", user); */

    return (
        <section>
            <h1>User {id}</h1>
        </section>
    )
}