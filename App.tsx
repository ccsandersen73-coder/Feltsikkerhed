import React from 'react';
import SecuritySection from './components/SecuritySection';
import { ShieldIcon, SignalIcon, BoxIcon, MapIcon } from './components/Icons';
import type { SecuritySectionData } from './types';

const securitySections: SecuritySectionData[] = [
  {
    title: 'Personlig sikkerhed',
    Icon: ShieldIcon,
    colorClasses: {
      bg: 'bg-blue-100',
      text: 'text-blue-800',
      border: 'border-blue-500',
      iconBg: 'bg-blue-200'
    },
    checklist: [
      'Kender du den aktuelle beredskabsgrad?',
      'Er din udrustning klargjort?',
      'Er dit våben klargjort?'
    ]
  },
  {
    title: 'Signalsikkerhed',
    Icon: SignalIcon,
    colorClasses: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      border: 'border-green-500',
      iconBg: 'bg-green-200'
    },
    checklist: [
      'Kender du aktuelle koder og legitimationssystemer?',
      'Opbevares signalmateriel og dokumenter korrekt?',
      'Kender du procedurerne for destruktion af signalmateriel, koder og legitimationssystemer?'
    ]
  },
  {
    title: 'Materiel sikkerhed',
    Icon: BoxIcon,
    colorClasses: {
      bg: 'bg-orange-100',
      text: 'text-orange-800',
      border: 'border-orange-500',
      iconBg: 'bg-orange-200'
    },
    checklist: [
      'Har du optalt og ved hvor materiellet er?',
      'Opbevares materiel og sensitivt materiel korrekt?',
      'Kender du proceduren for ødelæggelse af materiellet?'
    ]
  },
  {
    title: 'Operationssikkerhed',
    Icon: MapIcon,
    colorClasses: {
      bg: 'bg-red-100',
      text: 'text-red-800',
      border: 'border-red-500',
      iconBg: 'bg-red-200'
    },
    checklist: [
      'Kender du enhedens opgave og førerens intent?',
      'Opbevares kalker og kort korrekt?',
      'Kender du proceduren for destruktion af kort og kalker?',
      'Er materiel og udrustning til opgaven klargjort og klar?'
    ]
  }
];

const App: React.FC = () => {

  const handleResetChecklists = () => {
    const confirmation = window.confirm(
      "Er du sikker på, at du vil nulstille hele tjeklisten? Dine gemte valg vil blive slettet."
    );

    if (confirmation) {
      // Iterate through sections to find and remove their specific localStorage keys
      securitySections.forEach(section => {
        const storageKey = `feltsikkerhed-checklist-${section.title}`;
        try {
          window.localStorage.removeItem(storageKey);
        } catch (error) {
          console.error(`Could not remove item ${storageKey} from localStorage`, error);
        }
      });
      
      // Reload the page to apply the reset state
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
            Feltsikkerhed
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 mt-2">
            – Tjekliste –
          </p>
        </header>
        
        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {securitySections.map((section, index) => (
            <SecuritySection key={index} {...section} />
          ))}
        </main>

        <footer className="text-center mt-12">
           <div className="mb-6">
            <button
              onClick={handleResetChecklists}
              className="bg-red-600 text-white font-semibold py-2 px-5 rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75 transition-all duration-300 ease-in-out"
              aria-label="Nulstil hele tjeklisten"
            >
              Nulstil Tjekliste
            </button>
          </div>
          <p className="text-slate-500 text-sm">
            Dette er et informationsværktøj. Følg altid gældende ordrer og procedurer.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;