import "./styles/base.css";
import { getPage, getSettings } from "./api";
import { footer } from "./layout/footer";
import { header, initHeader } from "./layout/header";
import { renderBlocks } from "./render";
import { initTheme } from "./theme";

const app = document.getElementById("app");

function showError(message: string): void {
  if (app)
    app.innerHTML = `<p class="error container">Не вдалося завантажити сторінку: ${message}</p>`;
}

async function start(): Promise<void> {
  try {
    const [settings, page] = await Promise.all([
      getSettings(),
      getPage(location.pathname),
    ]);

    document.title = `${page.title} - ${settings.siteName}`;

    if (app) {
      app.innerHTML = `
        ${header(settings)}
        <main>${renderBlocks(page.blocks)}</main>
        ${footer(settings)}`;

    }

    initHeader();
    initTheme();
  } catch (error) {
    showError(error instanceof Error ? error.message : String(error));
  }
}

void start();
