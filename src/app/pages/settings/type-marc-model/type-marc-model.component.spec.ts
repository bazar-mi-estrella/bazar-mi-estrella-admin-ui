import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeMarcModelComponent } from './type-marc-model.component';

describe('TypeMarcModelComponent', () => {
  let component: TypeMarcModelComponent;
  let fixture: ComponentFixture<TypeMarcModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeMarcModelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeMarcModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
