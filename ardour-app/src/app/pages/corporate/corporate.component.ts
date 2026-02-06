import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-corporate',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './corporate.html',
    styleUrl: './corporate.css'
})
export class CorporateComponent { }
// Forced refresh
