// ================================
// CONFIGURAÇÕES DO CONVITE
// ================================

// Troque a data abaixo quando definir o casamento.
const weddingDate = new Date("2027-07-10T18:00:00");

// ================================
// CONTAGEM REGRESSIVA
// ================================

function updateCountdown() {
  const daysElement = document.getElementById("days");
  const hoursElement = document.getElementById("hours");
  const minutesElement = document.getElementById("minutes");
  const secondsElement = document.getElementById("seconds");

  if (!daysElement || !hoursElement || !minutesElement || !secondsElement) {
    return;
  }

  const now = new Date().getTime();
  const target = weddingDate.getTime();
  const distance = target - now;

  if (distance <= 0) {
    daysElement.textContent = "00";
    hoursElement.textContent = "00";
    minutesElement.textContent = "00";
    secondsElement.textContent = "00";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  daysElement.textContent = String(days).padStart(2, "0");
  hoursElement.textContent = String(hours).padStart(2, "0");
  minutesElement.textContent = String(minutes).padStart(2, "0");
  secondsElement.textContent = String(seconds).padStart(2, "0");
}

if (document.getElementById("countdown")) {
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// ================================
// RSVP
// ================================

const rsvpForm = document.getElementById("rsvpForm");
const acompanhantesField = document.getElementById("acompanhantesField");
const nomesAcompanhantesField = document.getElementById("nomesAcompanhantesField");
const acompanhantes = document.getElementById("acompanhantes");
const nomesAcompanhantes = document.getElementById("nomesAcompanhantes");
const successMessage = document.getElementById("successMessage");

function updateCompanionFields() {
  const selected = document.querySelector('input[name="presenca"]:checked');

  if (selected && selected.value === "Sim") {
    acompanhantesField.style.display = "block";
    nomesAcompanhantesField.style.display =
      acompanhantes.value === "0" ? "none" : "block";
  } else {
    acompanhantesField.style.display = "none";
    nomesAcompanhantesField.style.display = "none";
  }
}

if (rsvpForm) {
  document.querySelectorAll('input[name="presenca"]').forEach((radio) => {
    radio.addEventListener("change", updateCompanionFields);
  });

  acompanhantes.addEventListener("change", updateCompanionFields);
  updateCompanionFields();

  rsvpForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = {
      nome: document.getElementById("nome").value.trim(),
      presenca: document.querySelector('input[name="presenca"]:checked')?.value,
      acompanhantes: acompanhantes.value,
      nomesAcompanhantes: nomesAcompanhantes.value.trim(),
      mensagem: document.getElementById("mensagem").value.trim(),
      dataConfirmacao: new Date().toLocaleString("pt-BR")
    };

    // Salva a confirmação no navegador.
    // Para receber as respostas de todos os convidados,
    // conecte este formulário a um backend, Google Sheets ou WhatsApp.
    const respostas = JSON.parse(localStorage.getItem("confirmacoesCasamento") || "[]");
    respostas.push(data);
    localStorage.setItem("confirmacoesCasamento", JSON.stringify(respostas));

    successMessage.textContent =
      data.presenca === "Sim"
        ? "Presença confirmada! Será uma alegria ter você conosco. ❤️"
        : "Obrigado por nos avisar. Sentiremos sua falta! ❤️";

    rsvpForm.reset();
    updateCompanionFields();
  });
}

// ================================
// MODAL DE PRESENTES
// ================================

function openModal(tipo) {
  document.getElementById("modalTitle").textContent = tipo;
  document.getElementById("giftModal").classList.add("active");
  document.getElementById("giftModal").setAttribute("aria-hidden", "false");
}

function closeModal() {
  document.getElementById("giftModal").classList.remove("active");
  document.getElementById("giftModal").setAttribute("aria-hidden", "true");
}

const giftModal = document.getElementById("giftModal");

if (giftModal) {
  giftModal.addEventListener("click", (event) => {
    if (event.target.id === "giftModal") {
      closeModal();
    }
  });
}

// ================================
// RESERVA DA LISTA DE PRESENTES
// ================================

const giftReservationModal = document.getElementById("giftReservationModal");
const giftReservationForm = document.getElementById("giftReservationForm");
const reservationGuestName = document.getElementById("reservationGuestName");
const reservationGiftName = document.getElementById("reservationGiftName");
const reservationFeedback = document.getElementById("reservationFeedback");
const reservationSubmit = document.getElementById("reservationSubmit");
const reservationWhatsappLink = document.getElementById("reservationWhatsappLink");
let selectedGiftForReservation = "";
let selectedGiftValue = "";
let reservationTrigger = null;
const pixPaidAmount = document.getElementById("pixPaidAmount");
const pixGuestMessage = document.getElementById("pixGuestMessage");
const pixKey = document.getElementById("pixKey");
const pixFeedback = document.getElementById("pixFeedback");

