import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Review {
    name: string;
    role: string;
    feedback: string;
    image: string;
}

@Component({
    selector: 'app-review-slider',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './review-slider.component.html',
    styleUrls: ['./review-slider.component.css']
})
export class ReviewSliderComponent {
    reviews: Review[] = [
        {
            name: 'Arjun Singh',
            role: 'Customer',
            feedback: 'For a flawless audio-visual experience, Eventplus is the go-to choice! Their equipment and service for AV renting were top-notch. Appreciates their commitment to quality in every aspect',
            image: ''
        },
        {
            name: 'Priya Sharma',
            role: 'Event Manager',
            feedback: 'Ardour handled our corporate retreat with absolute professionalism. The attention to detail was impressive.',
            image: ''
        },
        {
            name: 'Rahul Verma',
            role: 'Marketing Head',
            feedback: 'Great team to work with. They understood our brand vision perfectly and executed the campaign seamlessly.',
            image: ''
        },
        {
            name: 'Aditi Rao',
            role: 'Product Manager',
            feedback: 'The product launch was a massive success, thanks to the meticulous planning and execution by the Ardour team.',
            image: ''
        },
        {
            name: 'Vikram Malhotra',
            role: 'CEO, TechSolutions',
            feedback: 'We have partnered with many event management companies, but Ardour stands out for their creativity and reliability.',
            image: ''
        },
        {
            name: 'Sneha Kapoor',
            role: 'HR Director',
            feedback: 'Our annual employee appreciation event was flawless. The team took care of everything, allowing us to enjoy the evening.',
            image: ''
        },
        {
            name: 'Amit Joshi',
            role: 'Director',
            feedback: 'Exceptional service and support throughout the entire process. Highly recommended for any large-scale corporate events.',
            image: ''
        }
    ];

    currentIndex = 0;

    get currentReview() {
        return this.reviews[this.currentIndex];
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.reviews.length;
    }

    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.reviews.length) % this.reviews.length;
    }
}
