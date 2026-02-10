import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class ContactComponent {
  contactForm: FormGroup;
  isSubmitting = false;
  responseMessage = '';
  responseType: 'success' | 'error' | '' = '';

  private fb = inject(FormBuilder);
  private emailService = inject(EmailService);

  constructor() {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      message: ['', Validators.required]
    });
  }

  get f() { return this.contactForm.controls; }

  onSubmit() {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      this.responseMessage = '';
      this.responseType = '';

      this.emailService.sendEmail(this.contactForm.value).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.responseMessage = 'Message sent successfully!';
          this.responseType = 'success';
          this.contactForm.reset();
        },
        error: (error) => {
          this.isSubmitting = false;
          this.responseMessage = 'Failed to send message. Please try again.';
          this.responseType = 'error';
          console.error('Error sending email:', error);
        }
      });
    } else {
      this.contactForm.markAllAsTouched();
    }
  }
}
