export const auth = (password: string) =>
  fetch('http://localhost:3000/api/auth', {
    method: 'POST',
    body: password,
  }).then((res) => res.json());

export const uploadRecord = (data: object) =>
  fetch('http://localhost:3000/api/record', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
