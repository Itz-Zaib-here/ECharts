import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-database-preview',
  standalone: true,
  templateUrl: './database-preview.html',
  styleUrls: ['./database-preview.css'],
  imports: [CommonModule, FormsModule, HttpClientModule]
})
export class DatabasePreviewComponent implements OnInit {
  databases: string[] = [];
  selectedDb = '';
  selectedDate = '';
  tableData: any[] = [];
  loading = false;
  error = '';

  private baseUrl = 'https://localhost:7125/api/Database';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadDatabases();
  }

  loadDatabases(): void {
    this.loading = true;
    this.http.get<string[]>(`${this.baseUrl}/databases`).subscribe({
      next: (res) => {
        this.databases = res;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load databases.';
        this.loading = false;
      },
    });
  }

  preview(): void {
    if (!this.selectedDb) {
      this.error = 'Please select a database first.';
      return;
    }

    this.error = '';
    this.loading = true;
    this.tableData = [];

    let url = `${this.baseUrl}/preview?dbName=${this.selectedDb}`;
    if (this.selectedDate) url += `&date=${this.selectedDate}`;

    this.http.get<any[]>(url).subscribe({
      next: (res) => {
        this.tableData = res;
        this.loading = false;
      },
      error: () => {
        this.error = 'Error loading preview data.';
        this.loading = false;
      },
    });
  }
}
