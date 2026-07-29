import { Wifi, Shield, Bug, Infinity, Smartphone } from "lucide-react";

export const faqs = [
  {
    icon: Wifi,
    title: "¿Qué es Transfer?",
    content:
      "Transfer es una aplicación web para enviar archivos entre dispositivos conectados a la misma red. La transferencia se realiza directamente entre ellos, sin subir tus archivos a servidores externos.",
  },
  {
    icon: Smartphone,
    title: "¿Cómo funciona?",
    content:
      "Utiliza WebRTC para crear una conexión directa entre dispositivos. Primero se identifican mediante un código usando un servidor de señalización. Una vez conectados, la transferencia es completamente directa y local, sin intermediarios.",
  },
  {
    icon: Shield,
    title: "¿Es seguro?",
    content:
      "Sí. Tus archivos nunca pasan por servidores externos. La transferencia se realiza directamente entre tus dispositivos dentro de la red local, manteniendo tus datos bajo tu control.",
  },
  {
    icon: Infinity,
    title: "¿Hay límite de tamaño?",
    content:
      "No. Al tratarse de una transferencia local, el único límite práctico es el espacio disponible en tus dispositivos.",
  },
  {
    icon: Bug,
    title: "¿Por qué no funciona?",
    content:
      "Es posible que tu navegador o alguna extensión esté bloqueando WebRTC. Algunas herramientas de privacidad, como uBlock Origin, o navegadores con configuraciones muy restrictivas pueden impedir la conexión. Si ocurre, prueba con otro navegador o desactiva temporalmente esas extensiones.",
  },
  {
    icon: Shield,
    title: "No aparece mi dispositivo",
    content:
      "Comprueba que ambos dispositivos estén conectados a la misma red Wi-Fi o por cable. Si alguno utiliza datos móviles, una VPN o está en otra red, no podrá detectarse.",
  },
];
