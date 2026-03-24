// Nome: extract-transcript.js
// Descrição: Extrai falas, speakers e timestamps de páginas de transcrição
// Uso: Cole no console do navegador na página da transcrição
// Compatível com: Fireflies

(function () {
  try {
    const paragraphs = document.querySelectorAll('[id^="transcript-paragraph-"]');

    if (!paragraphs.length) {
      console.warn('Nenhum parágrafo de transcrição encontrado.');
      return;
    }

    const lines = [];

    paragraphs.forEach(function (p) {
      const nameEl = p.querySelector('.name');
      const speaker = nameEl ? nameEl.textContent.trim() : 'Unknown';

      const timeEl = Array.from(p.querySelectorAll('span')).find(function (el) {
        return /^\d{2}:\d{2}(:\d{2})?$/.test(el.textContent.trim());
      });
      const time = timeEl ? timeEl.textContent.trim() : '';

      const sentences = Array.from(p.querySelectorAll('[id$="-transcript-sentence"]'));
      const text = sentences
        .map(function (s) {
          // Normaliza quebras de linha e espaços extras dentro de cada sentença
          return s.textContent.replace(/\s+/g, ' ').trim();
        })
        .filter(function (s) { return s.length > 0; })
        .join(' ');

      if (text) {
        lines.push('[' + time + '] ' + speaker + ': ' + text);
      } else {
        console.warn('Parágrafo sem texto: ' + p.id);
      }
    });

    const formatted = lines.join('\n');

    const textarea = document.createElement('textarea');
    textarea.value = formatted;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    console.log('\u2705 ' + lines.length + ' falas copiadas para o clipboard.');
    return formatted;

  } catch (e) {
    console.error('Falha ao extrair transcrição:', e);
  }
})();
