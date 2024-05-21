"use client";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchPins(searchQuery, filterType, orderCriteria, url = null) {
  const params = new URLSearchParams();

  if (!url) {
    if (searchQuery) {
      params.append(filterType, searchQuery);
    }
    if (orderCriteria) {
      params.append('ordering', orderCriteria);
    }
    params.append('page', 1); 
    url = `${API_BASE_URL}/pins/?${params.toString()}`;
  }

  const headers = {};

  const token = localStorage.getItem('access_token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    headers: headers,
  });

  if (!response.ok) {
    throw new Error('Failed to fetch pins');
  }

  return response.json();
}



export async function fetchPin(pinId) {
  const response = await fetch(`${API_BASE_URL}/pins/${pinId}/`);
  if (!response.ok) {
    throw new Error('Failed to fetch pin');
  }
  return await response.json();
}

export async function uploadPin(data) {
  const formData = new FormData();
  formData.append('image', data.image);
  formData.append('title', data.title);
  formData.append('tags', JSON.stringify(data.tags));
  formData.append('description', data.description);

  const headers = {};

  const token = localStorage.getItem('access_token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}/pins/`, {
    method: 'POST',
    headers: headers,
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to upload pin');
  }

  return response.json();
}


export async function toggleLike(pinId) {
  
  const response = await fetch(`${API_BASE_URL}/pins/${pinId}/like/`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to toggle like');
  }

  return response.json();
}
