import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  isScrolled = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private router: Router) { }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      this.isScrolled = window.scrollY > 40;
    }
  }

  toggleNav() {
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.toggle('nav-open');
    }
  }

  scrollToContact() {
    this.router.navigate(['/'], { fragment: 'contact' }).then(() => {
      const element = document.getElementById('contact');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}
