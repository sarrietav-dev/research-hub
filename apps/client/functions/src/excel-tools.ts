/* eslint-disable require-jsdoc */
// TODO: On every function I'm converting from XLSX.WorkSheet to JSON and then to XLSX.WorkSheet again, this is not efficient, I should find a way to optimize this.
// @deno-types="https://cdn.sheetjs.com/xlsx-0.18.3/package/types/index.d.ts"
import * as XLSX from "xlsx";

const LAST_COLUMN = "K";

export function getSeedGroupName(ws: XLSX.WorkSheet): string {
  return ws["C6"].v;
}

export function getCreationDate(ws: XLSX.WorkSheet) {
  const cellValue: string = ws["I6"].v;
  return cellValue.split("Fecha de creación:")[1].trim();
}

export type LeaderInfo = {
  name: string;
  email: string;
  phone: string;
};

export function getLeaderInfo(ws: XLSX.WorkSheet): LeaderInfo {
  const [name, email, phone] = [ws["A8"].v, ws["H8"].v, ws["J8"].v];

  return { name, email, phone };
}

interface Researcher {
  fullName: string;
  program: string;
  email: string;
  phoneNumber: string;
}

export function getResearchers(ws: XLSX.WorkSheet): Researcher[] {
  const wbData = XLSX.utils.sheet_to_json<string[]>(ws, { header: 1 });
  const initialResearcherCell = findCell(
    wbData,
    "Coinvestigadores Asociados(Docente de planta y catédra)"
  );
  const finalResearcherCell = findCell(wbData, "Integrantes");

  const ROW_OFFSET = 2;

  const range = `${initialResearcherCell.col}${
    initialResearcherCell.row + ROW_OFFSET
  }:${LAST_COLUMN}${finalResearcherCell.row}`;

  type JsonResponse = {
    "Nombres y Apellidos": string;
    "Programa Académico": string;
    "Correo institucional": string;
    teléfono: number;
  };

  const data = XLSX.utils.sheet_to_json<JsonResponse>(ws, { range: range });

  const mappedData: Researcher[] = data.map((researcher) => ({
    fullName: researcher["Nombres y Apellidos"],
    program: researcher["Programa Académico"],
    email: researcher["Correo institucional"],
    phoneNumber: researcher.teléfono.toString(),
  }));

  return mappedData;
}

interface Member {
  fullName: string;
  id: string;
  email: string;
  studentCode: string;
  isActive: boolean;
  yearOfEntry: string;
  program: string;
  body: string;
  functions: string;
}

export function getMembers(ws: XLSX.WorkSheet): Member[] {
  const wbData = XLSX.utils.sheet_to_json<string[]>(ws, { header: 1 });
  const initialTableCell = findCell(wbData, "Integrantes");
  const finalTableCell = findCell(wbData, "Adscrito al Grupo de Investigación");

  const ROW_OFFSET = 2;

  const range = `${initialTableCell.col}${
    initialTableCell.row + ROW_OFFSET
  }:${LAST_COLUMN}${finalTableCell.row}`;

  type JsonResponse = {
    "Nombre y apellidos": string;
    Identificación: number;
    "Código estudiantil": number;
    Activo: string;
    "Año de vinculación": number;
    Estamento: string;
    Programa: string;
    "correo electrónico": string;
    Funciones: string;
  };

  const data = XLSX.utils.sheet_to_json<JsonResponse>(ws, { range: range });

  const mappedData: Member[] = data.map((member) => ({
    fullName: member["Nombre y apellidos"],
    id: member.Identificación.toString(),
    email: member["correo electrónico"],
    studentCode: member["Código estudiantil"].toString(),
    isActive: /si/i.test(member.Activo),
    yearOfEntry: member["Año de vinculación"].toString(),
    program: member.Programa,
    body: member.Estamento,
    functions: member.Funciones,
  }));

  return mappedData;
}

export function getParentGroup(ws: XLSX.WorkSheet) {
  const wbData = XLSX.utils.sheet_to_json<string[]>(ws, { header: 1 });

  const parentGroupCell = findCell(
    wbData,
    "Adscrito al Grupo de Investigación"
  );

  const value = parentGroupCell.value
    .split("Adscrito al Grupo de Investigación:")[1]
    .trim();

  return value;
}

export function getGroupProgram(ws: XLSX.WorkSheet) {
  const wbData = XLSX.utils.sheet_to_json<string[]>(ws, { header: 1 });

  const parentGroupCell = findCell(
    wbData,
    "Adscrito al Grupo de Investigación"
  );

  const value: string = ws[`I${parentGroupCell.row + 1}`].v;
  return value.trim();
}

