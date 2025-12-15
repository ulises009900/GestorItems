import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import ExportService from "./Services/ExportService.js";
import fs from "fs";
import path from "path";
import { app, ipcMain, dialog } from "electron";

let ventanaPrincipal;
let ventanaAlta;

const dbPath = path.join(app.getPath("userData"), "app.db");

const crearVentanaPrincipal = () => {
    ventanaPrincipal = new BrowserWindow({
        width: 1200,
        height: 700,
        webPreferences: {
            preload: path.join(process.cwd(), "Preload.js")
        }
    });

    ventanaPrincipal.loadFile("UI/Index.html");
};

const crearVentanaAlta = () => {
    ventanaAlta = new BrowserWindow({
        width: 600,
        height: 550,
        parent: ventanaPrincipal,
        modal: false,
        webPreferences: {
            preload: path.join(process.cwd(), "Preload.js")
        }
    });

    ventanaAlta.loadFile("UI/Alta.html");
};

ipcMain.handle("abrir-alta", () => crearVentanaAlta());

ipcMain.handle("abrir-editar", (_, codigo) => {
    ventanaAlta = new BrowserWindow({
        width: 600,
        height: 550,
        parent: ventanaPrincipal,
        modal: false,
        webPreferences: {
            preload: path.join(process.cwd(), "Preload.js")
        }
    });
    ventanaAlta.loadFile("UI/Alta.html?codigo=" + codigo);
});

ipcMain.handle("exportar-excel", async () => {
    try {
        await ExportService.excel();
        return { success: true, message: "Archivo exportado: articulos.xlsx" };
    } catch (e) {
        return { success: false, message: e.toString() };
    }
});

ipcMain.handle("backup-db", async () => {
    const { filePath } = await dialog.showSaveDialog({
        title: "Guardar backup",
        defaultPath: "backup_app.db"
    });

    if (!filePath) return false;

    fs.copyFileSync(dbPath, filePath);
    return true;
});

app.whenReady().then(crearVentanaPrincipal);
ipcMain.on("refrescar", () => {
    ventanaPrincipal.webContents.send("refrescar");
});

