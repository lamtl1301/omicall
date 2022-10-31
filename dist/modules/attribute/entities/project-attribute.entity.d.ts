import { BaseAttribute } from 'src/common/base-attribute.entity';
import { Project } from 'src/modules/project/entities/project.entity';
import { Attribute } from './attribute.entity';
export declare class ProjectAttribute extends BaseAttribute {
    projectID: number;
    displayIndex: number;
    attribute: Attribute;
    project: Project;
}
