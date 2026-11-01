import { Button } from "@/components/ui/button";

import { Card } from "@/components/ui/card";

import { diagnosticCategories, type Diagnostic } from "@/features/diagnostics/data";

import { CategoryFilter } from "../list.shared";

import { DiagnosticListItem } from "../molecules/diagnostic-list-item";

export function DiagnosticsList({ diagnostics, selectedId, filter, onFilter, onSelect }: { diagnostics: Diagnostic[]; selectedId: string; filter: CategoryFilter; onFilter: (category: CategoryFilter) => void; onSelect: (id: string) => void }) {
  const filteredDiagnostics = diagnostics.filter((diagnostic) => filter === "all" || diagnostic.category === filter);
  return (
    <Card className="surface diagnostics-card diagnostics-list-card">
      <div className="diagnostics-list-heading"><h2>Principais diagnósticos</h2><div className="diagnostics-filters" role="group" aria-label="Filtrar diagnósticos por categoria">
        {diagnosticCategories.map((category) => <Button key={category.id} type="button" variant="ghost" className={"diagnostics-filter" + (filter === category.id ? " active" : "")} aria-pressed={filter === category.id} onClick={() => onFilter(category.id)}>{category.label}</Button>)}
      </div></div>
      <div className="diagnostics-items">{filteredDiagnostics.length ? filteredDiagnostics.map((diagnostic) => <DiagnosticListItem key={diagnostic.id} diagnostic={diagnostic} selected={selectedId === diagnostic.id} onSelect={() => onSelect(diagnostic.id)} />) : <p className="diagnostics-empty">Nenhum diagnóstico nesta categoria.</p>}</div>
      <p className="diagnostics-data-note"><span /> Diagnósticos e valores demonstrativos</p>
    </Card>
  );
}
