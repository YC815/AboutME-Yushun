// 聯絡資訊資料
const contacts = [
  {
    platform: "Line",
    id: "0158yu",
    link: "https://line.me/ti/p/xyqxhXBs5H",
    network: "line.me",
    description: "Line 是我常用的通訊軟體，歡迎加我好友！",
    bgColor: "#00B900",
    fgColor: "#FFFFFF",
  },
  {
    platform: "WhatsApp",
    id: "+886 906-781-585",
    link: "https://wa.me/886906781585",
    network: "whatsapp",
    description: "國際通訊首選，特別是和國外朋友聯絡時",
    bgColor: "#25D366",
    fgColor: "#FFFFFF",
  },
  {
    platform: "iMessage",
    id: "+886 906-781-585",
    link: "sms:+886906781585",
    description: "如果您使用 Apple 裝置，可以直接用 iMessage 聯絡我",
    bgColor: "#37AEE2",
    fgColor: "#FFFFFF",
  },
  {
    platform: "Telegram",
    id: "@yctc815",
    link: "https://t.me/yctc815",
    network: "telegram",
    description: "加密通訊的好選擇，也常用於工作交流",
    bgColor: "#0088cc",
    fgColor: "#FFFFFF",
  },
  {
    platform: "Signal",
    id: "+886 906-781-585",
    link: "https://signal.me/#eu/MQRyrLfHFq81g3xh1HzWt3dHwrrphvWQLeGykQVl9UNNK6Hf2iVDnYJtRxtIScoj",
    description: "重視隱私時的首選通訊軟體",
    bgColor: "#3A76F0",
    fgColor: "#FFFFFF",
  },
  {
    platform: "Discord",
    id: "@yc815",
    link: "https://discordapp.com/users/843219121122181140",
    network: "discord",
    description: "遊戲和社群交流平台，我也會用於工作討論。",
    bgColor: "#5865F2",
    fgColor: "#FFFFFF",
  },
];

// 創建聯絡卡片 HTML
function createContactCard() {
  const card = document.createElement("div");
  card.className = "contact-card";
  card.innerHTML = `
    <div class="contact-card-header">
      <div class="contact-card-title">
        <div class="contact-avatar">YC</div>
        <div>
          <h3>Yushun's Contact Info</h3>
          <p>選擇您喜歡的方式與我聯絡</p>
        </div>
      </div>
      <button class="contact-card-close">&times;</button>
    </div>
    <div class="contact-card-content">
      ${contacts
        .map(
          (contact, index) => `
          <div class="contact-item">
            ${index > 0 ? "<hr>" : ""}
            <div class="contact-platform">
              <div class="contact-icon" style="background-color: ${
                contact.bgColor
              }">
                ${getPlatformIcon(contact)}
              </div>
              <button class="contact-button" data-link="${contact.link}">
                <span class="contact-platform-name">${contact.platform}:</span>
                <span class="contact-id">${contact.id}</span>
              </button>
              <button class="contact-copy" data-id="${
                contact.id
              }" data-platform="${contact.platform}">
                <i class="fa-regular fa-copy"></i>
              </button>
            </div>
            <div class="contact-description">
              ${contact.description}
            </div>
          </div>
        `
        )
        .join("")}
    </div>
  `;
  return card;
}

// 獲取平台圖示
function getPlatformIcon(contact) {
  switch (contact.platform) {
    case "Line":
      return `<i class="fa-brands fa-line" style="color: white; font-size: 20px;"></i>`;
    case "WhatsApp":
      return `<i class="fa-brands fa-whatsapp" style="color: white; font-size: 20px;"></i>`;
    case "iMessage":
      return `<i class="fa-brands fa-apple" style="color: white; font-size: 20px;"></i>`;
    case "Telegram":
      return `<i class="fa-brands fa-telegram" style="color: white; font-size: 20px;"></i>`;
    case "Signal":
      return `<i class="fa-solid fa-signal" style="color: white; font-size: 20px;"></i>`;
    case "Discord":
      return `<i class="fa-brands fa-discord" style="color: white; font-size: 20px;"></i>`;
    default:
      return `<i class="fa-solid fa-globe" style="color: white; font-size: 20px;"></i>`;
  }
}

// 監聽主題變化
function observeThemeChanges() {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === "class") {
        const isDark = document.body.classList.contains("dark");
        updateContactCardTheme(isDark);
      }
    });
  });

  observer.observe(document.body, {
    attributes: true,
    attributeFilter: ["class"],
  });
}

// 更新聯絡卡片主題
function updateContactCardTheme(isDark) {
  const contactCard = document.querySelector(".contact-card");
  if (contactCard) {
    if (isDark) {
      contactCard.classList.add("dark");
    } else {
      contactCard.classList.remove("dark");
    }
  }
}

// 顯示聯絡卡片
function showContactCard() {
  const overlay = document.createElement("div");
  overlay.className = "contact-overlay";
  const card = createContactCard();

  // 設置初始主題
  const isDark = document.body.classList.contains("dark");
  if (isDark) {
    card.classList.add("dark");
  }

  overlay.appendChild(card);
  document.body.appendChild(overlay);

  // 關閉按鈕事件
  const closeBtn = card.querySelector(".contact-card-close");
  closeBtn.addEventListener("click", () => {
    overlay.remove();
  });

  // 點擊外部關閉
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      overlay.remove();
    }
  });

  // 複製 ID 事件
  const copyButtons = card.querySelectorAll(".contact-copy");
  copyButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const platform = btn.dataset.platform;
      navigator.clipboard.writeText(id);
      alert(`已複製 ${platform} ID: ${id}`);
    });
  });

  // 開啟連結事件
  const contactButtons = card.querySelectorAll(".contact-button");
  contactButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      window.open(btn.dataset.link, "_blank");
    });
  });
}

// 初始化
document.addEventListener("DOMContentLoaded", () => {
  const moreButton = document.getElementById("more-contact");
  if (moreButton) {
    moreButton.addEventListener("click", (e) => {
      e.preventDefault();
      showContactCard();
    });
  }

  // 開始監聽主題變化
  observeThemeChanges();
});
