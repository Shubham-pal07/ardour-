import { Component, Inject, OnInit, AfterViewInit, ViewChild, ElementRef, PLATFORM_ID, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser, DecimalPipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { EmailService } from '../../services/email.service';
import { RouterLink } from '@angular/router';

import { ReviewSliderComponent } from '../../components/review-slider/review-slider.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, ReviewSliderComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
  providers: [DecimalPipe]
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  // Slider
  currentSlide = 0;
  slideInterval: any;

  // Stats
  stats = {
    happyClients: 0,
    eventsDone: 0,
    yearsBusiness: 0,
    teamSize: 0
  };
  hasAnimatedStats = false;
  @ViewChild('statsSection') statsSection!: ElementRef;

  // Contact Form
  contactForm: FormGroup;
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private emailService: EmailService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      message: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.startSlider();
    }
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initStatsObserver();
    }
  }

  ngOnDestroy(): void {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  // Slider Logic
  startSlider() {
    this.slideInterval = setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % 5;
    }, 3000);
  }

  // Stats Logic
  initStatsObserver() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.hasAnimatedStats) {
          this.animateCounters();
        }
      });
    }, { threshold: 0.4 });

    if (this.statsSection) {
      observer.observe(this.statsSection.nativeElement);
    }
  }

  animateCounters() {
    this.hasAnimatedStats = true;
    const targets = [
      { key: 'happyClients', target: 1000 },
      { key: 'eventsDone', target: 800 },
      { key: 'yearsBusiness', target: 5 },
      { key: 'teamSize', target: 90 }
    ];

    targets.forEach(item => {
      const increment = item.target / 120;
      let count = 0;
      const updateCount = () => {
        if (count < item.target) {
          count += increment;
          // @ts-ignore
          this.stats[item.key] = Math.ceil(count);
          requestAnimationFrame(updateCount);
        } else {
          // @ts-ignore
          this.stats[item.key] = item.target;
        }
      };
      updateCount();
    });
  }

  // Form Logic
  onSubmit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.emailService.sendEmail(this.contactForm.value).subscribe({
      next: (response) => {
        this.successMessage = 'Enquiry submitted successfully! We will connect with you soon.';
        this.contactForm.reset();
        this.isSubmitting = false;
      },
      error: (error) => {
        console.error('Email send failed', error);
        this.errorMessage = 'Failed to submit enquiry. Please try again later.';
        this.isSubmitting = false;
      }
    });
  }
}
