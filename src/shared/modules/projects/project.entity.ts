import { Entity, Fields } from 'remult';

@Entity<Project>('projects')
export class Project {
	@Fields.cuid()
	id!: string;

	@Fields.createdAt()
	createdAt!: Date;

	@Fields.updatedAt()
	updatedAt!: Date;

	@Fields.string()
	name!: string;

	@Fields.string()
	description!: string;
}
