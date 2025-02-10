import * as vscode from 'vscode';

export async function getActiveMssqlConnections() {
    debugger;
    const mssqlExtension = vscode.extensions.getExtension("ms-mssql.mssql");
    if (!mssqlExtension) { return []; }

    if (!mssqlExtension.isActive) {
        await mssqlExtension.activate();
    }

    const api = mssqlExtension.exports;
    if (api && typeof api.getActiveConnections === "function") {
        return api.getActiveConnections();
    }

    return [];
}
