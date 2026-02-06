import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-government',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './government.html',
    styleUrl: './government.css'
})
export class GovernmentComponent { }
// Forced refresh
