import { Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma.service';
import { EventDto } from 'src/dto/EventDto';

@Injectable()
export class EventsService {
    constructor(private readonly prisma: PrismaService) { }

    async createEvent(event: EventDto, userId: number) {
        await this.prisma.event.create({ data: { ...event, date: new Date(event.date), cityId: parseInt(event.cityId.toString()), userId } });
    }

    async getAllEvents(page: number, count: number, search: string, date: string, cities: string) {
        const offset = (page - 1) * count;
        let where = {};
        if (search) {
            where = {
                ...where,
                OR: [
                    { name: { contains: search } },
                    { description: { contains: search } },
                ],
            };
        }
        if (date) {
            where = {
                ...where,
                date: { gte: new Date(date) },
            };
        }
        if (cities) {
            const citiesArray = cities.split(',');
            where = {
                ...where,
                city: { name: { in: citiesArray } },
            };
        }
        return this.prisma.event.findMany({
            skip: offset,
            take: count,
            include: {
                city: {
                    select: {
                        name: true,
                    },
                },
            },
            where,
        });
    }

    async getEventById(id: number) {
        const eventObj = await this.prisma.event.findUnique({ where: { id }, include: { city: true } });
        return eventObj;
    }

    async getEventByIdAndUserId(eventId: number, userId: number) {
        return await this.prisma.event.findFirst({
            where: {
                id: eventId,
                userId
            }
        });
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