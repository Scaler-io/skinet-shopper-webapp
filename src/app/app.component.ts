import { Component, OnInit } from '@angular/core';
import { AccountService } from './account/account.service';
import { BasketService } from './basket/basket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = "skinet-shopper";

  constructor(private basketService: BasketService,
    private accountService: AccountService){}

  ngOnInit(): void {
    this.loadBasket();
    this.loadCurrentUser();
  }

  private loadBasket(): void {
    const basketId = localStorage.getItem('basket_id');
    if(basketId)
      this.basketService.getBasket(basketId).subscribe();
  }

  private loadCurrentUser(): void{
    const token = localStorage.getItem('token');
    if(token)
      this.accountService.loadCurrentUser(token).subscribe();
  }
}
