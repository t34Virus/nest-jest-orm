import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from 'src/payments/dto/CreatePayment.dto';

@Injectable()
export class PaymentsService {
    private users = [
        {
            email: 'teresa@teresa.com'
        },
        {
            email: 'anson@teresa.com'
        },
        {
            email: 'ben@teresa.com'
        },
    ]
    createPayment(createPaymentDto: CreatePaymentDto) {
        const { email } = createPaymentDto;
        const user = this.users.find((user) => user.email === email);

        if (user) 
            return {
                status: 'success'
            };
        else {
            throw new BadRequestException();
        }
    }

}
