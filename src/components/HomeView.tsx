/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Currency, FinancialTransaction } from '../types';
import { SPONSORS } from '../data';
import { 
  ArrowRight, 
  Cpu, 
  Tablet, 
  Server, 
  ShieldCheck, 
  Users, 
  TrendingUp, 
  Send,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { motion } from 'motion/react';

interface HomeViewProps {
  currency: Currency;
  setCurrentTab: (tab: string) => void;
  onOpenDonate: () => void;
  transactions: FinancialTransaction[];
  onSubmitMessage: (name: string, email: string, message: string) => void;
}

export default function HomeView({
  currency,
  setCurrentTab,
  onOpenDonate,
  transactions,
  onSubmitMessage,
}: HomeViewProps) {
  const [formName, setFormName] = React.useState('');
  const [formEmail, setFormEmail] = React.useState('');
  const [formMsg, setFormMsg] = React.useState('');
  const [formSuccess, setFormSuccess] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const formatValue = (val: number) => {
    if (currency === 'USD') {
      return `$${val.toLocaleString()}`;
    }
    return `L ${val.toLocaleString()}`;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formMsg) return;

    setIsSubmitting(true);
    setTimeout(() => {
      onSubmitMessage(formName, formEmail, formMsg);
      setIsSubmitting(false);
      setFormSuccess(true);
      setFormName('');
      setFormEmail('');
      setFormMsg('');
      setTimeout(() => setFormSuccess(false), 5000);
    }, 1200);
  };

  // Static items for "Presupuesto de Impacto"
  const impactCategories = [
    {
      titleEs: 'Kits de Robótica',
      titleHnl: 'Kits de Robótica',
      icon: <Cpu className="h-6 w-6 text-emerald-600" />,
      costUSD: 2500,
      costHNL: 62500,
      descriptionEs: 'Equipos STEM educativos con microcontroladores, sensores y motores para escuelas locales.',
      specs: '10x kits completos de iniciación tecnológica.'
    },
    {
      titleEs: 'Tabletas Educativas',
      titleHnl: 'Tabletas Educativas',
      icon: <Tablet className="h-6 w-6 text-emerald-600" />,
      costUSD: 1500,
      costHNL: 37500,
      descriptionEs: 'Dispositivos portátiles precargados con software educativo offline y libros interactivos.',
      specs: '12x tabletas resistentes con protectores anticaídas.'
    },
    {
      titleEs: 'Servidor Comunitario',
      titleHnl: 'Servidor Comunitario',
      icon: <Server className="h-6 w-6 text-emerald-600" />,
      costUSD: 1000,
      costHNL: 25000,
      descriptionEs: 'Unidad central local para albergar Wikipedia, repositorios de código y guías educativas locales.',
      specs: '1x servidor de bajo consumo con respaldo solar.'
    }
  ];

  return (
    <div className="space-y-24 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-8">
        {/* Decorative background grid elements */}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60"></div>
        
        <div className="max-w-4xl mx-auto text-center space-y-8 px-4">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-800 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase border border-emerald-100"
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Auditoría 100% Abierta e Inmutable</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl font-bold font-sans tracking-tight text-slate-900 leading-[1.1]"
          >
            Transformando Realidades
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-500 font-sans max-w-2xl mx-auto leading-relaxed"
          >
            Un esfuerzo colectivo para dotar de tecnología y herramientas de calidad a comunidades que lo necesitan. Monitoreado en tiempo real.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <button
              onClick={onOpenDonate}
              className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-lg shadow-slate-900/10 hover:shadow-slate-900/20 active:scale-98"
            >
              Donar Ahora
            </button>
            <button
              onClick={() => setCurrentTab('informe')}
              className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 px-8 py-4 rounded-xl font-semibold transition-all hover:border-slate-300 inline-flex items-center justify-center space-x-2"
            >
              <span>Ver Informe</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Dynamic Budget Cards "Presupuesto de Impacto" */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 font-sans">
            Presupuesto de Impacto
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Cada aporte se dirige a kits validados, minimizando la intermediación y optimizando cada recurso.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {impactCategories.map((cat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="h-12 w-12 bg-emerald-50 rounded-2xl flex items-center justify-center">
                  {cat.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-slate-900">{cat.titleEs}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{cat.descriptionEs}</p>
                </div>
              </div>
              
              <div className="pt-8 border-t border-slate-50 mt-8 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">COSTO ESTIMADO</span>
                  <span className="text-2xl font-bold text-slate-900 font-mono tracking-tight">
                    {formatValue(currency === 'USD' ? cat.costUSD : cat.costHNL)}
                  </span>
                </div>
                <button 
                  onClick={onOpenDonate}
                  className="px-4 py-2 bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 text-xs font-bold rounded-xl transition-colors border border-slate-100 hover:border-emerald-100"
                >
                  Contribuir
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Logos Board */}
      <section className="bg-slate-50 py-16 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10">
          <p className="text-xs font-mono uppercase tracking-widest text-slate-400 font-semibold">
            APOYADO POR INSTITUCIONES DE CONFIANZA
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20 opacity-85">
            {SPONSORS.map((sponsor, idx) => (
              <img
                key={idx}
                src={sponsor.logoUrl}
                alt={sponsor.name}
                referrerPolicy="no-referrer"
                className="h-10 md:h-12 object-contain grayscale hover:grayscale-0 transition-all duration-300"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Financial Table Summary */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-100 rounded-3xl p-8 sm:p-10 shadow-sm space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-2xl font-bold tracking-tight text-slate-900">
                Transparencia en Tiempo Real
              </h3>
              <p className="text-slate-500 text-sm">
                Registro financiero instantáneo de los recursos administrados en la campaña.
              </p>
            </div>
            <button
              onClick={() => setCurrentTab('informe')}
              className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 inline-flex items-center space-x-1"
            >
              <span>Ver informe completo</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-100">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-[10px] font-mono tracking-wider text-slate-400 uppercase border-b border-slate-100">
                  <th className="py-4 px-6">ITEM</th>
                  <th className="py-4 px-6 text-right">COSTO</th>
                  <th className="py-4 px-6 text-center">ESTADO</th>
                  <th className="py-4 px-6">FECHA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-sm text-slate-600 font-sans">
                {transactions.slice(0, 3).map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6 font-semibold text-slate-900">
                      {currency === 'USD' ? tx.itemEs : tx.itemHnlEs}
                    </td>
                    <td className="py-4 px-6 text-right font-mono font-medium text-slate-900">
                      {formatValue(currency === 'USD' ? tx.costUSD : tx.costHNL)}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                        tx.status === 'Adquirido' 
                          ? 'bg-emerald-50 text-emerald-700' 
                          : 'bg-amber-50 text-amber-700'
                      }`}>
                        {tx.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-400 font-mono text-xs">
                      {tx.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Compact Interactive Contact Form */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 transform translate-x-12 -translate-y-12 h-64 w-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 relative z-10">
            <div className="md:col-span-2 space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">CONTACTO</span>
              <h3 className="text-3xl font-bold tracking-tight leading-tight">
                Hablemos de impacto.
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                ¿Tienes dudas sobre la auditoría inmutable, los proveedores o te interesa coordinar una contribución institucional? Escríbenos directamente.
              </p>
              
              <div className="space-y-4 pt-4 text-xs font-mono text-slate-400">
                <div className="flex items-center space-x-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-400"></div>
                  <span>Respuesta típica: &lt; 2 horas</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Lock className="h-3.5 w-3.5 text-slate-500" />
                  <span>Datos cifrados de extremo a extremo</span>
                </div>
              </div>
            </div>

            <div className="md:col-span-3">
              {formSuccess ? (
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-8 text-center space-y-4 flex flex-col items-center justify-center h-full">
                  <div className="h-12 w-12 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h4 className="font-bold text-lg text-emerald-300">¡Mensaje Recibido!</h4>
                  <p className="text-xs text-slate-300 max-w-xs">
                    Tu consulta ha sido registrada con éxito en nuestro sistema de transparencia. Un voluntario te responderá enseguida.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5 font-bold">Nombre Completo</label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="p. ej. María José Reyes"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5 font-bold">Correo Electrónico</label>
                    <input
                      type="email"
                      required
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="tu@correo.com"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5 font-bold">Mensaje</label>
                    <textarea
                      required
                      rows={3}
                      value={formMsg}
                      onChange={(e) => setFormMsg(e.target.value)}
                      placeholder="¿En qué podemos colaborar o qué dudas tienes?"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all resize-none"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white py-3.5 rounded-xl font-semibold transition-all inline-flex items-center justify-center space-x-2 text-sm uppercase tracking-wider font-mono shadow-md shadow-emerald-900/20 disabled:opacity-50"
                  >
                    {isSubmitting ? (
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
          </div>
        </div>
      </section>
    </div>
  );
}
