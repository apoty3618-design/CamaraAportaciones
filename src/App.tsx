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

const STORAGE_PREFIX = 'alvaro_contreras_v1';
const storageKey = (key: string) => `${STORAGE_PREFIX}_${key}`;

export default function App() {
  // State initialization (persisted in localStorage for complete high-fidelity state retention)
  const [currency, setCurrency] = React.useState<Currency>(() => {
    const saved = localStorage.getItem(storageKey('currency'));
    return (saved as Currency) || 'USD';
  });

  const [currentTab, setCurrentTab] = React.useState<string>(() => {
    const saved = localStorage.getItem(storageKey('tab'));
    return saved || 'inicio';
  });

  const [equipment, setEquipment] = React.useState<EquipmentItem[]>(() => {
    const saved = localStorage.getItem(storageKey('equipment'));
    if (!saved) return INITIAL_EQUIPMENT;

    const savedEquipment = JSON.parse(saved) as EquipmentItem[];
    return savedEquipment.map((item) => {
      const initialItem = INITIAL_EQUIPMENT.find((initial) => initial.id === item.id);
      return initialItem ? { ...item, imageUrl: initialItem.imageUrl } : item;
    });
  });

  const [transactions, setTransactions] = React.useState<FinancialTransaction[]>(() => {
    const saved = localStorage.getItem(storageKey('transactions'));
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  const [donors, setDonors] = React.useState<Donor[]>(() => {
    const saved = localStorage.getItem(storageKey('donors'));
    return saved ? JSON.parse(saved) : INITIAL_DONORS;
  });

  const [receivedMessages, setReceivedMessages] = React.useState<ContactMessage[]>(() => {
    const saved = localStorage.getItem(storageKey('messages'));
    return saved ? JSON.parse(saved) : [];
  });

  // Modal control states
  const [isDonateOpen, setIsDonateOpen] = React.useState(false);
  const [selectedEqToFund, setSelectedEqToFund] = React.useState<EquipmentItem | null>(null);
  const [selectedEqToDetail, setSelectedEqToDetail] = React.useState<EquipmentItem | null>(null);

  // Sync state to local storage
  React.useEffect(() => {
    localStorage.setItem(storageKey('currency'), currency);
  }, [currency]);

  React.useEffect(() => {
    localStorage.setItem(storageKey('tab'), currentTab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentTab]);

  React.useEffect(() => {
    localStorage.setItem(storageKey('equipment'), JSON.stringify(equipment));
  }, [equipment]);

  React.useEffect(() => {
    localStorage.setItem(storageKey('transactions'), JSON.stringify(transactions));
  }, [transactions]);

  React.useEffect(() => {
    localStorage.setItem(storageKey('donors'), JSON.stringify(donors));
  }, [donors]);

  React.useEffect(() => {
    localStorage.setItem(storageKey('messages'), JSON.stringify(receivedMessages));
  }, [receivedMessages]);

  // Goal calculations
  const goalAmountUSD = React.useMemo(() => equipment.reduce((acc, item) => acc + item.costUSD, 0), [equipment]);
  const goalAmountHNL = React.useMemo(() => equipment.reduce((acc, item) => acc + item.costHNL, 0), [equipment]);

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
        // Update equipment array with the donated amount.
        setEquipment((prev) =>
          prev.map((item) => {
            if (item.id !== equipmentId) return item;

            const nextFundedUSD = Math.min(item.costUSD, item.fundedAmountUSD + amountUSD);
            const nextFundedHNL = Math.min(item.costHNL, item.fundedAmountHNL + amountHNL);
            const isFullyFunded = nextFundedUSD >= item.costUSD || nextFundedHNL >= item.costHNL;

            return {
              ...item,
              status: isFullyFunded ? 'Completado' : 'En Progreso',
              fundedAmountUSD: nextFundedUSD,
              fundedAmountHNL: nextFundedHNL,
            };
          })
        );

        // Add corresponding Transaction
        const newTx: FinancialTransaction = {
          id: `tx-custom-${Date.now()}`,
          itemEn: `Contribution for ${eqItem.nameEn}`,
          itemEs: `Aporte para ${eqItem.nameEs}`,
          itemHnlEs: `Aporte para ${eqItem.nameHnlEs}`,
          category: 'Equipamiento',
          costUSD: amountUSD,
          costHNL: amountHNL,
          status: 'Pendiente',
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
    <div className="min-h-screen bg-[radial-gradient(circle_at_15%_8%,#38bdf855,transparent_30rem),radial-gradient(circle_at_86%_10%,#f59e0b40,transparent_26rem),linear-gradient(135deg,#dbeafe_0%,#f0f9ff_45%,#fef3c7_100%)] flex flex-col justify-between selection:bg-sky-200 selection:text-sky-950">
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
                onOpenDonateForEquipment={handleOpenEquipmentDonate}
                equipment={equipment}
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
      <footer className="bg-indigo-950 text-white border-t border-indigo-900 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/10 text-cyan-300 rounded-xl">
                  <Landmark className="h-5 w-5" />
                </div>
                <span className="text-lg font-bold font-sans tracking-tight text-white uppercase">
                  Instituto Gubernamental Alvaro Contreras
                </span>
              </div>
              <p className="text-xs text-indigo-200 leading-relaxed max-w-xs">
                Plataforma de aportes para equipo audiovisual destinado a estudiantes del Instituto Gubernamental Alvaro Contreras.
              </p>
            </div>

            <div>
              <h5 className="text-xs font-mono uppercase tracking-widest text-cyan-100 font-bold mb-4">Navegación</h5>
              <ul className="space-y-2 text-xs text-indigo-200">
                <li><button onClick={() => setCurrentTab('inicio')} className="hover:text-white transition-colors">Inicio</button></li>
                <li><button onClick={() => setCurrentTab('equipo')} className="hover:text-white transition-colors">Equipo</button></li>
                <li><button onClick={() => setCurrentTab('donantes')} className="hover:text-white transition-colors">Donantes</button></li>
                <li><button onClick={() => setCurrentTab('informe')} className="hover:text-white transition-colors">Informe Financiero</button></li>
              </ul>
            </div>

            <div>
              <h5 className="text-xs font-mono uppercase tracking-widest text-cyan-100 font-bold mb-4">Auditoría Legal</h5>
              <ul className="space-y-2 text-xs text-indigo-200">
                <li className="hover:text-white transition-colors cursor-pointer">Privacidad de Datos</li>
                <li className="hover:text-white transition-colors cursor-pointer">Términos del Servicio</li>
                <li className="hover:text-white transition-colors cursor-pointer">Transparencia de Cuentas</li>
                <li className="hover:text-white transition-colors cursor-pointer">Seguridad de Enlaces</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h5 className="text-xs font-mono uppercase tracking-widest text-cyan-100 font-bold mb-4">Misiones Activas</h5>
              <div className="space-y-2 text-xs text-indigo-200">
                <p>Tegucigalpa, Honduras (HQ)</p>
                <p>Comunidades Rurales Integradas</p>
                <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 bg-white/10 border border-white/15 rounded-lg text-[10px] text-cyan-200 font-mono">
                  <div className="h-1.5 w-1.5 rounded-full bg-cyan-300 animate-pulse"></div>
                  <span>100% Enlace Inmutable Directo</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-indigo-300 font-mono">
            <p>&copy; {new Date().getFullYear()} Instituto Gubernamental Alvaro Contreras. Reservados todos los derechos.</p>
            <p className="flex items-center space-x-1">
              <ShieldCheck className="h-4 w-4 text-cyan-300" />
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
