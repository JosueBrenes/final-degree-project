"use client";

import { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  Home,
  FileText,
  User,
  Warehouse,
  ClipboardList,
  BarChart2,
  Smile,
  Umbrella,
  DollarSign,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const icons = {
  Home,
  FileText,
  User,
  Warehouse,
  ClipboardList,
  BarChart2,
  Smile,
  Umbrella,
  DollarSign,
};

// 🔹 Mapeo de roles a rutas permitidas
const accessByRole = {
  "general-manager": [
    "dashboard",
    "quotes",
    "inventory",
    "employees",
    "accounting",
    "payroll",
    "reports",
    "vacations",
  ],
  "admin-financial-manager": [
    "dashboard",
    "quotes",
    "accounting",
    "payroll",
    "reports",
    "vacations",
  ],
  "operations-manager": [
    "dashboard",
    "inventory",
    "employees",
    "reports",
    "vacations",
  ],
  "plant-manager": ["dashboard", "inventory", "employees", "vacations"],
  "admin-assistant": ["dashboard", "employees", "vacations"],
  "warehouse-staff": ["dashboard", "inventory", "vacations"],
  operators: ["dashboard", "vacations"],
};

const availableRoutes = [
  { path: "/dashboard", label: "Panel", icon: "Home", key: "dashboard" },
  {
    path: "/dashboard/quotes",
    label: "Cotizaciones",
    icon: "FileText",
    key: "quotes",
  },
  {
    path: "/dashboard/inventory",
    label: "Inventario",
    icon: "Warehouse",
    key: "inventory",
  },
  {
    path: "/dashboard/employees",
    label: "Empleados",
    icon: "User",
    key: "employees",
  },
  {
    path: "/dashboard/accounting",
    label: "Contabilidad",
    icon: "DollarSign",
    key: "accounting",
  },
  {
    path: "/dashboard/payroll",
    label: "Nómina",
    icon: "FileText",
    key: "payroll",
  },
  {
    path: "/dashboard/reports",
    label: "Reportes",
    icon: "BarChart2",
    key: "reports",
  },
  {
    path: "/dashboard/vacations",
    label: "Vacaciones",
    icon: "Umbrella",
    key: "vacations",
  },
];

export function DashboardSidebar() {
  const [userData, setUserData] = useState<{
    nombre: string;
    posicion: keyof typeof accessByRole;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("🔥 Usuario autenticado:", user.uid);
        await fetchUserData(user.uid);
      } else {
        setUserData(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchUserData = async (uid: string) => {
    try {
      console.log("🔍 Buscando usuario en 'users' con UID:", uid);
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        console.warn("❌ No se encontró el usuario en Firestore.");
        setLoading(false);
        return;
      }

      const userData = userSnap.data();
      const cedula = userData.cedula;
      console.log("✅ Cédula obtenida:", cedula);

      // 🔹 Segundo paso: buscar al empleado en 'employees' por cédula
      console.log("🔍 Buscando empleado en 'employees' con cédula:", cedula);
      const employeeRef = doc(db, "employees", cedula);
      const employeeSnap = await getDoc(employeeRef);

      if (!employeeSnap.exists()) {
        console.warn("❌ No se encontró la información del empleado.");
        setLoading(false);
        return;
      }

      const employeeData = employeeSnap.data();
      const rawPosicion = employeeData.posicion || "operators";

      let formattedPosicion = accessByRole[rawPosicion]
        ? (rawPosicion as keyof typeof accessByRole)
        : "operators";

      console.log("✅ Posición asignada:", formattedPosicion);

      setUserData({
        nombre: employeeData.nombre || "Usuario",
        posicion: formattedPosicion,
      });

      console.log("✅ Datos obtenidos:", {
        nombre: employeeData.nombre,
        posicion: formattedPosicion,
      });
    } catch (error) {
      console.error("❌ Error al obtener datos del usuario:", error);
    } finally {
      setLoading(false);
    }
  };

  const userRoutes = userData?.posicion
    ? accessByRole[userData.posicion] || []
    : [];

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <div className="flex items-center gap-2">
                <Image
                  src="/img/logo_2.png"
                  alt="Logo"
                  width={24}
                  height={24}
                  priority
                />
                <span className="font-semibold">Arce & Vargas</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegación</SidebarGroupLabel>
          <SidebarGroupContent>
            {loading ? (
              <p className="text-center text-sm text-muted-foreground p-4">
                Cargando...
              </p>
            ) : userRoutes.length > 0 ? (
              <SidebarMenu>
                {availableRoutes
                  .filter(({ key }) => userRoutes.includes(key))
                  .map(({ path, label, icon }) => {
                    const IconComponent = icons[icon];
                    return (
                      <SidebarMenuItem key={path}>
                        <SidebarMenuButton asChild>
                          <Link href={path}>
                            <IconComponent className="mr-2 h-4 w-4" />
                            {label}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
              </SidebarMenu>
            ) : (
              <p className="text-center text-sm text-muted-foreground p-4">
                No tienes acceso a ningún módulo.
              </p>
            )}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/dashboard/profile">
              <SidebarMenuButton size="lg" asChild>
                <span className="text-sm font-medium">
                  {loading ? "Cargando..." : userData?.nombre || "Usuario"}
                </span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
