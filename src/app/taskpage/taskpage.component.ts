import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-taskpage',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './taskpage.component.html',
  styleUrl: './taskpage.component.css'
})
export class TaskpageComponent {
  showPage = true;
  taskThemes = ["Study", "Sunshine", "Danger", "Robot", "Clock", "Night", "Horror", "Forest"];
  taskList = [{
    task: "sampleTask",
    endDate: "",
    endTime: "",
    intensity: "High",
    theme: "Study"
  }];

  constructor() {
    this.onResize(window); // Ensure initial check on load
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (Number(event.innerWidth) < 1200) {
      this.showPage = false;
    } else {
      this.showPage = true;
    }
  }
}
