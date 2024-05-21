import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WatchlistCreateDialog} from './watchlist-create-dialog.component';

describe('MatDialogBodyComponent', () => {
  let component: WatchlistCreateDialog;
  let fixture: ComponentFixture<WatchlistCreateDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WatchlistCreateDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WatchlistCreateDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
