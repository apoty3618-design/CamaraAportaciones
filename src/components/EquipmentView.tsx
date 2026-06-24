/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Currency, EquipmentItem } from '../types';
import { ShieldCheck, ArrowRight, Eye, Sparkles, CheckCircle, Clock } from 'lucide-react';
import { motion } from 'motion/react';

interface EquipmentViewProps {
  equipment: EquipmentItem[];
  currency: Currency;
  onOpenDonateForEquipment: (eq: EquipmentItem) => void;
  onViewEquipmentDetails: (eq: EquipmentItem) => void;
  onOpenDonate: () => void;
}

export default function EquipmentView({
  equipment,
  currency,
  onOpenDonateForEquipment,
  onViewEquipmentDetails,
  onOpenDonate,
}: EquipmentViewProps) {
  
  const formatValue = (val: number) => {
    if (currency === 'USD') {
      return `$${val.toLocaleString()}`;
    }
    return `L ${val.toLocaleString()}`;
  };

  return (
    <div className="space-y-16 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* View Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 font-bold px-3 py-1 bg-emerald-50 rounded-full">
          Inventario Abierto
        </span>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 font-sans">
          Equipamiento Técnico
        </h1>
        <p className="text-slate-500 text-base leading-relaxed">
          Consulta el estado de adquisición, las especificaciones detalladas y el propósito social de cada recurso asignado a las misiones en campo.
        </p>
      </div>

      {/* Equipment Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {equipment.map((item) => {
          const isFunded = item.status === 'Completado';
          const name = currency === 'USD' ? item.nameEs : item.nameHnlEs;
          const specs = currency === 'USD' ? item.specsEs : item.specsHnlEs;
          const cost = currency === 'USD' ? item.costUSD : item.costHNL;

          return (
            <motion.div
              key={item.id}
              whileHover={{ y: -4 }}
              className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              {/* Product Image Panel */}
              <div className="relative aspect-video bg-slate-50 overflow-hidden group">
                <img
                  src={item.imageUrl}
                  alt={name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Status Overlay */}
                <div className="absolute top-4 right-4">
                  <span className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
                    isFunded
                      ? 'bg-emerald-500 text-white'
                      : 'bg-amber-500 text-white animate-pulse'
                  }`}>
                    {isFunded ? (
                      <>
                        <CheckCircle className="h-3 w-3" />
                        <span>Adquirido</span>
                      </>
                    ) : (
                      <>
                        <Clock className="h-3 w-3" />
                        <span>Pendiente</span>
                      </>
                    )}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono tracking-widest text-slate-400 font-bold uppercase">
                    {item.category}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 line-clamp-1">
                    {name}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                    {specs}
                  </p>
                </div>

                {/* Costs and Actions */}
                <div className="pt-4 border-t border-slate-50 space-y-4">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-400">COSTO ESTIMADO</span>
                    <span className="text-xl font-bold text-slate-950 font-mono">
                      {formatValue(cost)}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => onViewEquipmentDetails(item)}
                      className="flex-1 inline-flex items-center justify-center space-x-1 bg-slate-50 hover:bg-slate-100 text-slate-700 py-2.5 rounded-xl text-xs font-bold transition-all border border-slate-100"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>Detalles</span>
                    </button>
                    {!isFunded && (
                      <button
                        onClick={() => onOpenDonateForEquipment(item)}
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-xl text-xs font-bold transition-all inline-flex items-center justify-center space-x-1 shadow-xs shadow-emerald-600/10"
                      >
                        <Sparkles className="h-3.5 w-3.5" />
                        <span>Financiar</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Dotted Reserve Fund Card */}
        <div className="bg-slate-50/50 border-2 border-dashed border-slate-200 rounded-3xl p-8 flex flex-col justify-between text-center min-h-[350px]">
          <div className="space-y-4 my-auto">
            <div className="h-12 w-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-500">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-800">Fondo de Reserva</h3>
              <p className="text-xs text-slate-500 max-w-[200px] mx-auto leading-relaxed">
                Recursos destinados a auditorías de terceros y contingencias operativas imprevistas.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenDonate}
            className="w-full py-3 bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 text-xs font-bold rounded-xl transition-all border border-slate-200 hover:border-emerald-200"
          >
            Confirmar Contribución
          </button>
        </div>
      </div>

      {/* Transparency Guarantee Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 transform translate-x-12 -translate-y-12 h-48 w-48 bg-emerald-500/10 rounded-full blur-2xl"></div>
        
        <div className="space-y-2 max-w-2xl relative z-10">
          <div className="inline-flex items-center space-x-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase font-bold">
            Garantía de Transparencia
          </div>
          <h3 className="text-xl font-bold font-sans">Facturación y Trazabilidad</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Cada componente técnico cuenta con un número de serie auditado y enlazado a su factura pública en formato abierto. Puedes consultar el contrato de adquisición de cualquier elemento.
          </p>
        </div>

        <button 
          onClick={() => onViewEquipmentDetails(equipment[0])}
          className="bg-white hover:bg-slate-50 text-slate-900 px-6 py-3 rounded-xl text-xs font-bold inline-flex items-center space-x-2 transition-all relative z-10 shrink-0 self-start md:self-center"
        >
          <span>Auditar Contratos</span>
          <ArrowRight className="h-4 w-4 text-emerald-600" />
        </button>
      </div>
    </div>
  );
}
