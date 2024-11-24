import type { ErrorMessageType } from "@/types/errorMessage";

export const errorMessage: ErrorMessageType = {
    EMAIL_REQUIRED: "Email is required",
    EMAIL_INVALID: "Invalid email",
    PASSWORD_REQUIRED: "Password is required",
    PASSWORD_INVALID: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    PASSWORD_NOT_MATCH: "Password and confirm password do not match",
    NAME_REQUIRED: "Name is required",
    CONFIRM_PASSWORD_REQUIRED: "Confirm Password is required",
    FAVORITE_COLOR_REQUIRED: "Favorite Color is required",
    NICKNAME_REQUIRED: "Nickname is required",
}