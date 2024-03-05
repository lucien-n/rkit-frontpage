import { Entity, Fields } from 'remult';

@Entity<Session>('sessions', { allowApiCrud: false })
export class Session {
	@Fields.cuid()
	id!: string;

	@Fields.date()
	expiresAt!: Date;

	@Fields.string()
	token!: string;

	@Fields.string()
	name!: string;
}
