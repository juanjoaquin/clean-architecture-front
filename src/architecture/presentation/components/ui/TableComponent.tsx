import React from 'react';

// Tipos para el componente
interface TableHeader {
    key: string;
    label: string;
    className?: string;
}

interface TableProps<T> {
    headers: TableHeader[];
    data: T[];
    renderRow: (item: T, index: number) => React.ReactNode;
    className?: string;
    headerClassName?: string;
    bodyClassName?: string;
    emptyMessage?: string;
}

export function Table<T>({
    headers,
    data,
    renderRow,
    className = '',
    headerClassName = '',
    bodyClassName = '',
    emptyMessage = 'No hay datos disponibles'
}: TableProps<T>) {
    return (
        <div className="overflow-x-auto">
            <table className={`min-w-full divide-y divide-gray-200 ${className}`}>
                <thead className={`bg-gray-50 ${headerClassName}`}>
                    <tr>
                        {headers.map((header) => (
                            <th
                                key={header.key}
                                className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${header.className || ''}`}
                            >
                                {header.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className={`bg-white divide-y divide-gray-200 ${bodyClassName}`}>
                    {data.length === 0 ? (
                        <tr>
                            <td
                                colSpan={headers.length}
                                className="px-6 py-4 text-center text-sm text-gray-500"
                            >
                                {emptyMessage}
                            </td>
                        </tr>
                    ) : (
                        data.map((item, index) => renderRow(item, index))
                    )}
                </tbody>
            </table>
        </div>
    );
}

// Componentes auxiliares para facilitar el uso
export const TableRow: React.FC<{ children: React.ReactNode; className?: string }> = ({
    children,
    className = ''
}) => {
    return <tr className={className}>{children}</tr>;
};

export const TableCell: React.FC<{ children: React.ReactNode; className?: string }> = ({
    children,
    className = ''
}) => {
    return (
        <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${className}`}>
            {children}
        </td>
    );
};
