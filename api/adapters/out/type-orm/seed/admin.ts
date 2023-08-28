import { hash } from "bcrypt";
import { AppDataSource } from "..";
import { v4 as uuidV4 } from 'uuid'


async function create() {
  await AppDataSource.initialize();

  const id = uuidV4();
  const password = await hash("admin", 8);

  await AppDataSource.query(
    `INSERT INTO user_model(id, name, email, password, is_admin, created_at, driver_license)
     VALUES('${id}', 'admin', 'admin@admin.com', '${password}', true, 'now()', '')`
  )
}

create().then(() => console.log("User admin created!"));
