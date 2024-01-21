import { Component, Input, OnInit } from "@angular/core";
import { ColumnPropertiesInterface, GridRequestInterface } from "../models/models";
import { DataService } from "../services/data/data.service";
import { LoadingService } from "../services/loading/loading.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrl: './my-table.component.scss'
})
export class MyTableComponent implements OnInit {

  @Input() URL!: string
  @Input() autoLoading = true;
  @Input() messageNotFound = '';
  @Input() messagePending = '';
  @Input() header: string = '';
  @Input() columns: ColumnPropertiesInterface[] = []
  public data: any = [];
  public showTool = true;
  public currentPage = 1;
  private limit =  20;


  constructor(
    private dataService: DataService,
    public loading: LoadingService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.currentPage = isNaN(+params['page']) ? 1 : +params['page'];
      this.limit = isNaN(+params['limit']) ? 20 : +params['limit'];
      this.loading.setLoading(true);
      this.dataService.getTableData(this.URL, params)
        .subscribe((data) => {
          this.loading.setLoading(false);
          this.data = Object.values(data)[0]
        })
    })
  }

  onNavigate(column: GridRequestInterface | any) {
    this.router.navigate([],
      {
        queryParams: {...column, page: this.currentPage, limit:this.limit},
        queryParamsHandling: "merge"
      })
  }

  public sortBy(column: string | undefined) {
    const params = {
      order_by: column,
      order_type: 'desc'
    }
    this.onNavigate(params);
  }

  public previousPage() {
    if (this.currentPage === 1) {
      return
    }
    this.currentPage--;
    const params = {page: this.currentPage}
    this.onNavigate(params)
  }

  public nextPage() {
    this.currentPage++;
    const params = {page: this.currentPage}
    this.onNavigate(params)
  }
}
