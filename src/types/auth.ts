export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
  favoriteColor: string;
  nickname: string;
}

export type ErrorMessage = {
  email: string | null;
  password: string | null;
  name?: string | null;
  confirmPassword?: string | null;
  favoriteColor?: string | null;
  nickname?: string | null;
} ;