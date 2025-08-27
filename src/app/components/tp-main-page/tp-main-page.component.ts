import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { AppNavBarComponent } from '../../smart-components/app-nav-bar/app-nav-bar.component';
import { FormBuilder, Validators } from '@angular/forms';
import { SharedImportsModule } from '../../helper/shared-imports';
import { ApiDataProviderService } from '../../service/api-data-provider.service';
import { map, take } from 'rxjs';
import {
  InfoDataCommand,
  SaveContactMeDetailsQuery,
} from '../../models/info-data.model';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { portfolioConstantObj } from '../../helper/app.constant';

@Component({
  selector: 'app-tp-main-page',
  imports: [CommonModule, AppNavBarComponent, SharedImportsModule],
  templateUrl: './tp-main-page.component.html',
  styleUrl: './tp-main-page.component.scss',
  standalone: true,
})
export class TpMainPageComponent implements OnInit {
  private _fb = inject(FormBuilder);
  private _apiService = inject(ApiDataProviderService);
  private _snackBar = inject(MatSnackBar);

  durationInSeconds = 5;

  currentIndex = 0;
  projectsPerPage = 3;
  infoData = signal<InfoDataCommand | null>(null);
  projectPhoto = [
    'assets/sms_photo.jpg',
    'assets/ems_photo.jpg',
    'assets/quick_note.jpg',
  ];

  contactFg = this._fb.nonNullable.group({
    name: this._fb.control('', [Validators.required]),
    email: this._fb.control('', [Validators.required, Validators.email]),
    message: this._fb.control(''),
  });

  get contactFgControls() {
    return this.contactFg.controls;
  }

  get visibleProjects() {
    return this.infoData()?.projects.slice(
      this.currentIndex,
      this.currentIndex + this.projectsPerPage
    );
  }

  ngOnInit(): void {
    // this.fetchAllInfoDetails();

    const modifiedInfoData = {
      ...portfolioConstantObj,
      showNextPreviousButton: (portfolioConstantObj.projects?.length ?? 0) > 3,
    };

    this.infoData.set(modifiedInfoData);
    console.log(this.infoData(),"info data");
    
  }

  nextProject() {
    if (
      this.currentIndex + this.projectsPerPage <
      (this.infoData()?.projects.length || 0)
    ) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0; // loop back
    }
  }

  prevProject() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex =
        (this.infoData()?.projects.length || 0) - this.projectsPerPage; // loop back
    }
  }

  scrollToSection(sectionId: string) {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  }

  downloadResume() {
    const link = document.createElement('a');
    link.href = 'assets/Resume.pdf'; // put your resume in src/assets
    link.download = 'Dipanshu_Dhole_Resume.pdf';
    link.click();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000, // 5 seconds
      horizontalPosition: 'right', // optional
      verticalPosition: 'top', // optional
    });
  }

  onSubmit() {
    this.saveContactMeDetails();
  }

  fetchAllInfoDetails() {
    this._apiService
      .getAllInfoDetails()
      .pipe(
        take(1),
        map((res) => ({
          ...res, // spread existing properties
          showNextPreviousButton: res.projects?.length > 3, // new property
        }))
      )
      .subscribe({
        next: (res) => {
          this.infoData.set(res);
        },
        error: (err) => {
          console.error('Error fetching info details:', err);
          // Optionally show a toast or alert
        },
        complete: () => {
          console.log('Fetch operation completed.');
          // Any final logic after completion
        },
      });
  }

  isLoading = signal<boolean>(false);

  saveContactMeDetails() {
    this.isLoading.set(true);

    const payload: SaveContactMeDetailsQuery = {
      id: '',
      name: this.contactFgControls.name.value ?? '',
      email: this.contactFgControls.email.value ?? '',
      message: this.contactFgControls.message.value ?? '',
    };

    this._apiService
      .saveContactMeDetails(payload)
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          if (res === true) {
            this.openSnackBar('Information send successfully!', 'Close');
          } else {
            console.warn('Failed to save contact details');
            this.openSnackBar('Failed to send information!', 'Close');
          }
        },
        error: (err) => {
          this.openSnackBar('Unable to send information!', 'Close');
        },
        complete: () => {
          this.isLoading.set(false);
          this.contactFg.reset();
        },
      });
  }
}
