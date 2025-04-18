import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signInDto } from './dto/singIn.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  signInUser(@Body() signInUser : signInDto){
    return this.authService.singIn(signInUser)
  }
}
