import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Database from "better-sqlite3";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function readDatabasePathFromEnvFile() {
  const envFilePath = path.join(projectRoot, ".env");
  if (!fs.existsSync(envFilePath)) return null;

  const line = fs
    .readFileSync(envFilePath, "utf8")
    .split(/\r?\n/)
    .find((entry) => /^\s*(?:export\s+)?MESA_DATABASE_PATH\s*=/.test(entry));

  if (!line) return null;

  const rawValue = line.replace(/^\s*(?:export\s+)?MESA_DATABASE_PATH\s*=\s*/, "").trim();
  const doubleQuoted = rawValue.match(/^"((?:\\.|[^"])*)"(?:\s+#.*)?$/);
  if (doubleQuoted) {
    return doubleQuoted[1].replace(/\\([\\nrt"])/g, (_, character) => ({
      "\\": "\\",
      n: "\n",
      r: "\r",
      t: "\t",
      '"': '"',
    })[character]);
  }

  const singleQuoted = rawValue.match(/^'([^']*)'(?:\s+#.*)?$/);
  if (singleQuoted) return singleQuoted[1];

  return rawValue.replace(/\s+#.*$/, "").trim();
}

const configuredDatabasePath =
  process.env.MESA_DATABASE_PATH?.trim() || readDatabasePathFromEnvFile();
const databasePath = configuredDatabasePath
  ? path.resolve(projectRoot, configuredDatabasePath)
  : path.join(projectRoot, "data", "mesa.db");

fs.mkdirSync(path.dirname(databasePath), { recursive: true });

const database = new Database(databasePath);
database.pragma("journal_mode = WAL");
database.pragma("foreign_keys = ON");
database.exec(`
  CREATE TABLE IF NOT EXISTS restaurants (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    team_size INTEGER NOT NULL,
    stations INTEGER NOT NULL,
    team_experience INTEGER NOT NULL,
    created_at INTEGER NOT NULL
  );
  CREATE TABLE IF NOT EXISTS menu_items (
    id TEXT PRIMARY KEY,
    restaurant_id TEXT NOT NULL,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price_cents INTEGER NOT NULL,
    cost_cents INTEGER NOT NULL,
    available INTEGER NOT NULL DEFAULT 1,
    created_at INTEGER NOT NULL
  );
  CREATE TABLE IF NOT EXISTS operational_orders (
    id TEXT PRIMARY KEY,
    restaurant_id TEXT NOT NULL,
    menu_item_id TEXT,
    quantity INTEGER NOT NULL DEFAULT 1,
    ordered_at INTEGER NOT NULL,
    revenue_cents INTEGER NOT NULL,
    preparation_minutes REAL NOT NULL
  );
  CREATE TABLE IF NOT EXISTS customer_reviews (
    id TEXT PRIMARY KEY,
    restaurant_id TEXT NOT NULL,
    menu_item_id TEXT,
    received_at INTEGER NOT NULL,
    customer TEXT NOT NULL,
    rating INTEGER NOT NULL,
    comment TEXT NOT NULL,
    channel TEXT NOT NULL,
    answered INTEGER NOT NULL DEFAULT 0
  );
  CREATE TABLE IF NOT EXISTS workspace_settings (
    id INTEGER PRIMARY KEY,
    restaurant TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS action_plans (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    responsible TEXT NOT NULL,
    role TEXT NOT NULL,
    initials TEXT NOT NULL,
    due TEXT NOT NULL,
    day TEXT NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    status TEXT NOT NULL,
    icon TEXT NOT NULL,
    overdue INTEGER NOT NULL DEFAULT 0,
    source TEXT NOT NULL DEFAULT 'manual'
  );
`);

const restaurantId = "seed-bistro-aurora";
const existingRestaurantByName = database.prepare(`SELECT id FROM restaurants WHERE name = ?`);
let nameSuffix = 0;
let restaurantName = "";

