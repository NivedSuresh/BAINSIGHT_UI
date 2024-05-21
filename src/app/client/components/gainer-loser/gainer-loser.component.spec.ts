import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GainerLoserComponent} from './gainer-loser.component';

describe('GainerLoserComponent', () => {
  let component: GainerLoserComponent;
  let fixture: ComponentFixture<GainerLoserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GainerLoserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GainerLoserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
