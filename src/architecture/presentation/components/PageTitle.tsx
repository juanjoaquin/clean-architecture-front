
// components/ui/PageTitle.tsx
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { ReactNode } from 'react'

type Breadcrumb = {
    label: string
    href?: string
}

type PageTitleProps = {
    title: string
    subtitle?: string
    description?: string
    breadcrumbs?: Breadcrumb[]
    actions?: ReactNode
}

export function PageTitle({
    title,
    subtitle,
    description,
    breadcrumbs,
    actions
}: PageTitleProps) {
    return (
        <div className="space-y-4">
            {/* Breadcrumbs */}
            {breadcrumbs && breadcrumbs.length > 0 && (
                <nav className="flex items-center space-x-2 text-sm text-gray-600">
                    {breadcrumbs.map((crumb, index) => (
                        <div key={index} className="flex items-center">
                            {index > 0 && <ChevronRight className="w-4 h-4 mx-2" />}
                            {crumb.href ? (
                                <Link
                                    href={crumb.href}
                                    className="hover:text-indigo-600 transition-colors"
                                >
                                    {crumb.label}
                                </Link>
                            ) : (
                                <span className="text-gray-900 font-medium">{crumb.label}</span>
                            )}
                        </div>
                    ))}
                </nav>
            )}

            {/* Header content */}
            <div className="flex items-center justify-between">
                <div className="space-y-2 flex-1">
                    {subtitle && (
                        <p className="text-sm font-medium text-indigo-600 uppercase tracking-wide">
                            {subtitle}
                        </p>
                    )}
                    <h1 className="text-3xl font-bold text-gray-900">
                        {title}
                    </h1>
                    {description && (
                        <p className="text-gray-600 text-lg max-w-3xl">
                            {description}
                        </p>
                    )}
                </div>

                {/* Actions */}
                <div>

                    {actions && (
                        <div className="shrink-0 ml-4">
                            {actions}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}