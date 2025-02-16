import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundEvaluateComponent } from './refund-evaluate.component';

describe('RefundEvaluateComponent', () => {
  let component: RefundEvaluateComponent;
  let fixture: ComponentFixture<RefundEvaluateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RefundEvaluateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefundEvaluateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
