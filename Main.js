import { app, BrowserWindow } from "electron";
import path from "path";

const crearVentana = () => {
    const win = new BrowserWindow({
        width: 1200,
        height: 700,
        webPreferences: {
            preload: path.join(process.cwd(), "preload.js")
        }
    });

    win.loadFile("ui/index.html");
};

app.whenReady().then(crearVentana);
