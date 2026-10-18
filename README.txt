# Convite de Casamento

Site provisório de convite de casamento.

## Estrutura

- `index.html` — página principal
- `style.css` — visual e responsividade
- `script.js` — contagem regressiva, confirmação de presença e modal
- `imagens/casal.jpg` — coloque aqui uma foto dos noivos

## O que já funciona

- Convite responsivo para celular e computador
- Contagem regressiva
- Formulário de confirmação de presença
- Opção de acompanhantes
- Mensagem de confirmação
- Salvamento local das respostas no navegador
- Seção de lista de presentes
- Formulário para registrar a escolha de um presente
- Modal de presente
- Link para mapa

## Aviso de presente pelo WhatsApp

A lista contém 12 cards de presentes divertidos, com valores de R$50 a R$1.100.
O botão “Presentear” abre o QR Code Pix fornecido pelos noivos, com chave de celular
16981492681 e recebedor JEAN VITOR DOS SANTOS. O pagador informa o valor no banco.
O modal permite copiar a chave e baixar o PDF original do QR Code.
Após pagar, o convidado informa nome e valor e pode escrever uma mensagem.
“Já fiz o Pix — avisar no WhatsApp” abre o aviso para 55 16 98149-2681.
O convidado revisa, envia e anexa o comprovante manualmente na conversa.
O aviso é uma declaração do convidado; a conferência do pagamento é feita pelos noivos.
Esse mesmo fluxo atende a lista de presentes e a página de lua de mel.
Os 12 cards com preço abrem com seu valor preenchido. O card “Contribua com o valor que quiser” e as opções de lua de mel permitem informar um valor livre.
Os botões usam data-pix-gift para identificar o destino da contribuição na mensagem.
Sem JavaScript, o botão abre diretamente a mensagem com o presente e o valor.

As imagens estão salvas em `imagens/divertido-*`. As fontes estão registradas em
`imagens/fontes-presentes-divertidos.json`; algumas imagens são versões alternativas
dos memes dos prints. Os produtos anteriores foram retirados da página.

## Importante sobre o RSVP

Atualmente as confirmações ficam salvas no `localStorage` do navegador de quem preencheu.

Isso é ótimo para testar, mas **não envia automaticamente as respostas para os noivos**.

Para o site real, podemos conectar o formulário a:
1. Google Sheets / Apps Script
2. Supabase
3. Firebase
4. Um formulário que envie para WhatsApp

## Como trocar os dados

No `index.html`, procure:
- Jonathan & Hellen
- 10 de julho de 2027
- 18h00
- Espaço Jardim dos Sonhos
- Araraquara – SP

No `script.js`, altere:
`const weddingDate = new Date("2027-07-10T18:00:00");`

Para usar uma foto:
- crie a pasta `imagens`
- coloque sua foto como `casal.jpg`
