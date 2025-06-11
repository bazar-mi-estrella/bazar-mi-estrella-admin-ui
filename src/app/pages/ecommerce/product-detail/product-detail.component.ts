import { Component, OnInit, ViewChild } from '@angular/core';
// Products Services

import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { ProductService } from '../../../core/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/core/interfaces/product.interface';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})

/**
 * ProductDetail Component
 */
export class ProductDetailComponent implements OnInit {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  isLoader:boolean=true;
  // isImage;
  defaultSelect = 2;
  readonly = false;
  content?: any;
  products: any;
  product: Product = {} as Product

  id: string = this.activatedRoute.snapshot.params["id"];
  @ViewChild('slickModal') slickModal!: SlickCarouselComponent;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    public productService: ProductService) {

  }

  ngOnInit(): void {
    this.initBreadcrump()
    this.getById()
  }


  getById(): void {
    this.isLoader=true
    this.productService.getProductById(this.id).subscribe((res: Product) => {
      this.product = res
      this.product.images.unshift({ urlimg: res.imgurl })
      this.isLoader=false
    })
  }

  initBreadcrump() {
    this.breadCrumbItems = [
      { label: 'Productos' },
      { label: 'Detalle', active: true }
    ];
  }

  /**
   * Swiper setting
   */
  config = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false
  };

  slidesConfig = {
    // Configuration options for the ngx-slick-carousel
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
  }

  slickChange(event: any) {
    const swiper = document.querySelectorAll('.swiperlist')
  }

  slidePreview(id: any, event: any) {
    const swiper = document.querySelectorAll('.swiperlist')
    swiper.forEach((el: any) => {
      el.classList.remove('swiper-slide-thumb-active')
    })
    event.target.closest('.swiperlist').classList.add('swiper-slide-thumb-active')
    this.slickModal.slickGoTo(id)
  }
}
