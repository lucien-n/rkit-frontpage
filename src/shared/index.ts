import { AuthController } from './modules/auth/auth.controller';
import { Session } from './modules/auth/session.entity';
import { Project } from './modules/projects/project.entity';
import { ProjectsController } from './modules/projects/projects.controller';

export const entities = [Session, Project];
export const controllers = [AuthController, ProjectsController];
