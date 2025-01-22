import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { RegisterDTO } from './dto/register.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LocalGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {
  constructor(public authservice: AuthService) {}

  @Post('register')
  register(@Body() registerDto: RegisterDTO) {
    return this.authservice.register(registerDto);
  }

  @Post('login')
  @UseGuards(LocalGuard)
  login(@Body() loginDto: LoginDto) {
    return this.authservice.login(loginDto);
  }
}
