import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { deletePasswordAction } from "../_actions/delete-password.action";
import { toast } from "sonner";

interface Props {
  id: string;
}

const PasswordDeleteDialog = ({ id }: Props) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => deletePasswordAction(id),
    onSuccess: () => {
      // Aquí puedes manejar el éxito, como mostrar un mensaje o refetch de datos
      toast.success("Contraseña eliminada correctamente");
      queryClient.invalidateQueries({
        queryKey: ["passwords"],
      }); // Refresca la lista de contraseñas
    },
    onError: () => {
      // Aquí puedes manejar el error, como mostrar un mensaje de error
      toast.error("Error al eliminar la contraseña");
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          <Trash2 />
          Eliminar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            ¿Estás seguro de que quieres eliminar la contraseña?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción eliminará permanentemente la contraseña y no podrás
            recuperarla. Asegúrate de que realmente deseas continuar.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cencelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              mutate(id);
            }}
            disabled={isPending}
          >
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PasswordDeleteDialog;
