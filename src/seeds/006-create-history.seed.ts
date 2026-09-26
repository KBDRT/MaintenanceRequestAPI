import { Seeder } from "../config/umzug.config";
import { MaintenanceRequestStatus } from "../domains/enums/maintenance-request-status.enum";
import { seedRequests } from "./005-create-requests.seed";

const d = (iso: string) => new Date(iso);

export const seedHistory = [
  { id: "7b1fa875-125d-4f96-b4bc-21a7b5a03eb1", requestId: seedRequests[0].id, oldStatus: MaintenanceRequestStatus.new,         newStatus: MaintenanceRequestStatus.in_progress, author: "Петров П.П.",   commentary: "Взято в работу",           createdAt: d("2024-05-29T09:00:00Z") },
  { id: "7154ec4b-017d-4d06-a7dc-3db67ab6f20b", requestId: seedRequests[0].id, oldStatus: MaintenanceRequestStatus.in_progress, newStatus: MaintenanceRequestStatus.done,        author: "Петров П.П.",   commentary: "Уплотнение заменено",      createdAt: d("2024-06-02T14:30:00Z") },

  { id: "160187a8-8e0d-44e7-b2b1-31cbf5b40a24", requestId: seedRequests[2].id, oldStatus: MaintenanceRequestStatus.new,         newStatus: MaintenanceRequestStatus.in_progress, author: "Сидоров С.С.",  commentary: "Диагностика вибрации",     createdAt: d("2024-06-28T16:20:00Z") },

  { id: "f89488f5-553e-41d2-b56e-340592649772", requestId: seedRequests[3].id, oldStatus: MaintenanceRequestStatus.new,         newStatus: MaintenanceRequestStatus.in_progress, author: "Смирнов А.В.",  commentary: "Приступили к диагностике", createdAt: d("2024-06-26T10:00:00Z") },

  { id: "dc5c72a7-59c6-42f4-9817-d930e1736a32", requestId: seedRequests[4].id, oldStatus: MaintenanceRequestStatus.new,         newStatus: MaintenanceRequestStatus.done,        author: "Петров П.П.",   commentary: "Фильтр заменён",           createdAt: d("2024-05-10T15:00:00Z") },

  { id: "5cf8b37f-b043-404a-a81a-2581f1c8d809", requestId: seedRequests[6].id, oldStatus: MaintenanceRequestStatus.new,         newStatus: MaintenanceRequestStatus.in_progress, author: "Иванов И.И.",   commentary: "Проверка РЗА начата",      createdAt: d("2024-06-27T12:00:00Z") },

  { id: "c5a8dbc1-0a15-4a98-975d-299801fcab4d", requestId: seedRequests[8].id, oldStatus: MaintenanceRequestStatus.new,         newStatus: MaintenanceRequestStatus.done,        author: "Сидоров С.С.",  commentary: "Изоляторы заменены",       createdAt: d("2024-04-15T17:00:00Z") },

  { id: "0ff9da9b-31e1-44e9-9984-a1e3b448f981", requestId: seedRequests[9].id, oldStatus: MaintenanceRequestStatus.new,         newStatus: MaintenanceRequestStatus.in_progress, author: "Кузнецова А.С.", commentary: "Проверка сигнала",        createdAt: d("2024-06-28T10:30:00Z") },

  { id: "1f15f965-3abe-4488-abf2-99fb6ed546b2", requestId: seedRequests[11].id, oldStatus: MaintenanceRequestStatus.new,        newStatus: MaintenanceRequestStatus.done,        author: "Кузнецова А.С.", commentary: "Калибровка выполнена",   createdAt: d("2024-03-20T13:00:00Z") },

  { id: "aca260d1-0338-4cb5-9910-527571f676b1", requestId: seedRequests[12].id, oldStatus: MaintenanceRequestStatus.new,        newStatus: MaintenanceRequestStatus.in_progress, author: "Смирнов А.В.",  commentary: "Замер температур",         createdAt: d("2024-06-29T15:00:00Z") },

  { id: "537b1856-78dd-417a-a864-67384c80691e", requestId: seedRequests[14].id, oldStatus: MaintenanceRequestStatus.new,        newStatus: MaintenanceRequestStatus.done,        author: "Петров П.П.",   commentary: "ТО выполнено",             createdAt: d("2024-02-10T16:00:00Z") },

  { id: "13bc373e-ad97-45f6-b6d8-980a0057b35b", requestId: seedRequests[15].id, oldStatus: MaintenanceRequestStatus.new,        newStatus: MaintenanceRequestStatus.done,        author: "Сидоров С.С.",  commentary: "Выведена из эксплуатации", createdAt: d("2023-12-01T14:00:00Z") },

  { id: "6f559fa7-3b68-4821-ac71-1790c65c67e3", requestId: seedRequests[16].id, oldStatus: MaintenanceRequestStatus.new,        newStatus: MaintenanceRequestStatus.rejected,    author: "Иванов И.И.",   commentary: "Оборудование списано",     createdAt: d("2023-11-20T11:00:00Z") },

  { id: "bb47a1d5-e025-4495-b621-721f668d6608", requestId: seedRequests[17].id, oldStatus: MaintenanceRequestStatus.new,        newStatus: MaintenanceRequestStatus.in_progress, author: "Смирнов А.В.",  commentary: "Аварийный ремонт",         createdAt: d("2024-01-15T03:00:00Z") },
  { id: "ff78a471-629c-4fbe-a2a1-bd8efe72ce66", requestId: seedRequests[17].id, oldStatus: MaintenanceRequestStatus.in_progress, newStatus: MaintenanceRequestStatus.done,       author: "Смирнов А.В.",  commentary: "Турбина запущена",         createdAt: d("2024-01-15T06:00:00Z") },

  { id: "362aa19b-2379-4c6f-8773-2fa620d4e9a6", requestId: seedRequests[18].id, oldStatus: MaintenanceRequestStatus.new,        newStatus: MaintenanceRequestStatus.rejected,    author: "Петров П.П.",   commentary: "Дубликат",                 createdAt: d("2024-05-09T09:00:00Z") },

  { id: "1c3a89a8-d0f4-4bb6-a63d-9ef6c3f9f728", requestId: seedRequests[19].id, oldStatus: MaintenanceRequestStatus.new,        newStatus: MaintenanceRequestStatus.rejected,    author: "Кузнецова А.С.", commentary: "Не требует вмешательства", createdAt: d("2024-06-30T09:00:00Z") },
];

export const up: Seeder = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().bulkInsert('RequestStatusHistories', seedHistory);
};

export const down: Seeder = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().bulkDelete('RequestStatusHistories', { id: seedHistory.map(u => u.id) });
};