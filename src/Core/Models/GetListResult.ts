export class GetListResult<TModel> {

    /**
     * Сколько нужно взять из списка
     * */
    Count: number;

    /**
     * Сколько нужно пропустить в списке
     * */
    OffSet: number;

    /*
     * Всего в списке
     */
    TotalCount: number;

    /**
     * Список сущностей выбраных из списка
     * */
    List: Array<TModel>;

    /**
     * Получить номер текущей страницы
     * */ 
    public GetCurrentPageNumber(): number {
        if (this.Count === null) {
            return 0;
        }

        return this.OffSet / this.Count;
    }

    /**
     * Получить количество страниц
     * */       
    public GetPagesCount(): number {
        if (this.Count === null) {
            return 0;
        }

        return this.TotalCount % this.Count > 0 ? this.TotalCount / this.Count + 1 : this.TotalCount / this.Count;
    }
}