import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwDialogBodyComponent } from './aw-dialog-body.component';

describe('AwDialogBodyComponent', () => {
  let component: AwDialogBodyComponent;
  let fixture: ComponentFixture<AwDialogBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AwDialogBodyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AwDialogBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
