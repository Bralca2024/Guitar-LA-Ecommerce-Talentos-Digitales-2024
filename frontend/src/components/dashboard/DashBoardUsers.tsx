import {
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { useUserStore } from "../../store/userStore"; // Asume que existe un store similar al de productos
import { useState, useEffect, Fragment } from "react";
import { UserType } from "../../types/type";
import { 
  Dialog, 
  Transition, 
  DialogPanel, 
  DialogTitle, 
  TransitionChild } from "@headlessui/react";
import UserModal from "../modals/UserModal"; // Modal para crear/editar usuarios


export default function DashboardUsers() {
  const fetchAllUsers = useUserStore((state) => state.fetchAllUsers);
  const users = useUserStore((state) => state.allUsers);
  const setSelectedUser = useUserStore((state) => state.setSelectedUser);
  const deleteUser = useUserStore((state) => state.deleteUser);
  const { setIsModalOpen, setIsEditMode } = useUserStore();

  // Estado para el modal de confirmación
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]); // Elimina `users` como dependencia.
  
  const handleEditClick = (user: UserType) => {
    setSelectedUser(user);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleCreateClick = () => {
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setUserIdToDelete(id);
    setIsConfirmDeleteOpen(true);
  };

  const confirmDeleteUser = async () => {
    if (userIdToDelete) {
      await deleteUser(userIdToDelete);
      await fetchAllUsers();
      setIsConfirmDeleteOpen(false);
      setUserIdToDelete(null);
    }
  };

  return (
    <div className="py-16 px-8 overflow-x-auto">
      <h2 className="text-4xl text-center text-orange-600 mb-12 font-bold min-w-full border border-collapse mx-auto">
        Dashboard de usuarios
      </h2>
      <button onClick={handleCreateClick}>
        <PlusIcon className="fixed bottom-4 right-4 h-12 text-white bg-blue-600 rounded-full" />
      </button>
      <table className="min-w-full border border-collapse mx-auto">
        <thead>
          <tr className="bg-gray-300">
            <th className="border border-slate-200 py-4">Nombre completo</th>
            <th className="border border-slate-200 py-4">Usuario</th>
            <th className="border border-slate-200 py-4">Email</th>
            <th className="border border-slate-200 py-4">Fecha de nacimiento</th>
            <th className="border border-slate-200 py-4">Teléfono</th>
            <th className="border border-slate-200 py-4">Dirección</th>
            <th className="border border-slate-200 py-4">Rol</th>
            <th className="border border-slate-200 py-4">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) =>
            user._id ? (
              <tr key={user._id} className="bg-white">
                <td className="p-4 border border-gray-300">{user.fullName}</td>
                <td className="p-4 border border-gray-300">{user.username}</td>
                <td className="p-4 border border-gray-300">{user.email}</td>
                <td className="p-4 border border-gray-300">{user.dateOfBirth || ""}</td>
                <td className="p-4 border border-gray-300">{user.phone || ""}</td>
                <td className="p-4 border border-gray-300">{user.address || ""}</td>
                <td className="p-4 border border-gray-300">{user.role}</td>
                <td className="p-4 border border-gray-300 text-center">
                  <div className="flex justify-center items-center divide-x divide-gray-300">
                    <button className="pr-2" onClick={() => handleDeleteClick(user._id!)}>
                      <TrashIcon className="h-6 w-6 text-red-600 hover:text-red-500 transition duration-300" />
                    </button>
                    <button className="pl-2" onClick={() => handleEditClick(user)}>
                      <PencilSquareIcon className="h-6 w-6 text-green-600 hover:text-green-500 transition duration-300" />
                    </button>
                  </div>
                </td>
              </tr>
            ) : null
          )}
        </tbody>
      </table>

      {/* Modal de Confirmación */}
      {isConfirmDeleteOpen && (
        <Transition appear show={isConfirmDeleteOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={() => setIsConfirmDeleteOpen(false)}
          >
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-75" />
            </TransitionChild>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <TransitionChild
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <DialogTitle
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900 mb-4"
                    >
                      Confirmar Eliminación
                    </DialogTitle>
                    <div className="mt-2">
                      <p>¿Estás seguro de que deseas eliminar este usuario?</p>
                    </div>

                    <div className="flex justify-end mt-4">
                      <button
                        type="button"
                        onClick={() => setIsConfirmDeleteOpen(false)}
                        className="mr-2 bg-gray-400 text-white py-2 px-4 rounded-md"
                      >
                        Cancelar
                      </button>
                      <button
                        type="button"
                        onClick={confirmDeleteUser}
                        className="bg-red-600 text-white py-2 px-4 rounded-md"
                      >
                        Eliminar
                      </button>
                    </div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </Dialog>
        </Transition>
      )}

      <UserModal />
    </div>
  );
}
