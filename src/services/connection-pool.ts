import * as sql from "mssql";

const poolMap: Map<string, sql.ConnectionPool> = new Map();

export async function connectToDB(config: sql.config, name: string) {
    if (poolMap.has(name)) {
        return poolMap.get(name);
    }

    const pool = new sql.ConnectionPool(config);
    await pool.connect();
    poolMap.set(name, pool);

    return pool;
}

export function getConnectedServers(): string[] {
    return Array.from(poolMap.keys());
}

export async function disconnectFromDB(name: string) {
    const pool = poolMap.get(name);
    if (pool) {
        await pool.close();
        poolMap.delete(name);
    }
}

export async function disconnectAllDBs() {
    for (const [name, pool] of poolMap.entries()) {
        await pool.close();
        poolMap.delete(name);
    }
}
