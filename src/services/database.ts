import { DuckDBConnection, DuckDBInstance, DuckDBValue } from '@duckdb/node-api';
import path from 'path';

let connection: DuckDBConnection;

export const getConnection = async (suppliedPath?: string): Promise<DuckDBConnection> => {
    const dbPath = path.join('C:', 'Arcade', 'duckdb', 'highscore.duckdb');

    if (!connection) {
        try {
            const instance = await DuckDBInstance.create(suppliedPath ?? dbPath);
            connection = await instance.connect();
        } catch (error) {
            throw new Error("Failed to initalize duckDB connection.");
        }
    }

    return connection;
}

export const executeQuery = async (query: string): Promise<DuckDBValue[][]> => {
    const conn = await getConnection();

    if (!conn) {
        throw new Error("DuckDB is not initialized. Call initDuckDB first.");
    }

    try {
        const reader = await conn.runAndReadAll(query);
        return reader.getRows();
    } catch (error) {
        console.error("Error executing query:", error);
        throw new Error("Query execution failed");
    }
};