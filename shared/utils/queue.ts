export class QueueCollection<T> {
  public constructor(
    private elements: Record<number, T> = {},
    private head: number = 0,
    private tail: number = 0
  ) {}

  public enqueue(element: T): void {
    this.elements[this.tail] = element;
    this.tail++;
  }

  public dequeue(): T {
    const item = this.elements[this.head];
    delete this.elements[this.head];
    this.head++;

    return item;
  }

  public peek(): T {
    return this.elements[this.head];
  }

  public size(): number {
    return this.tail - this.head;
  }

  public get isEmpty(): boolean {
    return this.size() === 0;
  }
}
