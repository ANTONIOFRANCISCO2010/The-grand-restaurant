(() => {
  "use strict";

  // Actualize este número com o indicativo do país, sem espaços ou sinais.
  // Exemplo: "351912345678".
  const WHATSAPP_NUMBER = "";
  const WHATSAPP_MESSAGE = "Olá, gostaria de falar com o THE GRAND RESTAURANT.";
  const menu = {
    Entradas: [
      { name: "Ostra da Ria Formosa", description: "Maçã verde, pepino, água de tomate e flor de sal.", price: "18 €" },
      { name: "Carabineiro do Algarve", description: "Tártaro delicado, bisque fria e brioche tostado.", price: "26 €" },
      { name: "Couve-flor na brasa", description: "Avelã, manteiga noisette e trufa de estação.", price: "19 €" },
    ],
    "Pratos principais": [
      { name: "Linguado de linha", description: "Ervas do jardim, beurre blanc de limão e espinafre.", price: "38 €" },
      { name: "Lombo maturado 30 dias", description: "Puré de aipo, jus de vinho do Porto e cebola pérola.", price: "42 €" },
      { name: "Polvo de Santa Luzia", description: "Batata fumada, pimento assado e coentros frescos.", price: "34 €" },
    ],
    Sobremesas: [
      { name: "Leite-creme queimado", description: "Baunilha de Madagáscar e citrinos do Algarve.", price: "14 €" },
      { name: "Chocolate 70%", description: "Avelã, flor de sal e gelado de azeite.", price: "16 €" },
      { name: "Queijos de Portugal", description: "Selecção artesanal, compota da casa e pão de massa-mãe.", price: "19 €" },
    ],
  };

  const whatsappUrl = (message) => {
    const text = encodeURIComponent(message);
    return WHATSAPP_NUMBER ? `https://wa.me/${WHATSAPP_NUMBER}?text=${text}` : "";
  };
  const toast = document.querySelector("[data-toast]");
  let toastTimeout;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(toastTimeout);
    toastTimeout = window.setTimeout(() => toast.classList.remove("is-visible"), 4500);
  }

  function renderMenu(category) {
    const container = document.querySelector("[data-menu-items]");
    if (!container || !menu[category]) return;
    container.replaceChildren();
    menu[category].forEach((dish, index) => {
      const article = document.createElement("article");
      article.className = "menu-item";
      article.style.animationDelay = `${index * 70}ms`;
      const top = document.createElement("div");
      top.className = "menu-item-top";
      const title = document.createElement("h3");
      title.textContent = dish.name;
      const price = document.createElement("span");
      price.className = "menu-price";
      price.textContent = dish.price;
      const description = document.createElement("p");
      description.textContent = dish.description;
      top.append(title, price);
      article.append(top, description);
      container.append(article);
    });
  }

  const menuTabs = [...document.querySelectorAll("[data-category]")];
  menuTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      menuTabs.forEach((item) => {
        const active = item === tab;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-selected", String(active));
      });
      renderMenu(tab.dataset.category);
    });
  });
  renderMenu("Entradas");

  const menuToggle = document.querySelector("[data-menu-toggle]");
  const navigation = document.querySelector("[data-navigation]");
  function closeNavigation() {
    navigation?.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Abrir navegação");
  }
  menuToggle?.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") !== "true";
    menuToggle.setAttribute("aria-expanded", String(expanded));
    menuToggle.setAttribute("aria-label", expanded ? "Fechar navegação" : "Abrir navegação");
    navigation?.classList.toggle("is-open", expanded);
  });
  navigation?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeNavigation));

  const whatsappLinks = document.querySelectorAll("[data-whatsapp]");
  whatsappLinks.forEach((link) => {
    const url = whatsappUrl(WHATSAPP_MESSAGE);
    if (url) {
      link.href = url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    } else {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        showToast("Configure o número de WhatsApp do restaurante no ficheiro site.js.");
      });
    }
  });
  const whatsappNote = document.querySelector("[data-whatsapp-note]");
  if (WHATSAPP_NUMBER && whatsappNote) whatsappNote.textContent = "Abrimos uma conversa com o restaurante no WhatsApp.";

  const dateInput = document.querySelector('input[name="date"]');
  if (dateInput) {
    const now = new Date();
    const localToday = [now.getFullYear(), String(now.getMonth() + 1).padStart(2, "0"), String(now.getDate()).padStart(2, "0")].join("-");
    dateInput.min = localToday;
  }

  const form = document.querySelector("[data-reservation-form]");
  const status = document.querySelector("[data-form-status]");
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const values = new FormData(form);
    const message = [
      "Olá, gostaria de pedir uma reserva no THE GRAND RESTAURANT.",
      `Nome: ${values.get("name")}`,
      `Correio electrónico: ${values.get("email")}`,
      `Telefone: ${values.get("phone")}`,
      `Data: ${values.get("date")}`,
      `Hora: ${values.get("time")}`,
      `Pessoas: ${values.get("guests")}`,
      values.get("notes") ? `Notas: ${values.get("notes")}` : "",
    ].filter(Boolean).join("\n");
    const url = whatsappUrl(message);
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
      if (status) status.textContent = "O pedido foi preparado no WhatsApp. A reserva só fica confirmada após resposta do restaurante.";
    } else if (status) {
      status.textContent = "Os dados estão válidos, mas o pedido não foi enviado. Configure o número de WhatsApp do restaurante no ficheiro site.js.";
    }
  });

  if ("IntersectionObserver" in window) {
    document.documentElement.classList.add("js-motion");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
  }
})();
