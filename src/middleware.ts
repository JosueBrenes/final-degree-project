import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const accessByRole: Record<string, string[]> = {
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

export function middleware(req: NextRequest) {
  const token = req.cookies.get("authToken")?.value;
  const role = req.cookies.get("userRole")?.value || "operators";

  const pathname = req.nextUrl.pathname;

  if (pathname === "/") {
    return NextResponse.next();
  }

  if (!token && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  const segments = pathname.split("/").filter(Boolean);
  const moduleKey = segments[1] || "dashboard";

  const allowedModules = accessByRole[role] || [];

  if (!allowedModules.includes(moduleKey)) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
