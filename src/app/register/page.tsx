"use client";
import Image from "next/image";
import img from "../../../public/img.png";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "../api/service/api";

export default function Register() {
  const [errors, setErrors] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const validateForm = () => {
    const newErrors: string[] = [];
    if (!name) newErrors.push("Nome é obrigatório.");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) newErrors.push("Email inválido.");
    return newErrors.length === 0;
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors([]);

    try {
      await registerUser(name, email, password);
      router.push("/login");
    } catch (error: any) {
      setErrors([error.message]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="text-[#333] bg-white">
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full p-4 m-4 shadow-lg rounded-md">
          <div className="md:max-w-md w-full sm:px-6 py-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-12">
                <h3 className="text-3xl font-extrabold">Signup</h3>
                <p className="text-sm mt-4 ">
                  Já possui uma conta?{" "}
                  <a
                    href="/login"
                    className="register text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap"
                  >
                    Fazer login
                  </a>
                </p>
              </div>
              {Array.isArray(errors) && errors.length > 0 && (
                <div className="mb-4">
                  {errors.map((error, index) => (
                    <p key={index} className="text-red-500">
                      {error}
                    </p>
                  ))}
                </div>
              )}
              <div>
                <label className="text-xs block mb-2">Nome</label>
                <div className="relative flex items-center">
                  <input
                    name="Name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-sm border border-gray-300 focus:border-[#333] px-2 py-3 outline-none"
                    placeholder="Nome"
                  />
                </div>
              </div>

              <div className="mt-8">
                <label className="text-xs block mb-2">Email</label>
                <div className="relative flex items-center">
                  <input
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-sm border border-gray-300 focus:border-[#333] px-2 py-3 outline-none"
                    placeholder="Email"
                  />
                </div>
              </div>
              <div className="mt-8">
                <label className="text-xs block mb-2">Password</label>
                <div className="relative flex items-center">
                  <input
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full text-sm border border-gray-300 focus:border-[#333] px-2 py-3 outline-none"
                    placeholder="Password"
                  />
                </div>
              </div>
              <div className="mt-12">
                <button
                  type="submit"
                  className="button w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white hover:bg-orange-500 focus:outline-none"
                  disabled={isLoading}
                >
                  {isLoading ? "Carregando..." : "Criar conta"}
                </button>
              </div>
            </form>
          </div>

          <div className="md:h-full text-white max-md:mt-10 bg-[#FF8225] rounded-xl lg:p-12 p-8">
            <h1 className="text-4xl">Gerenciador de Tarefas</h1>
            <p>Faça login para acessar sua conta</p>
            <Image
              src={img}
              priority={true}
              width={470}
              height={470}
              alt="Logo Login"
              unoptimized
            ></Image>
            <p className="text-right">Jack Experts</p>
          </div>
        </div>
      </div>
    </div>
  );
}
