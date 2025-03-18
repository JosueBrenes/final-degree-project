"use client";

import { useRouter } from "next/navigation";
import ThemeToggle from "@/layouts/ThemeToggle";

export default function DashboardPage() {
  const router = useRouter();

  return (
    <div className="h-screen flex flex-col">
      <header className="flex justify-between items-center p-6 bg-white dark:bg-background text-black dark:text-gray-100 shadow-md">
        <ThemeToggle />
        <button
          className="text-white bg-gradient-to-br from-blue-600 to-blue-800 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          onClick={() => router.push("/auth/login")}
        >
          Iniciar Sesión
        </button>
      </header>
      <main className=" p-8 md:p-8 flex-1 flex flex-col sm:flex-row justify-center items-center bg-white dark:bg-background text-black dark:text-gray-100 gap-16 md:px-20 lg:px-32 xl:px-48">
        <h1 className="text-4xl md:text-6xl font-bold text-center md:text-left text-black dark:text-gray-100 leading-tight">
          Arce y Vargas <br /> Mantenimiento Industrial
        </h1>
        <hr className="hidden md:block bg-gray-300 dark:bg-gray-600 w-0.5 h-96" />
        <p className="text-lg md:text-xl md:w-1/2 text-gray-700 dark:text-gray-300 leading-relaxed text-center md:text-left">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700 font-bold">
            Arce y Vargas es una empresa líder en mantenimiento industrial
          </span>{" "}
          dedicada a ofrecer soluciones integrales para el mantenimiento y
          optimización de procesos industriales. Nuestro equipo de expertos
          trabaja con <strong>compromiso</strong> y{" "}
          <strong>profesionalismo</strong>
          para garantizar la eficiencia y seguridad en todas nuestras
          operaciones.
        </p>
      </main>
    </div>
  );
}
