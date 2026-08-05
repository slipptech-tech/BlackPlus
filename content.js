(function () {
  // Функция для точечной корректировки динамических элементов
  function fixDynamicElements() {
    // Безопасная проверка: если body еще не прогрузился, выходим
    if (!document.body) return;

    const elements = document.querySelectorAll('*');
    for (let el of elements) {
      if (['IMG', 'VIDEO', 'CANVAS', 'SVG', 'PICTURE'].includes(el.tagName)) continue;

      const computed = window.getComputedStyle(el);
      const bg = computed.backgroundColor;

      // Если у элемента остался белый или светлый фон
      if (bg && (bg.includes('255, 255, 255') || bg === 'white' || bg.includes('rgb(24'))) {
        el.style.setProperty('background-color', '#121212', 'important');
      }
    }
  }

  // Запускаем только тогда, когда документ полностью готов
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    fixDynamicElements();
    setTimeout(fixDynamicElements, 1000);

    // Безопасное наблюдение за изменениями (только если body существует)
    if (document.body) {
      const observer = new MutationObserver(() => {
        fixDynamicElements();
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    }
  }
})();