export function getReaserchTracks(ws: XLSX.WorkSheet) {
  const wbData = XLSX.utils.sheet_to_json<string[]>(ws, { header: 1 });

  const researchTrackCell = findCell(
    wbData,
    "Líneas de Investigación del semillero"
  );

  const value: string =
    ws[`${researchTrackCell.col}${researchTrackCell.row + 2}`].v;
  return value.trim();
}

export function getGroupDescription(ws: XLSX.WorkSheet) {
  const wbData = XLSX.utils.sheet_to_json<string[]>(ws, { header: 1 });

  const groupDescriptionCell = findCell(wbData, "DESCRIPCIÓN  DEL SEMILLERO");

  const value: string =
    ws[`${groupDescriptionCell.col}${groupDescriptionCell.row + 2}`].v;
  return value.trim();
}

export function getLocalEvents(ws: XLSX.WorkSheet) {
  const wbData = XLSX.utils.sheet_to_json<string[]>(ws, { header: 1 });

  const localEventsCell = findCell(wbData, "Locales");

  const value: string =
    ws[`${localEventsCell.col}${localEventsCell.row + 2}`].v;
  return value.trim();
}

export function getInternationalEvents(ws: XLSX.WorkSheet) {
  const wbData = XLSX.utils.sheet_to_json<string[]>(ws, { header: 1 });

  const internationalEventsCell = findCell(wbData, "Eventos Internacionales");

  const value: string =
    ws[`${internationalEventsCell.col}${internationalEventsCell.row + 2}`].v;
  return value.trim();
}

interface FinishedWork {
  name: string;
  startDate: string;
  endDate: string;
  entity: string;
  approvedAmount: number;
  product: string;
}

export function getFinishedWorks(ws: XLSX.WorkSheet): FinishedWork[] {
  const wbData = XLSX.utils.sheet_to_json<string[]>(ws, { header: 1 });
  const initialTableCell = findCell(wbData, "Terminados");
  const finalTableCell = findCell(wbData, "En Ejecución");

  const ROW_OFFSET = 2;

  const range = `${initialTableCell.col}${
    initialTableCell.row + ROW_OFFSET
  }:${LAST_COLUMN}${finalTableCell.row}`;

  type JsonResponse = {
    "Nombre del proyecto": string;
    "fecha inicio y Fecha finalización": string;
    "entidad  que avala": string;
    "monto aprobado": number;
    "producto o resultado": string;
  };

  const data = XLSX.utils.sheet_to_json<JsonResponse>(ws, { range: range });

  const mappedData: FinishedWork[] = data.map((work) => {
    const [startDate, endDate] = work["fecha inicio y Fecha finalización"]
      .split("/")
      .map((date) => date.trim());

    return {
      name: work["Nombre del proyecto"],
      startDate,
      endDate,
      entity: work["entidad  que avala"],
      approvedAmount: work["monto aprobado"],
      product: work["producto o resultado"],
    };
  });

  return mappedData;
}

interface CurrentWork {
  name: string;
  startDate: string;
  entity: string;
  approvedAmount: number;
  product: string;
}

export function getCurrentWorks(ws: XLSX.WorkSheet): CurrentWork[] {
  const wbData = XLSX.utils.sheet_to_json<string[]>(ws, { header: 1 });
  const initialTableCell = findCell(wbData, "En Ejecución");
  const finalTableCell = findCell(
    wbData,
    "Nota:  Colocar título del Proyecto, investigador principal, C0-investigadores y auxiliares de investigación"
  );

  const ROW_OFFSET = 2;

  const range = `${initialTableCell.col}${
    initialTableCell.row + ROW_OFFSET
  }:${LAST_COLUMN}${finalTableCell.row}`;

  type JsonResponse = {
    "Nombre del proyecto": string;
    "fecha inicio": string;
    "entidad  que avalada": string;
    "monto aprobado": number;
    "producto o resultado": string;
  };

  const data = XLSX.utils.sheet_to_json<JsonResponse>(ws, { range: range });

  const mappedData: CurrentWork[] = data.map((work) => {
    return {
      name: work["Nombre del proyecto"],
      startDate: work["fecha inicio"],
      entity: work["entidad  que avalada"],
      approvedAmount: work["monto aprobado"],
      product: work["producto o resultado"],
    };
  });

  return mappedData;
}

function findCell(wbData: string[][], value: string) {
  const columns = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  let cellValue = "";
  let rowValue = 0;
  let col = "";

  wbData.forEach((row, index) => {
    row.forEach((cell, cellIndex) => {
      cell = cell.toString();
      if (cell.includes(value)) {
        cellValue = cell;
        rowValue = index;
        col = columns[cellIndex];
      }
    });
  });

  return { value: cellValue, row: rowValue, col };
}
