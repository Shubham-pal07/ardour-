import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, Header, Footer], // Add CommonModule imports
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ardour-app');
  showSplash = true;
  fadeOut = false;

  ngOnInit() {
    // Start fade out after 2.5 seconds (adjust timing as needed)
    setTimeout(() => {
      this.fadeOut = true;
    }, 2500);

    // Remove from DOM after animation completes (e.g., +0.8s for transition)
    setTimeout(() => {
      this.showSplash = false;
    }, 3300);
  }
}
