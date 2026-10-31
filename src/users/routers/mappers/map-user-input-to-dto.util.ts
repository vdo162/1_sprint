import { UserDto, UserInput } from '../input/user.dto';

export function mapUserInputToDto(userInput: UserInput): UserDto {
  return {
    login: userInput.login,
    password: userInput.password,
    email: userInput.email,
  };
}
