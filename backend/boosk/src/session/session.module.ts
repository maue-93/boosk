import { Module } from '@nestjs/common';
import { SessionController } from './session.controller';
import { SessionService } from './session.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  RecordedSession,
  RecordedSessionSchema,
} from './schemas/recorded.session.schema';
import { LiveSession, LiveSessionSchema } from './schemas/live.session.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LiveSession.name, schema: LiveSessionSchema },
      { name: RecordedSession.name, schema: RecordedSessionSchema },
    ]),
  ],
  controllers: [SessionController],
  providers: [SessionService],
})
export class SessionModule {}
