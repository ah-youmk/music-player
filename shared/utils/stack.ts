import { Collection } from '../types/GlobalTypes';

interface IStack<T> {
  push(item: T): void;
  pop(): T | undefined;
  peek(): T | undefined;
  size(): number;
}

export class Stack<T> extends Collection<T> implements IStack<T> {
  constructor(private capacity: number = Infinity) {
    super();
  }

  push(item: T) {
    if (this.isFull()) {
      throw Error('Stack has reached max capacity, you cannot add more items');
    }
    this.storage.push(item);
  }

  pop(): T | undefined {
    return this.storage.pop();
  }

  peek(): T | undefined {
    return this.storage[this.size() - 1];
  }

  isFull(): boolean {
    return this.capacity === this.size();
  }
}
