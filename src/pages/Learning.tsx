import { useEffect, useState } from 'react';
import { loadSpecialtySummaries, type Summary } from '@/lib/contentLoader';
import { ChevronRight, FileText } from 'lucide-react';
import Skeleton from 'react-loading-skeleton';
import ReactMarkdown from 'react-markdown';

export default function Learning() {
  const [summaries, setSummaries] = useState<Summary[] | null>(null);
  const [selectedSummary, setSelectedSummary] = useState<Summary | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSummaries = async () => {
      const data = await loadSpecialtySummaries();
      if (data.length === 0) {
        setError("Nu am găsit materiale de studiu pentru specialitatea selectată. Conținutul va fi adăugat în curând.");
      }
      setSummaries(data);
    };
    fetchSummaries();
  }, []);

  if (selectedSummary) {
    return (
      <div className="p-4">
        <button onClick={() => setSelectedSummary(null)} className="btn btn-ghost mb-4">
          ← Înapoi la listă
        </button>
        <article className="prose dark:prose-invert max-w-none">
          <h1>{selectedSummary.title}</h1>
          <ReactMarkdown>{selectedSummary.content}</ReactMarkdown>
        </article>
      </div>
    );
  }

  if (!summaries && !error) {
    return <div className="p-4"><Skeleton count={8} /></div>;
  }

  if (error) {
      return <div className="card text-center text-red-500">{error}</div>
  }

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Modul de Învățare</h1>
      <p className="text-muted">Selectează un capitol pentru a începe studiul.</p>
      <div className="space-y-3">
        {summaries?.map(summary => (
          <button
            key={summary.id}
            onClick={() => setSelectedSummary(summary)}
            className="w-full p-4 card-item flex justify-between items-center text-left"
          >
            <div className="flex items-center gap-4">
              <FileText className="text-primary" />
              <span>{summary.title}</span>
            </div>
            <ChevronRight />
          </button>
        ))}
      </div>
    </div>
  );
}