import { BackendMethod, Controller, remult, type FindOptions } from 'remult';
import { Project } from './project.entity';

@Controller('ProjectsController')
export class ProjectsController {
	@BackendMethod({ apiPrefix: 'projects', allowed: true })
	static async find(options: FindOptions<Project> = {}) {
		const projects = remult.repo(Project).find(options);
		return remult.repo(Project).toJson(projects);
	}
}
