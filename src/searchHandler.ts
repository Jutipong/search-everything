import * as vscode from 'vscode';
import * as sql from "mssql";

export async function handleSearch(connection: any) {
    const searchTerm = await vscode.window.showInputBox({
        prompt: "Enter search term",
        placeHolder: "Table or column name"
    });

    if (!searchTerm) {
        return;
    }

    const config: sql.config = {
        server: connection.server,
        port: parseInt(connection.label.split(':')[1]),
        user: connection.user,
        password: connection.password,
        database: connection.description,
        driver: 'msnodesqlv8',
        options: {
            trustedConnection: true
        }
    };

    try {
        const pool = await sql.connect(config);
        const query = `
            SELECT 
                TABLE_CATALOG,
                TABLE_NAME, 
                COLUMN_NAME
            FROM 
                INFORMATION_SCHEMA.COLUMNS
            WHERE 
                TABLE_NAME LIKE '%${searchTerm}%' OR COLUMN_NAME LIKE '%${searchTerm}%'
        `;
        const result = await pool.request().query(query);

        if (result.recordset && result.recordset.length > 0) {
            const items = result.recordset.map((item: any) => ({
                label: `${item.TABLE_NAME}.${item.COLUMN_NAME}`,
                description: `Database: ${item.TABLE_CATALOG}`
            }));

            vscode.window.showQuickPick(items, {
                placeHolder: "Select a column"
            }).then((selected) => {
                if (selected) {
                    vscode.window.showInformationMessage(`Selected: ${selected.label}`);
                }
            });
        } else {
            vscode.window.showInformationMessage("No results found.");
        }
    } catch (err: any) {
        vscode.window.showErrorMessage(`Error: ${err.message}`);
    }
}
