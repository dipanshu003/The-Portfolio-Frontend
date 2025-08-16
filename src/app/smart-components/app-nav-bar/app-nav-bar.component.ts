import { CommonModule, DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SharedImportsModule } from '../../helper/shared-imports';

@Component({
  standalone: true,
  selector: 'app-app-nav-bar',
  imports: [CommonModule,SharedImportsModule],
  templateUrl: './app-nav-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppNavBarComponent {
  isMenuOpen = false;
  isDarkMode = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  scrollToSection(sectionId: string) {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    this.isMenuOpen = false;
  }
}
