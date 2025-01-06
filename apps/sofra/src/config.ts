export const PORT = process.env.PORT || 27017;
export const MONGO_CONNECTION_STRING =
  process.env.MONGO_CONNECTION_STRING ||
  'mongodb+srv://omar1:ffYHUlJ0AshwExTJ@cluster0.goinw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
export const MONGO_DATABASE_NAME: string =
  process.env.MONGO_DATABASE_NAME || 'DB';
export const ACCESS_TOKEN_SECRET = 'mcpjpBvBAu1va';
export const REFRESH_TOKEN_SECRET = 'a8J1T0X6lPComVtM';
