import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { MyJwtPayload } from "next-auth";

export default function Navbar() {
  const { data: session } = useSession();
  const route = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Controla o estado do menu
  const decodedToken = session?.user?.access_token
    ? jwtDecode<MyJwtPayload>(session.user.access_token)
    : null;

  async function logout() {
    await signOut({
      redirect: false,
    });
    route.replace("/");
  }

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <nav className="bg-[#FF8225] border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <span className="self-center text-2xl font-semibold whitespace-nowrap">
          Gerenciador de Tarefas
        </span>

        <button
          data-collapse-toggle="navbar-default"
          type="button"
          onClick={toggleMenu}
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden focus:outline-none focus:ring-2 dark:text-white"
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`w-full md:block md:w-auto ${
            isMenuOpen ? "block" : "hidden"
          }`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
            <p className="font-semibold hover:text-white">
              Olá, {decodedToken?.name}
            </p>
            <li>
              <button
                onClick={logout}
                className="font-semibold block py-2 px-3 rounded text-white md:hover:bg-transparent md:border-0 md:hover:text-white-700 md:p-0"
              >
                Sair
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
