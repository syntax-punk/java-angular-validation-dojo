export interface UserResponseDto {
  id: string;
  username: string;
  dob: string;
  photoUrl?: string;
  gender: 'male' | 'female';
  bio: string;
}

export interface CreateUserDto {
  firstName: string;
  lastName: string;
  dob: string;
  gender: 'male' | 'female';
  username: string;
  password: string;
  email: string;
  phone: string;
  bio: string;
}

export interface IdResposeDto {
  id: string;
}
