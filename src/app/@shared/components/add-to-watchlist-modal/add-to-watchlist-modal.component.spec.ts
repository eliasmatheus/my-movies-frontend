import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToWatchlistModalComponent } from './add-to-watchlist-modal.component';

describe('AddToWatchlistModalComponent', () => {
  let component: AddToWatchlistModalComponent;
  let fixture: ComponentFixture<AddToWatchlistModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddToWatchlistModalComponent]
    });
    fixture = TestBed.createComponent(AddToWatchlistModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
