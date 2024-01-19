import { Component, Input, OnInit } from "@angular/core";
import { ColumnPropertiesInterface } from "../models/models";
import { DataService } from "../services/data/data.service";
import { LoadingService } from "../services/loading/loading.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrl: './my-table.component.scss'
})
export class MyTableComponent implements OnInit {

  @Input() autoLoading = true;
  @Input() messageNotFound = '';
  @Input() messagePending = '';
  @Input() header: string = '';
  @Input() columns: ColumnPropertiesInterface[] = []
  public data: any = [];
  private params: any;
  public showTool = true;
  public currentPage = 1;


  constructor(
    private dataService: DataService,
    public loading: LoadingService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {

    this.loading.setLoading(true);
    this.route.queryParams.subscribe((paramss) => {
      console.log(paramss)
      this.dataService.getTableData()
        .subscribe((r) => {
          this.loading.setLoading(false);
          this.data = Object.values(r)[0]
        })
    })
  }

  onNavigate(type = '', by = '', page= 1) {
    this.router.navigate([],
      {
        queryParams: {type: type, by:by},
        queryParamsHandling: "merge"
      })
  }

  public sortBy(column: string | undefined) {
    const sortedCol: any = {
        by: column,
        type: 'desc'
    }
    this.router.navigate([],
      {
        queryParams: {type: sortedCol.type, by:sortedCol.by},
        queryParamsHandling: "merge"
      })
  }

  public previousPage() {
    if (this.currentPage === 1) {
      return
    }
    this.currentPage--;
  }

  public nextPage() {
    this.currentPage++;
  }
}
