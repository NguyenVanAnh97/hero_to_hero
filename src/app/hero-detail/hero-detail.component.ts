import { Component, Input } from '@angular/core';
import { Hero } from '../hero';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.scss',
})
export class HeroDetailComponent {
  constructor(
    private route: ActivatedRoute,
    // Chứa thông tin về route hiện tại, bao gồm cả các tham số URL. Component này cần tham số id từ URL để xác định hero nào cần hiển thị.
    private heroService: HeroService,
    //lấy dữ liệu hero từ server.
    private location: Location
  ) // Dịch vụ Angular giúp tương tác với trình duyệt, cho phép quay lại trang trước đó.
  {}

  hero:Hero | undefined; //(union type)
  //có thể có giá trị là một đối tượng Hero hoặc là undefined;

  ngOnInit(): void {
    // Lấy id từ URL và chuyển thành số
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id).subscribe((hero) => (this.hero = hero));
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.hero) {
      this.heroService.updateHero(this.hero).subscribe(() => this.goBack());
    }
  }
}
