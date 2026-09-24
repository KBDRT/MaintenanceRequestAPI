import { Op, OrderItem } from "sequelize";
import { Model, ModelStatic } from "sequelize-typescript";
import z from "zod";

interface SearchCondition {
  [key: string]: any;
}

const validSortFields = ["status", "id", "type", "priority", "equipmentsIds"];

const MAX_LIMIT = 100;

export class FilterParser<FilterDTO extends object> {

  private readonly dto: FilterDTO;
  private readonly dateFieldName?: string;

  public readonly filter: SearchCondition = {};
  public readonly sort: OrderItem[] = [];

  private _limit: number = MAX_LIMIT;
  private _offset: number = 0;

  get limit(): number {
    return this._limit;
  }

  get offset(): number {
    return this._offset;
  }

  constructor(filterDTO: FilterDTO, dateFieldName?: string) {
    this.dto = filterDTO;
    this.dateFieldName = dateFieldName;

    try {
      this.parseFilter();
      this.parseDate();
      this.parseSort();
      this.parsePagination();
    }
    catch {

    }
  }

  private parseFilter() {
    for (const fieldName of validSortFields) {
      const value = this.dto[fieldName as keyof FilterDTO];
      if (value) {
        this.filter[fieldName] = {[Op.in]: value};
      }
    }
  }

  private parseDate() {

    if (!this.dateFieldName) return;

    const dateFromValue = this.dto["dateFrom" as keyof FilterDTO];
    if (dateFromValue) {
      this.filter[this.dateFieldName] = {[Op.gte]: dateFromValue};
    }

    const dateToValue = this.dto["dateTo" as keyof FilterDTO];
    if (dateToValue) {
      this.filter[this.dateFieldName] = {[Op.lte]: dateToValue};
    }
  }

  private parseSort() {
    const sortValue = this.dto["sort" as keyof FilterDTO];
    const sortDirectionValue = this.dto["sortDirection" as keyof FilterDTO];
    if (sortValue && Array.isArray(sortValue)) {
      for (let index = 0; index < sortValue.length; index++) {

        let direction = 'ASC';
        if (sortDirectionValue && Array.isArray(sortDirectionValue)) {
          direction = sortDirectionValue[index] === "DESC" ? "DESC" : "ASC";
        }

        this.sort.push([sortValue[index], direction]);
      }
    }
  }

  private parsePagination() {
    const schema = z.object({
      page: z.coerce.number().int().min(1).default(1),
      limit: z.coerce.number().int().max(MAX_LIMIT).default(20),
    })

    const pageValue = this.dto["page" as keyof FilterDTO];
    const limitValue = this.dto["limit" as keyof FilterDTO];

    const parse = schema.safeParse({page: pageValue, limit: limitValue});
    if (parse.success) {
      this._limit = parse.data.limit;
      this._offset = (parse.data.page - 1) * this._limit;
    }
  }

}
