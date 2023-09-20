import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SubSink } from 'subsink';
import { CreateWatchlist } from '../../models/watchlist';
import { WatchlistService } from '../../services/watchlist.service';
import { ModalComponent } from '../ui/modal/modal.component';

@Component({
  selector: 'app-watchlist-modal',
  standalone: true,
  templateUrl: './watchlist-modal.component.html',
  imports: [ModalComponent, FormsModule, ReactiveFormsModule],
})
export class WatchlistModalComponent implements OnInit, OnDestroy {
  form = new FormGroup({
    name: new FormControl<string>('', Validators.required),
    description: new FormControl(''),
  });

  private subs = new SubSink();

  watchlists: any[] = [];
  loading = false;

  constructor(
    public dialogRef: MatDialogRef<WatchlistModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,

    private watchListService: WatchlistService,
  ) {}

  ngOnInit(): void {
    this.getWatchlists();
  }

  getWatchlists() {
    this.watchListService.getWatchlist().subscribe({
      next: data => {
        this.loading = false;
        console.log('this.watchListService.getWatchList -> data:', data);

        this.watchlists = data.watchlists;
      },
      error: err => {
        this.loading = false;

        console.log('this.watchListService.getWatchList -> err:', err);
      },
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    const body: CreateWatchlist = {
      name: this.form.value.name ?? '',
      description: this.form.value.description ?? '',
    };

    this.watchListService.saveWatchlist(body).subscribe({
      next: data => {
        this.loading = false;
        console.log('this.watchListService.getWatchList -> data:', data);
      },
      error: err => {
        this.loading = false;

        console.log('this.watchListService.getWatchList -> err:', err);
      },
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
