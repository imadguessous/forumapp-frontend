import { ThemeService } from '../../../services/theme.service';
import { Theme } from '../../../models/theme.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-theme-list-by-id',
  templateUrl: './theme-list-by-id.component.html',
  styleUrls: ['./theme-list-by-id.component.scss']
})
export class ThemeListByIdComponent implements OnInit {

  theme: Theme;
  constructor(private activatedRoute: ActivatedRoute, private themeService: ThemeService) { }

  ngOnInit(): void {

    const themeId: string = this.activatedRoute.snapshot.params['themeId'];
    this.themeService.getThemeByIdFromBackend(themeId).subscribe(
      (data) => this.theme = data,
      (err) => console.log(err.message)
    )

  }

}
