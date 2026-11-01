"use client";

import { Icon } from "@/components/ui/icon";

import { Button } from "@/components/ui/button";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";

import { Progress } from "@/components/ui/progress";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function ThemesCard({ reviewThemes, hasReviews }: { reviewThemes: { label: string; score: number }[]; hasReviews: boolean }) {
  return (
    <Card className="surface themes-card">
      <CardHeader className="card-heading">
        <CardTitle>Temas nas avaliações</CardTitle>
        <Tooltip>
          <TooltipTrigger
            render={<Button variant="ghost" size="icon-xs" className="info-wrap" aria-label="Sobre os temas das avaliações" />}
          >
            <Icon name="info" size={17} />
          </TooltipTrigger>
          <TooltipContent className="theme-tooltip" arrowClassName="bg-white fill-white">
            Percentual de menções positivas em cada tema.
          </TooltipContent>
        </Tooltip>
      </CardHeader>
      <p className="card-subtitle theme-subtitle">Menções positivas por tema</p>
      {!hasReviews && <p className="card-empty">Cadastre avaliações para analisar os temas mencionados.</p>}
      <div className="theme-list">
        {reviewThemes.map((theme) => (
          <div className="theme-row" key={theme.label}>
            <span>{theme.label}</span>
            <Tooltip>
              <TooltipTrigger
                render={
                  <Progress
                    value={theme.score}
                    className="theme-bar"
                    aria-label={`${theme.score}% de avaliações positivas em ${theme.label}`}
                    tabIndex={0}
                  />
                }
              />
              <TooltipContent className="theme-tooltip" arrowClassName="bg-white fill-white">
                {theme.score}% de menções positivas em {theme.label}.
              </TooltipContent>
            </Tooltip>
            <strong>{theme.score}%</strong>
          </div>
        ))}
      </div>
    </Card>
  );
}
