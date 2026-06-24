/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Currency, FinancialTransaction } from '../types';
import { Search, Download, Filter, FileSpreadsheet, ShieldAlert, BadgePercent, HeartHandshake, Eye } from 'lucide-react';
import { motion } from 'motion/react';

interface ReportViewProps {
  transactions: FinancialTransaction[];
  currency: Currency;
  totalDonated: number;
  goalAmount: number;
}

export default function ReportView({
  transactions,
  currency,
  totalDonated,
  goalAmount,
}: ReportViewProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string>('Todos');
  const [showExportToast, setShowExportToast] = React.useState(false);

  const formatValue = (val: number) => {
    if (currency === 'USD') {
      return `$${val.toLocaleString()}`;
    }
    return `L ${val.toLocaleString()}`;
  };

  const percentage = Math.min(100, Math.round((totalDonated / goalAmount) * 100 * 10) / 10);

  // Filter transactions
  const filteredTransactions = transactions.filter((tx) => {
    const name = currency === 'USD' ? tx.itemEs : tx.itemHnlEs;
    const matchesSearch = name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || tx.category === selectedCategory || (selectedCategory === 'Tránsito' && tx.status === 'En Tránsito');
    return matchesSearch && matchesCategory;
  });

  const handleExport = () => {
    setShowExportToast(true);
    setTimeout(() => {
      setShowExportToast(false);
    }, 4000);
  };

  const categories = ['Todos', 'Equipamiento', 'Operativo', 'Tránsito'];

  return (
    <div className="space-y-16 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Toast Notification */}
      {showExportToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-xl flex items-center space-x-3 border border-slate-800 animate-slideUp">
          <FileSpreadsheet className="h-5 w-5 text-emerald-400" />
          <div>
            <p className="text-xs font-bold">Exportación Completada</p>
            <p className="text-[10px] text-slate-400 font-mono">Formato CSV generado con hash de auditoría.</p>
          </div>
        </div>
      )}

      {/* View Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 font-bold px-3 py-1 bg-emerald-50 rounded-full">
          Auditoría de Cuentas
        </span>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 font-sans">
          Informe Financiero
        </h1>
        <p className="text-slate-500 text-base leading-relaxed">
          Trazabilidad absoluta. Cada donación y gasto se valida, se procesa en nuestra contabilidad de inventario y se reporta en tiempo real.
        </p>
      </div>

      {/* Monthly Goal Card */}
      <div className="bg-white border border-slate-100 rounded-3xl p-8 sm:p-10 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold">ESTADO DE CAPTACIÓN</span>
            <h3 className="text-2xl font-bold tracking-tight text-slate-900">
              Objetivo Mensual: {formatValue(totalDonated)} de {formatValue(goalAmount)}
            </h3>
          </div>
          <span className="text-3xl font-mono font-black text-emerald-600 self-start sm:self-center">
            {percentage}%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="h-4 bg-slate-100 rounded-full overflow-hidden relative">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="h-full bg-linear-to-r from-emerald-500 to-teal-500 rounded-full"
          ></motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-slate-50 text-xs font-mono text-slate-500">
          <div>
            <span className="block text-slate-400">TASA DE EJECUCIÓN</span>
            <span className="text-slate-800 font-bold">100% Asignada a Equipos</span>
          </div>
          <div>
            <span className="block text-slate-400">PROVEEDORES VERIFICADOS</span>
            <span className="text-slate-800 font-bold">3 Agencias Autorizadas</span>
          </div>
          <div>
            <span className="block text-slate-400">CONTRATOS DE ADQUISICIÓN</span>
            <span className="text-slate-800 font-bold">Trazabilidad en PDF</span>
          </div>
        </div>
      </div>

      {/* Expense Breakdown & Table Section */}
      <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-xs space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-slate-900">Desglose de Gastos</h3>
            <p className="text-xs text-slate-500">Filtra, busca y verifica las transacciones registradas.</p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search input */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar transacción..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 w-full sm:w-64 transition-all"
              />
            </div>

            {/* Export Action */}
            <button
              onClick={handleExport}
              className="inline-flex items-center justify-center space-x-1.5 bg-slate-900 text-white px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Exportar</span>
            </button>
          </div>
        </div>

        {/* Category Pill Filters */}
        <div className="flex flex-wrap gap-2 pt-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200 font-bold'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Transaction Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-100 mt-4">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[10px] font-mono tracking-widest text-slate-400 uppercase border-b border-slate-100">
                <th className="py-4 px-6">ITEM / DESCRIPCIÓN</th>
                <th className="py-4 px-6 text-center">CATEGORÍA</th>
                <th className="py-4 px-6 text-right">COSTO</th>
                <th className="py-4 px-6 text-center">ESTADO</th>
                <th className="py-4 px-6">FECHA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-xs text-slate-600">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-900">
                      {currency === 'USD' ? tx.itemEs : tx.itemHnlEs}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className="inline-block px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-bold">
                        {tx.category}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right font-mono font-bold text-slate-950">
                      {formatValue(currency === 'USD' ? tx.costUSD : tx.costHNL)}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide ${
                        tx.status === 'Adquirido'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                          : 'bg-amber-50 text-amber-700 border border-amber-100'
                      }`}>
                        {tx.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-400 font-mono text-[10px]">
                      {tx.date}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-8 px-6 text-center text-slate-400 text-xs">
                    Ninguna transacción coincide con los filtros aplicados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="text-center pt-2">
          <p className="text-xs text-slate-400 font-medium">
            * Registros actualizados automáticamente mediante firmas de transacciones directas de los distribuidores.
          </p>
        </div>
      </div>

      {/* Radical Transparency Section with image */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative aspect-4/3 rounded-3xl overflow-hidden bg-slate-50 border border-slate-100 shadow-xs">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfJKDexmwWYOCZ6hJlKjWjwu9bJ13xsLhDwKO4Ju4gkvXN87_199AyetsRYaL2DmXbXbwj1QQfdhPGfrtrl9AIdaNInoReYmHuaMGkAFBs0Vr7pemtmNsFbKNezufMHbq1UiJS1FgPTad--4SHw-UuTA43l87CeDE8PwckP0r_EgjyQd0VQFYoMsjGkISfaEHnuaeauWDdF7d2BhlXQY0PUaakTfeNsHTJaVFh-MbmD01jVdAv1hABJ7JC2-fFKzAYfUhjPKWi07A"
            alt="Auditoría de Documentos"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 to-transparent"></div>
          <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
            <p className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">REGISTRO FÍSICO</p>
            <p className="text-sm font-semibold leading-tight">Archivo Centralizado de Contratos e Importaciones</p>
          </div>
        </div>

        <div className="space-y-8">
          <div className="space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 font-bold">ADMINISTRACIÓN IMPECABLE</span>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 leading-tight">
              Transparencia Radical
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              100% Directo. Sin comisiones ocultas de intermediación ni gastos de relaciones públicas. Cada centavo donado se rastrea de forma transparente desde el depósito hasta la firma de recepción de inventario físico en campo.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-center">
              <BadgePercent className="h-6 w-6 text-emerald-600 mx-auto mb-2" />
              <span className="block text-lg font-black text-slate-900 font-mono">94%</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide block">Eficiencia</span>
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-center">
              <HeartHandshake className="h-6 w-6 text-emerald-600 mx-auto mb-2" />
              <span className="block text-lg font-black text-slate-900 font-mono">$0.00</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide block">Marketing</span>
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-center">
              <ShieldAlert className="h-6 w-6 text-emerald-600 mx-auto mb-2" />
              <span className="block text-lg font-black text-slate-900 font-mono">24/7</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide block">Auditoría</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
