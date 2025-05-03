import { DuckDBConnection } from '@duckdb/node-api';
import { getConnection } from '../../services/database';
import { describe, it, expect } from 'vitest';

describe('database fn(getConnection) failure', () => {
    it('should throw an error when failing to connect', async () => {
        const failingConnectionString = 'blah////';

        const suppliedPath = failingConnectionString;
        await expect(getConnection(suppliedPath)).rejects.toThrow();
    });
});

describe('database fn(getConnection) success', () => {
    it('should create a DB instance, test uses inMemory DB', async () => {
        const inMemoryConnectionString = ':memory:';

        const suppliedPath = inMemoryConnectionString;
        const actual = await getConnection(suppliedPath);

        expect(actual).toBeInstanceOf(DuckDBConnection);
    });
});