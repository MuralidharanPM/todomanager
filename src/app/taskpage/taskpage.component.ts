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
  taskName = "";
  taskEndDate = "";
  taskEndTime = "";
  taskIntensity = "";
  taskThemeSet = "";
  taskThemes = ["Study", "Sunshine", "Danger", "Robot", "Clock", "Horror", "Forest"];
  taskList = [{
    task: "sampleTask",
    endDate: "",
    endTime: "",
    intensity: "High",
    theme: "Study"
  }];

  constructor() {
    if (sessionStorage.hasOwnProperty("task")) {
      let taskData: any = sessionStorage.getItem("task");
      this.taskList = JSON.parse(taskData);
    }
    this.onResize(window);
  }

  public importTask(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (file.type !== 'application/json') {
        alert('Please upload a valid JSON file!');
        return;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        try {
          this.taskList = (JSON.parse(e.target.result)).task;
          sessionStorage.setItem("task", JSON.stringify(this.taskList));
        } catch (error) {
          alert('Invalid JSON format!');
          console.error("Error parsing JSON:", error);
        }
      };
      reader.readAsText(file);
    }
  }

  public exportTask(event: any) {
    const tempoObj = { "task": this.taskList};
    const jsonString = JSON.stringify(tempoObj, null, 4);
    const blob = new Blob([jsonString], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "Task_Manager.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  public taskCompleted(event: any, task: any) {
    let newObj = (this.taskList).filter((item) => item.task != task);
    this.taskList = newObj;
    sessionStorage.setItem("task", JSON.stringify(this.taskList));
  }

  public resetTask(event: any) {
    this.taskList = [];
    sessionStorage.removeItem('task');
  }

  public addTask(event: any) {
    let tempoStore = {
      task: "sampleTask",
      endDate: "",
      endTime: "",
      intensity: "",
      theme: ""
    }
    if (this.taskName != "" && this.taskIntensity != "" && this.taskThemeSet != "") {
      const obj = {...tempoStore};
      obj.task = this.taskName;
      obj.endDate = this.taskEndDate;
      obj.endTime = this.taskEndTime;
      obj.intensity = this.taskIntensity;
      obj.theme = this.taskThemeSet
      
      this.taskName = "";
      this.taskEndDate = "";
      this.taskEndTime = "";
      this.taskIntensity = "";
      this.taskThemeSet = "Study"
      this.taskList.push(obj);
      sessionStorage.setItem("task", JSON.stringify(this.taskList));
    }
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
