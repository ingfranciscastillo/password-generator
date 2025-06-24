"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordSchema, passwordSchema } from "@/schema/password.schema";
import { SaveIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PasswordOptions } from "@/lib/password";
import PasswordOptionsTags from "./password-options-tags";
import { useMutation } from "@tanstack/react-query";
import { CreatePasswordAction } from "../_actions/create-password.action";
import { toast } from "sonner";

interface Props {
  password: string;
  passwordConfig: PasswordOptions;
}

export function FormSavePassword({ password, passwordConfig }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<PasswordSchema>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      title: "",
      password: "",
    },
  });

  const handleSubmit = (values: PasswordSchema) => {
    mutate(values);
  };

  useEffect(() => {
    if (isOpen) {
      form.setValue("password", password);
      form.setValue("length", passwordConfig.length);
      form.setValue("hasUppercase", passwordConfig.hasUppercase);
      form.setValue("hasLowercase", passwordConfig.hasLowercase);
      form.setValue("hasNumbers", passwordConfig.hasNumbers);
      form.setValue("hasSpecialChars", passwordConfig.hasSpecialChars);
    }
  }, [isOpen, password, passwordConfig, form]);

  const { mutate, isPending } = useMutation({
    mutationFn: CreatePasswordAction,
    onSuccess(data, variables, context) {
      form.reset();
      toast.success("Contraseña guardada correctamente");
      setIsOpen(false);
    },
    onError(error, variables, context) {
      toast.error("Error al guardar la contraseña");
      console.error("Error saving password:", error);
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <SaveIcon />
          Guardar contraseña
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold flex items-center gap-2">
            <SaveIcon />
            Guardar contraseña
          </DialogTitle>
          <DialogDescription>
            Aquí puedes guardar tu contraseña. Asegúrate de que sea segura y
            fácil de recordar.
          </DialogDescription>
        </DialogHeader>

        <section className="space-y-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Titulo:</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ej: Google, Gmail, Facebook, etc"
                        className="h-12"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Este es el título de la contraseña que estás guardando.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña:</FormLabel>
                    <FormControl>
                      <Input
                        disabled
                        className="h-12 bg-gray-100 font-mono text-gray-800"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>

            <div className="bg-gradient-to-r from-blue-50 to-green-50 border-gray-200 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-green-800 mb-3">
                Configuracion aplicada:
              </h3>
              <div className="space-y-4 text-sm">
                <p className="space-y-4 text-sm">
                  <span className="font-bold">Longitud de la contraseña: </span>
                  {passwordConfig.length} caracteres
                </p>
                <PasswordOptionsTags passwordConfig={passwordConfig} />
              </div>
            </div>
          </Form>
        </section>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            disabled={isPending}
            type="submit"
            onClick={form.handleSubmit(handleSubmit)}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
