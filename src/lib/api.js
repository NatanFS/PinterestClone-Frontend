const API_BASE_URL = 'http://127.0.0.1:8000/api';

export async function fetchPins() {
  const response = await fetch(`${API_BASE_URL}/pins/`);
  if (!response.ok) {
    throw new Error('Failed to fetch pins');
  }
  return await response.json();
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

  const response = await fetch('http://127.0.0.1:8000/api/pins/', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to upload pin');
  }

  return response.json();
}


export async function likePin(pinId) {
  const response = await fetch(`${API_BASE_URL}/pins/${pinId}/like/`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to like pin');
  }
  return await response.json();
}
