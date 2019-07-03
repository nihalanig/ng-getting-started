import { Component, OnInit } from "@angular/core";
import { IProduct } from "./products";
import { ProductService } from "./product.service";

@Component({
  selector: 'pm-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = (this.listFilter ? this.performFilter(this.listFilter) : this.products);
  }
  pageTitle: string = 'Product List';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  filteredProducts: IProduct[];
  products: IProduct[];
  errorMessage: string = '';
  constructor(private productService: ProductService) {

  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  performFilter(filterBy: string): IProduct[] {
    return this.products.filter(product => product.productName.toLowerCase().indexOf(this.listFilter) !== -1);
  }

  ngOnInit(): void {
    
    this.productService.getProducts().subscribe(

      products => {
      this.products = products;
        this.filteredProducts = this.products;
      },

      error => { this.errorMessage = <any>error }
    );

  }

  onRatingClicked(message: string): void {
    this.pageTitle = 'Product List: ' + message;
  }

}