while (!restaurantName) {
  const candidate = nameSuffix === 0
    ? "Bistrô Aurora"
    : nameSuffix === 1
      ? "Bistrô Aurora (demonstração)"
      : `Bistrô Aurora (demonstração ${nameSuffix})`;
  const existingRestaurant = existingRestaurantByName.get(candidate);
  if (!existingRestaurant || existingRestaurant.id === restaurantId) {
    restaurantName = candidate;
  } else {
    nameSuffix += 1;
  }
}

const restaurant = {
  id: restaurantId,
  name: restaurantName,
  teamSize: 12,
  stations: 5,
  teamExperience: 72,
};

const menuItems = [
  { id: "seed-menu-risoto", name: "Risoto de cogumelos", category: "Pratos principais", priceCents: 5990, costCents: 2180 },
  { id: "seed-menu-parmegiana", name: "Parmegiana da casa", category: "Pratos principais", priceCents: 6890, costCents: 3060 },
  { id: "seed-menu-nhoque", name: "Nhoque artesanal", category: "Pratos principais", priceCents: 6290, costCents: 4740 },
  { id: "seed-menu-frango", name: "Frango grelhado", category: "Pratos principais", priceCents: 4690, costCents: 1760 },
  { id: "seed-menu-bruschetta", name: "Bruschetta caprese", category: "Entradas", priceCents: 2490, costCents: 890 },
  { id: "seed-menu-suco", name: "Suco natural", category: "Bebidas", priceCents: 1290, costCents: 820 },
  { id: "seed-menu-cheesecake", name: "Cheesecake de frutas vermelhas", category: "Sobremesas", priceCents: 1990, costCents: 760 },
  { id: "seed-menu-cafe", name: "Café coado", category: "Bebidas", priceCents: 790, costCents: 230 },
];

const reviewSeeds = [
  { daysAgo: 0, customer: "Camila Rocha", rating: 5, comment: "O risoto estava muito saboroso e chegou quentinho. Voltarei!", channel: "iFood", itemId: "seed-menu-risoto", answered: true },
  { daysAgo: 1, customer: "Renato Alves", rating: 2, comment: "A parmegiana chegou fria e a entrega atrasou bastante.", channel: "Google", itemId: "seed-menu-parmegiana", answered: false },
  { daysAgo: 2, customer: "Beatriz Lima", rating: 4, comment: "Nhoque bem temperado e molho muito gostoso.", channel: "iFood", itemId: "seed-menu-nhoque", answered: true },
  { daysAgo: 3, customer: "Marcos Ribeiro", rating: 1, comment: "O pedido demorou e o prato chegou frio.", channel: "Google", itemId: "seed-menu-frango", answered: false },
  { daysAgo: 4, customer: "Ana Souza", rating: 5, comment: "Atendimento atencioso e comida deliciosa. O sabor estava ótimo.", channel: "WhatsApp", itemId: null, answered: true },
  { daysAgo: 5, customer: "Pedro Martins", rating: 3, comment: "Gostei do sabor, mas a porção poderia ser um pouco maior.", channel: "iFood", itemId: "seed-menu-risoto", answered: false },
  { daysAgo: 6, customer: "Julia Costa", rating: 4, comment: "Bruschetta crocante e muito boa para compartilhar.", channel: "Google", itemId: "seed-menu-bruschetta", answered: false },
  { daysAgo: 8, customer: "Felipe Nunes", rating: 2, comment: "A entrega atrasou e o pedido veio morno.", channel: "iFood", itemId: "seed-menu-nhoque", answered: false },
  { daysAgo: 10, customer: "Larissa Melo", rating: 5, comment: "Cheesecake leve e delicioso, sobremesa excelente.", channel: "Google", itemId: "seed-menu-cheesecake", answered: true },
  { daysAgo: 12, customer: "André Silva", rating: 4, comment: "Café muito bem tirado e atendimento rápido.", channel: "WhatsApp", itemId: "seed-menu-cafe", answered: false },
];

const orderCountsByDay = [6, 6, 5, 6, 7, 8, 5, 4, 4, 4, 5, 4, 5, 4];
const orderHours = [11, 12, 13, 18, 19, 20, 21];
const preparationTimes = [18.5, 20, 21.5, 23, 25.5, 27, 30, 33];
const now = new Date();

