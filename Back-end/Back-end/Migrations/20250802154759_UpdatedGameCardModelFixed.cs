using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Back_end.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedGameCardModelFixed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cards_Game_IdGame",
                table: "Cards");

            migrationBuilder.DropForeignKey(
                name: "FK_Game_Room_IdRoom",
                table: "Game");

            migrationBuilder.DropForeignKey(
                name: "FK_Round_Game_IdGame",
                table: "Round");

            migrationBuilder.DropForeignKey(
                name: "FK_Turn_Round_IdRound",
                table: "Turn");

            migrationBuilder.DropIndex(
                name: "IX_Cards_IdGame",
                table: "Cards");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Round",
                table: "Round");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Room",
                table: "Room");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Game",
                table: "Game");

            migrationBuilder.DropColumn(
                name: "NamePlayer",
                table: "Turn");

            migrationBuilder.DropColumn(
                name: "Category",
                table: "Cards");

            migrationBuilder.DropColumn(
                name: "IdGame",
                table: "Cards");

            migrationBuilder.DropColumn(
                name: "NameWinner",
                table: "Round");

            migrationBuilder.DropColumn(
                name: "PlayerWinner",
                table: "Room");

            migrationBuilder.DropColumn(
                name: "NamePlayer",
                table: "Game");

            migrationBuilder.RenameTable(
                name: "Round",
                newName: "Rounds");

            migrationBuilder.RenameTable(
                name: "Room",
                newName: "Rooms");

            migrationBuilder.RenameTable(
                name: "Game",
                newName: "Games");

            migrationBuilder.RenameColumn(
                name: "attribute",
                table: "Turn",
                newName: "ValueAttribute");

            migrationBuilder.RenameIndex(
                name: "IX_Round_IdGame",
                table: "Rounds",
                newName: "IX_Rounds_IdGame");

            migrationBuilder.RenameColumn(
                name: "IdDeckCard",
                table: "Games",
                newName: "IdPlayerWinner");

            migrationBuilder.RenameIndex(
                name: "IX_Game_IdRoom",
                table: "Games",
                newName: "IX_Games_IdRoom");

            migrationBuilder.AddColumn<int>(
                name: "IdPlayer",
                table: "Turn",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "IdPlayerWinner",
                table: "Rounds",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "NumRound",
                table: "Rounds",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Rounds",
                table: "Rounds",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Rooms",
                table: "Rooms",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Games",
                table: "Games",
                column: "id");

            migrationBuilder.CreateTable(
                name: "Players",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NamePlayer = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IdGame = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Players", x => x.id);
                    table.ForeignKey(
                        name: "FK_Players_Games_IdGame",
                        column: x => x.IdGame,
                        principalTable: "Games",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PlayerCards",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdCard = table.Column<int>(type: "int", nullable: false),
                    IdPlayer = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlayerCards", x => x.id);
                    table.ForeignKey(
                        name: "FK_PlayerCards_Cards_IdCard",
                        column: x => x.IdCard,
                        principalTable: "Cards",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PlayerCards_Players_IdPlayer",
                        column: x => x.IdPlayer,
                        principalTable: "Players",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Turn_IdPlayer",
                table: "Turn",
                column: "IdPlayer");

            migrationBuilder.CreateIndex(
                name: "IX_PlayerCards_IdCard",
                table: "PlayerCards",
                column: "IdCard");

            migrationBuilder.CreateIndex(
                name: "IX_PlayerCards_IdPlayer",
                table: "PlayerCards",
                column: "IdPlayer");

            migrationBuilder.CreateIndex(
                name: "IX_Players_IdGame",
                table: "Players",
                column: "IdGame");

            migrationBuilder.AddForeignKey(
                name: "FK_Games_Rooms_IdRoom",
                table: "Games",
                column: "IdRoom",
                principalTable: "Rooms",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Rounds_Games_IdGame",
                table: "Rounds",
                column: "IdGame",
                principalTable: "Games",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Turn_Players_IdPlayer",
                table: "Turn",
                column: "IdPlayer",
                principalTable: "Players",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_Turn_Rounds_IdRound",
                table: "Turn",
                column: "IdRound",
                principalTable: "Rounds",
                principalColumn: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Games_Rooms_IdRoom",
                table: "Games");

            migrationBuilder.DropForeignKey(
                name: "FK_Rounds_Games_IdGame",
                table: "Rounds");

            migrationBuilder.DropForeignKey(
                name: "FK_Turn_Players_IdPlayer",
                table: "Turn");

            migrationBuilder.DropForeignKey(
                name: "FK_Turn_Rounds_IdRound",
                table: "Turn");

            migrationBuilder.DropTable(
                name: "PlayerCards");

            migrationBuilder.DropTable(
                name: "Players");

            migrationBuilder.DropIndex(
                name: "IX_Turn_IdPlayer",
                table: "Turn");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Rounds",
                table: "Rounds");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Rooms",
                table: "Rooms");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Games",
                table: "Games");

            migrationBuilder.DropColumn(
                name: "IdPlayer",
                table: "Turn");

            migrationBuilder.DropColumn(
                name: "IdPlayerWinner",
                table: "Rounds");

            migrationBuilder.DropColumn(
                name: "NumRound",
                table: "Rounds");

            migrationBuilder.RenameTable(
                name: "Rounds",
                newName: "Round");

            migrationBuilder.RenameTable(
                name: "Rooms",
                newName: "Room");

            migrationBuilder.RenameTable(
                name: "Games",
                newName: "Game");

            migrationBuilder.RenameColumn(
                name: "ValueAttribute",
                table: "Turn",
                newName: "attribute");

            migrationBuilder.RenameIndex(
                name: "IX_Rounds_IdGame",
                table: "Round",
                newName: "IX_Round_IdGame");

            migrationBuilder.RenameColumn(
                name: "IdPlayerWinner",
                table: "Game",
                newName: "IdDeckCard");

            migrationBuilder.RenameIndex(
                name: "IX_Games_IdRoom",
                table: "Game",
                newName: "IX_Game_IdRoom");

            migrationBuilder.AddColumn<string>(
                name: "NamePlayer",
                table: "Turn",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Category",
                table: "Cards",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "IdGame",
                table: "Cards",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "NameWinner",
                table: "Round",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "PlayerWinner",
                table: "Room",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "NamePlayer",
                table: "Game",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Round",
                table: "Round",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Room",
                table: "Room",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Game",
                table: "Game",
                column: "id");

            migrationBuilder.CreateIndex(
                name: "IX_Cards_IdGame",
                table: "Cards",
                column: "IdGame");

            migrationBuilder.AddForeignKey(
                name: "FK_Cards_Game_IdGame",
                table: "Cards",
                column: "IdGame",
                principalTable: "Game",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Game_Room_IdRoom",
                table: "Game",
                column: "IdRoom",
                principalTable: "Room",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Round_Game_IdGame",
                table: "Round",
                column: "IdGame",
                principalTable: "Game",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Turn_Round_IdRound",
                table: "Turn",
                column: "IdRound",
                principalTable: "Round",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
