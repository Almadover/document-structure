const elementsWithTooltip = document.querySelectorAll('.has-tooltip');

elementsWithTooltip.forEach(element => {
    const positionValues = ['top', 'left', 'right', 'bottom'];
    const randomPosition = positionValues[Math.floor(Math.random() * positionValues.length)];

    element.setAttribute('data-position', randomPosition);
     const tooltip = document.createElement('div');
     tooltip.className = 'tooltip';
     tooltip.textContent = element.getAttribute('title');

     element.appendChild(tooltip);

     element.addEventListener('mouseover', () => {
        const position = element.dataset.position;
        const rect = element.getBoundingClientRect();

        switch(position) {
            case 'top':
                tooltip.style.left = rect.left + 'px';
                tooltip.style.top = rect.top - tooltip.offsetHeight + 'px';
                break;
            case 'left':
                tooltip.style.left = rect.left - tooltip.offsetWidth + 'px';
                tooltip.style.top = rect.top + 'px';
                break;
            case 'right':
                tooltip.style.left = rect.right + 'px';
                tooltip.style.top = rect.top + 'px';
                break;
            case 'bottom':
                tooltip.style.left = rect.left + 'px';
                tooltip.style.top = rect.bottom + 'px';
                break;
            default:
                break;
            }
            tooltip.classList.add('tooltip_active');
     });
     element.addEventListener('mouseout', () => {
        tooltip.classList.remove('tooltip_active');
     });
});