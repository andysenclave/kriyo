export class UpdateProfileDto {
  name?: string;
  phone?: string;
  preferences?: {
    theme?: string;
    notifications?: {
      email?: boolean;
      push?: boolean;
      taskReminders?: boolean;
    };
  };
}
