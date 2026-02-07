import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-gallery',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './gallery.html',
    styleUrl: './gallery.css'
})
export class GalleryComponent { }
