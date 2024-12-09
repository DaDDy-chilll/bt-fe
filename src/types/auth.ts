export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
  favoriteColor: string | number;
  nickname: string | number;
}

export type ErrorPayload = {
  email?: string | null;
  password: string | null;
  name?: string | null;
  confirmPassword?: string | null;
  favoriteColor?: string | null;
  nickname?: string | null;
} ;