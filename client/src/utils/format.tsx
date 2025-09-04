// utils/format.ts
export const formatPhone = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 11) {
    return `+${cleaned[0]} (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7, 9)}-${cleaned.slice(9)}`;
  }
  return phone;
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatNumber = (num: number, decimals: number = 2): string => {
  return new Intl.NumberFormat('ru-RU', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
};

export const getEnumLabel = (value: string, enumType: string): string => {
  const maps: { [key: string]: { [key: string]: string } } = {
    area: {
      STAVROPOLSKIY_KRAY: 'Ставропольский край',
      ROSTOVSKAYA_OBLAST: 'Ростовская область',
      KRASNODARSKIY_KRAY: 'Краснодарский край',
    },
    vehicleType: {
      ФУРА: 'Фура',
      РЕФРЕЖЕРАТОР: 'Рефрижератор',
      КОНТЕЙНЕРОВОЗ: 'Контейнеровоз',
      БОРТОВОЙ: 'Бортовой',
      Т10: 'Т10',
      Т5: 'Т5',
      ГАЗЕЛЬ: 'Газель',
    },
    vehicleStatus: {
      ACTIVE: 'Активен',
      INACTIVE: 'Неактивен',
      MAINTENANCE: 'На обслуживании',
    },
    rateType: {
      кг: 'За килограмм',
      км: 'За километр',
      кгкм: 'За килограмм-километр',
    },
  };

  return maps[enumType]?.[value] || value;
};