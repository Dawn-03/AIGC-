export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export interface ReportDimension {
  layer1: string;
  layer2: string;
  layer3: string;
  dimensionPoint: string;
  content: string;
  sourcePage: string;
}

export interface Report {
  id: string;
  title: string;
  category: string; // e.g., Food, Electronics
  subCategory: string; // e.g., Snacks, Beverages
  uploadDate: string;
  reportDate: string; // The date of the report content
  fileName: string;
  dimensions: ReportDimension[];
}

export interface UserQuota {
  dailyDownloads: number;
  monthlyDownloads: number;
  lastDownloadDate: string; // ISO string
}

export interface FilterState {
  searchQuery: string;
  category: string;
  startDate: string;
  endDate: string;
}