import { parse } from "csv-parse";
import fs from "fs";

import { CategoriesRepository } from "../../repository/implementations/CategoriesRepository";

class ImportCategoryUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(private categoriesRepository: CategoriesRepository) { }
  execute(file: Express.Multer.File): void {
    const stream = fs.createReadStream(file.path);

    const parseFile = parse();

    stream.pipe(parseFile);

    parseFile.on("data", async (line) => {
      console.log(line);
    });
  }
}

export { ImportCategoryUseCase };
