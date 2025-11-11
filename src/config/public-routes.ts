export const PUBLIC_ROUTES: { path: RegExp; methods?: string[] }[] = [
  { path: /^\/api\/auth\/(.*)$/, methods: ["GET", "POST"] }, // qualquer subrota de /api/auth/**
];
