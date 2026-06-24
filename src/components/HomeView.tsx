/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Currency, EquipmentItem, FinancialTransaction } from '../types';
import { SPONSORS } from '../data';
import {
  ArrowRight,
  Camera,
  CheckCircle2,
  Lightbulb,
  Lock,
  Mic,
  Send,
  ShieldCheck,
} from 'lucide-react';
import { motion } from 'motion/react';

interface HomeViewProps {
  currency: Currency;
  setCurrentTab: (tab: string) => void;
  onOpenDonate: () => void;
  onOpenDonateForEquipment: (eq: EquipmentItem) => void;
  equipment: EquipmentItem[];
  transactions: FinancialTransaction[];
  onSubmitMessage: (name: string, email: string, message: string) => void;
}

export default function HomeView({
  currency,
  setCurrentTab,
  onOpenDonate,
  onOpenDonateForEquipment,
  equipment,
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

  const iconByEquipmentId: Record<string, React.ReactNode> = {
    'eq-1': <Camera className="h-6 w-6 text-sky-600" />,
    'eq-2': <Lightbulb className="h-6 w-6 text-sky-600" />,
    'eq-3': <Mic className="h-6 w-6 text-sky-600" />,
  };

  return (
    <div className="space-y-24 pb-16">
      <section className="relative overflow-hidden pt-12 pb-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,#bae6fd,transparent_34%),radial-gradient(circle_at_top_right,#fde68a,transparent_30%),linear-gradient(to_bottom,#ffffff,transparent)] opacity-90"></div>

        <div className="max-w-4xl mx-auto text-center space-y-8 px-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-white text-sky-800 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase border border-sky-200 shadow-sm"
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Auditoria abierta de aportes</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl font-bold font-sans tracking-tight text-slate-900 leading-[1.1]"
          >
            Instituto Gubernamental Alvaro Contreras
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-500 font-sans max-w-2xl mx-auto leading-relaxed"
          >
            Un esfuerzo colectivo para equipar a estudiantes con una Camara Canon EOS R100, microfonos DJI Mic Mini y el Kit Iluminacion Godox ML30.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <button
              onClick={onOpenDonate}
              className="w-full sm:w-auto bg-sky-700 hover:bg-sky-800 text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-lg shadow-sky-900/20 hover:shadow-sky-900/30 active:scale-98"
            >
              Donar Ahora
            </button>
            <button
              onClick={() => setCurrentTab('informe')}
              className="w-full sm:w-auto bg-white hover:bg-amber-50 text-slate-800 border border-amber-200 px-8 py-4 rounded-xl font-semibold transition-all hover:border-amber-300 inline-flex items-center justify-center space-x-2"
            >
              <span>Ver Informe</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 font-sans">
            Equipo Pendiente
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            La barra de cada equipo avanza automaticamente segun los aportes registrados.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {equipment.map((item, idx) => {
            const cost = currency === 'USD' ? item.costUSD : item.costHNL;
            const funded = currency === 'USD' ? item.fundedAmountUSD : item.fundedAmountHNL;
            const percentage = cost > 0 ? Math.min(100, Math.round((funded / cost) * 100)) : 0;

            return (
              <motion.div
                key={item.id}
                whileHover={{ y: -5 }}
                className="bg-white/85 backdrop-blur-sm border border-white/70 rounded-3xl p-8 shadow-sm shadow-sky-900/5 hover:shadow-lg hover:shadow-sky-900/10 transition-all flex flex-col justify-between"
              >
                <div className="space-y-6">
                  <div className="h-12 w-12 bg-sky-100 rounded-2xl flex items-center justify-center">
                    {iconByEquipmentId[item.id]}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-slate-900">{item.nameEs}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{item.specsEs}</p>
                  </div>
                </div>

                <div className="pt-8 border-t border-sky-50 mt-8 space-y-5">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-slate-400">
                      <span>Progreso</span>
                      <span>{percentage}%</span>
                    </div>
                    <div className="h-2.5 bg-sky-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-linear-to-r from-sky-600 to-cyan-400 rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">Recaudado / Meta</span>
                      <span className="text-lg font-bold text-slate-900 font-mono tracking-tight">
                        {formatValue(funded)} / {formatValue(cost)}
                      </span>
                    </div>
                    <button
                      onClick={() => onOpenDonateForEquipment(item)}
                      className="px-4 py-2 bg-amber-50 hover:bg-sky-700 hover:text-white text-amber-800 text-xs font-bold rounded-xl transition-colors border border-amber-100 hover:border-sky-700"
                    >
                      Contribuir
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {SPONSORS.length > 0 && (
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
      )}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/85 backdrop-blur-sm border border-white/70 rounded-3xl p-8 sm:p-10 shadow-sm shadow-sky-900/5 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-2xl font-bold tracking-tight text-slate-900">
                Transparencia en Tiempo Real
              </h3>
              <p className="text-slate-500 text-sm">
                Registro financiero instantaneo de los recursos administrados en la campana.
              </p>
            </div>
            <button
              onClick={() => setCurrentTab('informe')}
              className="text-sm font-semibold text-sky-600 hover:text-sky-700 inline-flex items-center space-x-1"
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
                  <th className="py-4 px-6 text-right">APORTE</th>
                  <th className="py-4 px-6 text-center">ESTADO</th>
                  <th className="py-4 px-6">FECHA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-sm text-slate-600 font-sans">
                {transactions.length > 0 ? (
                  transactions.slice(0, 3).map((tx) => (
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
                            ? 'bg-sky-50 text-sky-700'
                            : 'bg-amber-50 text-amber-700'
                        }`}>
                          {tx.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-slate-400 font-mono text-xs">
                        {tx.date}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-8 px-6 text-center text-slate-400 text-xs">
                      Aun no hay aportes registrados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-indigo-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl shadow-indigo-950/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#0ea5e966,transparent_34%),radial-gradient(circle_at_bottom_left,#f59e0b33,transparent_30%)]"></div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 relative z-10">
            <div className="md:col-span-2 space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-300 font-bold">CONTACTO</span>
              <h3 className="text-3xl font-bold tracking-tight leading-tight">
                Contactanos
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Si tienes equipo que busques donar es buen momento que nos puedas contactar para ayuda a los estudiantes.
              </p>

              <div className="space-y-4 pt-4 text-xs font-mono text-slate-400">
                <div className="flex items-center space-x-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-cyan-300"></div>
                  <span>Respuesta tipica: &lt; 2 horas</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Lock className="h-3.5 w-3.5 text-slate-500" />
                  <span>Datos protegidos de extremo a extremo</span>
                </div>
              </div>
            </div>

            <div className="md:col-span-3">
              {formSuccess ? (
                <div className="bg-sky-500/10 border border-sky-500/20 rounded-2xl p-8 text-center space-y-4 flex flex-col items-center justify-center h-full">
                  <div className="h-12 w-12 bg-sky-500/20 rounded-full flex items-center justify-center text-sky-400">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h4 className="font-bold text-lg text-sky-300">Mensaje Recibido</h4>
                  <p className="text-xs text-slate-300 max-w-xs">
                    Gracias por contactarnos. Revisaremos tu mensaje y responderemos pronto.
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
                      placeholder="p. ej. Maria Jose Reyes"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5 font-bold">Correo Electronico</label>
                    <input
                      type="email"
                      required
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="tu@correo.com"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5 font-bold">Mensaje</label>
                    <textarea
                      required
                      rows={3}
                      value={formMsg}
                      onChange={(e) => setFormMsg(e.target.value)}
                      placeholder="Que equipo te gustaria donar o como podemos colaborar?"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-sky-600 hover:bg-sky-500 active:bg-sky-700 text-white py-3.5 rounded-xl font-semibold transition-all inline-flex items-center justify-center space-x-2 text-sm uppercase tracking-wider font-mono shadow-md shadow-sky-900/20 disabled:opacity-50"
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
