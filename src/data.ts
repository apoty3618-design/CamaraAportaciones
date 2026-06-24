/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Donor, EquipmentItem, FinancialTransaction } from './types';

export const INITIAL_EQUIPMENT: EquipmentItem[] = [
  {
    id: 'eq-1',
    nameEn: 'Canon EOS R100 Camera',
    nameEs: 'Camara Canon EOS R100',
    nameHnlEs: 'Canon EOS R100 Kit',
    category: 'Hardware',
    imageUrl: 'https://latiendadelfotografohn.com/wp-content/uploads/2024/01/1684885699_IMG_2003080.jpg',
    costUSD: 740,
    costHNL: 18500,
    specsEn: 'Mirrorless camera for high-resolution audiovisual registration and student productions.',
    specsEs: 'Camara sin espejo para registro audiovisual de alta resolucion y producciones estudiantiles.',
    specsHnlEs: 'Camara sin espejo ultra-compacta, ideal para registro audiovisual de alta resolucion y testimonios.',
    status: 'Pendiente',
    fundedAmountUSD: 0,
    fundedAmountHNL: 0,
  },
  {
    id: 'eq-2',
    nameEn: 'Godox ML30 Lighting Kit',
    nameEs: 'Kit Iluminacion Godox ML30',
    nameHnlEs: 'Kit Iluminacion Godox ML30',
    category: 'Produccion',
    imageUrl: 'https://m.media-amazon.com/images/I/81DOO9pjGaL._AC_UF894,1000_QL80_.jpg',
    costUSD: 500,
    costHNL: 12400,
    specsEn: 'High-fidelity LED spot, long-lasting portable battery for indoor and field locations.',
    specsEs: 'Foco LED de alta fidelidad con solucion portatil para entrevistas y tomas en interiores.',
    specsHnlEs: 'Kit de luces LED portatiles de alta fidelidad cromatica para entrevistas y tomas nocturnas.',
    status: 'Pendiente',
    fundedAmountUSD: 0,
    fundedAmountHNL: 0,
  },
  {
    id: 'eq-3',
    nameEn: 'DJI Mic Mini',
    nameEs: 'DJI Mic Mini',
    nameHnlEs: 'DJI Mic Mini',
    category: 'Audio',
    imageUrl: 'https://m.media-amazon.com/images/I/61GgCksX24L._AC_UF894,1000_QL80_.jpg',
    costUSD: 250,
    costHNL: 6200,
    specsEn: 'Compact wireless system, ideal for interviews and student testimony registration.',
    specsEs: 'Sistema inalambrico compacto, ideal para entrevistas y registro de testimonios estudiantiles.',
    specsHnlEs: 'Microfono de solapa ultra-portatil con cancelacion de ruido inteligente y estuche de carga activa.',
    status: 'Pendiente',
    fundedAmountUSD: 0,
    fundedAmountHNL: 0,
  },
];

export const INITIAL_TRANSACTIONS: FinancialTransaction[] = [];

export const INITIAL_DONORS: Donor[] = [];

export const SPONSORS: { name: string; logoUrl: string }[] = [];
