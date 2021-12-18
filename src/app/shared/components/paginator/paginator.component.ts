import { Component, Input, OnInit, Output } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { Subject } from 'rxjs';


@Component({
  selector: 'skinet-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {
  @Input() totalCount: number;
  @Input() pageSize: number;
  @Output() pageChanged = new Subject<number>();

  constructor() { }

  ngOnInit(): void {
  }

  onPageChange(event: PageChangedEvent){
    this.pageChanged.next(event.page);
  }
}
