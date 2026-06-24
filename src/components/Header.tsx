/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Currency } from '../types';
import { Heart, Coins, Menu, X, Landmark } from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  onOpenDonate: () => void;
  totalDonated: number;
  goalAmount: number;
}

export default function Header({
  currentTab,
  setCurrentTab,
  currency,
  setCurrency,
  onOpenDonate,
  totalDonated,
  goalAmount,
}: HeaderProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'equipo', label: 'Equipo' },
    { id: 'donantes', label: 'Donantes' },
    { id: 'informe', label: 'Informe' },
    { id: 'contacto', label: 'Contacto' },
  ];

  const formatValue = (val: number) => {
    if (currency === 'USD') {
      return `$${val.toLocaleString()}`;
    }
    return `L ${val.toLocaleString()}`;
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentTab('inicio')}>
            <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-600 transition-all hover:bg-emerald-100">
              <Landmark className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xl font-bold font-sans tracking-tight text-slate-900 block leading-none">
                IMPACTO
              </span>
              <span className="text-[10px] text-slate-400 font-mono tracking-wider uppercase block mt-1">
                TRANSPARENCIA RADICAL
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  currentTab === item.id
                    ? 'text-emerald-700 bg-emerald-50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Controls & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Currency Selector Toggle */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/50">
              <button
                onClick={() => setCurrency('USD')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
                  currency === 'USD'
                    ? 'bg-white text-slate-800 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                USD $
              </button>
              <button
                onClick={() => setCurrency('HNL')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
                  currency === 'HNL'
                    ? 'bg-white text-slate-800 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                HNL L
              </button>
            </div>

            {/* Quick Status Pill */}
            <div className="hidden lg:flex items-center space-x-1.5 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg text-xs font-mono text-slate-500">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span>Meta: {formatValue(totalDonated)} / {formatValue(goalAmount)}</span>
            </div>

            {/* Contribute CTA Button */}
            <button
              onClick={onOpenDonate}
              className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 transform hover:-translate-y-0.5 shadow-sm shadow-emerald-600/10 active:translate-y-0"
            >
              <Heart className="h-4 w-4 fill-current" />
              <span>Contribuir</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-3">
            {/* Mobile Currency Selector */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200/50 text-[10px]">
              <button
                onClick={() => setCurrency('USD')}
                className={`px-2 py-1 rounded text-xs font-bold ${
                  currency === 'USD' ? 'bg-white text-slate-800 shadow-xs' : 'text-slate-500'
                }`}
              >
                $
              </button>
              <button
                onClick={() => setCurrency('HNL')}
                className={`px-2 py-1 rounded text-xs font-bold ${
                  currency === 'HNL' ? 'bg-white text-slate-800 shadow-xs' : 'text-slate-500'
                }`}
              >
                L
              </button>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white py-3 px-4 space-y-2 animate-fadeIn">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setCurrentTab(item.id);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all ${
                currentTab === item.id
                  ? 'text-emerald-700 bg-emerald-50'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-3 border-t border-slate-100 flex flex-col space-y-3">
            <div className="text-center text-xs font-mono text-slate-500">
              Fondeado: {formatValue(totalDonated)} / {formatValue(goalAmount)}
            </div>
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenDonate();
              }}
              className="w-full inline-flex items-center justify-center space-x-2 bg-emerald-600 text-white py-3 rounded-xl text-base font-semibold transition-all hover:bg-emerald-700"
            >
              <Heart className="h-5 w-5 fill-current" />
              <span>Contribuir</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
