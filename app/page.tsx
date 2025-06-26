import Image from "next/image";
import FormCreatePassword from "./(dashboard)/_components/form-create-password";
import PasswordList from "./(dashboard)/_components/password-list";

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <FormCreatePassword />
      <PasswordList />
    </div>
  );
}
