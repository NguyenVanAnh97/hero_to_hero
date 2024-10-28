import { Component } from '@angular/core';
import { Hero } from '../hero';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeroService } from '../hero.service';
import { RouterLink } from '@angular/router';
import { InMemoryDataService } from '../in-memory-data.service';

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [CommonModule, FormsModule, NgFor, RouterLink],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.scss',
})
export class HeroesComponent {
  // Khởi tạo service trong component bằng cách sử dụng constructor.
  constructor(
    private heroService: HeroService,
    private inMemoryDataService: InMemoryDataService
  ) {}

  heroes: Hero[] = [];
  //lấy dữ liệu từ hero.service và messages
  ngOnInit(): void {
    this.heroService.getHeroes().subscribe((heroes) => (this.heroes = heroes));
    //subscribe đăng ký để nhận dữ liệu được phát ra từ Observable này
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }

    const id = this.inMemoryDataService.getId(this.heroes);

    const newHero: Hero = { id, name };

    this.heroService.addHero(newHero).subscribe((hero) => {
      this.heroes.push(hero);
    });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter((h) => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }
}
