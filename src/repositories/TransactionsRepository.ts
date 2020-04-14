import Transaction from '../models/Transaction';
import CreateTransactionService from '../services/CreateTransactionService';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO  {
  title: string, 
  value:number, 
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance():Balance {
    
    const income = this.transactions.reduce(
      (acc:number,{type,value}:Transaction)=>{
      if(type === 'income') return acc + value; 
      return acc;
    },
    0,
    );

    const outcome = this.transactions.reduce(
      (acc:number,{type,value}:Transaction)=>{
      if(type === 'outcome') return acc + value; 
      return acc;
    },
    0,
    );

    const balance = {
      income,
      outcome,
      total: income - outcome,
    };
    return balance;
  }

  public create({title,value,type}: CreateTransactionDTO): 
  Transaction {
    const transaction = new Transaction({title,value,type});
    
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
