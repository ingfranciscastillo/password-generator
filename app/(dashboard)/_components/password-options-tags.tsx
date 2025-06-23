import { Badge } from "@/components/ui/badge";
import { PasswordOptions } from "@/lib/password";

interface Props {
  passwordConfig: PasswordOptions;
}

const PasswordOptionsTags = ({ passwordConfig }: Props) => {
  return (
    <div className="flex flex-wrap gap-2">
      {[
        {
          condition: passwordConfig.hasLowercase,
          label: "Minúsculas",
        },
        {
          condition: passwordConfig.hasUppercase,
          label: "Mayusculas",
        },
        {
          condition: passwordConfig.hasNumbers,
          label: "Numeros",
        },
        {
          condition: passwordConfig.hasSpecialChars,
          label: "Simbolos",
        },
      ]
        .filter((item) => item.condition)
        .map((item, index) => (
          <Badge key={index}> {item.label} </Badge>
        ))}
    </div>
  );
};

export default PasswordOptionsTags;
