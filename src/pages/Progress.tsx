// src/pages/Progress.tsx
import React, { useMemo } from 'react';
import { useProgressStore } from '@/lib/progressStore';
import { BarChart3, Trash2 } from 'lucide-react';
import { Chart } from 'react-google-charts';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip } from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip);

export default function Progress() {
  const { results, clearResults } = useProgressStore();

  const chartData = useMemo(() => [
    ["Dată", "Scor (%)"],
    ...results
      .slice(0, 30)
      .reverse()
      .map(r => [new Date(r.date), (r.score / r.total) * 100]),
  ], [results]);

  const categoryPerformance = useMemo(() => {
    const categories: Record<string, { correct: number; total: number }> = {};
    results.forEach(r => {
      const moduleKey = r.module.split(' ')[0]; // Group by main module
      if (!categories[moduleKey]) categories[moduleKey] = { correct: 0, total: 0 };
      categories[moduleKey].correct += r.score;
      categories[moduleKey].total += r.total;
    });
    const labels = Object.keys(categories);
    const data = labels.map(label => (categories[label].correct / categories[label].total) * 100);
    return {
      labels,
      datasets: [{
        label: 'Performanță (%)',
        data,
        backgroundColor: 'rgba(0, 123, 255, 0.2)',
        borderColor: 'rgba(0, 123, 255, 1)',
        borderWidth: 1,
      }],
    };
  }, [results]);

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Progresul Meu</h1>
        {results.length > 0 && (
          <button onClick={() => { if(window.confirm("Ești sigur?")) clearResults() }} className="btn btn-ghost text-red-500 flex items-center gap-2">
            <Trash2 size={16}/> Șterge Istoric
          </button>
        )}
      </div>

      {results.length === 0 ? (
        <div className="card text-center text-muted">
          Nu ai finalizat încă niciun test. Rezultatele tale vor apărea aici.
        </div>
      ) : (
        <>
          <section className="card">
            <h2 className="text-lg font-semibold mb-2 flex items-center gap-2"><BarChart3 size={20}/> Evoluție Recentă</h2>
            <Chart
              chartType="LineChart"
              width="100%"
              height="250px"
              data={chartData.length > 1 ? chartData : [["Data", "Scor (%)"], [new Date(), 0]]}
              options={{
                legend: 'none',
                hAxis: { textStyle: { color: 'var(--muted)' }, titleTextStyle: { color: 'var(--muted)' } },
                vAxis: { minValue: 0, maxValue: 100, textStyle: { color: 'var(--muted)' }, titleTextStyle: { color: 'var(--muted)' } },
                colors: ['var(--primary)'],
                backgroundColor: 'transparent',
                chartArea: { width: '85%', height: '70%' }
              }}
            />
          </section>
          
          {categoryPerformance.labels.length > 1 && (
            <section className="card">
                <h2 className="text-lg font-semibold mb-2">Performanță pe Module</h2>
                <div className="w-full max-w-sm mx-auto">
                    <Radar data={categoryPerformance} />
                </div>
            </section>
          )}

          <section className="card">
            <h2 className="text-lg font-semibold mb-2">Ultimele Teste</h2>
            <ul className="space-y-2">
              {results.slice(0, 10).map(r => (
                <li key={r.id} className="p-3 rounded-lg bg-card border border-border flex justify-between items-center">
                  <div>
                    <div className="font-semibold">{r.module}</div>
                    <div className="text-xs text-muted">{new Date(r.date).toLocaleString()}</div>
                  </div>
                  <div className={`font-bold text-lg ${r.score / r.total >= 0.6 ? 'text-green-500' : 'text-red-500'}`}>
                    {r.score} / {r.total}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
    </div>
  );
}