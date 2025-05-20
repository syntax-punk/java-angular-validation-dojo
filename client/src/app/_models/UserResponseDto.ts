export interface UserResponseDto {
  id: string;
  username: string;
  dob: string;
  gender: 'male' | 'female';
  bio: string;
}
