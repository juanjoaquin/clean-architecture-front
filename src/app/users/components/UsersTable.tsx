'use server'

import { getAllUsersAction } from "@/src/architecture/presentation/actions/getAllUsers.action"
import { Table, TableCell, TableRow } from "@/src/architecture/presentation/components/ui/TableComponent";
import Link from "next/link";

export default async function UsersTable() {

  const response = await getAllUsersAction();

  if (!response.success) {
    return <div>Error: {response.error}</div>
  }

  const users = response.success && response.data ? response.data : [];


  const headers = [
    { key: 'nombre', label: 'Nombre' },
    { key: 'apellido', label: 'Apellido' },
    { key: 'email', label: 'Correo Electrónico' },
    { key: 'telefono', label: 'Teléfono' },
    { key: 'acciones', label: 'Acciones' },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <Table
        headers={headers}
        data={users}
        renderRow={(user) => (
          <TableRow key={user.id}>
            <TableCell>{user.firstName || 'Sin especificar'}</TableCell>
            <TableCell>{user.lastName || 'Sin especificar'}</TableCell>
            <TableCell>{user.email || 'Sin especificar'}</TableCell>
            <TableCell>{user.phone || 'Sin especificar'}</TableCell>
            <TableCell className="flex items-center gap-2">

              <Link href={`/users/${user.id}`}>
                <button className="text-green-600 hover:text-green-800">
                  Ver
                </button>
              </Link>
            </TableCell>
          </TableRow>
        )}
        emptyMessage="No hay usuarios disponibles"
      />
    </div>
  )
}
