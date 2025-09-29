
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { TextAreaInput } from './components/TextAreaInput';
import { ActionButton } from './components/ActionButton';
import { ResultCard } from './components/ResultCard';
import { Spinner } from './components/Spinner';
import { checkAIGenerated, humanizeText } from './services/geminiService';
import { AnalysisResultType } from './types';

const App: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResultType | null>(null);
  const [humanizedText, setHumanizedText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'analysis' | 'humanized'>('analysis');

  const handleCheckContent = useCallback(async () => {
    if (!inputText.trim()) {
      setError('Por favor, insira algum texto para analisar.');
      return;
    }
    setIsLoading(true);
    setError('');
    setAnalysisResult(null);
    setHumanizedText('');
    setActiveTab('analysis');

    try {
      const result = await checkAIGenerated(inputText);
      if (result.toLowerCase().includes('ia')) {
        setAnalysisResult(AnalysisResultType.AI);
      } else if (result.toLowerCase().includes('humano')) {
        setAnalysisResult(AnalysisResultType.Human);
      } else {
         setAnalysisResult(AnalysisResultType.Uncertain);
      }
    } catch (err) {
      setError('Ocorreu um erro ao verificar o conteúdo. Tente novamente.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [inputText]);

  const handleHumanizeText = useCallback(async () => {
    if (!inputText.trim()) {
      setError('Por favor, insira algum texto para humanizar.');
      return;
    }
    setIsLoading(true);
    setError('');
    setAnalysisResult(null);
    setHumanizedText('');
    setActiveTab('humanized');

    try {
      const result = await humanizeText(inputText);
      setHumanizedText(result);
    } catch (err) {
      setError('Ocorreu um erro ao humanizar o texto. Tente novamente.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [inputText]);
  
  const handleClear = () => {
    setInputText('');
    setAnalysisResult(null);
    setHumanizedText('');
    setError('');
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <Header />
        <main className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-4">
              <TextAreaInput
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Cole aqui o texto que deseja analisar ou humanizar..."
                disabled={isLoading}
              />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <ActionButton
                  onClick={handleCheckContent}
                  disabled={isLoading || !inputText}
                  className="bg-sky-600 hover:bg-sky-700"
                >
                  {isLoading ? <Spinner /> : 'Verificar Conteúdo'}
                </ActionButton>
                <ActionButton
                  onClick={handleHumanizeText}
                  disabled={isLoading || !inputText}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  {isLoading ? <Spinner /> : 'Humanizar Texto'}
                </ActionButton>
                 <ActionButton
                  onClick={handleClear}
                  disabled={isLoading}
                  className="bg-slate-600 hover:bg-slate-700"
                >
                  Limpar
                </ActionButton>
              </div>
            </div>

            <div className="bg-slate-800 rounded-lg p-6 min-h-[300px] flex flex-col">
              <h2 className="text-xl font-bold text-slate-300 mb-4">Resultados</h2>
              {error && <div className="text-red-400 bg-red-900/50 p-3 rounded-md">{error}</div>}
              {isLoading && (
                 <div className="flex-grow flex items-center justify-center">
                   <Spinner />
                </div>
              )}
              
              {!isLoading && !error && !analysisResult && !humanizedText && (
                <div className="flex-grow flex items-center justify-center text-slate-500">
                  Os seus resultados aparecerão aqui.
                </div>
              )}

              {analysisResult && (
                <ResultCard resultType={analysisResult} />
              )}
              
              {humanizedText && (
                <div className="prose prose-invert max-w-none text-slate-300 whitespace-pre-wrap">
                  <p>{humanizedText}</p>
                </div>
              )}

            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
