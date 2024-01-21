import { Component } from '@angular/core';
import {ColumnPropertiesInterface, RequestType} from "./models/models";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  public url = 'https://mytable.free.mockoapp.net/all';
  public tableHeader = 'My custom table header';
  public pendingMessage = 'Данные загружаются';
  public notFoundData = 'Данные не найдены';
  public tableColumns: any[] = [
    {
      display: true,
      order: 1,
      header: 'name'
    },
    {
      display: true,
      order: 2,
      header: 'type'
    },
    {
      display: true,
      order: 3,
      header: 'author'
    }
  ];
}
