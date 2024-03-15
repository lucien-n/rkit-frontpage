import { BackendMethod, remult, type MembersToInclude } from 'remult';
import { setTagSchema, type SetTagInput } from './schemas/set-tag.schema';
import { parseZSchema } from '$shared/helpers/zod';
import { Tag } from './tag.entity';

export class TagsController {
	@BackendMethod({ apiPrefix: 'tags', allowed: false })
	static async findOne(id: string, include: MembersToInclude<Tag> = {}): Promise<Tag | undefined> {
		const tag = remult.repo(Tag).findOne({ where: { id }, include });
		return remult.repo(Tag).toJson(tag);
	}

	@BackendMethod({ apiPrefix: 'tags', allowed: false })
	static async set(input: SetTagInput, id?: string) {
		const inputs = parseZSchema(input, setTagSchema);

		if (id) {
			const existingTag = await TagsController.findOne(id);
			if (existingTag) {
				const updatedTag = remult.repo(Tag).update(id, inputs);
				return remult.repo(Tag).toJson(updatedTag);
			}

			throw `Tag "${id}" not found`;
		}

		const tag = await remult.repo(Tag).insert(inputs);
		return remult.repo(Tag).toJson(tag);
	}
}
