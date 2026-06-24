/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { EquipmentItem, FinancialTransaction, Donor } from './types';

export const INITIAL_EQUIPMENT: EquipmentItem[] = [
  {
    id: 'eq-1',
    nameEn: 'Data Workstation',
    nameEs: 'Estación de Datos',
    nameHnlEs: 'Canon EOS R100 Kit',
    category: 'Hardware',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC55u_knUDEJMna2mAfzkUNdK9QWrSWlGqiCYASBZSqH3BG3yZvS9qNw7x0hEgxoTacFZ4HO0v0fy3XIxeHhnQ61EvC3he7sphQWG7WC35_hJB09FpqyjrwKPCiF0zOWMv_2xZV9Jtx3k-NugAjZ8bjinBKTEEbCNmHgkL7Zf1aRLQxeIK61uYTTwqA_C_7yXeq19fXH0_9DBb06jxbj563OK2OZV-8kWoTpC0rdIctXAm7K7UHUcgR4bXb5ltD9tmxwUYox4-avl8',
    costUSD: 740,
    costHNL: 18500,
    specsEn: 'High-performance processor for massive storage and field data analysis.',
    specsEs: 'Procesador de alto rendimiento para almacenamiento masivo y análisis de datos de campo.',
    specsHnlEs: 'Cámara sin espejo ultra-compacta, ideal para el registro audiovisual de alta resolución y testimonios.',
    status: 'Completado',
    fundedAmountUSD: 740,
    fundedAmountHNL: 18500,
  },
  {
    id: 'eq-2',
    nameEn: 'Pro Lighting Set',
    nameEs: 'Iluminación Pro',
    nameHnlEs: 'Kit Iluminación Godox ML30',
    category: 'Producción',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAeAQAS195oCh9eqN1NJQA7-gx0SHXxYqZ3g3NsQ6JBZ02b2AAoBgeqhwczcnNXBJxAVPL3TGyY-NPgJWhirUhgWrq7G1V5P_6vOv1qogXMfdEDTsYQXIA89420-4wmYuaEI-JkLBf79T-bxRrpfEK1xgNcwkwjDOQggIlq_fuCrr0lZUAbNka-ij7OwJKJs_PPpaLadvpuknsZQWiKgmuEtM0_qOdp_bNKWeb2gkEYA3E4xdbNnz2i7kEbAoDoIAYcbjncb5aunY4',
    costUSD: 500,
    costHNL: 12400,
    specsEn: 'High-fidelity LED spot, long-lasting portable battery for outdoor locations.',
    specsEs: 'Foco LED de alta fidelidad, batería portátil de larga duración para locación.',
    specsHnlEs: 'Kit de luces LED portátiles de alta fidelidad cromática para entrevistas y tomas nocturnas.',
    status: 'Completado',
    fundedAmountUSD: 500,
    fundedAmountHNL: 12400,
  },
  {
    id: 'eq-3',
    nameEn: 'Dual Audio System',
    nameEs: 'Equipo de Audio',
    nameHnlEs: 'DJI Mic Mini',
    category: 'Audio',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_7aGk1gu6x2fDR0xqkxVXYZoAawxGwLIBdU4-L83oQzubF2Zvem5li62zruPjmNriSHsBl6pehQtpQVwMofDp9bfU6v2eAFSXtXKxd7G8hSD3mmzo2My5agM-nvMPuYPxfQsxw32W2u4qfH37iFsuz79NR1XHSrXHIPfKetcWECBfPxeTBb60Vo8mZpWi2__oc0rGQIjZCWE0oGyzAsmrjnlSrndYP7b0hYsEY3-qMqvQJxQrrqD9kBYh8mDj-7kZxuseBc5Jg6Q',
    costUSD: 250,
    costHNL: 6200,
    specsEn: 'Dual wireless system, ideal for interviews and field testimony registration.',
    specsEs: 'Sistema inalámbrico dual, ideal para entrevistas y registro de testimonios en campo.',
    specsHnlEs: 'Micrófono de solapa ultra-portátil con cancelación de ruido inteligente y estuche de carga activa.',
    status: 'Completado',
    fundedAmountUSD: 250,
    fundedAmountHNL: 6200,
  },
  {
    id: 'eq-4',
    nameEn: 'Satellite Connectivity Kit',
    nameEs: 'Kit Conectividad',
    nameHnlEs: 'Kit Conectividad Starlink',
    category: 'Redes',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKdTObh0RcFgsySItZcIHM0ZmRCfaZrXNhXtE_dk0VH7_NvJSMKS6ZACE0fPpLaKhbVmxc09Q3KPoTJY1zwSESHxpTlP9fEmKYeAE4JDdpYBHlflx4SNODPf4caUdBT3vvFu1JhlEGI-RRK0mRYDN5U5PVyflVadh-cIdHfsTn0yk6vuHzyZamCWGKh8fzGe_LDwMDyH5s5itEINxffsAjL8z5TFPXZLpuW15ygPkyRdX9rfO72z-Zto6DUVTvwpeYYTck4VIHo4w',
    costUSD: 350,
    costHNL: 8750,
    specsEn: 'Portable satellite antenna and heavy-duty modem for connection in rural zones.',
    specsEs: 'Antena satelital portátil y módem de alta resistencia para conexión en zonas rurales.',
    specsHnlEs: 'Equipo de enlace satelital de alta velocidad para transmisión en directo desde comunidades aisladas.',
    status: 'Pendiente',
    fundedAmountUSD: 0,
    fundedAmountHNL: 0,
  },
  {
    id: 'eq-5',
    nameEn: 'Mobile Logistics Case',
    nameEs: 'Logística Móvil',
    nameHnlEs: 'Maleta Ultra-Resistente Peli',
    category: 'Logística',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9UDR7tAYQ3PYMncr1OcTaBasFNxCAva4toP9VfYsTze1UNqNkhdAyNJhSf7_VuhPnjn-6IZzkVUccMJQOv0flcy9c5quDdMuWNdYemVzCgil7NXhBeFatIlSlie_CZfpat52-llWgHr2ECVMYLW1wutc9L_ZyIgIZJhT5tFxZ4AixLsQBJGSCYJMYroKX78UFHXp6rtmH8GhtscyWEMll6VH5y80qQ-Lv213bqKv36AHD4rtFn0fjoLnxKOevQ-A7L_pS7zHnnPI',
    costUSD: 200,
    costHNL: 5000,
    specsEn: 'Waterproof rigid case and thermal organizer for equipment protection in transit.',
    specsEs: 'Maleta rígida impermeable y organizador térmico para protección de equipos en ruta.',
    specsHnlEs: 'Estuche hermético antichoque con espuma modular para resguardar lentes y micrófonos sensibles.',
    status: 'Pendiente',
    fundedAmountUSD: 0,
    fundedAmountHNL: 0,
  }
];

