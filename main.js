document.querySelector('.status-badge').style.padding = '4px 12px';
document.querySelector('.status-badge').style.borderRadius = '50px';
document.querySelector('.status-badge').style.fontSize = '12px';
document.querySelector('.status-badge').style.background = '#eee';
document.querySelector('.status-badge').style.fontWeight = '600';

// Simple interaction for checkboxes
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
checkboxes.forEach(cb => {
  cb.addEventListener('change', () => {
    const label = cb.nextElementSibling;
    if (cb.checked) {
      label.style.textDecoration = 'line-through';
      label.style.opacity = '0.5';
    } else {
      label.style.textDecoration = 'none';
      label.style.opacity = '1';
    }
  });
});
