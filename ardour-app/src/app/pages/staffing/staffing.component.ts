import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-staffing',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './staffing.html',
    styleUrl: './staffing.css'
})
export class StaffingComponent { }
// Forced refresh
