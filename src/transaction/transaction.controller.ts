import { Body, Controller, Param, Post } from '@nestjs/common';
import { TransactionDocument } from './transaction.schema';
import { TransactionService } from './transaction.service';

@Controller('transactions')
export class TransactionController {
  constructor(private transaction: TransactionService) {}

  private async populateOffer(doc: TransactionDocument) {
    const full = await doc.populate(
      'offer',
      'nft_id seller buyer amount createdAt',
    );
    const obj = full.toObject();
    return obj;
  }

  @Post('/:offerID')
  async startTransaction(@Param('offerID') offerID: string) {
    const doc = await this.transaction.startTransaction(offerID);
    return this.populateOffer(doc);
  }

  @Post('/:transacationID/nft')
  async receiveNFt(@Param('transacationID') transacationID: string) {
    const doc = await this.transaction.receiveNFT(transacationID);
    console.log(`NFT received for transaction ${transacationID}`);
    return this.populateOffer(doc);
  }

  @Post('/:transacationID/payment')
  async receivePayment(@Param('transacationID') transacationID: string) {
    const doc = await this.transaction.receivePayment(transacationID);
    console.log(`Payment received for transaction ${transacationID}`);
    return this.populateOffer(doc);
  }

  @Post('/:transacationID/approve')
  async approve(@Param('transacationID') transacationID: string) {
    const doc = await this.transaction.approve(transacationID);
    console.log(`Transaction ${transacationID} approved.`);
    return this.populateOffer(doc);
  }
}
