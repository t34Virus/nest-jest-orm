import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsController } from './payments.controller';
import { Request, Response } from 'express';

describe('PaymentsController', () => {
  let controller: PaymentsController;
  
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
    }).compile();

    controller = module.get<PaymentsController>(PaymentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getPayments', () => {
    it('should return a status of 400', () => {
      controller.getPayments(mockRequest, mockResponse);
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
});
