// Nome: extract-transcript.js
// Descrição: Extrai falas, speakers e timestamps de páginas de transcrição
// Uso: Cole no console do navegador na página da transcrição
// Compatível com: Fireflies TODO: testar Fathom

(function () {
  try {
    const paragraphs = document.querySelectorAll('[id^="transcript-paragraph-"]');

    if (!paragraphs.length) {
      console.warn('Nenhum parágrafo de transcrição encontrado.');
      return;
    }

    const result = [];

    paragraphs.forEach((p) => {
      const speaker = p.querySelector('.name')?.textContent?.trim() || 'Unknown';

      const timeEl =
        p.querySelector('.timestamp, time') ??
        Array.from(p.querySelectorAll('span'))
          .find(el => /^\d{2}:\d{2}$/.test(el.textContent.trim()));
      const time = timeEl?.textContent?.trim() || '';

      const sentences = p.querySelectorAll('[id$="transcript-sentence"]');
      const text = Array.from(sentences)
        .map(s => s.textContent.trim())
        .filter(Boolean)
        .join(' ');

      if (text) {
        result.push({ speaker, time, text });
      } else {
        console.warn(`Parágrafo sem texto: ${p.id}`);
      }
    });

    const formatted = result
      .map(r => `[${r.time}] ${r.speaker}: ${r.text}`)
      .join('\n');

    copy(formatted);
    console.log(`✅ ${result.length} falas copiadas para o clipboard.`);
    return formatted;

  } catch (e) {
    console.error('Falha ao extrair transcrição:', e);
  }
})();