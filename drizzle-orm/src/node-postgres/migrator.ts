import type { MigrationConfig } from '~/migrator.ts';
import { readMigrationFiles } from '~/migrator.ts';
import type { NodePgDatabase } from './driver.ts';

export async function migrate<TSchema extends Record<string, unknown>>(
	db: NodePgDatabase<TSchema>,
	config: string | MigrationConfig,
) {
	const migrations = readMigrationFiles(config);
	await (typeof config === 'string' ? db.dialect.migrate(migrations, db.session) : db.dialect.migrate(migrations, db.session, config));
}
