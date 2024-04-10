import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { UsersService } from './v2/users/users.service';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private userSerivce: UsersService,
  ) {}

  @Get()
  getHelloWorld() {
    return '. hello world';
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    const user = {
      email: req.body.email,
      password: req.body.password,
    };

    return this.authService.login(user);
  }

  // test as per docs
  // https://docs.nestjs.com/recipes/passport
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return this.userSerivce.findOne(req.user.email);
  }
}
