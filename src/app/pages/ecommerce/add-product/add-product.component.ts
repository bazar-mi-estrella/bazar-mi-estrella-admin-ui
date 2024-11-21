import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

// Ck Editer
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { catchError, concatMap, forkJoin, from, map, mergeMap, of } from 'rxjs';
import { Master } from 'src/app/core/interfaces/master.interface';
import { TypeMarcModel } from 'src/app/core/interfaces/typemarcmodel.interface';
import { ImgbbService } from 'src/app/core/services/imgbb.service';
import { MasterService } from 'src/app/core/services/master.service';
import { TypeMarcaModelService } from 'src/app/core/services/typemarcmodel.service';
import { ProductService } from '../../../core/services/product.service';
import { Imgbb } from 'src/app/core/interfaces/imgbb.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})

/**
 * AddProduct Component
 */
export class AddProductComponent implements OnInit {

  form!: FormGroup

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  public Editor = ClassicEditor;

  publishedList: Master[] = []
  typesList: TypeMarcModel[] = []
  marcList: TypeMarcModel[] = []

  modelList: TypeMarcModel[] = []

  dataEditor: string = "";

  constructor(
    private readonly modalService: NgbModal,
    private readonly fb: FormBuilder,
    private readonly masterService: MasterService,
    private readonly typeMarcaModelService: TypeMarcaModelService,
    private readonly imgbbService: ImgbbService,
    private readonly productService: ProductService
  ) { }

  ngOnInit(): void {
    /**
    * BreadCrumb
    */
    this.breadCrumbItems = [
      { label: 'Ecommerce' },
      { label: 'Create Product', active: true }
    ];

    this.initForm();

    this.initValues()
  }

  initForm() {
    this.form = this.fb.group({
      id: [''],
      name: ['', [Validators.required]],
      description: [''],
      price: ['', [Validators.required]],
      stock: ['', [Validators.required]],
      imgurl: ['', [Validators.required]],
      typeId: ['', [Validators.required]],
      marcaId: ['', [Validators.required]],
      modeloId: ['', [Validators.required]],
      statusId: ['', [Validators.required]],
      listimages: [''],
      listdescripaditionals: [[]]
    })
  }

  initValues(): void {
    forkJoin({
      publishedList: this.masterService.findByPrefixAndCorrelatives(6),
      typesList: this.typeMarcaModelService.types()
    }).subscribe({
      next: (response) => {
        this.publishedList = response.publishedList;
        this.typesList = response.typesList
        console.log('Datos obtenidos:', response);
      },
      error: (error) => {
        console.error('Error al obtener datos:', error);
      },
    });
  }


  getMarcas(typeId: string): void {
    this.typeMarcaModelService
      .marcas(typeId)
      .subscribe(res => this.marcList = res)
  }

  getModels(marcaID: string): void {
    this.typeMarcaModelService
      .models(marcaID)
      .subscribe(res => this.modelList = res)
  }

  /**
  * Multiple Default Select2
  */
  selectValue = ['Choice 1', 'Choice 2', 'Choice 3'];

  // File Upload
  imageURL: string | undefined;
  base64Image: string = '';

  fileChange(event: any) {
    let fileList: any = (event.target as HTMLInputElement);
    let file: File = fileList.files[0];

    const reader = new FileReader();

    reader.onload = () => {
      this.imageURL = reader.result as string;

      // Convertir el archivo leído en Base64
      this.base64Image = this.imageURL.split(',')[1]; // Aquí se obtiene solo la parte Base64
      console.log("base64", this.base64Image);

      // Asignar la imagen al elemento img en la página
      (document.getElementById('product-img') as HTMLImageElement).src = this.imageURL;
    }

    reader.readAsDataURL(file);
  }


  save() {

    const filesRequest = this.filesData
      .map(
        (imgProd) => this.imgbbService.save(imgProd.base64 ?? "")
          .pipe(map((response: Imgbb) => response.data.url))// Extraemos solo la URL de la respuesta
      )

    forkJoin(filesRequest)
      .subscribe({
        next: (responses) => {
          console.log('Todas las respuestas:', responses);

          this.saveProduct(responses)
        },
        error: (error) => {
          console.error('Error en el proceso:', error);
        },

      })

  }

  saveProduct(urls: string[]) {
    this.listimages.setValue(urls.map(url => ({ urlimg: url, codecolor: 'red' })));
    this.description.setValue(this.dataEditor)
    this.productService.save(this.form.value).subscribe({
      next(value) {

      }, error(err) {

      },
    })
  }

    /**
   * Open Success modal
   * @param successModal Success modal data
   */
    successModal(successModal: any) {
      this.modalService.open(successModal, { centered: true });
    }


  filesData: { name: string, size: number, type: string, base64?: string }[] = [];

  onFilesAdded(event: any[]) {
    event.forEach(file => {
      // Extraer propiedades del archivo
      const fileInfo = {
        name: file.name,
        size: file.size,
        type: file.type,
      };

      // Convertir el archivo a Base64 usando FileReader
      this.convertToBase64(file, fileInfo);
    });

  }

  convertToBase64(file: File, fileInfo: any) {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      // Guardar la representación Base64 en el objeto del archivo
      let base: string = reader.result as string;
      fileInfo.base64 = base.split(',')[1]
      this.filesData.push(fileInfo);

    };

    reader.onerror = (error) => {
      console.error('Error al leer el archivo:', error);
    };
  }

  disabledSave(): boolean {
    if (!this.base64Image) return true;
    if (!this.dataEditor) return true;
    if (this.form.invalid) return true;
    return false;
  }

  onSelectionChangeType(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.getMarcas(value)
  }


  onSelectionChangeMarca(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.getModels(value)


  }


  get listimages(): AbstractControl {
    return this.form.controls['listimages']
  }

  get description(): AbstractControl {
    return this.form.controls['description']
  }
}