function dateAtOffset(daysOffset, hour = 12, minute = 0) {
  const date = new Date(now);
  date.setDate(date.getDate() + daysOffset);
  date.setHours(hour, minute, 0, 0);
  return date;
}

function makeOrders() {
  const orders = [];
  for (let daysAgo = 0; daysAgo < orderCountsByDay.length; daysAgo += 1) {
    for (let orderIndex = 0; orderIndex < orderCountsByDay[daysAgo]; orderIndex += 1) {
      const item = menuItems[(daysAgo * 3 + orderIndex * 5) % menuItems.length];
      const quantity = (daysAgo + orderIndex) % 7 === 0 ? 2 : 1;
      const hour = orderHours[orderIndex % orderHours.length];
      const minute = (daysAgo * 7 + orderIndex * 11) % 60;

      orders.push({
        id: `seed-order-${String(orders.length + 1).padStart(3, "0")}`,
        restaurantId: restaurant.id,
        menuItemId: item.id,
        quantity,
        orderedAt: dateAtOffset(-daysAgo, hour, minute).getTime(),
        revenueCents: item.priceCents * quantity,
        preparationMinutes: preparationTimes[(daysAgo + orderIndex * 3) % preparationTimes.length],
      });
    }
  }
  return orders;
}

function makeReviews() {
  return reviewSeeds.map((review, index) => ({
    id: `seed-review-${String(index + 1).padStart(2, "0")}`,
    restaurantId: restaurant.id,
    menuItemId: review.itemId,
    receivedAt: dateAtOffset(-review.daysAgo, 9 + (index % 11), (index * 13) % 60).getTime(),
    customer: review.customer,
    rating: review.rating,
    comment: review.comment,
    channel: review.channel,
    answered: review.answered ? 1 : 0,
  }));
}

function makeActionPlans() {
  const actions = [
    { id: "preparo", title: "Revisar o fluxo de preparo no jantar", description: "Compare os pedidos mais demorados e ajuste a distribuição das etapas na cozinha.", responsible: "Marina Costa", role: "Chef de cozinha", initials: "MC", daysOffset: 0, time: "17:00", status: "active", icon: "clock" },
    { id: "avaliacoes", title: "Responder avaliações recentes", description: "Agradeça os elogios e entre em contato com clientes que relataram atraso ou pratos frios.", responsible: "Lucas Ferreira", role: "Gerente", initials: "LF", daysOffset: 1, time: "15:00", status: "pending", icon: "message" },
    { id: "margem", title: "Revisar o custo do nhoque artesanal", description: "Confira o custo dos ingredientes e avalie o preço cadastrado para o prato.", responsible: "João Pedro", role: "Responsável pelo cardápio", initials: "JP", daysOffset: -1, time: "10:00", status: "completed", icon: "chart" },
  ];

  return actions.map((action) => {
    const date = dateAtOffset(action.daysOffset);
    const dateLabel = new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
    const dayLabel = new Intl.DateTimeFormat("pt-BR", { weekday: "long" }).format(date);
    const due = action.daysOffset === -1
      ? "Ontem"
      : action.daysOffset === 0
        ? "Hoje"
        : action.daysOffset === 1
          ? "Amanhã"
          : `Em ${action.daysOffset} dias`;

    return {
      id: `diagnostic-${restaurant.id}-seed-${action.id}`,
      title: action.title,
      description: action.description,
      responsible: action.responsible,
      role: action.role,
      initials: action.initials,
      due,
      day: dayLabel,
      date: dateLabel,
      time: action.time,
      status: action.status,
      icon: action.icon,
      overdue: 0,
      source: "diagnostic",
    };
  });
}

const insertRestaurant = database.prepare(`
  INSERT INTO restaurants (id, name, team_size, stations, team_experience, created_at)
  VALUES (@id, @name, @teamSize, @stations, @teamExperience, @createdAt)
  ON CONFLICT(id) DO UPDATE SET
    name = excluded.name,
    team_size = excluded.team_size,
    stations = excluded.stations,
    team_experience = excluded.team_experience
`);

