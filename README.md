# browser-scripts

Scripts JavaScript para rodar diretamente no console do navegador (DevTools).  
Focados em produtividade no dia a dia.

## Como usar

1. Abra o DevTools no navegador (`F12` ou `Cmd+Option+I`)
2. Vá até a aba **Console**
3. Cole o conteúdo do script e pressione `Enter`

## Scripts

### meetings/

| Script | Descrição | Compatibilidade |
|---|---|---|
| `extract-transcript.js` | Extrai falas, speakers e timestamps de páginas de transcrição | Fireflies, Fathom |

## Contribuindo

Novos scripts devem seguir o padrão:
- Um arquivo `.js` por script
- Comentário no topo com descrição, uso e compatibilidade
- Sem dependências externas

## Cabeçalho padrão dos scripts

// Nome: extract-transcript.js
// Descrição: Extrai a transcrição formatada da página atual
// Uso: Cole no console do navegador na página da transcrição
// Compatível com: Fireflies, Fathom
