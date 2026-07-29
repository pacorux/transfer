import { Wifi, Shield, Bug, Infinity, Smartphone } from "lucide-react";

export const faqs = [
  {
    icon: Wifi,
    title: "¿Qué es Transfer?",
    content:
      "Transfer es una aplicación web para enviar archivos en tiempo real de forma directa.",
  },
  {
    icon: Smartphone,
    title: "¿Cómo funciona?",
    content:
      "Utiliza WebRTC para crear una conexión directa entre dispositivos. Primero se identifican mediante un código usando un servidor de señalización. Una vez conectados, la transferencia es completamente directa y sin intermediarios.",
  },
  {
    icon: Shield,
    title: "¿Es seguro?",
    content:
      "Sí. La transferencia de archivos es cifrada, directa y nunca pasa por servidores externos. En caso de que los dispositivos esten conectados a la misma red local los datos nunca salen de esta, manteniendo tus datos bajo tu control.",
  },
  {
    icon: Infinity,
    title: "¿Hay límite de tamaño?",
    content:
      "No. Al tratarse de una transferencia directa, el único límite es el espacio disponible en tus dispositivos.",
  },
  {
    icon: Bug,
    title: "¿Por qué no funciona?",
    content:
      "Es posible que tu navegador o alguna extensión esté bloqueando WebRTC. Algunas herramientas de privacidad, como uBlock Origin, o navegadores con configuraciones muy restrictivas pueden impedir la conexión. Si ocurre, prueba con otro navegador o desactiva temporalmente esas extensiones.",
  },
];
