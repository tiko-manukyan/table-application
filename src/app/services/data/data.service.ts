import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }
  public getTableData(url: string, body: {} = {page:1, limit:20}) {
    return this.http.post(url, body)
  }
}
