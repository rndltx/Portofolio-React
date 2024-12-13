const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://rizsign.com/api';

// Auth
export async function login(username: string, password: string) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  return response.json();
}

// About
export async function fetchAboutData() {
  const response = await fetch(`${API_URL}/about`);
  return response.json();
}

export async function updateAboutData(data: any) {
  const response = await fetch(`${API_URL}/about`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

// Timeline
export async function fetchTimelineData() {
  const response = await fetch(`${API_URL}/timeline`);
  return response.json();
}

export async function updateTimelineData(data: any) {
  const response = await fetch(`${API_URL}/timeline`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

// Projects
export async function fetchProjectsData() {
  const response = await fetch(`${API_URL}/projects`);
  return response.json();
}

export async function updateProjectsData(data: any) {
  const response = await fetch(`${API_URL}/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

// Settings
export async function fetchSettingsData() {
  const response = await fetch(`${API_URL}/settings`);
  return response.json();
}

export async function updateSettingsData(data: any) {
  const response = await fetch(`${API_URL}/settings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

