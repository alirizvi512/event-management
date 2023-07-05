import * as moment from 'moment';

import * as yup from 'yup';

export const eventsSchema = yup.object().shape({
    name: yup.string().required(),
    cityId: yup.number().required(),
    description: yup.string().required(),
    date: yup.string().required().test((value) => {
        const date = moment(value);
        const isValidDate = date.isValid();
        return isValidDate;
    })
});

export class EventDto {
    name: string;
    date: Date;
    cityId: number;
    description: string;
}