import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment as env } from 'src/environments/environment';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.scss']
})
export class TestErrorComponent implements OnInit {
  baseUrl = env.skinetCatalogApiBase;
  validationErrors: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  get404Error() {
      this.http.get(this.baseUrl+'product/42').subscribe({
        next: response => console.log(response),
        error: error => console.log(error)
      });
  }

  get500Error() {
    this.http.get(this.baseUrl+'buggy/servererror').subscribe({
      next: response => console.log(response),
      error: error => console.log(error)
    });
  }

  get400Error() {
    this.http.get(this.baseUrl+'buggy/badrequest').subscribe({
      next: response => console.log(response),
      error: error => console.log(error)
    });
  }

  get422ValidationError(){
    this.http.get(this.baseUrl+'product/fortytwo').subscribe({
      next: response => console.log(response),
      error: error => {
        this.validationErrors = error.errors;
      }
    });
  }

}
