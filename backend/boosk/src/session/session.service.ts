import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LiveSession } from './schemas/live.session.schema';
import { Model } from 'mongoose';
import { RecordedSession } from './schemas/recorded.session.schema';
import {
  FinishSessionDto,
  LiveSessionDto,
  PauseLiveSessionDto,
  StartLiveSessionDto,
} from './dtos/live.session.dto';
import { RecordedSessionDto } from './dtos/recorded.session.dto';

@Injectable()
export class SessionService {
  constructor(
    @InjectModel(LiveSession.name)
    private readonly liveSessionModel: Model<LiveSession>,
    @InjectModel(RecordedSession.name)
    private readonly recordedSessionModel: Model<RecordedSession>,
  ) {}

  async startLiveSession(
    startLiveSessionDto: StartLiveSessionDto,
  ): Promise<LiveSession> {
    const { user, book } = startLiveSessionDto;

    // check if a live session with this book and user already exist
    const liveSession = await this.liveSessionModel.findOne({ user, book });
    if (liveSession) {
      return liveSession;
    }

    // store now's date time
    const time = [new Date()];
    const newLiveSession = await this.liveSessionModel.create({
      user,
      book,
      time,
    });

    return newLiveSession;
  }

  // handle the size of the time array
  async pauseOrResumeLiveSession(
    pauseLiveSessionDto: PauseLiveSessionDto,
  ): Promise<LiveSession> {
    const { user } = pauseLiveSessionDto;
    // find the live session for this user
    const liveSession = await this.liveSessionModel.findOne({ user });

    // add current time to the time array
    liveSession.time.push(new Date());
    return await liveSession.save();
  }

  async finishSession(
    finishSessionDto: FinishSessionDto,
  ): Promise<RecordedSession> {
    const { user, lastPage } = finishSessionDto;
    // find the live session for this user
    const liveSession = await this.liveSessionModel.findOne({
      user,
    });

    if (!liveSession) {
      throw new NotFoundException(`You have no active reading session`);
    }

    // get the book and time value
    const liveSessionDto: LiveSessionDto = await this.liveSessionModel.findOne({
      user,
    });

    const { book, time } = liveSessionDto;

    // prepare the dto and add now's time
    const recordedSessionDto: RecordedSessionDto = {
      user,
      book,
      time: time.length % 2 === 1 ? [...time, new Date()] : time,
      lastPage,
    };

    // create a record of the session
    const recordedSession =
      await this.recordedSessionModel.create(recordedSessionDto);

    // delete the live session
    await this.liveSessionModel.deleteOne({ _id: liveSession._id });

    return recordedSession;
  }

  //   async loadLiveSession(liveSessionDto: LiveSessionDto): Promise<LiveSession> {}

  //   async loadRecordedSession(
  //     recordedSessionDto: RecordedSessionDto,
  //   ): Promise<RecordedSession> {}
}
