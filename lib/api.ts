// Add interfaces
interface AboutData {
  name: string;
  email: string;
  bio: string;
  footerText: string;
  copyrightText: string;
}

interface TimelineEvent {
  id?: number;
  title: string;
  date: string;
  description: string;
  icon: string;
}

interface Project {
  id?: number;
  title: string;
  description: string;
  image_url: string;
  project_url: string;
  github_url: string;
  technologies: string[];
}

interface Settings {
  name: string;
  email: string;
  bio: string;
  footerText: string;
  copyrightText: string;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

const API_URL = 'https://www.api.rizsign.com/api';

// Auth
export async function login(username: string, password: string): Promise<ApiResponse<{token: string}>> {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  return response.json();
}

// About
export async function fetchAboutData(): Promise<ApiResponse<AboutData>> {
  const response = await fetch(`${API_URL}/about`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  return response.json();
}

export async function updateAboutData(data: AboutData): Promise<ApiResponse<AboutData>> {
  const response = await fetch(`${API_URL}/about`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

// Timeline
export async function fetchTimelineData(): Promise<ApiResponse<TimelineEvent[]>> {
  const response = await fetch(`${API_URL}/timeline`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  return response.json();
}

export async function updateTimelineData(data: TimelineEvent[]): Promise<ApiResponse<TimelineEvent[]>> {
  const response = await fetch(`${API_URL}/timeline`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

// Projects
export async function fetchProjectsData(): Promise<ApiResponse<Project[]>> {
  const response = await fetch(`${API_URL}/projects`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  return response.json();
}

export async function updateProjectsData(data: Project[]): Promise<ApiResponse<Project[]>> {
  const response = await fetch(`${API_URL}/projects`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

// Settings
export async function fetchSettingsData(): Promise<ApiResponse<Settings>> {
  const response = await fetch(`${API_URL}/settings`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  return response.json();
}

export async function updateSettingsData(data: Settings): Promise<ApiResponse<Settings>> {
  const response = await fetch(`${API_URL}/settings`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

