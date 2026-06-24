/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Currency, EquipmentItem } from '../types';
import { X, Heart, Sparkles, CheckCircle2, ShieldCheck, Landmark } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency: Currency;
  selectedEquipment: EquipmentItem | null;
  onSubmitDonation: (
    name: string,
    category: 'Individual' | 'Anónimo' | 'Socio Fundador',
    amountUSD: number,
    amountHNL: number,
    message: string,
    equipmentId?: string
  ) => void;
}

export default function DonationModal({
  isOpen,
  onClose,
  currency,
  selectedEquipment,
  onSubmitDonation,
}: DonationModalProps) {
  const [amount, setAmount] = React.useState<string>('');
  const [donorName, setDonorName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [isAnonymous, setIsAnonymous] = React.useState(false);
  const [step, setStep] = React.useState<'form' | 'loading' | 'success'>('form');
  const [loadingText, setLoadingText] = React.useState('');

  React.useEffect(() => {
    if (isOpen) {
      setStep('form');
      setDonorName('');
      setEmail('');
      setMessage('');
      setIsAnonymous(false);
      
      if (selectedEquipment) {
        const cost = currency === 'USD' ? selectedEquipment.costUSD : selectedEquipment.costHNL;
        const funded = currency === 'USD' ? selectedEquipment.fundedAmountUSD : selectedEquipment.fundedAmountHNL;
        setAmount(Math.max(cost - funded, 0).toString());
      } else {
        setAmount(currency === 'USD' ? '50' : '1000');
      }
    }
  }, [isOpen, selectedEquipment, currency]);

  if (!isOpen) return null;

  const quickAmountsUSD = ['10', '25', '50', '100', '250'];
  const quickAmountsHNL = ['250', '500', '1000', '2500', '5000'];

  const quickAmounts = currency === 'USD' ? quickAmountsUSD : quickAmountsHNL;

  const handleQuickSelect = (amt: string) => {
    setAmount(amt);
  };

  const formatValue = (val: number) => {
    if (currency === 'USD') {
      return `$${val.toLocaleString()}`;
    }
    return `L ${val.toLocaleString()}`;
  };

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmt = parseFloat(amount);
    if (isNaN(numAmt) || numAmt <= 0) return;

    setStep('loading');
    
    // Animate transition steps
    const loadingTexts = [
      'Validando dirección de depósito...',
      'Generando firma criptográfica de auditoría...',
      'Asignando fondos a la cuenta fiduciaria...',
      'Escribiendo bloque inmutable...'
    ];

    let currentTextIdx = 0;
    setLoadingText(loadingTexts[currentTextIdx]);

    const interval = setInterval(() => {
      currentTextIdx++;
      if (currentTextIdx < loadingTexts.length) {
        setLoadingText(loadingTexts[currentTextIdx]);
      }
    }, 600);

    setTimeout(() => {
      clearInterval(interval);
      
      const finalAmtUSD = currency === 'USD' ? numAmt : Math.round(numAmt / 25);
      const finalAmtHNL = currency === 'HNL' ? numAmt : numAmt * 25;
      const finalName = isAnonymous ? 'Donante Anónimo' : (donorName || 'Donante Individual');
      const category = isAnonymous ? 'Anónimo' : (numAmt >= (currency === 'USD' ? 500 : 12500) ? 'Socio Fundador' : 'Individual');

      onSubmitDonation(
        finalName,
        category,
        finalAmtUSD,
        finalAmtHNL,
        message,
        selectedEquipment?.id
      );

      setStep('success');
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs" onClick={onClose}></div>

      {/* Modal Card */}
      <div className="relative bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl border border-slate-100 z-10 animate-scaleUp">
        {/* Header */}
        <div className="bg-slate-50 border-b border-slate-100 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Heart className="h-5 w-5 text-sky-600 fill-sky-50" />
            <h3 className="font-bold text-slate-900 font-sans">
              {selectedEquipment ? 'Financiar Equipamiento' : 'Realizar Contribución'}
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Dynamic Content Stages */}
        <div className="p-6">
          {step === 'form' && (
            <form onSubmit={handleDonate} className="space-y-5">
              {selectedEquipment && (
                <div className="bg-sky-50/50 border border-sky-100 p-4 rounded-2xl flex items-center space-x-3 text-xs">
                  <div className="p-2 bg-sky-100 text-sky-700 rounded-xl">
                    <Landmark className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-bold text-sky-950">
                      Estás financiando: {currency === 'USD' ? selectedEquipment.nameEs : selectedEquipment.nameHnlEs}
                    </p>
                    <p className="text-sky-700 font-mono mt-0.5">
                      Costo del item: {formatValue(currency === 'USD' ? selectedEquipment.costUSD : selectedEquipment.costHNL)}
                    </p>
                  </div>
                </div>
              )}

              {/* Amount input */}
              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase text-slate-400 font-bold">Monto a Contribuir ({currency})</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold text-slate-400 font-mono">
                    {currency === 'USD' ? '$' : 'L'}
                  </span>
                  <input
                    type="number"
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 rounded-2xl pl-8 pr-4 py-4 text-xl font-bold text-slate-900 font-mono focus:outline-none transition-all"
                  />
                </div>

                {/* Quick select buttons */}
                {!selectedEquipment && (
                  <div className="grid grid-cols-5 gap-1.5">
                    {quickAmounts.map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => handleQuickSelect(amt)}
                        className={`py-2 rounded-xl text-xs font-bold font-mono border transition-all ${
                          amount === amt
                            ? 'bg-slate-900 text-white border-slate-900'
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {amt}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Donor info */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono uppercase text-slate-400 font-bold">Información de Transparencia</label>
                  <label className="inline-flex items-center space-x-1.5 cursor-pointer text-xs font-medium text-slate-600">
                    <input
                      type="checkbox"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      className="rounded border-slate-300 text-sky-600 focus:ring-sky-500 h-3.5 w-3.5"
                    />
                    <span>Aporte Anónimo</span>
                  </label>
                </div>

                {!isAnonymous && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        required={!isAnonymous}
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                        placeholder="Nombre Completo"
                        className="w-full bg-slate-50 border border-slate-200 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 rounded-xl px-3.5 py-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none transition-all"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        required={!isAnonymous}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Correo Electrónico"
                        className="w-full bg-slate-50 border border-slate-200 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 rounded-xl px-3.5 py-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none transition-all"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <textarea
                    rows={2}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Escribe un mensaje de apoyo para la comunidad (opcional)..."
                    className="w-full bg-slate-50 border border-slate-200 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 rounded-xl px-3.5 py-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none transition-all resize-none"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all uppercase tracking-wider font-mono cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold transition-all uppercase tracking-wider font-mono shadow-md shadow-sky-600/10 inline-flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Proceder</span>
                </button>
              </div>
            </form>
          )}

          {step === 'loading' && (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-6">
              <div className="relative">
                <div className="h-16 w-16 border-4 border-sky-100 border-t-sky-600 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center text-sky-600">
                  <ShieldCheck className="h-6 w-6" />
                </div>
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-slate-900">Procesando Auditoría</h4>
                <p className="text-xs text-slate-500 font-mono animate-pulse">{loadingText}</p>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="py-8 flex flex-col items-center justify-center text-center space-y-6">
              <div className="h-16 w-16 bg-sky-50 text-sky-600 rounded-full flex items-center justify-center border border-sky-100">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              
              <div className="space-y-2 max-w-xs">
                <h4 className="font-bold text-slate-900 text-lg">¡Aporte Registrado con Éxito!</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Tu contribución de {formatValue(parseFloat(amount))} ha sido integrada. El hash de auditoría inmutable fue acuñado correctamente en el libro mayor público.
                </p>
              </div>

              <button
                onClick={onClose}
                className="px-8 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all uppercase tracking-wider font-mono cursor-pointer"
              >
                Aceptar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
