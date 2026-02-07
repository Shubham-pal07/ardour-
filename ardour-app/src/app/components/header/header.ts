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
  isServicesOpen = false;
  isNavOpen = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private router: Router) {
    // Listen for route changes to close the menu
    this.router.events.subscribe(() => {
      this.closeNav();
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      this.isScrolled = window.scrollY > 40;
    }
  }

  toggleNav() {
    if (isPlatformBrowser(this.platformId)) {
      this.isNavOpen = !this.isNavOpen;
      if (this.isNavOpen) {
        document.body.classList.add('nav-open');
      } else {
        document.body.classList.remove('nav-open');
      }
    }
  }

  closeNav() {
    if (isPlatformBrowser(this.platformId)) {
      this.isNavOpen = false;
      document.body.classList.remove('nav-open');
      this.isServicesOpen = false;
    }
  }

  toggleServices(event: Event) {
    // Only toggle on smaller screens where nav-toggle is visible
    if (isPlatformBrowser(this.platformId) && window.innerWidth <= 900) {
      event.preventDefault();
      event.stopPropagation();
      this.isServicesOpen = !this.isServicesOpen;
    }
  }

  scrollToContact() {
    this.closeNav(); // Close nav explicitly when clicking this specific button
    this.router.navigate(['/'], { fragment: 'contact' }).then(() => {
      const element = document.getElementById('contact');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}
