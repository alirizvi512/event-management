import { Test, TestingModule } from '@nestjs/testing';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { PrismaService } from './../prisma.service';

describe('EventsController', () => {
  let controller: EventsController;
  let service: EventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsController],
      providers: [EventsService, PrismaService],
    }).compile();

    controller = module.get<EventsController>(EventsController);
    service = module.get<EventsService>(EventsService);
  });

  describe('getAllEvents', () => {
    it('should return all events with default pagination parameters', async () => {
      const result = [
        {
          "id": 2,
          "name": "Trust Block",
          "createdAt": new Date("2023-07-05"),
          "description": "Blockchain",
          "date": new Date("2023-02-14"),
          "cityId": 4,
          "userId": 1,
          "city": {
            "name": "London"
          }
        },
        {
          "id": 3,
          "name": "Chatgpt",
          "createdAt": new Date("2023-07-05"),
          "description": "AI",
          "date": new Date("2023-02-14"),
          "cityId": 5,
          "userId": 1,
          "city": {
            "name": "Madrid"
          }
        },
        {
          "id": 4,
          "name": "IPL",
          "createdAt": new Date("2023-07-05"),
          "description": "Sports",
          "date": new Date("2023-02-15"),
          "cityId": 5,
          "userId": 1,
          "city": {
            "name": "Madrid"
          }
        },
        {
          "id": 5,
          "name": "PSL",
          "createdAt": new Date("2023-07-05"),
          "description": "Sports",
          "date": new Date("2023-03-15"),
          "cityId": 7,
          "userId": 1,
          "city": {
            "name": "Dubai"
          }
        },
        {
          "id": 6,
          "name": "BBL",
          "createdAt": new Date("2023-07-05"),
          "description": "Sports",
          "date": new Date("2023-03-11"),
          "cityId": 7,
          "userId": 1,
          "city": {
            "name": "Dubai"
          }
        },
        {
          "id": 7,
          "name": "EPL",
          "createdAt": new Date("2023-07-05"),
          "description": "Sports",
          "date": new Date("2023-03-13"),
          "cityId": 9,
          "userId": 1,
          "city": {
            "name": "Wakanda"
          }
        }
      ]
      jest.spyOn(service, 'getAllEvents').mockResolvedValue(result);

      expect(await controller.getAllEvents()).toBe(result);
      expect(service.getAllEvents).toHaveBeenCalledWith(1, 10, '', '', '');
    });

    it('should return all events with custom pagination parameters', async () => {
      const result = [
        // Mock array of events
      ];
      jest.spyOn(service, 'getAllEvents').mockResolvedValue(result);

      expect(await controller.getAllEvents(2, 20, 'search', '2023-07-06', 'city1,city2')).toBe(result);
      expect(service.getAllEvents).toHaveBeenCalledWith(2, 20, 'search', '2023-07-06', 'city1,city2');
    });
  });

  describe('create', () => {
    it('should create a new event', async () => {
      const eventDto = {
        "name": "BBL",
        "description": "Sports",
        "date": new Date("2023-03-11"),
        "cityId": 1,
        "userId": 1,
        "city": {
          "name": "Dubai"
        }
      };
      const user = {
        id: 1,
      };
      const createdEvent = {
        id: 1,
        name: 'BBL',
        createdAt: new Date("2023-07-05"),
        description: 'Sports',
        date: new Date("2023-03-11"),
        cityId: 1,
        userId: 1,
      };
      jest.spyOn(service, 'createEvent').mockResolvedValue(createdEvent);

      const response = await controller.create(eventDto, { user });
      expect(response).toEqual({
        code: 200,
        message: 'Event Created succesfully',
        data: createdEvent,
      });
      expect(service.createEvent).toHaveBeenCalledWith(eventDto, user.id);
    });
  });

  describe('getEventById', () => {
    it('should return an existing event', async () => {
      const id = '1';
      const eventObj = {
        id: 1,
        name: 'New Event',
        createdAt: new Date("2023-07-05"),
        description: 'New Event Description',
        date: new Date("2023-03-11"),
        cityId: 1,
        userId: 1,
        city: {
          id: 1,
          name: "Wakanda"
        }
      };
      jest.spyOn(service, 'getEventById').mockResolvedValue(eventObj);

      const response = await controller.getEventById(id);

      expect(response).toEqual({
        code: 200,
        message: 'Success',
        data: eventObj,
      });
      expect(service.getEventById).toHaveBeenCalledWith(1);
    });

    it('should return Not Found for a non-existing event', async () => {
      const id = '999'; // Mock non-existing event ID
      jest.spyOn(service, 'getEventById').mockResolvedValue(null);

      const response = await controller.getEventById(id);

      expect(response).toEqual({
        code: 404,
        message: 'Not Found',
      });
      expect(service.getEventById).toHaveBeenCalledWith(999);
    });
  });

  describe('updateEvent', () => {
    it('should update an existing event', async () => {
      const id = '2';
      const updateEventDto = {
        name: "Chat GPT",
        description: "Blockchain/Audit",
        cityId: 1,
        date: new Date("2023-02-14")
      };
      const user = {
        id: 1,
      };
      const eventObj = {
        "id": 2,
        "name": "Trust Block",
        "createdAt": new Date("2023-07-05"),
        "description": "Blockchain",
        "date": new Date("2023-02-14"),
        "cityId": 4,
        "userId": 1,
        "city": {
            "name": "London"
        }
      }
      const updatedEvent = {
        "id": 2,
        name: "Chat GPT",
        "createdAt": new Date("2023-07-05"),
        description: "Blockchain/Audit",
        "date": new Date("2023-02-14"),
        "cityId": 4,
        "userId": 1,
        "city": {
            "name": "London"
        }
      }
      jest.spyOn(service, 'getEventByIdAndUserId').mockResolvedValue(eventObj);
      jest.spyOn(service, 'updateEvent').mockResolvedValue(updatedEvent);

      const response = await controller.updateEvent(id, updateEventDto, { user });
      expect(response).toEqual({
        code: 200,
        message: 'Success',
        data: updatedEvent,
      });
      expect(service.getEventByIdAndUserId).toHaveBeenCalledWith(2, user.id);
    });

    it('should return Not Found for a non-existing event', async () => {
      const id = '999';
      const updateEventDto = {
        name: "Chat GPT",
        description: "Blockchain/Audit",
        cityId: 1,
        date: new Date("2023-02-14")
      };
      const user = {
        id: 1,
      };
      jest.spyOn(service, 'getEventByIdAndUserId').mockResolvedValue(null);

      const response = await controller.updateEvent(id, updateEventDto, { user });
      console.log(response);
      expect(response).toEqual({
        code: 404,
        message: 'Not Found',
      });
      expect(service.getEventByIdAndUserId).toHaveBeenCalledWith(999, user.id);
    });
  });

  describe('deleteEvent', () => {
    it('should delete an existing event', async () => {
      const id = '1';
      const user = {
        id: 1,
      };
      const eventObj = {
        "id": 2,
        "name": "Trust Block",
        "createdAt": new Date("2023-07-05"),
        "description": "Blockchain",
        "date": new Date("2023-02-14"),
        "cityId": 4,
        "userId": 1,
        "city": {
            "name": "London"
        }
      };
      const deletedEvent = {
        "id": 2,
        "name": "Trust Block",
        "createdAt": new Date("2023-07-05"),
        "description": "Blockchain",
        "date": new Date("2023-02-14"),
        "cityId": 4,
        "userId": 1,
        "city": {
            "name": "London"
        }
      };
      jest.spyOn(service, 'getEventByIdAndUserId').mockResolvedValue(eventObj);
      jest.spyOn(service, 'deleteEvent').mockResolvedValue(deletedEvent);

      const response = await controller.deleteEvent(id, { user });

      expect(response).toEqual({
        code: 200,
        message: 'Success',
        data: deletedEvent,
      });
      expect(service.getEventByIdAndUserId).toHaveBeenCalledWith(1, user.id);
      expect(service.deleteEvent).toHaveBeenCalledWith(1);
    });

    it('should return Not Found for a non-existing event', async () => {
      const id = '999'; // Mock non-existing event ID
      const user = {
        id: 1, // Mock user ID
      };
      jest.spyOn(service, 'getEventByIdAndUserId').mockResolvedValue(null);

      const response = await controller.deleteEvent(id, { user });

      expect(response).toEqual({
        code: 404,
        message: 'Not Found',
      });
      expect(service.getEventByIdAndUserId).toHaveBeenCalledWith(999, user.id);
    });
  });
});
