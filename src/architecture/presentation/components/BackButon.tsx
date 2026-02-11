"use client";

import { useRouter } from "next/navigation";

interface BackButtonProps {
    label?: string;
    className?: string;
}

export function BackButton({
    label = "Volver",
    className = "",
}: BackButtonProps) {
    const router = useRouter();

    return (
        <button
            type="button"
            onClick={() => router.back()}
            className={`inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 cursor-pointer ${className}`}
        >
            ← {label}
        </button>
    );
}
