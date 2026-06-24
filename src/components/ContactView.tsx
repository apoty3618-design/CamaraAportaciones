/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Mail, Clock, ShieldCheck, MapPin, CheckCircle, Send, FileText } from 'lucide-react';
import { motion } from 'motion/react';
import { ContactMessage } from '../types';

interface ContactViewProps {
  onSubmitMessage: (name: string, email: string, message: string) => void;
  receivedMessages: ContactMessage[];
}

export default function ContactView({
  onSubmitMessage,
  receivedMessages,
}: ContactViewProps) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [success, setSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setLoading(true);
    setTimeout(() => {
      onSubmitMessage(name, email, message);
      setLoading(false);
      setSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
      setTimeout(() => setSuccess(false), 5000);
    }, 1000);
  };

  return (
    <div className="space-y-16 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fadeIn">
      {/* View Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-mono uppercase tracking-widest text-sky-700 font-bold px-3 py-1 bg-sky-100 rounded-full">
          Canal Directo
        </span>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 font-sans">
          Contactanos
        </h1>
        <p className="text-slate-500 text-base leading-relaxed">
          Si tienes equipo que busques donar es buen momento que nos puedas contactar para ayuda a los estudiantes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
        {/* Contact Info Cards */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/85 backdrop-blur-sm border border-white/70 rounded-2xl p-6 space-y-4 shadow-sm shadow-sky-900/5">
            <div className="h-10 w-10 bg-sky-100 text-sky-700 rounded-xl flex items-center justify-center">
              <Clock className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-slate-950">Atención Dinámica</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Nuestros voluntarios responden consultas financieras en menos de 2 horas. Atendemos de lunes a domingo.
              </p>
            </div>
          </div>

          <div className="bg-white/85 backdrop-blur-sm border border-white/70 rounded-2xl p-6 space-y-4 shadow-sm shadow-sky-900/5">
            <div className="h-10 w-10 bg-sky-100 text-sky-700 rounded-xl flex items-center justify-center">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-slate-950">Canal Seguro</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Toda la correspondencia sobre auditorías e inconsistencias de proveedores se procesa con máxima prioridad y seguridad.
              </p>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 space-y-4 shadow-sm shadow-amber-900/5">
            <div className="h-10 w-10 bg-amber-100 text-amber-700 rounded-xl flex items-center justify-center">
              <MapPin className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-slate-950">Sede Operativa</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Oficinas de coordinación en Tegucigalpa, Honduras. Proyectos activos en zonas rurales de Intibucá, Lempira y Copán.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form Screen */}
        <div className="lg:col-span-3">
          <div className="bg-white/85 backdrop-blur-sm border border-white/70 rounded-3xl p-8 sm:p-10 shadow-sm shadow-sky-900/5 space-y-8">
            <h3 className="text-xl font-bold text-slate-900">Formulario de Contacto</h3>

            {success ? (
              <div className="bg-sky-50 border border-sky-100 rounded-2xl p-8 text-center space-y-3.5 flex flex-col items-center">
                <CheckCircle className="h-12 w-12 text-sky-600" />
                <h4 className="font-bold text-sky-950">¡Mensaje enviado con éxito!</h4>
                <p className="text-xs text-sky-800 max-w-xs leading-relaxed">
                  Gracias por tu mensaje. El hash de tu correspondencia ha sido registrado y un voluntario se pondrá en contacto contigo enseguida.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-2 font-bold">Nombre Completo</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="p. ej. María José Reyes"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-2 font-bold">Correo Electrónico</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@correo.com"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-2 font-bold">Mensaje / Consulta</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe en detalle tus consultas sobre los presupuestos o proyectos..."
                    className="w-full bg-slate-50 border border-slate-200 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-sky-700 hover:bg-sky-800 active:bg-sky-900 text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest font-mono transition-all inline-flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
                >
                  {loading ? (
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Enviar Mensaje</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Render received messages in local state so developers/users can verify live */}
          {receivedMessages.length > 0 && (
            <div className="mt-8 bg-slate-50 border border-slate-100 rounded-3xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-sky-600" />
                <h4 className="font-bold text-slate-900 text-sm font-sans">Bandeja de Entrada In-Memory (Tus mensajes)</h4>
              </div>
              <div className="space-y-3.5 max-h-60 overflow-y-auto">
                {receivedMessages.map((msg) => (
                  <div key={msg.id} className="bg-white rounded-xl p-4 border border-slate-100 space-y-1">
                    <div className="flex justify-between text-[10px] font-mono text-slate-400">
                      <span className="font-bold text-slate-700">{msg.name} ({msg.email})</span>
                      <span>{msg.date}</span>
                    </div>
                    <p className="text-xs text-slate-600 italic">
                      &ldquo;{msg.message}&rdquo;
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
