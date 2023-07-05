import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, UsePipes } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventDto, eventsSchema } from 'src/dto/EventDto';
import { YupValidationPipe } from 'src/utils/yupValidationPipe';

@Controller("events")
export class EventsController {
    constructor(private readonly eventsService: EventsService) { }

    @Get()
    getAllEvents() {
        return this.eventsService.getAllEvents();
    }

    @Post()
    @UsePipes(new YupValidationPipe(eventsSchema))
    async create(@Body() eventDto: EventDto) {
        const result = await this.eventsService.createEvent(eventDto);
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
    async updateEvent(@Param('id') id: string, @Body() updateEventDto: EventDto) {
        const eventObj = await this.eventsService.getEventById(parseInt(id));
        if (eventObj) {
            eventObj.name = updateEventDto.name;
            eventObj.description = updateEventDto.description;
            eventObj.date = updateEventDto.date;
            eventObj.city = updateEventDto.city;
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
    async deleteEvent(@Param('id') id: string) {
        const eventObj = await this.eventsService.getEventById(parseInt(id));
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
