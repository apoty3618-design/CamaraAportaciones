/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Currency, EquipmentItem } from '../types';
import { X, CheckCircle, ShieldCheck, Download, ExternalLink, Calendar, MapPin, Tag } from 'lucide-react';
import { motion } from 'motion/react';

interface EquipmentDetailModalProps {
  item: EquipmentItem | null;
  isOpen: boolean;
  onClose: () => void;
  currency: Currency;
  onOpenDonate: (eq: EquipmentItem) => void;
}

export default function EquipmentDetailModal({
  item,
  isOpen,
  onClose,
  currency,
  onOpenDonate,
}: EquipmentDetailModalProps) {
  if (!isOpen || !item) return null;

  const formatValue = (val: number) => {
    if (currency === 'USD') {
      return `$${val.toLocaleString()}`;
    }
    return `L ${val.toLocaleString()}`;
  };

  const isFunded = item.status === 'Completado';
  const name = currency === 'USD' ? item.nameEs : item.nameHnlEs;
  const specs = currency === 'USD' ? item.specsEs : item.specsHnlEs;
  const cost = currency === 'USD' ? item.costUSD : item.costHNL;

  // Rich mock details specific to each equipment
  const mockDetails: Record<string, {
    serial: string;
    supplier: string;
    community: string;
    dateAcquired?: string;
    techDetails: string[];
    justification: string;
  }> = {
    'eq-1': {
      serial: 'SN-CAN-R100-849204',
      supplier: 'Distribuidora Tecnológica S.A.',
      community: 'Zonas rurales de Lempira (La Campa, Gracias)',
      dateAcquired: '12 Mar 2026',
      techDetails: [
        'Sensor CMOS APS-C de 24.1 megapíxeles de alta fidelidad cromática.',
        'Procesador de imagen DIGIC 8 avanzado.',
        'Grabación de video Full HD a 60p y 4K estabilizado.',
        'Conectividad Wi-Fi y Bluetooth nativa para transferencia inmediata.'
      ],
      justification: 'Esencial para documentar los avances agrícolas y educativos en comunidades aisladas, proveyendo testimonios gráficos de alta calidad para los informes de transparencia.'
    },
    'eq-2': {
      serial: 'SN-GDX-ML30-739103',
      supplier: 'Equipos Fotográficos de Honduras S. de R.L.',
      community: 'Comunidades escolares en Intibucá (Yamaranguila)',
      dateAcquired: '10 Mar 2026',
      techDetails: [
        'Lámpara LED COB ultra-silenciosa de 37W.',
        'Temperatura de color calibrada de 5600K.',
        'Alimentación dual (baterías portátiles o adaptador AC).',
        'CRI de 96 y TLCI de 97 para fidelidad de tonos de piel.'
      ],
      justification: 'Garantiza iluminación profesional para entrevistas en interiores de escuelas rurales o grabaciones nocturnas, superando las limitaciones energéticas locales.'
    },
    'eq-3': {
      serial: 'SN-DJI-MICM-394013',
      supplier: 'Suministros Audiovisuales Globales',
      community: 'Red de jóvenes cronistas de Copán Ruinas',
      dateAcquired: '05 Mar 2026',
      techDetails: [
        'Dos transmisores con micrófonos omnidireccionales integrados.',
        'Cancelación de ruido adaptativa con DSP inteligente.',
        'Alcance inalámbrico de hasta 250 metros en línea de vista.',
        'Hasta 15 horas de autonomía activa con estuche de carga.'
      ],
      justification: 'Permite capturar audio prístino de entrevistas a docentes, estudiantes y líderes comunitarios sin distorsión de viento ni ruidos ambientales en campo.'
    },
    'eq-4': {
      serial: 'SN-SLK-GEN3-920412',
      supplier: 'Conectividad del Istmo S.A.',
      community: 'Centros comunales de conectividad en Intibucá',
      techDetails: [
        'Antena satelital auto-orientable de alta resistencia (IP56).',
        'Velocidades de descarga estables de hasta 150 Mbps.',
        'Router Wi-Fi dual band con soporte para 128 dispositivos simultáneos.',
        'Bajo consumo de energía compatible con inversores solares estándar.'
      ],
      justification: 'Proporciona acceso a internet robusto y estable de nivel empresarial a escuelas que de otra forma carecen por completo de infraestructura celular o por cable.'
    },
    'eq-5': {
      serial: 'SN-PEL-1510-482039',
      supplier: 'Protección Técnica S. de R.L.',
      community: 'Logística de transporte de equipos en todo Honduras',
      techDetails: [
        'Polímero HPX ultraligero y de máxima resistencia contra impactos.',
        'Anillo de sellado de neopreno estanco al agua y polvo (IP67).',
        'Válvula de descompresión automática para viajes aéreos y altitudes.',
        'Espuma modular precortada para ajuste milimétrico de lentes y cámaras.'
      ],
      justification: 'Protege las inversiones técnicas de golpes, polvo, lluvia tropical intensa y humedad extrema durante los viajes accidentados en carreteras de tierra y senderos de campo.'
    }
  };

  const details = mockDetails[item.id] || {
    serial: 'SN-PENDIENTE',
    supplier: 'Distribuidor Por Asignar',
    community: 'Comunidad en Evaluación',
    techDetails: ['Especificación técnica detallada en proceso de validación.'],
    justification: 'Uso estratégico enfocado en el desarrollo de capacidades técnicas locales.'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs" onClick={onClose}></div>

      {/* Slide-over Card */}
      <div className="relative bg-white h-full w-full max-w-lg shadow-2xl border-l border-slate-100 z-10 flex flex-col justify-between animate-slideLeft">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="h-5 w-5 text-emerald-600" />
            <div>
              <span className="text-[10px] font-mono tracking-widest text-slate-400 font-bold uppercase block">Especificación de Auditoría</span>
              <span className="text-sm font-bold text-slate-900 font-sans">{item.id.toUpperCase()} / {details.serial}</span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 overflow-y-auto flex-grow space-y-6">
          {/* Cover Image & Basic Status */}
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-50 border border-slate-100">
            <img
              src={item.imageUrl}
              alt={name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4">
              <span className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider text-white shadow-sm ${
                isFunded ? 'bg-emerald-600' : 'bg-amber-600 animate-pulse'
              }`}>
                {item.status}
              </span>
            </div>
          </div>

          {/* Core Info */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-slate-950 font-sans">{name}</h2>
            <div className="flex flex-wrap gap-2 text-slate-500 text-xs">
              <span className="inline-flex items-center bg-slate-50 px-2.5 py-1 rounded-lg">
                <Tag className="h-3.5 w-3.5 mr-1 text-slate-400" />
                {item.category}
              </span>
              <span className="inline-flex items-center bg-slate-50 px-2.5 py-1 rounded-lg">
                <MapPin className="h-3.5 w-3.5 mr-1 text-slate-400" />
                {details.community}
              </span>
            </div>
          </div>

          {/* Pricing breakdown */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100/50 flex justify-between items-baseline">
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-bold">COSTO TOTAL DEL EQUIPO</span>
              <span className="text-2xl font-black text-slate-950 font-mono">{formatValue(cost)}</span>
            </div>
            {isFunded ? (
              <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
                100% FONDEADO
              </span>
            ) : (
              <span className="text-[10px] font-mono font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-100 animate-pulse">
                REQUIERE APOYO
              </span>
            )}
          </div>

          {/* Supplier details */}
          <div className="space-y-3.5 text-xs text-slate-600 border-t border-slate-100 pt-5">
            <div className="flex justify-between">
              <span className="text-slate-400 font-medium">Proveedor de Adquisición:</span>
              <span className="font-semibold text-slate-900">{details.supplier}</span>
            </div>
            {details.dateAcquired && (
              <div className="flex justify-between">
                <span className="text-slate-400 font-medium">Fecha de Adquisición:</span>
                <span className="font-semibold text-slate-900">{details.dateAcquired}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-slate-400 font-medium">Contrato de Compra:</span>
              <span className="text-emerald-700 font-bold hover:underline inline-flex items-center space-x-1 cursor-pointer">
                <span>CONTRATO_FIRMADO.pdf</span>
                <ExternalLink className="h-3 w-3" />
              </span>
            </div>
          </div>

          {/* Justification */}
          <div className="space-y-2 border-t border-slate-100 pt-5 text-xs leading-relaxed">
            <h4 className="font-bold text-slate-950 uppercase tracking-wider font-sans text-[10px] text-slate-400">Propósito Social</h4>
            <p className="text-slate-600 bg-slate-50/50 p-3.5 rounded-xl border border-slate-100/50 italic">
              &ldquo;{details.justification}&rdquo;
            </p>
          </div>

          {/* Technical specifications bullet points */}
          <div className="space-y-3 border-t border-slate-100 pt-5 text-xs">
            <h4 className="font-bold text-slate-950 uppercase tracking-wider font-sans text-[10px] text-slate-400">Especificaciones Técnicas</h4>
            <ul className="space-y-2 text-slate-600">
              {details.techDetails.map((spec, idx) => (
                <li key={idx} className="flex items-start">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5 mr-2.5"></div>
                  <span>{spec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer / CTA action */}
        <div className="px-6 py-5 border-t border-slate-100 bg-slate-50 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold font-mono uppercase tracking-wider transition-all cursor-pointer"
          >
            Cerrar
          </button>
          {!isFunded && (
            <button
              onClick={() => {
                onClose();
                onOpenDonate(item);
              }}
              className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold font-mono uppercase tracking-wider transition-all shadow-sm shadow-emerald-600/10 inline-flex items-center justify-center space-x-1 cursor-pointer"
            >
              <span>Financiar Item</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
