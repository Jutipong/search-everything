import * as vscode from 'vscode';
// import { Connection, TYPES } from 'mssql';

export class MssqlConnectionManager {
    // เช็คว่า ms-mssql extension ถูกติดตั้งหรือไม่
    public async checkMssqlExtension(): Promise<boolean> {
        const extension = vscode.extensions.getExtension('ms-mssql.mssql');
        if (!extension) {
            vscode.window.showErrorMessage('MS SQL Server extension is not installed');
            return false;
        }

        if (!extension.isActive) {
            await extension.activate();
        }
        return true;
    }

    // ดึงข้อมูลการเชื่อมต่อทั้งหมดที่มีอยู่
    public async getActiveConnections(): Promise<any[]> {
        try {
            // ดึง API ของ ms-mssql extension
            const api = await this.getMssqlApi();
            if (!api) {
                throw new Error('Could not get MS SQL extension API');
            }

            // ดึงข้อมูลการเชื่อมต่อทั้งหมด
            const connections = await api.getActiveConnections();
            console.log('Active connections:', connections);

            debugger;
            return connections;

        } catch (err) {
            console.error('Failed to get connections:', err);
            throw err;
        }
    }

    // ดึง API ของ ms-mssql extension
    private async getMssqlApi(): Promise<any> {
        try {
            const mssqlExt = vscode.extensions.getExtension('ms-mssql.mssql');
            if (!mssqlExt) {
                return null;
            }

            if (!mssqlExt.isActive) {
                await mssqlExt.activate();
            }

            return mssqlExt.exports;
        } catch (err) {
            console.error('Failed to get mssql extension:', err);
            throw err;

        }
    }
}