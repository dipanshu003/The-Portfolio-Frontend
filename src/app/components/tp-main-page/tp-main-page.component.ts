import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AppNavBarComponent } from '../../smart-components/app-nav-bar/app-nav-bar.component';
import { FormBuilder, Validators } from '@angular/forms';
import { SharedImportsModule } from '../../helper/shared-imports';
import { ApiDataProviderService } from '../../service/api-data-provider.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-tp-main-page',
  imports: [
    CommonModule,
    AppNavBarComponent,
    SharedImportsModule,
  ],
  templateUrl: './tp-main-page.component.html',
  styleUrl: './tp-main-page.component.scss',
  standalone: true,
})
export class TpMainPageComponent implements OnInit{
  private _fb = inject(FormBuilder);
  private _apiService = inject(ApiDataProviderService);

  currentIndex = 0;
  projectsPerPage = 3;

  contactFg = this._fb.nonNullable.group({
    name: this._fb.control('', [Validators.required]),
    email: this._fb.control('', [Validators.required, Validators.email]),
    message: this._fb.control(''),
  });

  projects = [
    {
      title: 'Project One',
      description: 'Description for Project One.',
      image: 'https://picsum.photos/id/1015/400/300',
    },
    {
      title: 'Project Two',
      description: 'Description for Project Two.',
      image: 'https://picsum.photos/id/1016/400/300',
    },
    {
      title: 'Project Three',
      description: 'Description for Project Three.',
      image: 'https://picsum.photos/id/1018/400/300',
    },
    {
      title: 'Project Four',
      description: 'Description for Project Four.',
      image: 'https://picsum.photos/id/1020/400/300',
    },
    {
      title: 'Project Five',
      description:
        'Description for Project Five.iwuerwueruoeuuruwouero loren3423ioisdoiufsiuoifusuodufousouidfuuosudfousodufoiusudfiusoiudfisuoifuisouifuisudofusojflsd,mfn,msdnf,mnkjewhuriyweouroiuweriosklfms.,nfdlhsdhfiew',
      image: 'https://picsum.photos/id/1024/400/300',
    },
  ];

  get contactFgControls() {
    return this.contactFg.controls;
  }

  get visibleProjects() {
    return this.projects.slice(
      this.currentIndex,
      this.currentIndex + this.projectsPerPage
    );
  }

  ngOnInit(): void {
    this.fetchAllInfoDetails();
  }

  nextProject() {
    if (this.currentIndex + this.projectsPerPage < this.projects.length) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0; // loop back
    }
  }

  prevProject() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.projects.length - this.projectsPerPage; // loop back
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

  fetchAllInfoDetails() {
    this._apiService
      .getAllInfoDetails()
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          console.log('Fetched info details:', response);
          // Assign to a variable if needed
          // this.userProfiles = response;
        },
        error: (err) => {
          console.error('Error fetching info details:', err);
          // Handle error, e.g., show toast or alert
        },
        complete: () => {
          console.log('Fetch operation completed.');
          // Any final logic after completion
        },
      });
  }
}