export const INITIAL_TRANSACTIONS: FinancialTransaction[] = [
  {
    id: 'tx-1',
    itemEn: 'Canon EOS R100 Kit Acquisition',
    itemEs: 'Adquisición Estación de Datos',
    itemHnlEs: 'Adquisición Canon EOS R100 Kit',
    category: 'Equipamiento',
    costUSD: 740,
    costHNL: 18500,
    status: 'Adquirido',
    date: '12 Mar 2026',
  },
  {
    id: 'tx-2',
    itemEn: 'Godox ML30 Lighting Kit Acquisition',
    itemEs: 'Adquisición Iluminación Pro',
    itemHnlEs: 'Adquisición Kit Iluminación Godox ML30',
    category: 'Equipamiento',
    costUSD: 500,
    costHNL: 12400,
    status: 'Adquirido',
    date: '10 Mar 2026',
  },
  {
    id: 'tx-3',
    itemEn: 'DJI Mic Mini Audio System Acquisition',
    itemEs: 'Adquisición Equipo de Audio',
    itemHnlEs: 'Adquisición DJI Mic Mini',
    category: 'Equipamiento',
    costUSD: 250,
    costHNL: 6200,
    status: 'Adquirido',
    date: '05 Mar 2026',
  },
  {
    id: 'tx-4',
    itemEn: 'Security & Reserve Guarantee Fund',
    itemEs: 'Fondo de Reserva Operativo',
    itemHnlEs: 'Fondo de Garantía de Transparencia',
    category: 'Operativo',
    costUSD: 100,
    costHNL: 2650,
    status: 'En Tránsito',
    date: '01 Mar 2026',
  }
];

