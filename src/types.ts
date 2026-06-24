/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Currency = 'USD' | 'HNL';

export interface EquipmentItem {
  id: string;
  nameEn: string;
  nameEs: string;
  nameHnlEs: string; // e.g. "DJI Mic Mini" vs "Equipo de Audio"
  category: string;
  imageUrl: string;
  costUSD: number;
  costHNL: number;
  specsEn: string;
  specsEs: string;
  specsHnlEs: string;
  status: 'Completado' | 'Pendiente' | 'En Progreso';
  fundedAmountUSD: number;
  fundedAmountHNL: number;
}

export interface FinancialTransaction {
  id: string;
  itemEn: string;
  itemEs: string;
  itemHnlEs: string;
  category: 'Equipamiento' | 'Logística' | 'Operativo' | 'Infraestructura';
  costUSD: number;
  costHNL: number;
  status: 'Adquirido' | 'Pendiente' | 'En Tránsito';
  date: string;
}

export interface Donor {
  id: string;
  name: string;
  category: 'Individual' | 'Institucional' | 'Socio Fundador' | 'Anónimo';
  amountUSD: number;
  amountHNL: number;
  date: string;
  message?: string;
  isCustom?: boolean;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
}
