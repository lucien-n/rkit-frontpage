import { AuthController } from './modules/auth/auth.controller';
import { Session } from './modules/auth/session.entity';
import { Project } from './modules/projects/project.entity';
import { ProjectsController } from './modules/projects/projects.controller';
import { Tag } from './modules/tags/tag.entity';
import { TagsController } from './modules/tags/tags.controller';

export const entities = [Session, Project, Tag];
export const controllers = [AuthController, ProjectsController, TagsController];
