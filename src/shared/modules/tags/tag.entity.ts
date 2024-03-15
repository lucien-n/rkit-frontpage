import { Entity, Fields } from 'remult';

@Entity<Tag>('tags')
export class Tag {
	@Fields.cuid()
	id!: string;

	@Fields.string()
	label!: string;

	@Fields.string()
	url?: string;
}