document.getElementById("copyPixKey")?.addEventListener("click", async () => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(pixKey.value);
    } else {
      pixKey.focus();
      pixKey.select();
      pixKey.setSelectionRange(0, pixKey.value.length);
      if (!document.execCommand("copy")) throw new Error("Cópia indisponível");
    }
    pixFeedback.textContent = "Chave Pix copiada. Cole no aplicativo do seu banco.";
  } catch {
    pixKey.focus();
    pixKey.select();
    pixFeedback.textContent = "Selecione e copie a chave Pix acima.";
  }
});

function openGiftReservation(giftName, giftValue = "") {
  reservationTrigger = document.activeElement;
  selectedGiftForReservation = giftName;
  selectedGiftValue = giftValue;
  reservationGiftName.textContent = `Você escolheu: ${giftName}${giftValue ? ` — ${giftValue}` : ""}`;
  reservationGuestName.value = "";
  pixPaidAmount.value = giftValue ? giftValue.replace(/[^\d,]/g, "").replace(",", ".") : "";
  pixGuestMessage.value = "";
  pixFeedback.textContent = "";
  reservationFeedback.textContent = "";
  reservationWhatsappLink.hidden = true;
  reservationWhatsappLink.removeAttribute("href");
  reservationSubmit.disabled = false;
  giftReservationModal.classList.add("active");
  giftReservationModal.setAttribute("aria-hidden", "false");
  giftReservationModal.querySelector(".modal-content").scrollTop = 0;
  giftReservationModal.querySelector("[data-close-reservation]").focus();
}

function closeGiftReservation() {
  giftReservationModal.classList.remove("active");
  giftReservationModal.setAttribute("aria-hidden", "true");
  reservationTrigger?.focus();
}

if (giftReservationModal && giftReservationForm) {
  // Um único fluxo Pix para os presentes e as contribuições da lua de mel.
  document.addEventListener("click", (event) => {
    const action = event.target.closest("[data-pix-gift]");
    if (!action) return;
    event.preventDefault();
    const amount = Number(action.dataset.pixAmount);
    const value = Number.isFinite(amount) && amount > 0
      ? amount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
      : "";
    openGiftReservation(action.dataset.pixGift, value);
  });

  giftReservationForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const guestName = reservationGuestName.value.trim();

    if (!guestName || !selectedGiftForReservation) return;
    if (!giftReservationForm.reportValidity()) return;
    const paidAmount = Number(pixPaidAmount.value);
    if (!Number.isFinite(paidAmount) || paidAmount <= 0) return;
    const formattedAmount = paidAmount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    const personalMessage = pixGuestMessage.value.trim();

    const message =
      `Olá, Jean e Hellen! Fiz um Pix para presentear vocês. ♥\n\n` +
      `Presente ou contribuição: ${selectedGiftForReservation}\n` +
      `Valor informado: ${formattedAmount}\n` +
      `Meu nome: ${guestName}\n` +
      (personalMessage ? `\nMensagem: ${personalMessage}\n` : "") +
      `\nPor favor, confirmem o recebimento. Vou enviar o comprovante por aqui. ❤️`;
    const whatsappUrl =
      `https://wa.me/5516981492681?text=${encodeURIComponent(message)}`;

    reservationWhatsappLink.href = whatsappUrl;
    reservationWhatsappLink.hidden = false;
    reservationFeedback.textContent =
      "Revise e envie a mensagem no WhatsApp. Você pode anexar o comprovante na conversa.";

    const whatsappWindow = window.open(whatsappUrl, "_blank");
    if (whatsappWindow) whatsappWindow.opener = null;
  });

  giftReservationModal.addEventListener("click", (event) => {
    if (event.target === giftReservationModal || event.target.closest("[data-close-reservation]")) {
      closeGiftReservation();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Tab" && giftReservationModal.classList.contains("active")) {
      const focusable = [...giftReservationModal.querySelectorAll("button, input, textarea, a[href]")]
        .filter((element) => !element.hidden && !element.disabled);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
    if (event.key === "Escape" && giftReservationModal.classList.contains("active")) {
      closeGiftReservation();
    }
  });
}
