// pagination.service.ts
import { Injectable } from '@angular/core';
import { Paginator } from '../interfaces/paginator.interface';
import { Page } from '../interfaces/page.interface';

@Injectable({
    providedIn: 'root',
})
export class PaginationService {
    pageSize: any = 8;
    page: any = 1;
    direction: any = 'asc';
    startIndex: number = 1;
    endIndex: number = 9;

    buildPagination(data: Page<any>): Paginator {
        return {
            number: data.number + 1,
            totalElement: data.totalElements,
            totalPages: data.totalPages,
            size: data.size,
            startIndex: this.buildStartIndex(data),
            endIndex: this.buildEndIndex(data)

        }
    }

    private buildStartIndex(data: Page<any>): number {
        return ((data.number + 1) * (data.size)) + 1 - data.size;
    }


    private buildEndIndex(data: Page<any>): number {
        const endIndex = (data.number + 1) * data.size;
        return endIndex > data.totalElements ? data.totalElements : endIndex;
    }
    

    // Pagination
    changePage(alldata: any[]) {
        const startItem = (this.page - 1) * this.pageSize + 1;
        const endItem = (this.page - 1) * this.pageSize + this.pageSize;
        this.endIndex = endItem;
        if (this.endIndex > alldata.length) {
            this.endIndex = alldata.length;
        }
        return alldata.slice(startItem - 1, endItem);
    }

    // Sort Data
    onSort(column: string, dataList: any[]) {
        if (this.direction == 'asc') {
            this.direction = 'desc';
        } else {
            this.direction = 'asc';
        }
        const sortedArray = [...dataList]; // Create a new array
        sortedArray.sort((a, b) => {
            const res = this.compare(a[column], b[column]);
            return this.direction === 'asc' ? res : -res;
        });
        return dataList = sortedArray;
    }
    compare(v1: string | number, v2: string | number) {
        return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
    }


}