const insertMenuItem = database.prepare(`
  INSERT INTO menu_items (id, restaurant_id, name, category, price_cents, cost_cents, available, created_at)
  VALUES (@id, @restaurantId, @name, @category, @priceCents, @costCents, 1, @createdAt)
  ON CONFLICT(id) DO UPDATE SET
    restaurant_id = excluded.restaurant_id,
    name = excluded.name,
    category = excluded.category,
    price_cents = excluded.price_cents,
    cost_cents = excluded.cost_cents
`);

const insertOrder = database.prepare(`
  INSERT INTO operational_orders (id, restaurant_id, menu_item_id, quantity, ordered_at, revenue_cents, preparation_minutes)
  VALUES (@id, @restaurantId, @menuItemId, @quantity, @orderedAt, @revenueCents, @preparationMinutes)
  ON CONFLICT(id) DO UPDATE SET
    restaurant_id = excluded.restaurant_id,
    menu_item_id = excluded.menu_item_id,
    quantity = excluded.quantity,
    ordered_at = excluded.ordered_at,
    revenue_cents = excluded.revenue_cents,
    preparation_minutes = excluded.preparation_minutes
`);

const insertReview = database.prepare(`
  INSERT INTO customer_reviews (id, restaurant_id, menu_item_id, received_at, customer, rating, comment, channel, answered)
  VALUES (@id, @restaurantId, @menuItemId, @receivedAt, @customer, @rating, @comment, @channel, @answered)
  ON CONFLICT(id) DO UPDATE SET
    restaurant_id = excluded.restaurant_id,
    menu_item_id = excluded.menu_item_id,
    received_at = excluded.received_at,
    customer = excluded.customer,
    rating = excluded.rating,
    comment = excluded.comment,
    channel = excluded.channel
`);

const insertActionPlan = database.prepare(`
  INSERT INTO action_plans (id, title, description, responsible, role, initials, due, day, date, time, status, icon, overdue, source)
  VALUES (@id, @title, @description, @responsible, @role, @initials, @due, @day, @date, @time, @status, @icon, @overdue, @source)
  ON CONFLICT(id) DO UPDATE SET
    title = excluded.title,
    description = excluded.description,
    responsible = excluded.responsible,
    role = excluded.role,
    initials = excluded.initials,
    due = excluded.due,
    day = excluded.day,
    date = excluded.date,
    time = excluded.time,
    icon = excluded.icon,
    overdue = excluded.overdue,
    source = excluded.source
`);

const seed = database.transaction(() => {
  const currentTime = Date.now();
  insertRestaurant.run({ ...restaurant, createdAt: currentTime });

  for (const item of menuItems) {
    insertMenuItem.run({
      ...item,
      restaurantId: restaurant.id,
      createdAt: currentTime,
    });
  }

  for (const order of makeOrders()) insertOrder.run(order);
  for (const review of makeReviews()) insertReview.run(review);
  for (const action of makeActionPlans()) insertActionPlan.run(action);

  const selectedRestaurant = database
    .prepare(`SELECT restaurant FROM workspace_settings WHERE id = 1`)
    .get();
  const selectedRestaurantExists = selectedRestaurant
    ? database.prepare(`SELECT id FROM restaurants WHERE id = ?`).get(selectedRestaurant.restaurant)
    : null;

  if (!selectedRestaurantExists) {
    database.prepare(`
      INSERT INTO workspace_settings (id, restaurant)
      VALUES (1, ?)
      ON CONFLICT(id) DO UPDATE SET restaurant = excluded.restaurant
    `).run(restaurant.id);
  }
});

try {
  seed();
  console.log(
    `Seed aplicado: 1 restaurante, ${menuItems.length} itens de cardápio, ${makeOrders().length} pedidos, ${reviewSeeds.length} avaliações e 3 planos de ação.`,
  );
} finally {
  database.close();
}
