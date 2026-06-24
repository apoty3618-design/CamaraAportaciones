/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Currency, EquipmentItem, FinancialTransaction, Donor, ContactMessage } from './types';
import { 
  INITIAL_EQUIPMENT, 
  INITIAL_TRANSACTIONS, 
  INITIAL_DONORS 
} from './data';
import Header from './components/Header';
import HomeView from './components/HomeView';
import EquipmentView from './components/EquipmentView';
import DonorsView from './components/DonorsView';
import ReportView from './components/ReportView';
import ContactView from './components/ContactView';
import DonationModal from './components/DonationModal';
import EquipmentDetailModal from './components/EquipmentDetailModal';
import { AnimatePresence, motion } from 'motion/react';
import { Landmark, CheckCircle, ShieldCheck } from 'lucide-react';

export default function App() {
  // State initialization (persisted in localStorage for complete high-fidelity state retention)
  const [currency, setCurrency] = React.useState<Currency>(() => {
    const saved = localStorage.getItem('impacto_currency');
    return (saved as Currency) || 'USD';
  });

  const [currentTab, setCurrentTab] = React.useState<string>(() => {
    const saved = localStorage.getItem('impacto_tab');
    return saved || 'inicio';
  });

  const [equipment, setEquipment] = React.useState<EquipmentItem[]>(() => {
    const saved = localStorage.getItem('impacto_equipment');
    return saved ? JSON.parse(saved) : INITIAL_EQUIPMENT;
  });

  const [transactions, setTransactions] = React.useState<FinancialTransaction[]>(() => {
    const saved = localStorage.getItem('impacto_transactions');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  const [donors, setDonors] = React.useState<Donor[]>(() => {
    const saved = localStorage.getItem('impacto_donors');
    return saved ? JSON.parse(saved) : INITIAL_DONORS;
  });

  const [receivedMessages, setReceivedMessages] = React.useState<ContactMessage[]>(() => {
    const saved = localStorage.getItem('impacto_messages');
    return saved ? JSON.parse(saved) : [];
  });

  // Modal control states
  const [isDonateOpen, setIsDonateOpen] = React.useState(false);
  const [selectedEqToFund, setSelectedEqToFund] = React.useState<EquipmentItem | null>(null);
  const [selectedEqToDetail, setSelectedEqToDetail] = React.useState<EquipmentItem | null>(null);

  // Sync state to local storage
  React.useEffect(() => {
    localStorage.setItem('impacto_currency', currency);
  }, [currency]);

  React.useEffect(() => {
    localStorage.setItem('impacto_tab', currentTab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentTab]);

  React.useEffect(() => {
    localStorage.setItem('impacto_equipment', JSON.stringify(equipment));
  }, [equipment]);

  React.useEffect(() => {
    localStorage.setItem('impacto_transactions', JSON.stringify(transactions));
  }, [transactions]);

  React.useEffect(() => {
    localStorage.setItem('impacto_donors', JSON.stringify(donors));
  }, [donors]);

  React.useEffect(() => {
    localStorage.setItem('impacto_messages', JSON.stringify(receivedMessages));
  }, [receivedMessages]);

  // Goal calculations
  const goalAmountUSD = 5000;
  const goalAmountHNL = 125000;

  const totalDonatedUSD = React.useMemo(() => {
    return transactions.reduce((acc, tx) => acc + tx.costUSD, 0);
  }, [transactions]);

  const totalDonatedHNL = React.useMemo(() => {
    return transactions.reduce((acc, tx) => acc + tx.costHNL, 0);
  }, [transactions]);

  // Donation submission handler
  const handleDonationSubmit = (
    name: string,
    category: 'Individual' | 'Anónimo' | 'Socio Fundador',
    amountUSD: number,
    amountHNL: number,
    message: string,
    equipmentId?: string
  ) => {
    const dateObj = new Date();
    const formattedDate = dateObj.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

    // 1. Create and add new Donor
    const newDonor: Donor = {
      id: `dn-custom-${Date.now()}`,
      name,
      category,
      amountUSD,
      amountHNL,
      date: formattedDate,
      message: message.trim() || undefined,
      isCustom: true,
    };
    setDonors((prev) => [newDonor, ...prev]);

    // 2. Handle Equipment specific funding or general funding
    if (equipmentId) {
      // Find the specific equipment being funded
      const eqItem = equipment.find((e) => e.id === equipmentId);
      if (eqItem) {
        // Update equipment array
        setEquipment((prev) =>
          prev.map((item) =>
            item.id === equipmentId
              ? {
                  ...item,
                  status: 'Completado',
                  fundedAmountUSD: item.costUSD,
                  fundedAmountHNL: item.costHNL,
                }
              : item
          )
        );

        // Add corresponding Transaction
        const newTx: FinancialTransaction = {
          id: `tx-custom-${Date.now()}`,
          itemEn: `Acquisition of ${eqItem.nameEn}`,
          itemEs: `Adquisición ${eqItem.nameEs}`,
          itemHnlEs: `Adquisición ${eqItem.nameHnlEs}`,
          category: 'Equipamiento',
          costUSD: eqItem.costUSD,
          costHNL: eqItem.costHNL,
          status: 'Adquirido',
          date: formattedDate,
        };
        setTransactions((prev) => [newTx, ...prev]);
      }
    } else {
      // General fund donation adds to operational reserve
      const newTx: FinancialTransaction = {
        id: `tx-custom-${Date.now()}`,
        itemEn: `General Contribution to Reserve Fund`,
        itemEs: `Contribución General a Fondo de Reserva`,
        itemHnlEs: `Fondo de Garantía de Transparencia`,
        category: 'Operativo',
        costUSD: amountUSD,
        costHNL: amountHNL,
        status: 'Adquirido',
        date: formattedDate,
      };
      setTransactions((prev) => [newTx, ...prev]);
    }
  };

  // Contact form submission handler
  const handleContactSubmit = (name: string, email: string, message: string) => {
    const dateObj = new Date();
    const formattedDate = dateObj.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

    const newMsg: ContactMessage = {
      id: `msg-${Date.now()}`,
      name,
      email,
      message,
      date: formattedDate,
    };
    setReceivedMessages((prev) => [newMsg, ...prev]);
  };

  const handleOpenGeneralDonate = () => {
    setSelectedEqToFund(null);
    setIsDonateOpen(true);
  };

  const handleOpenEquipmentDonate = (eq: EquipmentItem) => {
    setSelectedEqToFund(eq);
    setIsDonateOpen(true);
  };

  const handleViewEquipmentDetails = (eq: EquipmentItem) => {
    setSelectedEqToDetail(eq);
  };

  // Helper function to format general values
  const formatValue = (val: number) => {
    if (currency === 'USD') {
      return `$${val.toLocaleString()}`;
    }
    return `L ${val.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between selection:bg-emerald-100 selection:text-emerald-800">
      {/* Navigation Header */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        currency={currency}
        setCurrency={setCurrency}
        onOpenDonate={handleOpenGeneralDonate}
        totalDonated={currency === 'USD' ? totalDonatedUSD : totalDonatedHNL}
        goalAmount={currency === 'USD' ? goalAmountUSD : goalAmountHNL}
      />

      {/* Main Body Stage */}
      <main className="flex-grow py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            {currentTab === 'inicio' && (
              <HomeView
                currency={currency}
                setCurrentTab={setCurrentTab}
                onOpenDonate={handleOpenGeneralDonate}
                transactions={transactions}
                onSubmitMessage={handleContactSubmit}
              />
            )}

            {currentTab === 'equipo' && (
              <EquipmentView
                equipment={equipment}
                currency={currency}
                onOpenDonateForEquipment={handleOpenEquipmentDonate}
                onViewEquipmentDetails={handleViewEquipmentDetails}
                onOpenDonate={handleOpenGeneralDonate}
              />
            )}

            {currentTab === 'donantes' && (
              <DonorsView
                donors={donors}
                currency={currency}
                onOpenDonate={handleOpenGeneralDonate}
              />
            )}

            {currentTab === 'informe' && (
              <ReportView
                transactions={transactions}
                currency={currency}
                totalDonated={currency === 'USD' ? totalDonatedUSD : totalDonatedHNL}
                goalAmount={currency === 'USD' ? goalAmountUSD : goalAmountHNL}
              />
            )}

            {currentTab === 'contacto' && (
              <ContactView
                onSubmitMessage={handleContactSubmit}
                receivedMessages={receivedMessages}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Corporate & Beautiful Footer */}
      <footer className="bg-slate-900 text-white border-t border-slate-800 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-slate-800 text-emerald-400 rounded-xl">
                  <Landmark className="h-5 w-5" />
                </div>
                <span className="text-lg font-bold font-sans tracking-tight text-white uppercase">
                  IMPACTO
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-xs">
                Plataforma integral de transparencia de recursos dedicados a misiones de equipamiento STEM y registro de desarrollo en campo.
              </p>
            </div>

            <div>
              <h5 className="text-xs font-mono uppercase tracking-widest text-slate-300 font-bold mb-4">Navegación</h5>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><button onClick={() => setCurrentTab('inicio')} className="hover:text-white transition-colors">Inicio</button></li>
                <li><button onClick={() => setCurrentTab('equipo')} className="hover:text-white transition-colors">Equipo</button></li>
                <li><button onClick={() => setCurrentTab('donantes')} className="hover:text-white transition-colors">Donantes</button></li>
                <li><button onClick={() => setCurrentTab('informe')} className="hover:text-white transition-colors">Informe Financiero</button></li>
              </ul>
            </div>

            <div>
              <h5 className="text-xs font-mono uppercase tracking-widest text-slate-300 font-bold mb-4">Auditoría Legal</h5>
              <ul className="space-y-2 text-xs text-slate-400">
                <li className="hover:text-white transition-colors cursor-pointer">Privacidad de Datos</li>
                <li className="hover:text-white transition-colors cursor-pointer">Términos del Servicio</li>
                <li className="hover:text-white transition-colors cursor-pointer">Transparencia de Cuentas</li>
                <li className="hover:text-white transition-colors cursor-pointer">Seguridad de Enlaces</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h5 className="text-xs font-mono uppercase tracking-widest text-slate-300 font-bold mb-4">Misiones Activas</h5>
              <div className="space-y-2 text-xs text-slate-400">
                <p>Tegucigalpa, Honduras (HQ)</p>
                <p>Comunidades Rurales Integradas</p>
                <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 bg-slate-800 border border-slate-700 rounded-lg text-[10px] text-emerald-400 font-mono">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                  <span>100% Enlace Inmutable Directo</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-mono">
            <p>&copy; {new Date().getFullYear()} IMPACTO. Reservados todos los derechos.</p>
            <p className="flex items-center space-x-1">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              <span>Garantía de Gestión y Transparencia Radical</span>
            </p>
          </div>
        </div>
      </footer>

      {/* Global Donation Drawer/Modal */}
      <DonationModal
        isOpen={isDonateOpen}
        onClose={() => setIsDonateOpen(false)}
        currency={currency}
        selectedEquipment={selectedEqToFund}
        onSubmitDonation={handleDonationSubmit}
      />

      {/* Global Equipment Detail Slideover/Modal */}
      <EquipmentDetailModal
        isOpen={selectedEqToDetail !== null}
        item={selectedEqToDetail}
        onClose={() => setSelectedEqToDetail(null)}
        currency={currency}
        onOpenDonate={handleOpenEquipmentDonate}
      />
    </div>
  );
}
