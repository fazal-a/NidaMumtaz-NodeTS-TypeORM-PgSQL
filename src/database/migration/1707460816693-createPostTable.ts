import {  QueryRunner , Table, TableForeignKey} from "typeorm";
class CreatePostsTable1707459424189 {
    async up(queryRunner: QueryRunner) {
        await queryRunner.createTable(new Table({
            name: "PostsTable",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "postTitle",
                    type: "varchar",
                },
                {
                    name: "postDescription",
                    type: "varchar",
                },
                {
                    name: "user",
                    type: "int",
                },
            ],
        }), true);

        await queryRunner.createForeignKey("PostsTable", new TableForeignKey({
            columnNames: ["user"],
            referencedColumnNames: ["id"],
            referencedTableName: "UsersTable",
            onDelete: "CASCADE",
        }));
    }

    async down(queryRunner: QueryRunner) {
        await queryRunner.dropTable("PostsTable");
    }
}

module.exports = CreatePostsTable1707459424189;
