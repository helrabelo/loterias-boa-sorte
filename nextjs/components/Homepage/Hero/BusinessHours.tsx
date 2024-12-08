import React from 'react';
import { FaClock } from 'react-icons/fa';

type BusinessHourItem = {
  days?: 'weekdays' | 'saturday' | 'sunday' | 'holidays';
  hours?: string;
  closed?: boolean;
  _key: string;
};

interface BusinessHoursProps {
  hours: BusinessHourItem[];
}

const getDayLabel = (type: BusinessHourItem['days']) => {
  switch (type) {
    case 'weekdays':
      return 'Segunda à Sexta';
    case 'saturday':
      return 'Sábado';
    case 'sunday':
      return 'Domingo';
    case 'holidays':
      return 'Feriados';
    default:
      return '';
  }
};

const isCurrentDayType = (type: BusinessHourItem['days']): boolean => {
  const today = new Date().getDay();

  switch (type) {
    case 'weekdays':
      return today >= 1 && today <= 5;
    case 'saturday':
      return today === 6;
    case 'sunday':
      return today === 0;
    case 'holidays':
      return false;
    default:
      return false;
  }
};

const BusinessHours = ({ hours }: BusinessHoursProps) => {
  return (
    <div className="w-full border-t pt-4 mt-4">
      <div className="flex items-center gap-2 mb-2 text-semantic-primary">
        <FaClock size={20} />
        <span className="font-semibold">Horário de Funcionamento</span>
      </div>

      <div className="space-y-1">
        {hours.map(
          (hour, index) =>
            hour.days && (
              <div
                key={index}
                className={`flex justify-between text-sm ${
                  isCurrentDayType(hour.days)
                    ? 'text-semantic-primary font-semibold'
                    : 'text-gray-600'
                }`}
              >
                <span>{getDayLabel(hour.days)}</span>
                <span>{hour.closed ? 'Fechado' : hour.hours}</span>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default BusinessHours;
