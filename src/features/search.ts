import * as vscode from 'vscode';

export const searchFeature = vscode.commands.registerCommand('search-everything.search', () => {
    // vscode.window.showInformationMessage('Hello World from search everything!');
    vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: 'loading...',
        cancellable: false
    }, (progress, token) => {
        return new Promise<void>((resolve) => {


            GetConnection().then((connection) => {
                // progress.report({ increment: 0, message: 'Start' });
            }).catch((error) => {
                vscode.window.showErrorMessage(error.message);
                resolve();
            }).finally(() => {
                // progress.report({ increment: 100, message: 'Finished' });
                resolve();
            });
        });
    });
});

async function GetConnection() {
    try {
        // let connection = await vscode.commands.executeCommand('mssql.getCurrentConnection');
        debugger;
        const con = vscode.extensions.getExtension('ms-mssql.mssql');

        if (!con) {
            throw new Error("Connect to server before use SearchEverything.");
        }

        // get list of connections
        con.exports.activate().then((api: any) => {
            debugger;
            api.getConnections().then((connections: any) => {
                debugger;
                if (connections.length > 0) {
                    debugger;
                    // connection = connections[0];
                    console.log(connections);
                }
            });
        });
    } catch (error: any) {
        debugger;
        vscode.window.showErrorMessage(error.message);
    }


    // .activate().then((api) => {
    //     vscode.window.showInformationMessage('Hello World from search everything!');
    //     api.getConnections().then((connections) => {
    //         vscode.window.showInformationMessage('Hello World from search everything!');
    //         if (connections.length > 0) {
    //             connection = connections[0];
    //         }
    //     });
    // });
    // if (!connection) {
    //     throw new Error("Connect to server before use SearchEverywhere.");
    // }

    // return connection;
    return null;
}

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