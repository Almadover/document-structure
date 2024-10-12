const tooltipElements = document.querySelectorAll('.has-tooltip');

tooltipElements.forEach(element => {
  element.addEventListener('click', (e) => {
    e.preventDefault();

    const tooltipActive = element.nextElementSibling;
    
    if (tooltipActive && tooltipActive.classList.contains('tooltip_active')) {
      tooltipActive.classList.remove('tooltip_active');
      return;
    }
    
    const tooltip = document.createElement('div');
    tooltip.classList.add('tooltip');

    const tooltipText = element.getAttribute('title');
    tooltip.textContent = tooltipText;

    tooltip.classList.add('tooltip_active');

    const elementPosition = element.getBoundingClientRect();
    tooltip.style.top = `${elementPosition.bottom}px`;
    tooltip.style.left = `${elementPosition.left}px`;

    element.insertAdjacentElement('afterend', tooltip);

    document.addEventListener('click', (e) => {
      if (e.target !== element && e.target !== tooltip) {
        tooltip.classList.remove('tooltip_active');
      }
    });
  });
});