import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  chart: any;
  userData: any = {};
  matData: any = {};

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/users').subscribe((data: any) => {
      this.userData = data.reduce((acc: any, user: any) => {
        if (user.type === 'professeur') {
          acc.teachers++;
        } else if (user.type === 'etudiant') {
          acc.users++;
        }
        return acc;
      }, { users: 0, teachers: 0 });

      this.renderChartU();
    });

    this.http.get('http://localhost:3000/matiere').subscribe((data: any) => {
      this.matData = data.reduce((acc: any, matiere: any) => {
        acc.matiere++;
        return acc;
      }, { matiere: 0 });

      this.renderChartM();
    });
  }

  renderChartU(): void {
    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: ['Teachers', 'Students'],
        datasets: [{
          label: 'Number of Users',
          data: [this.userData.teachers, this.userData.users],
          backgroundColor: [
            'rgba(19, 9, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
          ],
          borderColor: [
            'rgba(25, 99, 2, 1)',
            'rgba(54, 162, 235, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  renderChartM(): void {
    // Assuming this.matData.matiere represents the total subjects and you want to show only a portion
    const portionOfSubjects = 30; // Specify the portion you want to show (e.g., 30% of the total subjects)
  
    this.chart = new Chart('canva', {
      type: 'pie',
      data: {
        labels: ['Portion of Subjects', 'Remaining Subjects'],
        datasets: [{
          label: 'Number of subjects',
          data: [portionOfSubjects, this.matData.matiere - portionOfSubjects],
          backgroundColor: [
            'rgba(19, 9, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)', // You can add more colors as needed
          ],
          borderColor: [
            'rgba(25, 99, 2, 1)',
            'rgba(54, 162, 235, 1)', // Border colors corresponding to each portion
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  
}
