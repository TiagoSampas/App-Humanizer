
import React from 'react';
import { AnalysisResultType } from '../types';

interface ResultCardProps {
  resultType: AnalysisResultType;
}

const RobotIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V8a5 5 0 015-5v0a5 5 0 015 5v8" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a2 2 0 100 4h10a2 2 0 100-4H7z" />
    </svg>
);

const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const QuestionMarkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const resultConfig = {
    [AnalysisResultType.AI]: {
        icon: <RobotIcon />,
        title: 'Conteúdo Gerado por IA',
        description: 'A nossa análise indica uma alta probabilidade deste texto ter sido gerado por uma inteligência artificial.',
        style: 'border-l-4 border-red-500 bg-red-900/30 text-red-300'
    },
    [AnalysisResultType.Human]: {
        icon: <UserIcon />,
        title: 'Conteúdo Escrito por Humanos',
        description: 'Este texto parece ter sido escrito por uma pessoa. O estilo é natural e autêntico.',
        style: 'border-l-4 border-green-500 bg-green-900/30 text-green-300'
    },
    [AnalysisResultType.Uncertain]: {
        icon: <QuestionMarkIcon />,
        title: 'Resultado Incerto',
        description: 'Não foi possível determinar com certeza a origem do texto. Pode ser uma mistura de escrita humana e de IA.',
        style: 'border-l-4 border-yellow-500 bg-yellow-900/30 text-yellow-300'
    }
};

export const ResultCard: React.FC<ResultCardProps> = ({ resultType }) => {
  const config = resultConfig[resultType];

  return (
    <div className={`p-4 rounded-lg flex items-start gap-4 ${config.style}`}>
        <div className="flex-shrink-0">{config.icon}</div>
        <div>
            <h3 className="font-bold text-lg text-slate-100">{config.title}</h3>
            <p className="text-sm mt-1">{config.description}</p>
        </div>
    </div>
  );
};
