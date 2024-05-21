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
  for (const key in data) {
    formData.append(key, data[key]);
  }

  const response = await fetch(`${API_BASE_URL}/pins/`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to upload pin');
  }
  return await response.json();
}

export async function likePin(pinId) {
  const response = await fetch(`${API_BASE_URL}/pins/${pinId}/like/`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`, // Assuming you store the access token in localStorage
    },
  });

  if (!response.ok) {
    throw new Error('Failed to like pin');
  }
  return await response.json();
}
