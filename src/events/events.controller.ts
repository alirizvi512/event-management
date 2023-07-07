import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, UsePipes, Request, UseGuards, Query } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventDto, eventsSchema } from './../dto/EventDto';
import { YupValidationPipe } from './../utils/yupValidationPipe';
import { JwtAuthGuard } from './../guards/jwt-auth.guard';

@Controller("events")
export class EventsController {
    constructor(private readonly eventsService: EventsService) { }

    @Get()
    getAllEvents(
        @Query('page') page: number = 1,
        @Query('count') count: number = 10,
        @Query('search') search: string = '',
        @Query('date') date: string = '',
        @Query('cities') cities: string = '',
      ) {
        return this.eventsService.getAllEvents(parseInt(page.toString()), parseInt(count.toString()), search, date, cities);
      }

    @Post()
    @UsePipes(new YupValidationPipe(eventsSchema))
    @UseGuards(JwtAuthGuard)
    async create(@Body() eventDto: EventDto, @Request() { user }) {
        const result = await this.eventsService.createEvent(eventDto, user.id);
        return {
            code: HttpStatus.OK,
            message: "Event Created succesfully",
            data: result,
        }
    }

    @Get(':id')
    async getEventById(@Param('id') id: string) {
        const eventObj = await this.eventsService.getEventById(parseInt(id));
        if (eventObj) {
            return {
                code: HttpStatus.OK,
                message: "Success",
                data: eventObj,
            }
        } else {
            return {
                code: HttpStatus.NOT_FOUND,
                message: "Not Found",
            }
        }
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    async updateEvent(@Param('id') id: string, @Body() updateEventDto: EventDto, @Request() { user }) {
        const eventObj = await this.eventsService.getEventByIdAndUserId(parseInt(id), user.id);
        if (eventObj) {
            eventObj.name = updateEventDto.name;
            eventObj.description = updateEventDto.description;
            eventObj.date = updateEventDto.date;
            eventObj.cityId = parseInt(updateEventDto.cityId.toString());
            const updatedEvent = await this.eventsService.updateEvent(eventObj, parseInt(id));
            return {
                code: HttpStatus.OK,
                message: "Success",
                data: updatedEvent,
            }
        } else {
            return {
                code: HttpStatus.NOT_FOUND,
                message: "Not Found",
            }
        }
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async deleteEvent(@Param('id') id: string, @Request() { user }) {
        const eventObj = await this.eventsService.getEventByIdAndUserId(parseInt(id), user.id);
        if (eventObj) {
            const deletedEvent = await this.eventsService.deleteEvent(parseInt(id));
            return {
                code: HttpStatus.OK,
                message: "Success",
                data: deletedEvent,
            }
        } else {
            return {
                code: HttpStatus.NOT_FOUND,
                message: "Not Found",
            }
        }
    }
}
