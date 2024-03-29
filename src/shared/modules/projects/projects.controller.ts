import {
	BackendMethod,
	Controller,
	remult,
	type FindOptions,
	type MembersToInclude,
	Allow
} from 'remult';
import { Project } from './project.entity';
import { setProjectSchema, type SetProjectInput } from './schemas/set-project.schema';
import { parseZSchema } from '$shared/helpers/zod';
import { TagsController } from '../tags/tags.controller';

@Controller('ProjectsController')
export class ProjectsController {
	@BackendMethod({ apiPrefix: 'projects', allowed: true })
	static async find(options: FindOptions<Project> = {}): Promise<Project[] | undefined> {
		const projects = remult.repo(Project).find(options);
		return remult.repo(Project).toJson(projects);
	}

	@BackendMethod({ apiPrefix: 'projects', allowed: false })
	static async findOne(
		id: string,
		include: MembersToInclude<Project> = {}
	): Promise<Project | undefined> {
		const project = remult.repo(Project).findOne({ where: { id }, include });
		return remult.repo(Project).toJson(project);
	}

	@BackendMethod({ apiPrefix: 'projects', allowed: Allow.authenticated })
	static async set(input: SetProjectInput, id?: string): Promise<Project | undefined> {
		const { tags: tagsIds, ...inputs } = parseZSchema(input, setProjectSchema);

		if (id) {
			const existingProject = await ProjectsController.findOne(id);
			if (existingProject) {
				const updatedProject = remult.repo(Project).update(id, inputs);
				if (tagsIds) await ProjectsController.setTags(id, tagsIds);

				return remult.repo(Project).toJson(updatedProject);
			}

			throw `Project "${id}" not found`;
		}

		const project = await remult.repo(Project).insert(inputs);
		if (tagsIds) await ProjectsController.setTags(project.id, tagsIds);

		return remult.repo(Project).toJson(project);
	}

	@BackendMethod({ apiPrefix: 'projects', allowed: Allow.authenticated })
	static async delete(id: string): Promise<void> {
		const project = await ProjectsController.findOne(id);
		if (!project) throw `Project "${id}" not found`;

		await remult.repo(Project).delete(id);
	}

	@BackendMethod({ apiPrefix: 'projects', allowed: false })
	static async setTags(id: string, tagsIds: string[]) {
		const project = await ProjectsController.findOne(id);
		if (project) {
			const tags = await TagsController.find({ where: { id: { $in: tagsIds } } });

			if (tags) {
				await remult.repo(Project).relations(project).tags.insert(tags);
			}
		}
	}
}
