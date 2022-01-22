import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasket } from 'src/app/shared/models/basket';
import { IOrder, IOrderToCreate } from 'src/app/shared/models/order';
import { environment as env } from 'src/environments/environment';
import { CheckoutService } from '../checkout.service';
import { CheckoutFormGroupHelper } from '../form-groups/checkoutFormGroupHelper';

declare var Stripe;

@Component({
  selector: 'skinet-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss']
})
export class CheckoutPaymentComponent implements AfterViewInit, OnDestroy {
  @Input() checkoutForm: FormGroup; 
  @ViewChild('cardNumber', {static: true}) cardNumberElement: ElementRef;
  @ViewChild('cardExpiry', {static: true}) cardExpiryElement: ElementRef;
  @ViewChild('cardCvc', {static: true}) cardCvcElement: ElementRef;

  stripe: any;
  cardNumber: any;
  cardExpiry: any;
  cardCvc: any;
  cardErrors: any;
  cardHandler = this.onChange.bind(this);
  loading: boolean = false;
  cardNumberValid: boolean = false;
  cardCvcValid: boolean = false;
  cardExpiryValid: boolean = false;

  constructor(private basketService: BasketService,
    private checkoutService: CheckoutService,
    private toastr: ToastrService,
    private router: Router) { }

  ngAfterViewInit(): void {
    this.stripe = Stripe(env.stripePublishableKey);   
    const elements = this.stripe.elements();
    this.createStripeElemnts(elements);
  }

  onChange(event){
    if(event.error){
      this.cardErrors = event.error.message;
    }else{
      this.cardErrors = null;
    }

    switch(event.elementType){
      case 'cardNumber':
        this.cardNumberValid = event.complete;
        break;
      case 'cardExpiry':
        this.cardExpiryValid = event.complete;
        break;
      case 'cardCvc': 
        this.cardCvcValid = event.complete;
        break;
    }
  }

  get isStripeFormValid(): boolean {
    return this.checkoutForm.get('paymentFormGroup').valid
      && this.cardNumberValid
      && this.cardCvcValid
      && this.cardExpiryValid;
  }

  // creates stripe elements
  private createStripeElemnts(elements){
    this.cardNumber = elements.create('cardNumber');
    this.cardNumber.mount(this.cardNumberElement.nativeElement);
    this.cardNumber.addEventListener('change', this.cardHandler);
    
    this.cardCvc = elements.create('cardCvc');
    this.cardCvc.mount(this.cardCvcElement.nativeElement);
    this.cardCvc.addEventListener('change', this.cardHandler);
    
    this.cardExpiry = elements.create('cardExpiry');
    this.cardExpiry.mount(this.cardExpiryElement.nativeElement);
    this.cardExpiry.addEventListener('change', this.cardHandler);
  }

  // destroys stripe elements
  private destroyStripeElemnts(){
    this.cardNumber?.destroy();
    this.cardCvc?.destroy();
    this.cardExpiry?.destroy();
  }

  get paymentFormGroup(): FormGroup {
    return  CheckoutFormGroupHelper.GetChildForm(this.checkoutForm, 'paymentFormGroup');
  }
  
  async submitOrder() {
    this.loading = true;
    const basket = this.basketService.getCurrentBasketValue();
   
    try{
      const paymentResult = await this.confirmPaymentWithStripe(basket);
      if(paymentResult.paymentIntent){
        const createdOrder = await this.createOrder(basket);
        this.basketService.deleteBasketLocally(basket.id);
        const navExtras: NavigationExtras = {state: createdOrder};
        this.router.navigate(['checkout/success'], navExtras);
      }else{
        this.toastr.error(paymentResult.error.message);
      }
    }catch(error: any){
      console.log(error);
    }finally{
      this.loading = false;
    }
  } 

  private async createOrder(basket: IBasket): Promise<IOrder>{
    const orderToCreate = this.getOrderToCreate(basket);
    const orderSource$ = this.checkoutService.createOrder(orderToCreate);
    return await lastValueFrom(orderSource$);
  }

  private async confirmPaymentWithStripe(basket: IBasket): Promise<any>{
    return this.stripe.confirmCardPayment(basket.clientSecret, {
      payment_method: {
        card: this.cardNumber,
        billing_details: {
          name: this.checkoutForm.get('paymentFormGroup').get('nameOnCard').value
        }
      }
    }); 
  }

  private getOrderToCreate(basket: IBasket): IOrderToCreate {
    return {
      basketId: basket.id,
      deliveryMethodId: +this.checkoutForm.get('deliveryFormGroup').get('deliveryMethod').value,
      shippingAddress: this.checkoutForm.get('addressFormGroup').value
    }; 
  }

  ngOnDestroy(): void { 
    this.destroyStripeElemnts();
  }

}
