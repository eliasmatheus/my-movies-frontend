import { CommonModule } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SubSink } from 'subsink';
import { PostWatchlist, WatchlistDetails } from '../../models/watchlist';
import { ToastService } from '../../services/toast.service';
import { WatchlistService } from '../../services/watchlist.service';
import { ModalComponent } from '../ui/modal/modal.component';

@Component({
  selector: 'app-watchlist-modal',
  standalone: true,
  templateUrl: './watchlist-modal.component.html',
  imports: [CommonModule, ModalComponent, FormsModule, ReactiveFormsModule],
})
export class WatchlistModalComponent implements OnInit, OnDestroy {
  title = this.data ? this.data.name : 'Watchlist';

  form = new FormGroup({
    name: new FormControl<string>('', Validators.required),
    description: new FormControl(''),
  });

  private subs = new SubSink();

  loading = false;

  constructor(
    public dialogRef: MatDialogRef<WatchlistModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: WatchlistDetails | null,

    private router: Router,
    private toastService: ToastService,
    private watchListService: WatchlistService,
  ) {}

  ngOnInit(): void {
    if (!this.data) return;

    this.form.patchValue({
      name: this.data.name,
      description: this.data.description,
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    const body: PostWatchlist = {
      id: this.data?.id ?? undefined,
      name: this.form.value.name ?? '',
      description: this.form.value.description ?? '',
    };

    this.watchListService.saveWatchlist(body).subscribe({
      next: () => {
        this.loading = false;

        this.toastService.success('Watchlist saved successfully!');

        this.onClose(true);
      },
      error: err => {
        this.loading = false;

        this.toastService.error('Error creating watchlist!');
        this.toastService.error(err.error.message);
      },
    });
  }

  onDelete() {
    if (!this.data) return;

    this.watchListService.deleteWatchlist(this.data.id).subscribe({
      next: () => {
        this.loading = false;

        this.toastService.success('Watchlist deleted successfully!');

        this.router.navigate(['pages/movies']);

        this.onClose(true);
      },
      error: err => {
        this.loading = false;

        this.toastService.error('Error deleting watchlist!');
        this.toastService.error(err.error.message);
      },
    });
  }

  onClose(reload?: boolean): void {
    this.dialogRef.close(reload);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
