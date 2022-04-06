const configBase = {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'task-management',
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    cli: {
        migrationsDir: 'dist/migrations',
    },
    entities: ['dist/**/*.entity.{ts,js}'],
    migrations: ['dist/migrations'],
    migrationsTableName: 'migrations_history',
    migrationsRun: true,
    synchronize: false,
    dropSchema: false,
};

if (process.env.STAGE === 'development') {
    configBase.dropSchema = false;
    configBase.maxQueryExecutionTime = 100;
    configBase.synchronize = true;
}

module.exports = configBase;