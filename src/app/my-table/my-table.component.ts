import { Component, Input, OnInit } from "@angular/core";
import { ColumnPropertiesInterface, TableToolbar } from "../models/models";
import { DataService } from "../services/data/data.service";
import { LoadingService } from "../services/loading/loading.service";
import { ActivatedRoute, Params, Router } from "@angular/router";

@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrl: './my-table.component.scss'
})
export class MyTableComponent implements OnInit {

  @Input() token: string = '';
  @Input() URL = '';
  @Input() autoLoading = true;
  @Input() header = '';
  @Input() messagePending = '';
  @Input() tableDataNotFound = '';
  @Input() columns: ColumnPropertiesInterface[] = [];
  @Input() tableToolbar:TableToolbar = {};
  public data: any[] = [];
  public currentPage = 1;
  public limit =  20;
  public limitOptions = [20, 50, 100];
  private params: Params = [];
  constructor(
    private dataService: DataService,
    public loading: LoadingService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.params = params;
      this.currentPage = isNaN(+params['page']) ? 1 : +params['page'];
      this.limit = isNaN(+params['limit']) ? 20 : +params['limit'];
      if (this.autoLoading && this.token) {
        this.loading.setLoading(true);
        this.dataService.getTableData(this.URL, params)
          .subscribe((data) => {
            this.loading.setLoading(false);
            this.data = Object.values(data)[0];
          });
      }
    });
  }

  onTriggerEvent(column: {}): void {
    this.router.navigate([],
      {
        queryParams: {...column, page: this.currentPage},
        queryParamsHandling: "merge"
      })
  }

  public sortBy({ header, sorting }: ColumnPropertiesInterface): void {
    if (!sorting) {
      return;
    }
    const params = {
      order_by: header,
      order_type: this.params['order_type'] === 'desc' ? 'asc' : 'desc'
    }
    this.onTriggerEvent(params);
  }

  public setPageLimit(size: number): void {
    const params = { limit: size};
    this.onTriggerEvent(params);
  }

  public previousPage(): void {
    if (this.currentPage === 1) {
      return;
    }
    this.currentPage--;
    const params = {page: this.currentPage};
    this.onTriggerEvent(params);
  }

  public nextPage(): void {
    this.currentPage++;
    const params = {page: this.currentPage};
    this.onTriggerEvent(params);
  }

  public isEmptyObject(obj: {}): boolean {
    return (obj && (Object.values(obj).includes(true)));
  }
}
