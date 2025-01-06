import { Body, Controller, Get, Param, Post, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto, LoginDto, CreateUrlDto } from './dto'
import { AuthGuard } from "./auth.guard";


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('signup')
  async signup(@Body() dto: RegisterDto, @Res({ passthrough: true }) response: Response) {
    return await this.authService.signup(dto)
  }

  @Post('login')
  async signIn(@Body() LoginDto: LoginDto) {
    return await this.authService.signin(LoginDto);
  }

  // @UseGuards(AuthGuard)
  @Post("createUrl")
  async createUrl(@Body() createUrlDto: CreateUrlDto) {
    return await this.authService.createUrl(createUrlDto)
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getUrlData(@Param('id') id: string): Promise<any> {
    return await this.authService.getUrlData(id)
  }

}