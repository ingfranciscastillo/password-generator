"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { generatePassword } from "@/lib/password";
import { CopyIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const FormCreatePassword = () => {
  const [password, setPassword] = useState("");

  useEffect(() => {
    const generatedPassword = generatePassword();
    setPassword(generatedPassword);
  }, []);

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(password).then(() => {
      toast.success("Contraseña copiada al portapapeles", {
        duration: 2000,
      });
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
              {password || "Haz clic en el botón para generar una contraseña"}
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
    </div>
  );
};

export default FormCreatePassword;
