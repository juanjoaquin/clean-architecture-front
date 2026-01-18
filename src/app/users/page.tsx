'use server'

import { Suspense } from "react"
import UsersContent from "./components/UsersContent"


export default async function page() {
    return (
        <section>
            <Suspense fallback={<div>Loading...</div>}>
                <UsersContent />
            </Suspense>
        </section>
    )
}
