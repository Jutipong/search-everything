import * as vscode from 'vscode';
import { getActiveMssqlConnections } from '../connectionHandler';
import { handleSearch } from '../searchHandler';

export const searchFeature = vscode.commands.registerCommand('search-everything.search', () => {
    vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: 'Loading...',
        cancellable: false
    }, (progress, token) => {
        return new Promise<void>((resolve) => {
            getActiveMssqlConnections().then((connections) => {
                debugger;
                if (connections.length === 0) {
                    vscode.window.showInformationMessage("No active SQL Server connections.");
                    resolve();
                    return;
                }

                debugger;
                const items = connections.map((conn: any) => ({
                    label: `${conn.server}:${conn.port}`,
                    description: conn.database,
                    detail: `User: ${conn.user}`
                }));

                debugger;
                vscode.window.showQuickPick(items, {
                    placeHolder: "Select an active SQL Server connection"
                }).then((selected) => {
                    debugger;
                    if (selected) {
                        handleSearch(selected).then(() => resolve()).catch(() => resolve());
                    } else {
                        resolve();
                    }
                });
            });
        });
    });
});

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