import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsController } from './payments.controller';
import { Request, Response } from 'express';
import { BadRequestException } from '@nestjs/common';
import { PaymentsService } from '../../services/payments/payments.service';

describe('PaymentsController', () => {
  let controller: PaymentsController;
  let paymentsService: PaymentsService;

  const mockRequest = {
    query: {},
  } as unknown as Request;

  const mockStatusResponse = {
    // send: jest.fn((x) => x)
    send: jest.fn((x) => x)

  } as unknown as Response;

  const mockResponse = {
    status: jest.fn((x) => ({
      send: jest.fn((y) => y)
    })),
    send: jest.fn((x) => x)
  } as unknown as Response;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsController],
      providers: [
        {
          provide: 'PAYMENTS_SERVICE',
          useValue: {
            createPayment: jest.fn((x) => x)
          }
        }
      ]
    }).compile();

    controller = module.get<PaymentsController>(PaymentsController);
    paymentsService = module.get<PaymentsService>('PAYMENTS_SERVICE');
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('paymentsService should be defined', () => {
    expect(paymentsService).toBeDefined();
  });

  describe('getPayments', () => {
    it('should return a status of 400', async () => {
      await controller.getPayments(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockStatusResponse.send).toHaveBeenCalledWith({
        "msg": "Missing count or page query parameter"
      });
    });
    it('should return a status response of 200 when query params are present', () => {
      mockRequest.query = {
        count: '10',
        page: '1'
      };
      controller.getPayments(mockRequest, mockResponse);
      expect(mockResponse.send).toHaveBeenCalledWith(200);
    })
  })

  describe('createPayment', () => {
    it('should return a successful response', async () => {
      jest
      .spyOn(paymentsService, 'createPayment')
      .mockImplementation(() => {
        throw new BadRequestException();
      })
      try {
        const response = await controller.createPayment({
          email: 'teresa@gmail.com',
          price: 100
        })
      } catch (err) {
        console.log(err);
      }
    })
  })
});