export const INITIAL_DONORS: Donor[] = [
  {
    id: 'dn-1',
    name: 'María Fernanda R.',
    category: 'Socio Fundador',
    amountUSD: 500,
    amountHNL: 12500,
    date: '14 Mar 2026',
    message: 'Apoyando la educación técnica y el registro del impacto en comunidades rurales.',
  },
  {
    id: 'dn-2',
    name: 'Carlos Mendoza',
    category: 'Individual',
    amountUSD: 340,
    amountHNL: 8500,
    date: '11 Mar 2026',
    message: '¡Excelente iniciativa de transparencia radical! Que sigan los éxitos.',
  },
  {
    id: 'dn-3',
    name: 'Donante Anónimo',
    category: 'Anónimo',
    amountUSD: 200,
    amountHNL: 5000,
    date: '09 Mar 2026',
    message: 'Para el futuro y empoderamiento de los jóvenes técnicos.',
  },
  {
    id: 'dn-4',
    name: 'Lucía Torres',
    category: 'Individual',
    amountUSD: 150,
    amountHNL: 3750,
    date: '06 Mar 2026',
    message: '¡Adelante con el equipamiento del equipo de campo!',
  },
  {
    id: 'dn-5',
    name: 'Juan Pablo G.',
    category: 'Individual',
    amountUSD: 100,
    amountHNL: 2500,
    date: '02 Mar 2026',
    message: 'Aporto con mi granito de arena para garantizar una logística móvil segura.',
  }
];

export const SPONSORS = [
  {
    name: 'TechCorp',
    logoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2hO759Cx1kc2ilj19QF5WNCuOuPrEeCxSIbXhsr79pY-HeBVSzAJIQQ8SGe9Xit1zcGHmdnjg7n1kC-OuiYuz2GRK93_7pHb4YbYB_zRuuh6-oVyqB4I5oCdw1CkA0ZBDaVjMfTCGc_GbtD1417ozUxNb_qupYnryw1iBgXfGjYPv2B-0uj4Cb2S51Zn1dUqYffLc0moxGo3_5BjD7ctCeNtK4lxzUwWsYjZ_oKBsovRDHA1H8fGJ2V2WrkPs0A9Mr2VK4g8hLQM',
  },
  {
    name: 'GreenSeed',
    logoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBaPWoZvmrvJeTASWlvmCRTk88C95f0eNWs2gDqy3CBdgjfTZxDo0rZv7GJSZ8uLKv_9nmK27Prr9wHAx5eFNAZEV8Vh13lMe86E1drUhtRv6tDXmZR1Neq3HxUf7ygbddZJIm9OShRxXD0HlLWBgxM121kR58cKVQoSbIpjMzfk5D05ScrBuCnUjWRaqMmARYGUqZX44CcZcorxvf0KtUP0uNCBvQdRYIqrugxKKPytuaJn5ARhQhOrZx37KfIBAjd8zUrm0U5SsU',
  },
  {
    name: 'OpenLabs',
    logoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-HJ0vbQB13nhv_is-ehyUOPDB0R7WxaTunwmtFj3t9oM9UiaxdiiQ88o_qKhdnmYESdoT5sYcVj8_ULi_XcXOl09mCS9kCciES-jGMl9RcYUhHb8wt7uRQMT5bHQEKSrmaAcACLYo3SiOvF2ko9xYCTEECv8JHCt6HbxQ06WgcDAkoo94BCNWeCOc-jdwCTJE2rC_KAFgDtZ3TTRQm6bVfqOZmdyfpftCLMQqJy2hQxVCwrBYfVCkGdN76w_8irVM30_MykCGFe4',
  },
  {
    name: 'ImpactAlpha',
    logoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFaPfp3EOo53Gdh3R60eupxwoUwT85ODqfLR3vVLczJD3MPeNieHa_F_RzBscvBn0my6M5Iwb66sjraCQyO7RYBZIDa1-jIBwDt-NEo6XS_e0BoM1s0M5U7guLiiTZfGWTcHm1X69oHDAMfPc8SXXKv-Brsk4o83PKLXKwRu7o-5g6l-vxyFZwwXUmA9OIpHd6Sw2NkG8hOe_7wXb5wW9hHbDPLnEv47yKxzw4NnqCQYRqBCCoVTjrdbvrZJzWWXbEYcvOjfXNPPk',
  },
  {
    name: 'Nexo',
    logoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCIC3SJF_io55DnnvgJQTJtWFmcVmDzx4RIdu4QEvA560C158Q9KLFW6mCxlDjeo6lhaLSbEUNpDRCMYvgLDm7z3KvJ9Iz5GXW9u-2LjsNgoYkUKGsb-Zj0MuCE1FqKmTUbsgW6-5Z0gDf2ipYH_ns-1YXwbq44t06HdebigcHH_M9Ia2MjqVZnyUg65xEHtZtkEyE5NYzVtBozAqJ_V4r9tRvqukKiGMsIPF8zb3NkvogJEZlCIVKvBlk3Sv9e4mmFBYuq-3lr2WM',
  }
];
