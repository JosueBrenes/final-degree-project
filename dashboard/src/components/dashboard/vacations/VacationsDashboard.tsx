"use client";

import type React from "react";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  Clock,
  Info,
  Plus,
  Edit,
  X,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTheme } from "next-themes";

export default function VacationRequest() {
  const { theme } = useTheme();

  // Estado para el saldo de vacaciones
  const [vacationBalance, setVacationBalance] = useState(15);
  const [pendingDays, setPendingDays] = useState(5);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [requestSent, setRequestSent] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdjustmentModalOpen, setIsAdjustmentModalOpen] = useState(false);
  const [adjustmentReason, setAdjustmentReason] = useState("");
  const [adjustmentDays, setAdjustmentDays] = useState("");
  const [adjustmentType, setAdjustmentType] = useState("add");
  const [adjustmentSent, setAdjustmentSent] = useState(false);
  const [showAdjustmentNotification, setShowAdjustmentNotification] =
    useState(false);

  // Calcular días solicitados
  const calculateRequestedDays = () => {
    if (!startDate || !endDate) return 0;

    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    return diffDays;
  };

  const requestedDays = calculateRequestedDays();
  const isLowBalance = vacationBalance < 5;
  const isValidRequest =
    startDate && endDate && reason && requestedDays <= vacationBalance;
  const isValidAdjustment =
    adjustmentReason && adjustmentDays && !isNaN(Number(adjustmentDays));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValidRequest) {
      // Simular envío de solicitud
      setRequestSent(true);

      // Resetear el formulario después de 3 segundos
      setTimeout(() => {
        setStartDate("");
        setEndDate("");
        setReason("");
        setRequestSent(false);
        setIsModalOpen(false);
      }, 3000);
    }
  };

  const handleAdjustmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValidAdjustment) {
      // Simular envío de solicitud de ajuste
      setAdjustmentSent(true);

      // Simular aprobación automática después de 3 segundos (en un caso real, esto lo haría el administrador)
      setTimeout(() => {
        setAdjustmentSent(false);
        setIsAdjustmentModalOpen(false);
        setAdjustmentReason("");
        setAdjustmentDays("");

        // Mostrar notificación de ajuste aprobado
        setShowAdjustmentNotification(true);

        // Actualizar saldo (simulación de aprobación)
        if (adjustmentType === "add") {
          setVacationBalance((prev) => prev + Number(adjustmentDays));
        } else {
          setVacationBalance((prev) =>
            Math.max(0, prev - Number(adjustmentDays))
          );
        }

        // Ocultar notificación después de 5 segundos
        setTimeout(() => {
          setShowAdjustmentNotification(false);
        }, 5000);
      }, 3000);
    }
  };

  return (
    <div className="space-y-6">
      {showAdjustmentNotification && (
        <Alert className="bg-background border-green-500 text-foreground">
          <AlertTitle className="font-semibold">
            Ajuste de saldo aprobado
          </AlertTitle>
          <AlertDescription>
            Tu solicitud de ajuste ha sido aprobada. Tu saldo de vacaciones ha
            sido actualizado.
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Mi Saldo de Vacaciones</CardTitle>
              <CardDescription>
                Consulta tu saldo actual y solicita tus días de descanso
              </CardDescription>
            </div>
            <Dialog
              open={isAdjustmentModalOpen}
              onOpenChange={setIsAdjustmentModalOpen}
            >
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 self-start sm:self-auto"
                >
                  <Edit className="h-4 w-4" />
                  <span className="sm:inline">Solicitar Ajuste</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="dark:bg-[#1a1a1a] dark:text-white dark:border-gray-800 max-w-[95vw] sm:max-w-[500px]">
                <DialogHeader>
                  <div className="flex justify-between items-center">
                    <DialogTitle className="dark:text-white">
                      Solicitar Ajuste de Saldo
                    </DialogTitle>
                    <Button
                      variant="ghost"
                      className="h-6 w-6 p-0 dark:text-gray-400 dark:hover:text-white"
                      onClick={() => setIsAdjustmentModalOpen(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <DialogDescription className="dark:text-gray-400">
                    Si detectas un error en tu saldo de vacaciones, puedes
                    solicitar un ajuste
                  </DialogDescription>
                </DialogHeader>

                {adjustmentSent ? (
                  <Alert className="dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-100 bg-blue-50 border-blue-200">
                    <Info className="h-4 w-4 dark:text-blue-400 text-blue-500" />
                    <AlertTitle>Solicitud enviada</AlertTitle>
                    <AlertDescription>
                      Tu solicitud de ajuste ha sido enviada y está pendiente de
                      revisión por parte del administrador.
                    </AlertDescription>
                  </Alert>
                ) : (
                  <form className="space-y-4" onSubmit={handleAdjustmentSubmit}>
                    <div className="space-y-2">
                      <Label
                        htmlFor="adjustment-type"
                        className="dark:text-gray-200"
                      >
                        Tipo de Ajuste
                      </Label>
                      <Select
                        value={adjustmentType}
                        onValueChange={setAdjustmentType}
                      >
                        <SelectTrigger
                          id="adjustment-type"
                          className="dark:bg-[#2a2a2a] dark:border-gray-700 dark:text-white"
                        >
                          <SelectValue placeholder="Seleccionar tipo de ajuste" />
                        </SelectTrigger>
                        <SelectContent className="dark:bg-[#2a2a2a] dark:border-gray-700">
                          <SelectItem
                            value="add"
                            className="dark:text-white dark:hover:bg-gray-700"
                          >
                            Agregar días
                          </SelectItem>
                          <SelectItem
                            value="subtract"
                            className="dark:text-white dark:hover:bg-gray-700"
                          >
                            Restar días
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="adjustment-days"
                        className="dark:text-gray-200"
                      >
                        Cantidad de Días
                      </Label>
                      <Input
                        type="number"
                        id="adjustment-days"
                        value={adjustmentDays}
                        onChange={(e) => setAdjustmentDays(e.target.value)}
                        min="1"
                        required
                        className="dark:bg-[#2a2a2a] dark:border-gray-700 dark:text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="adjustment-reason"
                        className="dark:text-gray-200"
                      >
                        Motivo del Ajuste
                      </Label>
                      <Textarea
                        id="adjustment-reason"
                        placeholder="Explica por qué solicitas este ajuste"
                        rows={4}
                        value={adjustmentReason}
                        onChange={(e) => setAdjustmentReason(e.target.value)}
                        required
                        className="dark:bg-[#2a2a2a] dark:border-gray-700 dark:text-white resize-none"
                      />
                    </div>

                    <Alert className="dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-100 bg-blue-50 border-blue-200">
                      <AlertDescription>
                        Esta solicitud será revisada por el administrador.
                        Recibirás una notificación cuando sea procesada.
                      </AlertDescription>
                    </Alert>

                    <DialogFooter className="gap-2 flex-col sm:flex-row">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsAdjustmentModalOpen(false)}
                        className="dark:bg-transparent dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                      >
                        Cancelar
                      </Button>
                      <Button
                        type="submit"
                        disabled={!isValidAdjustment}
                        className="dark:bg-blue-600 dark:text-white dark:hover:bg-blue-700"
                      >
                        Enviar Solicitud
                      </Button>
                    </DialogFooter>
                  </form>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Días disponibles:</span>
                <span className="text-2xl font-bold">{vacationBalance}</span>
              </div>

              <Progress value={(vacationBalance / 30) * 100} className="h-2" />

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>0 días</span>
                <span>30 días</span>
              </div>

              {pendingDays > 0 && (
                <div className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400">
                  <Clock className="h-4 w-4" />
                  <span>{pendingDays} días en solicitudes pendientes</span>
                </div>
              )}

              {isLowBalance && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Saldo bajo</AlertTitle>
                  <AlertDescription>
                    Tu saldo de vacaciones está por agotarse. Te quedan solo{" "}
                    {vacationBalance} días disponibles.
                  </AlertDescription>
                </Alert>
              )}
            </div>

            <div className="space-y-4">
              <div className="rounded-lg border p-3">
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  <Info className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                  Información
                </h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>
                    • Tu saldo se actualiza automáticamente al aprobarse
                    solicitudes
                  </li>
                  <li>• Puedes cancelar solicitudes pendientes</li>
                  <li>
                    • Recibirás notificaciones sobre el estado de tus
                    solicitudes
                  </li>
                  <li>
                    • Si detectas un error en tu saldo, puedes solicitar un
                    ajuste
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border p-3 bg-muted/50">
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-green-500 dark:text-green-400" />
                  Próximo aumento
                </h3>
                <p className="text-sm text-muted-foreground">
                  Tu próximo aumento de días de vacaciones será el 15/06/2024
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="solicitudes" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="solicitudes">Mis Solicitudes</TabsTrigger>
          <TabsTrigger value="ajustes">Ajustes de Saldo</TabsTrigger>
          <TabsTrigger value="historial">Historial</TabsTrigger>
        </TabsList>

        <TabsContent value="solicitudes" className="mt-4">
          <Card>
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 pb-2">
              <div>
                <CardTitle>Mis Solicitudes de Vacaciones</CardTitle>
                <CardDescription>
                  Historial de tus solicitudes de vacaciones
                </CardDescription>
              </div>
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2 self-start sm:self-auto">
                    <Plus className="h-4 w-4" />
                    <span className="sm:inline">Nueva Solicitud</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-[95vw] sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Solicitar Vacaciones</DialogTitle>
                    <DialogDescription>
                      Completa el formulario para enviar tu solicitud de
                      vacaciones
                    </DialogDescription>
                  </DialogHeader>

                  {requestSent ? (
                    <Alert className="bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800 dark:text-green-100">
                      <CheckCircle className="h-4 w-4 text-green-500 dark:text-green-400" />
                      <AlertTitle>Solicitud enviada</AlertTitle>
                      <AlertDescription>
                        Tu solicitud ha sido enviada correctamente y está
                        pendiente de aprobación.
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <form className="space-y-4" onSubmit={handleSubmit}>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="start-date-modal">
                            Fecha de Inicio
                          </Label>
                          <Input
                            type="date"
                            id="start-date-modal"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            required
                            className="dark:bg-[#2a2a2a] dark:border-gray-700 dark:text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="end-date-modal">Fecha de Fin</Label>
                          <Input
                            type="date"
                            id="end-date-modal"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            required
                            className="dark:bg-[#2a2a2a] dark:border-gray-700 dark:text-white"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="reason-modal">Motivo</Label>
                        <Textarea
                          id="reason-modal"
                          placeholder="Escriba el motivo de la solicitud"
                          rows={4}
                          value={reason}
                          onChange={(e) => setReason(e.target.value)}
                          required
                          className="dark:bg-[#2a2a2a] dark:border-gray-700 dark:text-white resize-none"
                        />
                      </div>

                      {requestedDays > 0 && (
                        <Alert
                          className={
                            requestedDays > vacationBalance
                              ? "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800 dark:text-red-100"
                              : "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-100"
                          }
                        >
                          <Info
                            className={`h-4 w-4 ${
                              requestedDays > vacationBalance
                                ? "text-red-500 dark:text-red-400"
                                : "text-blue-500 dark:text-blue-400"
                            }`}
                          />
                          <AlertTitle>
                            Días solicitados: {requestedDays}
                          </AlertTitle>
                          <AlertDescription>
                            {requestedDays > vacationBalance
                              ? `No tienes suficiente saldo para esta solicitud. Te faltan ${
                                  requestedDays - vacationBalance
                                } días.`
                              : `Después de esta solicitud te quedarán ${
                                  vacationBalance - requestedDays
                                } días disponibles.`}
                          </AlertDescription>
                        </Alert>
                      )}

                      <DialogFooter className="flex-col sm:flex-row gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setIsModalOpen(false)}
                          className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                        >
                          Cancelar
                        </Button>
                        <Button
                          type="submit"
                          disabled={!isValidRequest}
                          className="dark:bg-blue-600 dark:text-white dark:hover:bg-blue-700"
                        >
                          Enviar Solicitud
                        </Button>
                      </DialogFooter>
                    </form>
                  )}
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent className="overflow-auto">
              <div className="w-full overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID Solicitud</TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Fecha Inicio
                      </TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Fecha Fin
                      </TableHead>
                      <TableHead>Días</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>VAC-001</TableCell>
                      <TableCell className="hidden sm:table-cell">
                        10/01/2024
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        20/01/2024
                      </TableCell>
                      <TableCell>11</TableCell>
                      <TableCell>
                        <Badge className="bg-amber-500 dark:bg-amber-600">
                          Pendiente
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          Cancelar
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>VAC-002</TableCell>
                      <TableCell className="hidden sm:table-cell">
                        01/02/2024
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        10/02/2024
                      </TableCell>
                      <TableCell>10</TableCell>
                      <TableCell>
                        <Badge className="bg-green-500 dark:bg-green-600">
                          Aprobado
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" disabled>
                          Ver
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>VAC-003</TableCell>
                      <TableCell className="hidden sm:table-cell">
                        01/03/2024
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        10/03/2024
                      </TableCell>
                      <TableCell>10</TableCell>
                      <TableCell>
                        <Badge variant="destructive">Rechazado</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          Ver Motivo
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ajustes" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Ajustes de Saldo</CardTitle>
              <CardDescription>
                Solicitudes de ajuste de saldo de vacaciones
              </CardDescription>
            </CardHeader>
            <CardContent className="overflow-auto">
              <div className="w-full overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID Solicitud</TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Fecha
                      </TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Días</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>ADJ-001</TableCell>
                      <TableCell className="hidden sm:table-cell">
                        05/03/2024
                      </TableCell>
                      <TableCell>Agregar</TableCell>
                      <TableCell>3</TableCell>
                      <TableCell>
                        <Badge className="bg-green-500 dark:bg-green-600">
                          Aprobado
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          Ver Detalles
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>ADJ-002</TableCell>
                      <TableCell className="hidden sm:table-cell">
                        15/03/2024
                      </TableCell>
                      <TableCell>Restar</TableCell>
                      <TableCell>2</TableCell>
                      <TableCell>
                        <Badge className="bg-amber-500 dark:bg-amber-600">
                          Pendiente
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          Cancelar
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="text-sm text-muted-foreground">
                Las solicitudes de ajuste son revisadas por el administrador
              </div>
              <Dialog
                open={isAdjustmentModalOpen}
                onOpenChange={setIsAdjustmentModalOpen}
              >
                <DialogTrigger asChild>
                  <Button size="sm" className="self-start sm:self-auto">
                    <Plus className="h-4 w-4 mr-2" />
                    Nuevo Ajuste
                  </Button>
                </DialogTrigger>
              </Dialog>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="historial" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Historial de Vacaciones</CardTitle>
              <CardDescription>
                Registro histórico de vacaciones tomadas y ajustes realizados
              </CardDescription>
            </CardHeader>
            <CardContent className="overflow-auto">
              <div className="w-full overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="hidden sm:table-cell">
                        Fecha
                      </TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Descripción
                      </TableHead>
                      <TableHead>Días</TableHead>
                      <TableHead>Saldo Resultante</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="hidden sm:table-cell">
                        01/01/2024
                      </TableCell>
                      <TableCell>Asignación Anual</TableCell>
                      <TableCell className="hidden sm:table-cell">
                        Asignación de vacaciones anual
                      </TableCell>
                      <TableCell>+15</TableCell>
                      <TableCell>15</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="hidden sm:table-cell">
                        10/02/2024
                      </TableCell>
                      <TableCell>Vacaciones</TableCell>
                      <TableCell className="hidden sm:table-cell">
                        Vacaciones de febrero
                      </TableCell>
                      <TableCell>-10</TableCell>
                      <TableCell>5</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="hidden sm:table-cell">
                        05/03/2024
                      </TableCell>
                      <TableCell>Ajuste</TableCell>
                      <TableCell className="hidden sm:table-cell">
                        Ajuste por días trabajados en vacaciones
                      </TableCell>
                      <TableCell>+3</TableCell>
                      <TableCell>8</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="hidden sm:table-cell">
                        01/04/2024
                      </TableCell>
                      <TableCell>Bonificación</TableCell>
                      <TableCell className="hidden sm:table-cell">
                        Bonificación por antigüedad
                      </TableCell>
                      <TableCell>+7</TableCell>
                      <TableCell>15</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
