
import React from 'react';

export const Header: React.FC = () => (
  <header className="text-center">
    <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-500">
      Humanizador de IA
    </h1>
    <p className="mt-2 text-lg text-slate-400">
      Verifique se o seu texto foi criado por IA e transforme-o para soar mais natural.
    </p>
  </header>
);
