'use client';

import { useState, useEffect } from 'react';
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

interface Holiday {
  date: string;
  public: boolean;
  name: string;
}

const CACHE_KEY = 'holidays_cache';
const CACHE_DURATION = 1000 * 60 * 60 * 24; // 24 hours in milliseconds

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

const BusinessHours = ({ hours }: BusinessHoursProps) => {
  const [publicHolidays, setPublicHolidays] = useState<Holiday[]>([]);
  const [loading, setLoading] = useState(true);
  const [isHoliday, setIsHoliday] = useState(false);

  const fetchHolidays = async () => {
    try {
      // Check cache first
      const cache = localStorage.getItem(CACHE_KEY);
      if (cache) {
        const { data, timestamp } = JSON.parse(cache);
        // Check if cache is still valid (less than 24 hours old)
        if (Date.now() - timestamp < CACHE_DURATION) {
          return data;
        }
      }

      // If no valid cache, fetch from our API
      const response = await fetch('/api/is-holiday');
      if (!response.ok) {
        throw new Error('Failed to fetch holidays');
      }

      const { holidays } = await response.json();

      // Cache the response
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({
          data: holidays,
          timestamp: Date.now(),
        })
      );

      return holidays;
    } catch (error) {
      console.error('Error fetching holidays:', error);
      // If fetch fails, try to use cached data even if expired
      const cache = localStorage.getItem(CACHE_KEY);
      if (cache) {
        const { data } = JSON.parse(cache);
        return data;
      }
      return [];
    }
  };

  const isCurrentDayType = (type: BusinessHourItem['days']): boolean => {
    const today = new Date().getDay();

    switch (type) {
      case 'weekdays':
        return !isHoliday && today >= 1 && today <= 5;
      case 'saturday':
        return !isHoliday && today === 6;
      case 'sunday':
        return !isHoliday && today === 0;
      case 'holidays':
        return isHoliday;
      default:
        return false;
    }
  };

  const checkIfHoliday = () => {
    const today = new Date().toISOString().split('T')[0];
    const isPublicHoliday = publicHolidays.some(
      (holiday) => holiday.date === today && holiday.public
    );
    setIsHoliday(isPublicHoliday);
  };

  useEffect(() => {
    const initialize = async () => {
      setLoading(true);
      const holidays = await fetchHolidays();
      setPublicHolidays(holidays);
      setLoading(false);
    };

    initialize();
  }, []);

  useEffect(() => {
    if (!loading) {
      checkIfHoliday();
      // Check for holiday status change at midnight
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      const timeUntilMidnight = tomorrow.getTime() - now.getTime();

      const timeout = setTimeout(() => {
        checkIfHoliday();
      }, timeUntilMidnight);

      return () => clearTimeout(timeout);
    }
  }, [loading, publicHolidays]);

  if (loading) {
    return (
      <div className="w-full border-t pt-4 mt-4 animate-pulse">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-5 h-5 bg-gray-200 rounded" />
          <div className="h-6 w-48 bg-gray-200 rounded" />
        </div>
        <div className="space-y-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex justify-between">
              <div className="h-4 w-32 bg-gray-200 rounded" />
              <div className="h-4 w-24 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

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
                key={hour._key || index}
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
