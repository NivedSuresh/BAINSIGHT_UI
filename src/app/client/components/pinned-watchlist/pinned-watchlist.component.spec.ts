import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PinnedWatchlistComponent} from './pinned-watchlist.component';

describe('PinnedWatchlistComponent', () => {
  let component: PinnedWatchlistComponent;
  let fixture: ComponentFixture<PinnedWatchlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PinnedWatchlistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PinnedWatchlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
