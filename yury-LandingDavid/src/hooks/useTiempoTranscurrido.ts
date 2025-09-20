import { Temporal } from '@js-temporal/polyfill';
import { useState, useEffect } from 'react';

interface TiempoTranscurrido {
  days: number;
  hours: number;
  minutes: number;
}

export function useTiempoTranscurrido(isoDate: string): TiempoTranscurrido | null {
  const [tiempo, setTiempo] = useState<TiempoTranscurrido | null>(null);

  useEffect(() => {
    const calcular = () => {
      try {
        // Parsear la fecha ISO como ZonedDateTime en UTC (para manejar días)
        const past = Temporal.Instant.from(isoDate).toZonedDateTimeISO('utc');

        // Fecha actual en UTC
        const now = Temporal.Now.zonedDateTimeISO('utc');

        // Calcular diferencia con día como unidad máxima
        const diff = now.since(past, {
          largestUnit: 'day', // ✅ Ahora válido porque usamos ZonedDateTime
          smallestUnit: 'minute',
          roundingMode: 'trunc', // ✅ 'trunc', no 'truncate' → este es el valor correcto
        });

        setTiempo({
          days: diff.days,
          hours: diff.hours,
          minutes: diff.minutes,
        });
      } catch (e) {
        console.error('Error al calcular tiempo transcurrido:', e);
        setTiempo(null);
      }
    };

    calcular();
    const interval = setInterval(calcular, 60000);
    return () => clearInterval(interval);
  }, [isoDate]);

  return tiempo;
}