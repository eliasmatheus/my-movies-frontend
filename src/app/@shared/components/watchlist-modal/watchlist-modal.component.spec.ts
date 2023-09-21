import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchlistModalComponent } from './watchlist-modal.component';

describe('WatchlistModalComponent', () => {
  let component: WatchlistModalComponent;
  let fixture: ComponentFixture<WatchlistModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WatchlistModalComponent],
    });
    fixture = TestBed.createComponent(WatchlistModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
