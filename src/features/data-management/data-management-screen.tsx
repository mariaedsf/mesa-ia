"use client";

import Link from "next/link";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteMenuItemAction, deleteOrderAction, deleteReviewAction } from "@server/actions";
import type { OperationalDataReadModel } from "@server/application/read-models";
import type { Restaurant } from "@server/domain/operational-records";
import {
  createMenuItemAction,
  createOrderAction,
  createRestaurantAction,
  createReviewAction,
} from "@server/actions";

export function DataManagementScreen({
  restaurants,
  data,
  defaultDateTime,
}: {
  restaurants: Restaurant[];
  data: OperationalDataReadModel;
  defaultDateTime: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const restaurant = data.restaurant;

  function runDelete(action: (id: string) => Promise<void>, id: string) {
    startTransition(async () => {
      await action(id);
      router.refresh();
    });
  }

  return (
    <main className="data-management-page">
      <header className="data-management-header">
        <div>
          <span className="restaurant-eyebrow">Operação</span>
          <h1>Dados do restaurante</h1>
          <p>Cadastre os registros que alimentam os indicadores, análises e recomendações.</p>
        </div>
      </header>

      <section className="data-management-section">
        <div className="data-section-heading">
          <div><h2>Restaurantes</h2><p>Os registros ficam separados por restaurante.</p></div>
          {restaurant && <span className="data-current-restaurant">Selecionado: {restaurant.name}</span>}
        </div>
        <div className="data-management-grid data-management-grid-restaurants">
          <form action={createRestaurantAction} className="data-entry-card">
            <h3>Cadastrar restaurante</h3>
            <label>Nome<input name="name" required maxLength={100} placeholder="Ex.: Restaurante Central" /></label>
            <div className="data-form-row">
              <label>Tamanho da equipe<input name="teamSize" required type="number" min={1} max={200} /></label>
              <label>Estações de trabalho<input name="stations" required type="number" min={1} max={100} /></label>
              <label>Experiência da equipe (%)<input name="teamExperience" required type="number" min={0} max={100} /></label>
            </div>
            <button className="button button-primary" type="submit">Salvar restaurante</button>
          </form>
          <div className="data-entry-card">
            <h3>Restaurantes cadastrados</h3>
            {restaurants.length ? <ul className="data-record-list">{restaurants.map((item) => <li key={item.id} className={item.id === restaurant?.id ? "selected" : ""}><span><strong>{item.name}</strong><small>Equipe de {item.teamSize} · {item.stations} estações</small></span>{item.id === restaurant?.id ? <b>Selecionado</b> : <span>Selecione na barra lateral</span>}</li>)}</ul> : <p className="data-empty">Cadastre o primeiro restaurante para começar.</p>}
          </div>
        </div>
      </section>

      {restaurant && <>
        <section className="data-management-section">
          <div className="data-section-heading"><div><h2>Cardápio</h2><p>Informe preços e custos para calcular as margens.</p></div><Link href="/cardapio">Abrir cardápio</Link></div>
          <div className="data-management-grid">
            <form action={createMenuItemAction} className="data-entry-card">
              <h3>Novo item</h3>
              <label>Nome do prato<input name="name" required maxLength={100} /></label>
              <label>Categoria<input name="category" required maxLength={60} placeholder="Ex.: Pratos principais" /></label>
              <div className="data-form-row"><label>Preço (R$)<input name="price" required type="number" min="0.01" step="0.01" /></label><label>Custo (R$)<input name="cost" required type="number" min="0" step="0.01" /></label></div>
              <button className="button button-primary" type="submit">Adicionar item</button>
            </form>
            <div className="data-entry-card">
              <h3>Itens cadastrados · {data.menuItems.length}</h3>
              {data.menuItems.length ? <ul className="data-record-list">{data.menuItems.map((item) => <li key={item.id}><span><strong>{item.name}</strong><small>{item.category} · R$ {(item.priceCents / 100).toFixed(2)} · custo R$ {(item.costCents / 100).toFixed(2)}</small></span><button className="data-delete-button" type="button" disabled={isPending} onClick={() => runDelete(deleteMenuItemAction, item.id)}>Remover</button></li>)}</ul> : <p className="data-empty">Nenhum item cadastrado.</p>}
            </div>
          </div>
        </section>

        <section className="data-management-section">
          <div className="data-section-heading"><div><h2>Pedidos</h2><p>Pedidos cadastrados são usados nas métricas de volume, receita e preparo.</p></div></div>
          <div className="data-management-grid">
            <form action={createOrderAction} className="data-entry-card">
              <h3>Novo pedido</h3>
              <label>Item do cardápio<select name="menuItemId"><option value="">Sem item vinculado</option>{data.menuItems.map((item) => <option value={item.id} key={item.id}>{item.name} · R$ {(item.priceCents / 100).toFixed(2)}</option>)}</select></label>
              <div className="data-form-row"><label>Quantidade<input name="quantity" required type="number" min={1} max={1000} defaultValue={1} /></label><label>Receita (R$)<input name="revenue" required type="number" min={0} step="0.01" defaultValue={0} /></label></div>
              <div className="data-form-row"><label>Data e hora<input name="orderedAt" required type="datetime-local" defaultValue={defaultDateTime} /></label><label>Preparo (minutos)<input name="preparationMinutes" required type="number" min={0} max={600} step="0.1" /></label></div>
              <button className="button button-primary" type="submit">Registrar pedido</button>
              <small>Quando um item é selecionado, a receita é calculada pelo preço cadastrado × quantidade.</small>
            </form>
            <div className="data-entry-card">
              <h3>Pedidos recentes · {data.orders.length}</h3>
              {data.orders.length ? <ul className="data-record-list">{data.orders.slice(0, 8).map((order) => <li key={order.id}><span><strong>{order.quantity} unidade(s) · R$ {(order.revenueCents / 100).toFixed(2)}</strong><small>{new Date(order.orderedAt).toLocaleString("pt-BR")} · preparo {order.preparationMinutes} min</small></span><button className="data-delete-button" type="button" disabled={isPending} onClick={() => runDelete(deleteOrderAction, order.id)}>Remover</button></li>)}</ul> : <p className="data-empty">Nenhum pedido cadastrado.</p>}
            </div>
          </div>
        </section>

        <section className="data-management-section">
          <div className="data-section-heading"><div><h2>Avaliações</h2><p>Registre feedbacks para acompanhar satisfação e temas recorrentes.</p></div><Link href="/avaliacoes">Abrir avaliações</Link></div>
          <div className="data-management-grid">
            <form action={createReviewAction} className="data-entry-card">
              <h3>Nova avaliação</h3>
              <label>Cliente<input name="customer" maxLength={100} placeholder="Opcional" /></label>
              <label>Item relacionado<select name="menuItemId"><option value="">Experiência geral</option>{data.menuItems.map((item) => <option value={item.id} key={item.id}>{item.name}</option>)}</select></label>
              <div className="data-form-row"><label>Nota<input name="rating" required type="number" min={1} max={5} /></label><label>Canal<input name="channel" required maxLength={60} placeholder="Ex.: Balcão" /></label></div>
              <label>Data e hora<input name="receivedAt" required type="datetime-local" defaultValue={defaultDateTime} /></label>
              <label>Comentário<textarea name="comment" required minLength={2} maxLength={2000} rows={4} /></label>
              <button className="button button-primary" type="submit">Registrar avaliação</button>
            </form>
            <div className="data-entry-card">
              <h3>Avaliações recentes · {data.reviews.length}</h3>
              {data.reviews.length ? <ul className="data-record-list">{data.reviews.slice(0, 8).map((review) => <li key={review.id}><span><strong>{review.rating}/5 · {review.customer}</strong><small>{review.date} · {review.comment}</small></span><button className="data-delete-button" type="button" disabled={isPending} onClick={() => runDelete(deleteReviewAction, review.id)}>Remover</button></li>)}</ul> : <p className="data-empty">Nenhuma avaliação cadastrada.</p>}
            </div>
          </div>
        </section>
      </>}
    </main>
  );
}
