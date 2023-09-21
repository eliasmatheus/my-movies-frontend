import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.scss'],
})
export class MovieSearchComponent {
  form: FormGroup = new FormGroup({
    search: new FormControl(''),
  });

  constructor(private router: Router) {}

  onSubmit() {
    this.router.navigate(['pages/movies'], {
      queryParams: { query: this.form.value.search },
    });

    this.form.reset();
  }

  get search() {
    return this.form.get('search');
  }
}
