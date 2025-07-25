"use client";

import { useQuery } from "@tanstack/react-query";
import { getPasswordAction } from "../_actions/get-password.action";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CopyIcon } from "lucide-react";
import { toast } from "sonner";
import PasswordOptionsTags from "./password-options-tags";
import PasswordDeleteDialog from "./password-delete-dialog";

const PasswordList = () => {
  const handleCopyPassword = (password: string) => {
    navigator.clipboard.writeText(password).then(() => {
      toast.success("Contraseña copiada al portapapeles");
    });
  };

  const { data, error, isPending } = useQuery({
    queryKey: ["passwords"],
    queryFn: getPasswordAction,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  if (isPending) {
    return (
      <div className="text-center text-gray-500">Cargando contraseñas...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        Error al cargar las contraseñas
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <section className="text-center space-y-1">
        <h2 className="text-2xl font-bold text-gray-800">
          Mis contraseñas guardadas
        </h2>
        <p className="text-gray-500 text-sm">
          Aquí puedes ver y gestionar todas las contraseñas que has guardado.
          Puedes añadir nuevas, editar o eliminar las existentes.
        </p>
      </section>

      <section className="space-y-4">
        {data.map((password) => (
          <Card key={password.id}>
            <CardContent className="p-4 flex justify-between items-center gap-4">
              <section>
                <p className="font-bold text-gray-800">
                  Titulo: {password.title}
                </p>
                <p className="text-sm text-gray-500 my-2">
                  Longitud contraseña: {password.length}
                </p>
                <PasswordOptionsTags passwordConfig={password} />
              </section>
              <section className="flex flex-col space-y-2">
                <Button
                  className="cursor-pointer"
                  variant={"outline"}
                  onClick={() =>
                    handleCopyPassword(password.descryptedPassword)
                  }
                >
                  <CopyIcon />
                  Copiar
                </Button>
                <PasswordDeleteDialog id={password.id} />
              </section>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
};

export default PasswordList;
