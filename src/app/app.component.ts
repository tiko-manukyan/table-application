import { Component } from '@angular/core';
import {ColumnPropertiesInterface} from "./models/models";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  public tableHeader = 'My custom table header';
  public pendingMessage = 'Данные загружаются';
  public notFoundData = 'Данные не найдены';
  public tableColumns: ColumnPropertiesInterface[] = [
    {
      display: true,
      order: 1,
      header: 'Name'
    },
    {
      display: true,
      order: 2,
      header: 'Type'
    },
    {
      display: true,
      order: 3,
      header: 'Author'
    }
  ];
}
