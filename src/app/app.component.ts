import { Component, OnInit } from '@angular/core';
import { CacheService } from './services/cache.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  constructor(private _cache: CacheService) {

  }

  ngOnInit(): void {
    this._cache.loadAll();
  }
}
