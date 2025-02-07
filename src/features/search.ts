import * as vscode from 'vscode';

export const searchFeature = vscode.commands.registerCommand('search-everything.search', () => {
    // vscode.window.showInformationMessage('Hello World from search everything!');
    vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: 'Hello World',
        cancellable: true
    }, (progress, token) => {
        return new Promise<void>((resolve) => {
            // token.onCancellationRequested(() => {
            //     debugger;
            //     console.log('User canceled the long running operation');
            //     resolve();
            // });

            progress.report({ increment: 0, message: 'Start' });

            setTimeout(() => {
                progress.report({ increment: 10, message: 'Some progress message' });
            }, 1000);

            setTimeout(() => {
                progress.report({ increment: 40, message: 'Some progress message' });
            }, 2000);

            setTimeout(() => {
                progress.report({ increment: 50, message: 'Some progress message' });
            }, 3000);

            setTimeout(() => {
                progress.report({ increment: 100, message: 'Finished' });
                resolve();
            }, 4000);
        });
    });
});