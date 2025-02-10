let page;

const default_events = {
  show: function () {
    const isShow = this.$parent(0).$$class("show");
    this.__class(`fa-solid ${isShow ? "fa-eye-slash" : "fa-eye"}`);
    this.$pre(0).$child(0).type = isShow ? "password" : "text";
    this.$parent(0).$$class_(isShow, "show");
  },
  login: function () {
    page.dom.$child(0)._class("show");

    setTimeout(() => {
      page.data.is_guest = false;
    }, 1000);
  },
  logout: function () {
    page.data.is_guest = true;
  },
  body_left_show: function (e) {
    const dom_target = document.querySelector("section.body-left");
    if (dom_target) {
      dom_target.dataset.show = parseInt(dom_target.dataset.show) ? 0 : 1;
    }
  },
  body_left_type: function (e) {
    const dom_target = document.querySelector("section.body-left");
    if (dom_target) {
      const is_min = parseInt(dom_target.dataset.min);
      dom_target.dataset.min = is_min ? 0 : 1;
      addCookie("is_body_left_min", is_min ? 0 : 1);
    }
  },
  tab_show: function (e) {
    const dom_this = e.target;
    const dom_parent = dom_this.parentElement;
    const is_show = parseInt(dom_this.dataset.show);
    const is_child_selected =
      dom_parent.querySelector("a[data-selected='1']") != null;

    if (is_child_selected && (isNaN(is_show) || is_show)) {
      dom_this.dataset.show = 0;
    } else {
      dom_this.dataset.show = is_show ? 0 : 1;
    }
  },
  toggleTheme: function () {
    const body = document.body;
    const isDark = body.classList.contains("dark");
    const themeToggleButton = document.querySelector(".theme-toggle-btn i");

    if (isDark) {
      body.classList.remove("dark");
      body.classList.add("light");
      addCookie("theme", "light", 7 * 24 * 3600); // 記住亮色主題
      themeToggleButton.classList.remove("fa-moon");
      themeToggleButton.classList.add("fa-sun");
    } else {
      body.classList.remove("light");
      body.classList.add("dark");
      addCookie("theme", "dark", 7 * 24 * 3600); // 記住深色主題
      themeToggleButton.classList.remove("fa-sun");
      themeToggleButton.classList.add("fa-moon");
    }
  },
  typingEffect: function (selector, text, speed = 200) {
    // 取得目標元素
    const target = document.querySelector(selector);
    if (!target) return;

    let i = 0;

    function type() {
      if (i < text.length) {
        target.textContent += text[i];
        i++;
        setTimeout(type, speed);
      }
    }

    type();
  },
};

// 取得 Cookie
function getCookie(key) {
  if (typeof key !== "string" || key.trim().length < 1) return null;

  const key_regexp = new RegExp(
    "(?:^|; )" + encodeURIComponent(key) + "=([^;]*)"
  );
  const match_results = document.cookie.match(key_regexp);

  if (!match_results) return null;

  try {
    return decodeURIComponent(match_results[1]);
  } catch (err) {
    console.error("Cookie 解析錯誤:", err);
    return null;
  }
}

// 設定 Cookie
function addCookie(key, value, expire) {
  if (typeof key !== "string" || key.trim().length < 1 || value == null) return;

  const now_date = Date.now();
  const date = new Date(now_date + (expire || 3600) * 1000); // 預設 1 小時
  document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(
    value
  )}; expires=${date.toUTCString()}; path=/;`;
}

// 初始化主題設定與打字效果
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = getCookie("theme");
  const body = document.body;
  const themeToggleButton = document.querySelector(".theme-toggle-btn i");

  // 預設亮色模式
  if (savedTheme === "dark") {
    body.classList.add("dark");
    themeToggleButton.classList.remove("fa-sun");
    themeToggleButton.classList.add("fa-moon");
  } else {
    body.classList.add("light");
    themeToggleButton.classList.remove("fa-moon");
    themeToggleButton.classList.add("fa-sun");
  }

  // 綁定主題切換按鈕事件
  const themeToggleButtonWrapper = document.querySelector(".theme-toggle-btn");
  if (themeToggleButtonWrapper) {
    themeToggleButtonWrapper.addEventListener(
      "click",
      default_events.toggleTheme
    );
  }

  // 啟用打字效果
  default_events.typingEffect(".typing-text", 'print("Hello, Yushun!")', 150);
});
