import { Entity, Fields, Relations } from 'remult';
import { Tag } from '../tags/tag.entity';

@Entity<Project>('projects')
export class Project {
	@Fields.cuid()
	id!: string;

	@Fields.createdAt()
	createdAt!: Date;

	@Fields.updatedAt()
	updatedAt!: Date;

	@Fields.boolean(() => ({ defaultValue: false }))
	hidden!: boolean;

	@Fields.string()
	name!: string;

	@Fields.string()
	description!: string;

	@Fields.string()
	url!: string;

	@Fields.string()
	repo!: string;

	@Fields.string()
	branch!: string;

	@Relations.toMany(() => Tag)
	tags?: Tag[];
}
