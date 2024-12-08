import { Body, Controller, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { SessionService } from './session.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticatedRequest } from 'src/auth/types/authenticated.request.type';
import {
  FinishSessionDto,
  FinishSessionSansUserDto,
  PauseLiveSessionDto,
  StartLiveSessionDto,
  StartLiveSessionSansUserDto,
} from './dtos/live.session.dto';
import { LiveSession } from './schemas/live.session.schema';
import { JwtPayloadType } from 'src/auth/types/jwt.payload.type';
import { RecordedSession } from './schemas/recorded.session.schema';

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post('start')
  @UseGuards(AuthGuard('jwt'))
  startLiveSession(
    @Body() startLiveSessionSansUserDto: StartLiveSessionSansUserDto,
    @Req() request: AuthenticatedRequest,
  ): Promise<LiveSession> {
    // get user from request header
    const user: JwtPayloadType = request.user;

    // add user to the dto and create the book
    const startLiveSessionDto: StartLiveSessionDto = {
      user: user.id,
      ...startLiveSessionSansUserDto,
    };
    return this.sessionService.startLiveSession(startLiveSessionDto);
  }

  @Patch('pause-resume')
  @UseGuards(AuthGuard('jwt'))
  pauseLiveSession(@Req() request: AuthenticatedRequest): Promise<LiveSession> {
    const pauseLiveSessionDto: PauseLiveSessionDto = { user: request.user.id };
    return this.sessionService.pauseOrResumeLiveSession(pauseLiveSessionDto);
  }

  @Post('finish')
  @UseGuards(AuthGuard('jwt'))
  finishSession(
    @Req() request: AuthenticatedRequest,
    @Body() finishSessionSansUserDto: FinishSessionSansUserDto,
  ): Promise<RecordedSession> {
    const finishSessionDto: FinishSessionDto = {
      user: request.user.id,
      ...finishSessionSansUserDto,
    };

    return this.sessionService.finishSession(finishSessionDto);
  }
}
