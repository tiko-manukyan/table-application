import { Component } from '@angular/core';
import {TableToolbar} from "./models/models";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  readonly token = "WriteYourTokenHere"
  public url = 'https://mytable.free.mockoapp.net/all';
  public tableHeader = 'My custom table header';
  public pendingMessage = 'Данные загружаются';
  public notFoundData = 'Данные не найдены';
  public tableColumns: any[] = [
    {
      display: true,
      order: 1,
      header: 'name',
      sorting: true
    },
    {
      display: true,
      order: 2,
      header: 'type',
      sorting: true
    },
    {
      display: true,
      order: 3,
      header: 'author',
      sorting: false
    }
  ];
  public tableToolbar: TableToolbar = {
    totalDataCount: true,
    search: true,
    limit: true
  };
}
