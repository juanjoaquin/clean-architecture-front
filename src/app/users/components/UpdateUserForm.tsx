'use client';

import { TUpdateUserInput, updateUserSchema, User } from "@/src/architecture/core/domain/entities/User/User";
import { updateUserAction } from "@/src/architecture/presentation/actions/updateUser.action";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type UpdateUserFormProps = {
    user: User;
}

export default function UpdateUserForm({ user }: UpdateUserFormProps) {

    const router = useRouter();

    const form = useForm<TUpdateUserInput>({
        resolver: zodResolver(updateUserSchema),
        mode: 'onBlur',
        defaultValues: {
            id: user.id,
            first_name: user.firstName,
            last_name: user.lastName,
            email: user.email,
            phone: user.phone,
        },
    });

    const { register, handleSubmit, formState: { isSubmitting, errors } } = form;

    const onSubmit = async (data: TUpdateUserInput) => {
        try {
            const res = await updateUserAction(data);
            if (res.success) {
                toast.success('User updated successfully');
                router.push(`/users`);
            }
        } catch (error) {
            toast.error(error as string);
        }
    }
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Actualizar Usuario</h2>
                    <p className="text-gray-600">Rellena la información a continuación</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* First Name */}
                    <div>
                        <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">
                            First Name
                        </label>
                        <input
                            id="first_name"
                            type="text"
                            {...register('first_name')}
                            placeholder="John"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                        />
                        {errors.first_name && (
                            <p className="mt-1 text-sm text-red-600">{errors.first_name.message}</p>
                        )}
                    </div>

                    {/* Last Name */}
                    <div>
                        <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">
                            Last Name
                        </label>
                        <input
                            id="last_name"
                            type="text"
                            {...register('last_name')}
                            placeholder="Doe"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                        />
                        {errors.last_name && (
                            <p className="mt-1 text-sm text-red-600">{errors.last_name.message}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            {...register('email')}
                            placeholder="john.doe@example.com"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Phone */}
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                            Phone
                        </label>
                        <input
                            id="phone"
                            type="tel"
                            {...register('phone')}
                            placeholder="+1 (555) 123-4567"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                        />
                        {errors.phone && (
                            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed mt-6"
                    >
                        {isSubmitting ? 'Editando...' : 'Editar Usuario'}
                    </button>
                </form>
            </div>
        </div>
    );
}