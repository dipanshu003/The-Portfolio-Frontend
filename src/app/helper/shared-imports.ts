import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular Material
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export const SharedImportsModule = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  MatTooltipModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
];
