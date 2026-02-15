'use client';

import { deleteUserAction } from "@/src/architecture/presentation/actions/deleteUser.action";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";


type Props = {
    id: string;
}

export default function DeletePacienteForm({ id }: Props) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const router = useRouter();

    const handleDeleteUser = async () => {
        setIsDeleting(true);
        const result = await deleteUserAction(id);

        if (result.success) {
            toast.success('Usuario eliminado correctamente');
            router.replace('/users');
        } else {
            toast.error(`Error al eliminar: ${result.error}`);
        }
    }

    return (
        <>
            <button
                onClick={() => setShowConfirm(true)}
                className="flex items-center gap-2 px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-md disabled:opacity-50"
                disabled={isDeleting}
            >
                <Trash2 className="w-4 h-4" />
                {isDeleting ? 'Eliminando...' : 'Eliminar Usuario'}
            </button>


            {showConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-md">
                        <h3 className="text-lg font-bold mb-4">Confirmar Eliminación</h3>
                        <p className="mb-6">
                            ¿Estás seguro de que deseas eliminar al usuario?
                            Esta acción no se puede deshacer.
                        </p>
                        <div className="flex gap-4 justify-end">
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                                disabled={isDeleting}
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleDeleteUser}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
                                disabled={isDeleting}
                            >
                                {isDeleting ? 'Eliminando...' : 'Eliminar'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}