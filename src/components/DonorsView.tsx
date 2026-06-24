/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Currency, Donor } from '../types';
import { SPONSORS } from '../data';
import { Heart, Sparkles, Award, UserCheck, MessageSquareQuote } from 'lucide-react';
import { motion } from 'motion/react';

interface DonorsViewProps {
  donors: Donor[];
  currency: Currency;
  onOpenDonate: () => void;
}

export default function DonorsView({
  donors,
  currency,
  onOpenDonate,
}: DonorsViewProps) {
  
  const formatValue = (val: number) => {
    if (currency === 'USD') {
      return `$${val.toLocaleString()}`;
    }
    return `L ${val.toLocaleString()}`;
  };

  return (
    <div className="space-y-16 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fadeIn">
      {/* View Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 font-bold px-3 py-1 bg-emerald-50 rounded-full">
          Comunidad Unida
        </span>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 font-sans">
          Gracias a quienes hacen esto posible
        </h1>
        <p className="text-slate-500 text-base leading-relaxed">
          Nuestra misión se construye sobre la confianza de personas e instituciones aliadas que apuestan por democratizar la tecnología y el aprendizaje.
        </p>
      </div>

      {/* Corporate Donors Logo Board */}
      <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 sm:p-12 text-center space-y-8">
        <span className="text-[10px] font-mono tracking-widest text-slate-400 font-bold uppercase block">
          ALIANZAS INSTITUCIONALES E IMPACTO CORPORATIVO
        </span>
        <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16 opacity-80">
          {SPONSORS.map((s, idx) => (
            <img
              key={idx}
              src={s.logoUrl}
              alt={s.name}
              referrerPolicy="no-referrer"
              className="h-9 md:h-10 object-contain grayscale hover:grayscale-0 transition-all duration-300"
            />
          ))}
        </div>
      </div>

      {/* Individual Donors List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Donors List Area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="text-xl font-bold text-slate-900 font-sans">Donantes Individuales</h3>
            <span className="text-xs font-mono text-slate-400 font-semibold">{donors.length} Contribuciones Activas</span>
          </div>

          <div className="space-y-4">
            {donors.map((donor, idx) => {
              const amount = currency === 'USD' ? donor.amountUSD : donor.amountHNL;
              const isFounder = donor.category === 'Socio Fundador';

              return (
                <motion.div
                  key={donor.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="bg-white border border-slate-100 rounded-2xl p-5 sm:p-6 shadow-xs hover:shadow-sm transition-all space-y-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center space-x-3.5">
                      <div className={`h-11 w-11 rounded-full flex items-center justify-center shrink-0 ${
                        isFounder ? 'bg-amber-50 text-amber-600 border border-amber-100' : 'bg-slate-50 text-slate-600'
                      }`}>
                        {isFounder ? <Award className="h-5 w-5" /> : <UserCheck className="h-5 w-5" />}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm sm:text-base">{donor.name}</h4>
                        <div className="flex items-center space-x-2 mt-0.5">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            isFounder 
                              ? 'bg-amber-50 text-amber-700' 
                              : donor.category === 'Anónimo'
                                ? 'bg-slate-100 text-slate-600'
                                : 'bg-emerald-50 text-emerald-700'
                          }`}>
                            {donor.category}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">{donor.date}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-sm font-mono text-slate-400 block uppercase tracking-wider text-[9px]">Aporte</span>
                      <span className="text-base sm:text-lg font-black text-slate-950 font-mono tracking-tight">
                        {formatValue(amount)}
                      </span>
                    </div>
                  </div>

                  {donor.message && (
                    <div className="bg-slate-50/50 rounded-xl p-3 border border-slate-100/50 flex items-start space-x-2">
                      <MessageSquareQuote className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <p className="text-xs text-slate-600 italic leading-relaxed">
                        &ldquo;{donor.message}&rdquo;
                      </p>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA Side Card */}
        <div className="lg:col-span-1">
          <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-lg sticky top-28 space-y-6 overflow-hidden relative">
            <div className="absolute top-0 right-0 transform translate-x-12 -translate-y-12 h-48 w-48 bg-emerald-500/10 rounded-full blur-2xl"></div>
            
            <div className="space-y-4 relative z-10">
              <div className="h-12 w-12 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center">
                <Heart className="h-6 w-6 fill-emerald-400" />
              </div>
              
              <h3 className="text-2xl font-bold tracking-tight">Únete como Donante</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Haz que tu impacto sea visible. Elige financiar un equipamiento técnico en particular, o realiza un aporte general para cubrir gastos operativos de la comunidad.
              </p>
            </div>

            <div className="space-y-3.5 pt-4 border-t border-slate-800 text-[11px] font-mono text-slate-400 relative z-10">
              <div className="flex items-center space-x-2">
                <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                <span>Inclusión opcional en el muro público</span>
              </div>
              <div className="flex items-center space-x-2">
                <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                <span>Mensaje de motivación personalizado</span>
              </div>
            </div>

            <button
              onClick={onOpenDonate}
              className="w-full bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white py-3 rounded-xl font-bold text-xs uppercase tracking-widest font-mono transition-all shadow-md shadow-emerald-950/50 cursor-pointer relative z-10"
            >
              Iniciar Donación
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
