import { Prisma } from "@prisma/client";

/* ============================================================
   🧩 USER RELATIONS
   ============================================================ */
export type UserWithCharacters = Prisma.UserGetPayload<{
  include: { characters: true };
}>;

export type UserWithAddons = Prisma.UserGetPayload<{
  include: { addons: true };
}>;

export type UserFull = Prisma.UserGetPayload<{
  include: { characters: true; addons: true };
}>;

/* ============================================================
   🏰 GAME RELATIONS
   ============================================================ */
export type GameWithCharacters = Prisma.GameGetPayload<{
  include: { characters: true };
}>;

export type GameWithMemories = Prisma.GameGetPayload<{
  include: { memories: true };
}>;

export type GameWithLoreObjects = Prisma.GameGetPayload<{
  include: { loreObjects: true };
}>;

export type GameWithDialogs = Prisma.GameGetPayload<{
  include: { dialogs: true };
}>;

export type GameWithAddons = Prisma.GameGetPayload<{
  include: { addons: true };
}>;

export type GameFull = Prisma.GameGetPayload<{
  include: {
    characters: true;
    memories: true;
    loreObjects: true;
    dialogs: true;
    addons: true;
  };
}>;

/* ============================================================
   🧙 PLAYER CHARACTER RELATIONS
   ============================================================ */
export type PlayerCharacterWithUser = Prisma.PlayerCharacterGetPayload<{
  include: { user: true };
}>;

export type PlayerCharacterWithGame = Prisma.PlayerCharacterGetPayload<{
  include: { game: true };
}>;

export type PlayerCharacterWithMemories = Prisma.PlayerCharacterGetPayload<{
  include: { memories: true };
}>;

export type PlayerCharacterWithDialogs = Prisma.PlayerCharacterGetPayload<{
  include: { dialogs: true };
}>;

export type PlayerCharacterFull = Prisma.PlayerCharacterGetPayload<{
  include: {
    user: true;
    game: true;
    memories: true;
    dialogs: true;
  };
}>;

/* ============================================================
   🧠 MEMORY RELATIONS
   ============================================================ */
export type MemoryWithGame = Prisma.MemoryGetPayload<{
  include: { game: true };
}>;

export type MemoryWithCharacters = Prisma.MemoryGetPayload<{
  include: { characters: true };
}>;

export type MemoryWithLoreObjects = Prisma.MemoryGetPayload<{
  include: { loreObjects: true };
}>;

export type MemoryFull = Prisma.MemoryGetPayload<{
  include: {
    game: true;
    characters: true;
    loreObjects: true;
  };
}>;

/* ============================================================
   📜 LORE OBJECT RELATIONS
   ============================================================ */
export type LoreObjectWithGame = Prisma.LoreObjectGetPayload<{
  include: { game: true };
}>;

export type LoreObjectWithMemories = Prisma.LoreObjectGetPayload<{
  include: { memories: true };
}>;

export type LoreObjectFull = Prisma.LoreObjectGetPayload<{
  include: { game: true; memories: true };
}>;

/* ============================================================
   💬 DIALOG MESSAGE RELATIONS
   ============================================================ */
export type DialogMessageWithCharacter = Prisma.DialogMessageGetPayload<{
  include: { character: true };
}>;

export type DialogMessageWithGame = Prisma.DialogMessageGetPayload<{
  include: { game: true };
}>;

export type DialogMessageFull = Prisma.DialogMessageGetPayload<{
  include: { game: true; character: true };
}>;

/* ============================================================
   🧩 ADDON RELATIONS
   ============================================================ */
export type AddonWithGames = Prisma.AddonGetPayload<{
  include: { games: true };
}>;

export type AddonWithAuthor = Prisma.AddonGetPayload<{
  include: { author: true };
}>;

export type AddonFull = Prisma.AddonGetPayload<{
  include: { author: true; games: true };
}>;

/* ============================================================
   🔗 MASTER UNION TYPES
   ============================================================ */
export type AnyModelWithRelations =
  | UserFull
  | GameFull
  | PlayerCharacterFull
  | MemoryFull
  | LoreObjectFull
  | DialogMessageFull
  | AddonFull;
