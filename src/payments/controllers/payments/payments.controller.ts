import { Controller, Get, Inject, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { PaymentsService } from 'src/payments/services/payments/payments.service';

@Controller('payments')
export class PaymentsController {

    constructor(@Inject('PAYMENTS_SERVICE') 
        private readonly paymentsService: PaymentsService
    ) {}

    @Get()
    getPayments(@Req() request: Request, @Res() response: Response) {
        const { count, page } = request.query;
        if (!count || !page) {
            response
                .status(400)
                .send({'msg': 'Missing count or page query parameter'});
        } else {
            response.send(200);
        }
    }

}
