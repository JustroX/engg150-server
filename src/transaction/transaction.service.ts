import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction } from './transaction.schema';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name) public model: Model<Transaction>,
  ) {}

  async startTransaction(offerID: string) {
    const transaction = new this.model();
    transaction.offer = offerID;

    transaction.is_nft_received = false;
    transaction.is_payment_received = false;
    transaction.is_approved = false;
    transaction.last_updated = Date.now();

    await transaction.save();
    return transaction;
  }

  getTransaction(transactionID: string) {
    return this.model.findById(transactionID);
  }

  getTransactions() {
    return this.model.find({});
  }

  async receiveNFT(transactionID: string) {
    const transaction = await this.getTransaction(transactionID);
    if (!transaction) throw new NotFoundException('Transaction not found.');
    transaction.is_nft_received = true;
    transaction.last_updated = Date.now();
    await transaction.save();
    return transaction;
  }
  async receivePayment(transactionID: string) {
    const transaction = await this.getTransaction(transactionID);
    if (!transaction) throw new NotFoundException('Transaction not found.');
    transaction.is_payment_received = true;
    transaction.last_updated = Date.now();
    await transaction.save();
    return transaction;
  }

  async approve(transactionID: string) {
    const transaction = await this.getTransaction(transactionID);
    if (!transaction) throw new NotFoundException('Transaction not found.');
    transaction.is_approved = true;
    transaction.last_updated = Date.now();
    await transaction.save();
    return transaction;
  }
}
