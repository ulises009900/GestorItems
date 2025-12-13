import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";

let ventanaPrincipal;
let ventanaAlta;

const crearVentanaPrincipal = () => {
    ventanaPrincipal = new BrowserWindow({
        width: 1200,
        height: 700,
        webPreferences: {
            preload: path.join(process.cwd(), "preload.js")
        }
    });

    ventanaPrincipal.loadFile("ui/index.html");
};

const crearVentanaAlta = () => {
    ventanaAlta = new BrowserWindow({
        width: 600,
        height: 550,
        parent: ventanaPrincipal,
        modal: false,
        webPreferences: {
            preload: path.join(process.cwd(), "preload.js")
        }
    });

    ventanaAlta.loadFile("ui/alta.html");
};

ipcMain.handle("abrir-alta", () => crearVentanaAlta());

app.whenReady().then(crearVentanaPrincipal);
