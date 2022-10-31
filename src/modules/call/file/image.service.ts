import { InjectRepository } from "@nestjs/typeorm";
import { FileService } from "./file.service";

export class ImageService {
    constructor (
        private fileService: FileService
    ) {}

    // async uploadImage(

    // )
}