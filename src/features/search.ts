import * as vscode from 'vscode';
// import { handleSearch } from '../searchHandler';
import { MssqlConnectionManager } from './MssqlConnectionManager';

export const searchFeature = vscode.commands.registerCommand('search-everything.search', async () => {
    const connectionManager = new MssqlConnectionManager();

    // vscode.window.withProgress({
    //     location: vscode.ProgressLocation.Notification,
    //     title: 'Loading...',
    //     cancellable: false
    // }, (progress, token) => {
    //     return new Promise<void>(async (resolve) => {
    //         const connections = await getActiveMssqlConnections();

    //         debugger;
    //         if (connections.length === 0) {
    //             vscode.window.showWarningMessage("No active SQL Server connections.");
    //             resolve();
    //             return;
    //         }

    //         debugger;
    //         const items = connections.map((conn: any) => ({
    //             label: `${conn.server}:${conn.port}`,
    //             description: conn.database,
    //             detail: `User: ${conn.user}`
    //         }));

    //         debugger;
    //         vscode.window.showQuickPick(items, { placeHolder: "Select an active SQL Server connection" })
    //             .then((selected) => {
    //                 debugger;
    //                 if (selected) {
    //                     handleSearch(selected).then(() => resolve()).catch(() => resolve());
    //                 } else {
    //                     resolve();
    //                 }
    //             });

    //     });
    // });

    try {
        // เช็คว่า ms-mssql extension ถูกติดตั้งหรือไม่
        const isExtensionAvailable = await connectionManager.checkMssqlExtension();
        if (!isExtensionAvailable) {
            return;
        }

        // ดึงข้อมูลการเชื่อมต่อทั้งหมด
        const connections = await connectionManager.getActiveConnections();

        if (connections.length === 0) {
            vscode.window.showInformationMessage('No active SQL Server connections found');
            return;
        }

        // แสดงรายการ connections ในหน้าต่าง webview
        const panel = vscode.window.createWebviewPanel(
            'sqlConnections',
            'SQL Server Connections',
            vscode.ViewColumn.One,
            {}
        );

        panel.webview.html = `
                <html>
                <body>
                    <h2>Active SQL Server Connections</h2>
                    <ul>
                        ${connections.map(conn => `
                            <li>
                                <strong>Server:</strong> ${conn.serverName}<br>
                                <strong>Database:</strong> ${conn.databaseName || 'N/A'}<br>
                                <strong>Status:</strong> ${conn.connected ? 'Connected' : 'Disconnected'}
                            </li>
                        `).join('')}
                    </ul>
                </body>
                </html>
            `;
    } catch (err: any) {
        vscode.window.showErrorMessage(`Error checking connections: ${err}`);
    }
});


// async function getActiveMssqlConnections() {
//     const mssqlExtension = vscode.extensions.getExtension("ms-mssql.mssql");
//     if (!mssqlExtension) { return []; }

//     if (!mssqlExtension.isActive) {
//         await mssqlExtension.activate();
//     }

//     const api = mssqlExtension.exports;
//     if (api && typeof api.getActiveConnections === "function") {
//         return api.getActiveConnections();
//     }

//     return [];
// }

function getTable() {
    // const table = vscode.window.createWebviewPanel(
    //     'search-everything',
    //     'Search Everything',
    //     vscode.ViewColumn.One,
    //     {
    //         enableScripts: true
    //     }
    // );

    // table.webview.html = getWebviewContent();
}

function getView() {
    // const view = vscode.window.createTreeView('search-everything', {
    //     treeDataProvider: new SearchEverythingProvider()
    // });
}

function getStoredProcedure() {
    // const store = createStore(reducer);
}