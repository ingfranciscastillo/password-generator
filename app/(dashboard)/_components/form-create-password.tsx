"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { generatePassword, PasswordOptions } from "@/lib/password";
import {
  ArrowUp01,
  CaseLower,
  CaseUpper,
  CopyIcon,
  Hash,
  ShieldCheck,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { FormSavePassword } from "./form-save-password";

const options = [
  { label: "Mayúsculas (A-Z)", value: "hasUppercase", icon: <CaseUpper /> },
  { label: "Minúsculas (a-z)", value: "hasLowercase", icon: <CaseLower /> },
  { label: "Números (0-9)", value: "hasNumbers", icon: <ArrowUp01 /> },
  {
    label: "Caracteres especiales",
    value: "hasSpecialChars",
    icon: <Hash />,
  },
];

const FormCreatePassword = () => {
  const [password, setPassword] = useState("");

  const form = useForm<PasswordOptions>({
    defaultValues: {
      length: 12,
      hasUppercase: true,
      hasLowercase: true,
      hasNumbers: true,
      hasSpecialChars: true,
    },
  });

  useEffect(() => {
    const generatedPassword = generatePassword({
      length: form.getValues("length"),
      hasUppercase: form.getValues("hasUppercase"),
      hasLowercase: form.getValues("hasLowercase"),
      hasNumbers: form.getValues("hasNumbers"),
      hasSpecialChars: form.getValues("hasSpecialChars"),
    });
    setPassword(generatedPassword);
  }, []);

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(password).then(() => {
      toast.success("Contraseña copiada al portapapeles", {
        duration: 2000,
      });
    });
  };

  const handleGenerate = () => {
    const values = form.getValues();
    const newPassword = generatePassword(values);
    setPassword(newPassword);
    toast.success("Nueva contraseña generada", {
      duration: 2000,
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <header className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-700">
          Generador de contraseñas
        </h1>
        <p className="text-gray-600">
          Crea una contraseña segura y fácil de recordar con nuestro generador
          de contraseñas. Simplemente haz clic en el botón para generar una
          nueva contraseña.
        </p>
      </header>

      <Card className="bg-gradient-to-r from-gray-900 to-gray-800">
        <CardContent className="flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-sm text-slate-400 mb-1">
              tu contraseña generada:
            </p>
            <p className="text-xl font-mono break-all text-green-400 leading-relaxed">
              {password}
            </p>
          </div>
          <Button
            onClick={handleCopyPassword}
            className="shrink-0 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-all duration-300 hover:scale-105"
          >
            <CopyIcon />
          </Button>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Configura tus opciones de contraseña:
          </h2>
          <Form {...form}>
            <form
              className="space-y-6"
              onSubmit={form.handleSubmit(handleGenerate)}
            >
              <FormField
                control={form.control}
                name="length"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Longitud de la contraseña
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={8}
                        max={128}
                        {...field}
                        className="text-center text-lg font-semibold h-12"
                      />
                    </FormControl>
                    <FormDescription>
                      Selecciona la longitud de tu contraseña (entre 8 y 128
                      caracteres).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-3">
                <h3 className="text-sm text-gray-700">Incluir caracteres: </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {options.map(({ value, label, icon }) => (
                    <FormField
                      key={value}
                      control={form.control}
                      name={value}
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <span>{icon}</span>
                          <FormLabel className="text-sm font-medium text-gray-700">
                            {label}
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                <Button
                  type="submit"
                  className="w-full text-white px-4 py-2 rounded-md transition-all duration-300 hover:scale-105"
                >
                  <ShieldCheck />
                  Generar nueva contraseña
                </Button>
                <FormSavePassword
                  password={password}
                  passwordConfig={form.getValues()}
                />
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormCreatePassword;
