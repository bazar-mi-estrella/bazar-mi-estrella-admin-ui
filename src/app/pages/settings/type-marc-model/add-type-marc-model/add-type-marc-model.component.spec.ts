import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTypeMarcModelComponent } from './add-type-marc-model.component';

describe('AddTypeMarcModelComponent', () => {
  let component: AddTypeMarcModelComponent;
  let fixture: ComponentFixture<AddTypeMarcModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTypeMarcModelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTypeMarcModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
