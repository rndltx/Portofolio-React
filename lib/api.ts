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

// API client helper
export const fetchAPI = async (endpoint: string, options: RequestInit = {}) => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Origin': 'https://www.rizsign.com',
      ...options.headers,
    }
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  try {
    return await response.json();
  } catch (error) {
    throw new Error('Invalid response format from server');
  }
};

// Auth
export async function login(username: string, password: string): Promise<ApiResponse<{token: string}>> {
  const response = await fetchAPI(`/auth/login`, {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });
  return response;
}

// About
export async function fetchAboutData(): Promise<ApiResponse<AboutData>> {
  const response = await fetchAPI(`/about`);
  return response;
}

export async function updateAboutData(data: AboutData): Promise<ApiResponse<AboutData>> {
  const response = await fetchAPI(`/about`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return response;
}

// Timeline
export async function fetchTimelineData(): Promise<ApiResponse<TimelineEvent[]>> {
  const response = await fetchAPI(`/timeline`);
  return response;
}

export async function updateTimelineData(data: TimelineEvent[]): Promise<ApiResponse<TimelineEvent[]>> {
  const response = await fetchAPI(`/timeline`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return response;
}

// Projects
export async function fetchProjectsData(): Promise<ApiResponse<Project[]>> {
  const response = await fetchAPI(`/projects`);
  return response;
}

export async function updateProjectsData(data: Project[]): Promise<ApiResponse<Project[]>> {
  const response = await fetchAPI(`/projects`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return response;
}

// Settings
export async function fetchSettingsData(): Promise<ApiResponse<Settings>> {
  const response = await fetchAPI(`/settings`);
  return response;
}

export async function updateSettingsData(data: Settings): Promise<ApiResponse<Settings>> {
  const response = await fetchAPI(`/settings`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return response;
}

