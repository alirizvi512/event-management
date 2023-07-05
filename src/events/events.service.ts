import { Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma.service';
import { EventDto } from 'src/dto/EventDto';

@Injectable()
export class EventsService {
    constructor(private readonly prisma: PrismaService) { }

    async createEvent(event: EventDto) {
        await this.prisma.event.create({ data: { ...event, date: new Date(event.date) } });
    }

    async getAllEvents() {
        return this.prisma.event.findMany();
    }

    async getEventById(id: number) {
        const eventObj = await this.prisma.event.findUnique({ where: { id } });
        return eventObj;
    }

    async updateEvent(updateEventDto: EventDto, eventId: number) {
        return this.prisma.event.update({
            where: { id: eventId },
            data: { ...updateEventDto, date: new Date(updateEventDto.date) },
        });
    }

    async deleteEvent(eventId: number) {
        return this.prisma.event.delete({ where: { id: eventId } });
    }
}