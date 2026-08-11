document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.textContent = 'Sending…';

    const formData = {
      name: form.querySelector('[name="name"]').value,
      email: form.querySelector('[name="email"]').value,
      message: form.querySelector('[name="message"]').value
    };

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        form.reset();
        status.textContent = 'Thanks — your message was sent.';
      } else {
        const data = await res.json().catch(() => null);
        status.textContent = data && data.error ? data.error : 'Something went wrong — please try again.';
      }
    } catch (err) {
      status.textContent = 'Network error — please try again later.';
    }
  });
});
